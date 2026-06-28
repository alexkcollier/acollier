<script setup lang="ts">
import { ref, definePageMeta } from '#imports';
import { useChat } from '~/composables/useChat';
import { isBusy } from '~/utils/stream';
import ChatMessage from '~/components/ChatMessage.vue';

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
      <ChatMessage
        v-for="(msg, i) in messages"
        :key="i"
        :role="msg.role"
        :content="msg.content"
      />

      <ChatMessage
        v-if="status === 'connecting'"
        role="assistant"
        content="..."
        loading
      />
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
    min-height: 0;
    overflow-y: auto;
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
