import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createInteraction } from './utils/llm/create-interaction.ts';

const systemPrompt = readFileSync(
  join(process.cwd(), 'prompts/system-prompt.md'),
  {
    encoding: 'utf8',
  },
);

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface RequestBody {
  messages: Message[];
  interactionId?: string;
  currentPath?: string;
}

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(null, { status: 405 });
  }

  const body = (await req.json()) as RequestBody;

  if (!body?.messages?.length) {
    return new Response(null, { status: 400 });
  }

  const contextualSystemPrompt = body.currentPath
    ? `${systemPrompt}\n\n---\nThe user is currently viewing: ${body.currentPath}`
    : systemPrompt;

  const { textStream, interactionId } = await createInteraction({
    messages: body.messages,
    systemInstruction: contextualSystemPrompt,
    previousInteractionId: body.interactionId,
    signal: req.signal,
  });

  return new Response(textStream, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
      'X-Interaction-Id': interactionId,
    },
  });
};
