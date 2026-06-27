import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { GoogleGenAI } from '@google/genai';
import { reportError } from './utils/sentry.mts';

const systemPrompt = readFileSync(
  join(process.cwd(), 'prompts/system-prompt.md'),
  {
    encoding: 'utf8',
  },
);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

interface RequestBody {
  message: string;
  interactionId?: string;
}

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(null, { status: 405 });
  }

  const body = (await req.json()) as RequestBody;

  if (!body?.message) {
    return new Response(null, { status: 400 });
  }

  const stream = await ai.interactions.create({
    model: process.env.GEMINI_MODEL ?? 'gemini-2.5-flash-lite',
    input: body.message,
    stream: true,
    store: true,
    system_instruction: systemPrompt,
    generation_config: {
      temperature: 0.3,
      thinking_level: 'low',
    },
  });

  // The interaction ID is only available on the first SSE event
  // (`interaction.created`), but response headers must be set before the body
  // starts streaming. We consume that first event here so the ID is known
  // before constructing the Response; the reader then continues from the
  // second event onward inside the ReadableStream.
  const reader = stream.getReader();
  const { value: createdEvent } = await reader.read();

  const interactionId =
    createdEvent?.event_type === 'interaction.created'
      ? createdEvent.interaction.id
      : '';

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      // advances to the next event
      let chunk = await reader.read();

      while (!chunk.done) {
        const event = chunk.value;

        if (event.event_type === 'step.delta' && event.delta.type === 'text') {
          controller.enqueue(encoder.encode(event.delta.text));
        }

        if (event.event_type === 'error') {
          await reportError(event.error, 'chat');
        }

        // advances to the next event
        chunk = await reader.read();
      }

      controller.close();
    },
  });

  return new Response(readable, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
      'X-Interaction-Id': interactionId,
    },
  });
};
