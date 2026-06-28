import OpenAI from 'openai';
import type {
  InteractionParams,
  InteractionResult,
} from '../types/interaction.mts';

const client = new OpenAI({
  baseURL: process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434/v1',
  apiKey: 'ollama',
});

export async function createOllamaInteraction({
  messages,
  systemInstruction,
  signal,
}: InteractionParams): Promise<InteractionResult> {
  const model = process.env.OLLAMA_MODEL ?? 'llama3.2';

  console.log(`[ Using ollama and ${model} ]`);

  const stream = await client.chat.completions.create(
    {
      model: model,
      messages: [{ role: 'system', content: systemInstruction }, ...messages],
      stream: true,
    },
    { signal },
  );

  const textStream = new ReadableStream<string>({
    async start(controller) {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) controller.enqueue(content);
      }
      controller.close();
    },
  });

  return { textStream, interactionId: '' };
}
