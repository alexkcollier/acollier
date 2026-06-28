<script setup lang="ts">
import { ref, watch, nextTick, definePageMeta } from '#imports';
import { useChat } from '~/composables/useChat';
import { isBusy } from '~/utils/stream';
import ChatMessage from '~/components/ChatMessage.vue';

definePageMeta({
  layout: 'chat-layout',
});

const input = ref('');
const formEl = ref<HTMLFormElement | null>(null);
const { messages, status, error, sendMessage, abort } = useChat();

async function handleSend() {
  const content = input.value.trim();

  await sendMessage(content);

  input.value = '';
}

watch(
  () => messages.value.length,
  async (newLen, oldLen) => {
    if (oldLen !== 0 || newLen === 0 || !formEl.value) return;

    const before = formEl.value.getBoundingClientRect();

    await nextTick();

    const after = formEl.value.getBoundingClientRect();
    const dy = before.top - after.top;

    if (dy !== 0) {
      formEl.value.animate(
        [{ translate: `0 ${dy}px` }, { translate: 'none' }],
        { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      );
    }
  },
  { flush: 'pre' },
);
</script>

<template>
  <main :class="['chat', { 'chat--active': messages.length }]">
    <Transition name="chat__greeting">
      <div
        v-if="!messages.length"
        class="chat__greeting"
      >
        <p>Hi! Ask me anything about Alex's work and experience.</p>
      </div>
    </Transition>

    <Transition name="chat__messages">
      <div
        v-if="messages.length"
        class="chat__messages"
      >
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
    </Transition>

    <p
      v-if="error"
      class="chat__error"
      role="alert"
    >
      {{ error }}
    </p>

    <form
      ref="formEl"
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
  --transition-duration: 200ms;

  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  height: 100%;
  justify-content: center;
  margin: 0 auto;
  max-width: 40rem;
  padding: var(--space-8) var(--space-4);

  &--active {
    justify-content: flex-start;
  }

  &__greeting {
    text-align: center;

    &-enter-active,
    &-leave-active {
      transition:
        opacity var(--transition-duration) ease,
        translate var(--transition-duration) ease;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
      translate: 0 var(--space-2);
    }
  }

  &__messages {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--space-3);
    min-height: 0;
    overflow-y: auto;

    &-enter-active {
      transition: opacity var(--transition-duration) ease;
    }

    &-enter-from {
      opacity: 0;
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

    &:disabled {
      color: var(--color-text-muted);
      cursor: not-allowed;
    }
  }

  &__submit {
    padding: var(--space-2) var(--space-4);

    &:disabled {
      color: var(--color-text-muted);
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}
</style>
