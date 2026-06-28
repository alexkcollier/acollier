import type { GoogleGenAI } from '@google/genai';

export function createGeminiInteraction(
  ai: GoogleGenAI,
  {
    input,
    systemInstruction,
    previousInteractionId,
  }: { input: string; systemInstruction: string; previousInteractionId?: string },
) {
  return ai.interactions.create({
    model: process.env.GEMINI_MODEL ?? 'gemini-2.5-flash-lite',
    input,
    stream: true,
    store: true,
    system_instruction: systemInstruction,
    ...(previousInteractionId && { previous_interaction_id: previousInteractionId }),
    generation_config: {
      temperature: 0.3,
      thinking_level: 'low',
    },
  });
}
