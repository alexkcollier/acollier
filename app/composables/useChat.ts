import { ref, type Ref } from '#imports';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

/** Returns a new message list with `msg` appended. */
const appendMessage = (msgs: Message[], msg: Message): Message[] => [
  ...msgs,
  msg,
];

/** Returns a new message list with `chunk` concatenated onto the last message's content. */
const updateLastMessage = (msgs: Message[], chunk: string): Message[] =>
  msgs.map((msg, i) =>
    i === msgs.length - 1 ? { ...msg, content: msg.content + chunk } : msg,
  );

/** Yields decoded text chunks from a streaming response body. */
async function* streamChunks(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let chunk = await reader.read();

  while (!chunk.done) {
    yield decoder.decode(chunk.value);
    chunk = await reader.read();
  }
}

interface UseChatReturn {
  /** Ordered list of all messages in the current conversation. */
  messages: Ref<Message[]>;
  /** True while a response is in flight or being streamed. */
  isLoading: Ref<boolean>;
  /** Human-readable error message; empty string when no error is present. */
  error: Ref<string>;
  /** Sends `content` to the chat function and streams the response. */
  sendMessage: (content: string) => Promise<void>;
  /** Cancels the in-flight request and stream. */
  abort: () => void;
}

/**
 * Manages chat state and streaming communication with the portfolio assistant.
 * Exposes reactive state alongside `sendMessage` and `abort` to drive the chat UI.
 */
export function useChat(): UseChatReturn {
  const messages = ref<Message[]>([]);
  const isLoading = ref(false);
  const error = ref('');
  const interactionId = ref<string | null>(null);
  const abortController = ref<AbortController | null>(null);

  function abort() {
    abortController.value?.abort();
  }

  async function sendMessage(content: string) {
    if (!content || isLoading.value) {
      return;
    }

    messages.value = appendMessage(messages.value, { role: 'user', content });
    error.value = '';
    isLoading.value = true;
    abortController.value = new AbortController();

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        body: JSON.stringify({
          messages: messages.value,
          interactionId: interactionId.value,
        }),
        signal: abortController.value.signal,
      });

      if (!res.ok) {
        throw new Error('Request failed');
      }

      interactionId.value = res.headers.get('X-Interaction-Id');
      messages.value = appendMessage(messages.value, {
        role: 'assistant',
        content: '',
      });

      for await (const chunk of streamChunks(res.body!)) {
        messages.value = updateLastMessage(messages.value, chunk);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }

      error.value = 'Something went wrong. Please try again.';
    } finally {
      isLoading.value = false;
      abortController.value = null;
    }
  }

  return { messages, isLoading, error, sendMessage, abort };
}
