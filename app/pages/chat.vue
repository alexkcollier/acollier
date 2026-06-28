<script setup lang="ts">
import { ref, definePageMeta } from '#imports';
import { useChat } from '~/composables/useChat';
import { isBusy } from '~/utils/stream';

definePageMeta({
  layout: 'chat-layout',
});

const input = ref('');
const { messages, status, error, sendMessage, abort } = useChat();

async function handleSend() {
  const content = input.value.trim();

  await sendMessage(content);

  input.value = '';
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
        v-if="status === 'connecting'"
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
      @submit.prevent="handleSend"
    >
      <input
        v-model="input"
        class="chat__input"
        type="text"
        placeholder="Message"
        :disabled="isBusy(status)"
      />

      <button
        v-if="isBusy(status)"
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
