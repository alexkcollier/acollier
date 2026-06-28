import { GoogleGenAI } from '@google/genai';
import { reportError } from './../sentry.mts';
import type {
  InteractionParams,
  InteractionResult,
} from '../types/interaction.mts';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function createGeminiInteraction({
  messages,
  systemInstruction,
  previousInteractionId,
  signal,
}: InteractionParams): Promise<InteractionResult> {
  const stream = await ai.interactions.create({
    model: process.env.GEMINI_MODEL ?? 'gemini-2.5-flash-lite',
    input: messages.at(-1)!.content,
    stream: true,
    store: true,
    system_instruction: systemInstruction,
    generation_config: {
      temperature: 0.3,
      thinking_level: 'low',
    },
    ...(previousInteractionId && {
      previous_interaction_id: previousInteractionId,
    }),
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

  const textStream = new ReadableStream<string>({
    async start(controller) {
      const onAbort = () => {
        reader.cancel().catch(() => {});
        controller.close();
      };

      signal?.addEventListener('abort', onAbort, { once: true });

      let chunk = await reader.read();

      while (!chunk.done) {
        const event = chunk.value;

        if (event.event_type === 'step.delta' && event.delta.type === 'text') {
          controller.enqueue(event.delta.text);
        }

        if (event.event_type === 'error') {
          await reportError(event.error, 'chat/gemini');
        }

        chunk = await reader.read();
      }

      signal?.removeEventListener('abort', onAbort);
      controller.close();
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return { textStream, interactionId };
}
