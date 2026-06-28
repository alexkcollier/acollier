export interface InteractionParams {
  /** The list of messages. Used for supporting multi-turn in non-Gemini APIs */
  messages: { role: 'user' | 'assistant'; content: string }[];
  /** System prompt */
  systemInstruction: string;
  /** Interaction ID used by Gemini for multi-turn */
  previousInteractionId?: string;
  /** AbortSignal to cancel request */
  signal?: AbortSignal;
}

export interface InteractionResult {
  textStream: ReadableStream<string>;
  interactionId: string;
}
