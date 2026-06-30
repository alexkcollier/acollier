<script setup lang="ts">
import { computed, useI18n, type ChatMessage } from '#imports';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const props = defineProps<{
  role: ChatMessage['role'];
  content: string;
}>();

const { t } = useI18n();

const html = computed(() =>
  props.role === 'assistant'
    ? DOMPurify.sanitize(marked(props.content) as string)
    : null,
);
</script>

<template>
  <div
    :class="['chat-message', `chat-message--${role}`]"
    role="article"
  >
    <span class="sr-only">{{
      role === 'user' ? t('chat.you') : t('chat.assistant')
    }}</span>

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
    max-width: 90%;
    padding: var(--space-2) var(--space-4);
  }

  &--assistant {
    align-self: flex-start;
  }

  &__content {
    line-height: var(--leading-normal);

    p {
      padding-inline-end: var(--space-8);
    }

    h1,
    h2,
    h3,
    h4 {
      font-weight: 700;
      line-height: var(--leading-snug);
    }

    h1 {
      font-size: var(--text-xl);
    }

    h2 {
      font-size: var(--text-lg);
    }

    h3,
    h4 {
      font-size: var(--text-base);
    }

    ul,
    ol {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
      padding-inline-start: var(--space-6);
    }

    ul {
      list-style: disc;
    }

    ol {
      list-style: decimal;
    }

    li::marker {
      color: var(--color-text-muted);
    }

    a {
      color: var(--color-link);
      text-decoration: underline;
      text-underline-offset: 2px;

      &:hover {
        color: var(--color-link-hover);
      }
    }

    strong {
      font-weight: 700;
    }

    em {
      font-style: italic;
    }

    code {
      background: var(--color-bg-subtle);
      border-radius: var(--radius-sm);
      font-family: var(--font-mono);
      font-size: 0.9em;
      padding: 0.1em 0.3em;
    }

    pre {
      background: var(--color-bg-subtle);
      border-radius: var(--radius-md);
      overflow-x: auto;
      padding: var(--space-3) var(--space-4);

      code {
        background: none;
        font-size: var(--text-sm);
        padding: 0;
      }
    }

    blockquote {
      border-inline-start: 2px solid var(--color-border);
      color: var(--color-text-muted);
      padding-inline-start: var(--space-4);
    }

    hr {
      border: none;
      border-block-start: 1px solid var(--color-border);
    }

    > * + * {
      margin-block-start: var(--space-3);
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
