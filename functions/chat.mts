import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { GoogleGenAI } from '@google/genai';

const systemPrompt = readFileSync(
  join(process.cwd(), 'prompts/system-prompt.md'),
  { encoding: 'utf8' },
);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(null, { status: 405 });
  }

  const body = await req.json();

  if (!body?.messages?.length) {
    return new Response(null, { status: 400 });
  }

  const stream = await ai.interactions.create({
    model: process.env.GEMINI_MODEL ?? 'gemini-2.5-flash-lite',
    input: body.messages.at(-1).content,
    stream: true,
    system_instruction: systemPrompt,
    generation_config: {
      temperature: 0.3,
    },
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (event.event_type === 'step.delta' && event.delta.type === 'text') {
          controller.enqueue(encoder.encode(event.delta.text));
        }
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
    },
  });
};
