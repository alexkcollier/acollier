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
  max-width: 90%;
  padding: var(--space-2) var(--space-3);

  &--user {
    align-self: flex-end;
    background: var(--color-bg-subtle);
  }

  &--assistant {
    align-self: flex-start;
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
