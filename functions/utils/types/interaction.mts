export interface InteractionParams {
  messages: { role: 'user' | 'assistant'; content: string }[];
  systemInstruction: string;
  previousInteractionId?: string;
}

export interface InteractionResult {
  textStream: ReadableStream<string>;
  interactionId: string;
}
