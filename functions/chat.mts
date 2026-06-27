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

  const interaction = await ai.interactions.create({
    model: process.env.GEMINI_MODEL ?? 'gemini-2.5-flash-lite',
    input: 'Give me a brief summary of Alex',
    system_instruction: systemPrompt,
    generation_config: {
      temperature: 0.3,
    },
  });

  return new Response(JSON.stringify({ message: interaction.output_text }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
