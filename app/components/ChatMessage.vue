<script setup lang="ts">
import { computed, type ChatMessage } from '#imports';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const props = defineProps<{
  role: ChatMessage['role'];
  content: string;
}>();

const html = computed(() =>
  props.role === 'assistant'
    ? DOMPurify.sanitize(marked(props.content) as string)
    : null,
);
</script>

<template>
  <div
    :class="['chat-message', `chat-message--${role}`]"
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
  animation: chat-message-enter 200ms ease both;
  border-radius: var(--radius-md);

  &--user {
    align-self: flex-end;
    background: var(--color-bg-subtle);
    padding: var(--space-2) var(--space-4);
    max-width: 90%;
  }

  &--assistant {
    align-self: flex-start;
  }

  &__content {
    p {
      padding-inline-end: var(--space-8);
    }

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

@keyframes chat-message-enter {
  from {
    opacity: 0;
    translate: 0 var(--space-2);
  }
}
</style>
