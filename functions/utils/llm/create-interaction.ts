import type { InteractionParams } from '../types/interaction.mts';

export async function createInteraction(params: InteractionParams) {
  if (process.env.LOCAL_LLM_PROVIDER === 'ollama') {
    const { createOllamaInteraction } = await import('./ollama.mts');
    return createOllamaInteraction(params);
  }

  const { createGeminiInteraction } = await import('./gemini.mts');
  return createGeminiInteraction(params);
}
