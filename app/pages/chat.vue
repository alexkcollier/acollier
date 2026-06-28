<script setup lang="ts">
import { ref, definePageMeta } from '#imports';

definePageMeta({
  layout: 'chat-layout',
});

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const messages = ref<Message[]>([]);
const input = ref('');
const isLoading = ref(false);
const error = ref('');
const interactionId = ref<string | null>(null);
const abortController = ref<AbortController | null>(null);

function abort() {
  abortController.value?.abort();
}

async function sendMessage() {
  const content = input.value.trim();

  if (!content || isLoading.value) return;

  messages.value.push({ role: 'user', content });
  input.value = '';
  error.value = '';
  isLoading.value = true;
  abortController.value = new AbortController();

  try {
    const res = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: content,
        interactionId: interactionId.value,
      }),
      signal: abortController.value.signal,
    });

    if (!res.ok) {
      throw new Error('Request failed');
    }

    interactionId.value = res.headers.get('X-Interaction-Id');

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    messages.value.push({ role: 'assistant', content: '' });

    let chunk = await reader.read();

    while (!chunk.done) {
      messages.value.at(-1)!.content += decoder.decode(chunk.value);
      chunk = await reader.read();
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
</script>

<template>
  <main class="chat">
    <div class="chat__messages">
      <div
        v-for="(msg, i) in messages"
        :key="i"
        :class="['chat__message', `chat__message--${msg.role}`]"
      >
        {{ msg.content }}
      </div>

      <div
        v-if="isLoading"
        class="chat__message chat__message--assistant chat__message--loading"
      >
        ...
      </div>
    </div>

    <p
      v-if="error"
      class="chat__error"
      role="alert"
    >
      {{ error }}
    </p>

    <form
      class="chat__form"
      @submit.prevent="sendMessage"
    >
      <input
        v-model="input"
        class="chat__input"
        type="text"
        placeholder="Message"
        :disabled="isLoading"
      />

      <button
        v-if="isLoading"
        class="chat__submit"
        type="button"
        @click="abort"
      >
        Stop
      </button>

      <button
        v-else
        class="chat__submit"
        type="submit"
        :disabled="!input.trim()"
      >
        Send
      </button>
    </form>
  </main>
</template>

<style lang="scss">
.chat {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin: 0 auto;
  max-width: 40rem;
  height: 100%;
  padding: var(--space-8) var(--space-4);

  &__messages {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--space-3);
  }

  &__message {
    border-radius: var(--radius-md);
    max-width: 80%;
    padding: var(--space-3) var(--space-4);

    &--user {
      align-self: flex-end;
      background: var(--color-bg-primary);
      color: var(--color-text-on-primary);
    }

    &--assistant {
      align-self: flex-start;
      background: var(--color-bg-subtle);
    }

    &--loading {
      opacity: 0.6;
    }
  }

  &__error {
    color: var(--color-text-accent);
    font-size: var(--text-sm);
  }

  &__form {
    display: flex;
    gap: var(--space-2);
  }

  &__input {
    border-radius: var(--radius-md);
    flex: 1;
    padding: var(--space-2) var(--space-3);
  }

  &__submit {
    padding: var(--space-2) var(--space-4);
  }
}
</style>
