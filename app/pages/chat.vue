<script setup lang="ts">
import { ref, watch, nextTick, definePageMeta } from '#imports';
import { isBusy } from '~/utils/stream';
import { useChat } from '~/composables/useChat';
import AssistantPip from '~/components/AssistantPip.vue';
import ChatMessage from '~/components/ChatMessage.vue';
import ChatForm from '~/components/ChatForm.vue';

definePageMeta({
  layout: 'no-page-spacing',
});

const formEl = ref<InstanceType<typeof ChatForm> | null>(null);
const messagesEl = ref<HTMLElement | null>(null);
const { messages, status, error, sendMessage, abort } = useChat();

watch(
  () => messages.value.length,
  async (newLen, oldLen) => {
    // Scroll to latest user message on message send
    if (
      newLen > oldLen &&
      messages.value.at(-1)?.role === 'user' &&
      messagesEl.value
    ) {
      await nextTick();

      const userMsgs = messagesEl.value.querySelectorAll('.chat-message--user');

      userMsgs[userMsgs.length - 1]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    if (oldLen !== 0 || newLen === 0 || !formEl.value) {
      return;
    }

    // animate ChatForm moving to bottom on first message
    const el = formEl.value.$el as HTMLElement;
    const before = el.getBoundingClientRect();

    await nextTick();

    const after = el.getBoundingClientRect();
    const dy = before.top - after.top;

    if (dy !== 0) {
      el.animate([{ translate: `0 ${dy}px` }, { translate: 'none' }], {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      });
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
        <p>Alex Collier is a UX designer and developer in Ottawa, Canada.</p>
      </div>
    </Transition>

    <Transition name="chat__messages">
      <div
        v-if="messages.length"
        ref="messagesEl"
        class="chat__messages"
      >
        <ChatMessage
          v-for="(msg, i) in messages"
          :key="i"
          :role="msg.role"
          :content="msg.content"
        />

        <AssistantPip
          :paused="!isBusy(status)"
          :thinking="status === 'connecting'"
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

    <ChatForm
      ref="formEl"
      :status="status"
      @submit="sendMessage"
      @abort="abort"
    />
  </main>
</template>

<style lang="scss">
.chat {
  --transition-duration: 200ms;

  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin: 0 auto;
  max-width: 40rem;
  padding: var(--space-24) var(--space-4) var(--space-8);

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
    gap: var(--space-8);
    min-height: 0;
    overflow-y: auto;
    padding-block-end: var(--space-36);
    padding-inline: var(--space-4);

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
}
</style>
