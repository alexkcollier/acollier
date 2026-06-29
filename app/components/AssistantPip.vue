<script setup lang="ts">
import { useI18n } from '#imports';

defineProps<{ paused?: boolean; thinking?: boolean }>();

const { t } = useI18n();
</script>

<template>
  <div
    :class="['assistant-pip', { 'assistant-pip--paused': paused }]"
    role="status"
  >
    <span
      class="assistant-pip__pulse"
      aria-hidden="true"
    >
      <span class="assistant-pip__dot"></span>
      <span class="assistant-pip__ring"></span>
    </span>

    <span
      v-if="thinking"
      class="assistant-pip__label"
    >
      {{ t('chat.thinking') }}
    </span>
  </div>
</template>

<style lang="scss">
.assistant-pip {
  --assistant-color: var(--stone-300);

  :root[data-theme='dark'] & {
    --assistant-color: var(--stone-600);
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme='light']) & {
      --assistant-color: var(--stone-600);
    }
  }

  align-items: center;
  display: flex;
  gap: var(--space-1);

  &__pulse {
    flex-shrink: 0;
    height: var(--space-8);
    position: relative;
    width: var(--space-8);
  }

  &__dot {
    animation: assistant-pip-breathe 1900ms ease-in-out infinite;
    background: var(--assistant-color);
    border-radius: var(--radius-full);
    height: var(--space-4);
    inset: 0;
    margin: auto;
    position: absolute;
    width: var(--space-4);
  }

  &__ring {
    animation: assistant-pip-ring 1900ms ease-out infinite;
    border: 1.5px solid var(--assistant-color);
    border-radius: var(--radius-full);
    height: var(--space-4);
    inset: 0;
    margin: auto;
    position: absolute;
    width: var(--space-4);
  }

  &--paused &__dot {
    animation: none;
    opacity: 1;
    scale: 1.35;
  }

  &--paused &__ring {
    animation: none;
    opacity: 0;
    scale: 1.8;
  }

  &__label {
    color: var(--color-text-muted);
    font-size: var(--text-sm);
  }
}

@keyframes assistant-pip-breathe {
  0%,
  100% {
    opacity: 0.75;
    scale: 1;
  }

  50% {
    opacity: 1;
    scale: 1.35;
  }
}

@keyframes assistant-pip-ring {
  0% {
    opacity: 0.65;
    scale: 0.6;
  }

  100% {
    opacity: 0;
    scale: 1.8;
  }
}
</style>
