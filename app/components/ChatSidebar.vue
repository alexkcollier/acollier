<script setup lang="ts">
import { ref, watch, nextTick, useI18n } from '#imports';
import { isBusy } from '~/utils/stream';
import { useChat } from '~/composables/useChat';
import AssistantPip from '~/components/AssistantPip.vue';
import ChatMessage from '~/components/ChatMessage.vue';
import ChatForm from '~/components/ChatForm.vue';

const { t } = useI18n();
const { messages, status, error, sendMessage, abort } = useChat();
const messagesEl = ref<HTMLElement | null>(null);

watch(
  () => messages.value.length,
  async () => {
    await nextTick();
    messagesEl.value?.scrollTo({
      top: messagesEl.value.scrollHeight,
      behavior: 'smooth',
    });
  },
);
</script>

<template>
  <aside class="chat-sidebar">
    <Transition name="chat-sidebar__greeting">
      <div
        v-if="!messages.length"
        class="chat-sidebar__greeting"
      >
        <i18n-t
          keypath="home.tag"
          scope="global"
          tag="p"
          class="chat-sidebar__tag"
        >
          <span class="chat-sidebar__highlight">{{
            t('home.experienceType')
          }}</span>
        </i18n-t>
      </div>
    </Transition>

    <div
      v-if="messages.length"
      ref="messagesEl"
      class="chat-sidebar__messages"
      role="log"
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

    <p
      v-if="error"
      class="chat-sidebar__error"
      role="alert"
    >
      {{ error }}
    </p>

    <ChatForm
      :status="status"
      @submit="sendMessage"
      @abort="abort"
    />
  </aside>
</template>

<style lang="scss">
.chat-sidebar {
  --transition-duration: 200ms;

  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  height: 100dvh;
  overflow: hidden;
  padding: var(--space-6) var(--space-4);
  padding-top: var(--space-24);
  position: sticky;
  top: 0;
  view-transition-name: chat;

  &__greeting {
    flex-shrink: 0;
  }

  &__tag {
    color: var(--color-text-subtle);
    font-size: var(--text-xl);
    font-weight: 700;
    letter-spacing: -0.016em;
    line-height: var(--leading-snug);
    margin: 0;
  }

  &__highlight {
    color: var(--color-text-primary);
  }

  &__greeting-enter-active,
  &__greeting-leave-active {
    transition:
      opacity var(--transition-duration) ease,
      translate var(--transition-duration) ease;
  }

  &__greeting-enter-from,
  &__greeting-leave-to {
    opacity: 0;
    translate: 0 var(--space-2);
  }

  &__messages {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--space-6);
    min-height: 0;
    overflow-y: auto;
    padding-block-end: var(--space-4);
  }

  &__error {
    color: var(--color-text-accent);
    flex-shrink: 0;
    font-size: var(--text-sm);
  }
}
</style>
