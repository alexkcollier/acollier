export type StreamStatus =
  | 'idle'
  | 'connecting'
  | 'streaming'
  | 'done'
  | 'error';

export const isBusy = (s: StreamStatus): boolean =>
  s === 'connecting' || s === 'streaming';

/** Yields decoded text chunks from a streaming response body. */
export async function* streamChunks(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let chunk = await reader.read();

  while (!chunk.done) {
    yield decoder.decode(chunk.value);
    chunk = await reader.read();
  }
}
