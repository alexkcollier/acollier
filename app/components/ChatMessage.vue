<script setup lang="ts">
import { computed, type ChatMessage } from '#imports';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const props = defineProps<{
  role: ChatMessage['role'];
  content: string;
  loading?: boolean;
}>();

const html = computed(() =>
  props.role === 'assistant'
    ? DOMPurify.sanitize(marked(props.content) as string)
    : null,
);
</script>

<template>
  <div
    :class="[
      'chat-message',
      `chat-message--${role}`,
      { 'chat-message--loading': loading },
    ]"
  >
    <div
      v-if="html !== null"
      class="chat-message__content"
      v-html="html"
    />

    <template v-else>{{ content }}</template>
  </div>
</template>

<style lang="scss">
.chat-message {
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

  &__content {
    > * + * {
      margin-block-start: var(--space-2);
    }

    > *:first-child {
      margin-block-start: 0;
    }

    > *:last-child {
      margin-block-end: 0;
    }
  }
}
</style>
