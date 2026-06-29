import { ref, type Ref } from '#imports';
import { type StreamStatus, isBusy, streamChunks } from '~/utils/stream';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/** Returns a new message list with `msg` appended. */
const appendMessage = (
  msgs: ChatMessage[],
  msg: ChatMessage,
): ChatMessage[] => [...msgs, msg];

/** Returns a new message list with `chunk` concatenated onto the last message's content. */
const updateLastMessage = (msgs: ChatMessage[], chunk: string): ChatMessage[] =>
  msgs.map((msg, i) =>
    i === msgs.length - 1 ? { ...msg, content: msg.content + chunk } : msg,
  );

interface UseChatReturn {
  /** Ordered list of all messages in the current conversation. */
  messages: Ref<ChatMessage[]>;
  /** Current state of the stream lifecycle. */
  status: Ref<StreamStatus>;
  /** Human-readable error message; only meaningful when `status === 'error'`. */
  error: Ref<string>;
  /** Sends `content` to the chat function and streams the response. */
  sendMessage: (content: string) => Promise<void>;
  /** Cancels the in-flight request and stream, returning status to `'idle'`. */
  abort: () => void;
}

const messages = ref<ChatMessage[]>([]);
const status = ref<StreamStatus>('idle');
const error = ref('');
const interactionId = ref<string | null>(null);
const abortController = ref<AbortController | null>(null);

function abort() {
  abortController.value?.abort();
}

async function sendMessage(content: string) {
  if (!content || isBusy(status.value)) {
    return;
  }

  // cache messages, allowing rollback on failure
  const snapshot = messages.value;
  messages.value = appendMessage(messages.value, { role: 'user', content });
  error.value = '';
  status.value = 'connecting';
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
    status.value = 'streaming';

    for await (const chunk of streamChunks(res.body!)) {
      messages.value = updateLastMessage(messages.value, chunk);
    }

    status.value = 'done';
  } catch (err) {
    // if request fails or is cancelled, rollback to snapshot
    messages.value = snapshot;

    if (err instanceof DOMException && err.name === 'AbortError') {
      status.value = 'idle';
      return;
    }

    status.value = 'error';
    error.value = 'Something went wrong. Please try again.';
  } finally {
    abortController.value = null;
  }
}

export function useChat(): UseChatReturn {
  return { messages, status, error, sendMessage, abort };
}
