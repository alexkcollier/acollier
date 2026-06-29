<script setup lang="ts">
import {
  ref,
  watch,
  nextTick,
  onMounted,
  onUnmounted,
  useI18n,
} from '#imports';
import { type StreamStatus, isBusy } from '~/utils/stream';

const props = defineProps<{
  status: StreamStatus;
}>();

const emit = defineEmits<{
  submit: [content: string];
  /** Abort event for triggering AbortController */
  abort: [];
}>();

const { t } = useI18n();

const input = ref('');
const lastSentContent = ref('');
const textareaRef = ref<HTMLTextAreaElement | null>(null);

function handleSend() {
  const content = input.value.trim();

  if (!content) {
    return;
  }

  // Cache textarea value in case request fails or is cancelled
  lastSentContent.value = content;
  input.value = '';

  emit('submit', content);
}

function handleAbort() {
  emit('abort');
}

/**
 * Focuses the chat form if user starts typing.
 * If request is in flight, listens for esc to cancel
 */
function handleGlobalKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isBusy(props.status)) {
    handleAbort();
    return;
  }

  if (
    isBusy(props.status) ||
    e.key.length !== 1 ||
    e.key === ' ' ||
    e.ctrlKey ||
    e.metaKey ||
    e.altKey
  ) {
    return;
  }

  if (document.activeElement === textareaRef.value) {
    return;
  }

  const active = document.activeElement;

  if (
    active instanceof HTMLInputElement ||
    active instanceof HTMLTextAreaElement ||
    (active as HTMLElement)?.isContentEditable
  ) {
    return;
  }

  textareaRef.value?.focus();
}

onMounted(() => document.addEventListener('keydown', handleGlobalKeydown));
onUnmounted(() => document.removeEventListener('keydown', handleGlobalKeydown));

// Resets textarea value if message does not succeed; returns focus after stream ends
watch(
  () => props.status,
  async (newStatus, oldStatus) => {
    if (!isBusy(oldStatus)) {
      return;
    }

    if (newStatus === 'idle' || newStatus === 'error') {
      input.value = lastSentContent.value;
      await nextTick();
      textareaRef.value?.focus();
    }

    lastSentContent.value = '';
  },
);
</script>

<template>
  <form
    class="chat-form"
    :aria-label="t('chat.formLabel')"
    @submit.prevent="handleSend"
  >
    <label
      class="sr-only"
      for="chat-input"
      >{{ t('chat.formLabel') }}</label
    >

    <textarea
      id="chat-input"
      ref="textareaRef"
      v-model="input"
      class="chat-form__input"
      :placeholder="t('chat.placeholder')"
      rows="1"
      :disabled="isBusy(status)"
      @keydown.enter.exact.prevent="handleSend"
    />

    <div class="chat-form__actions">
      <span class="chat-form__hint">
        <kbd v-if="isBusy(status)">Esc</kbd>
      </span>

      <button
        v-if="isBusy(status)"
        class="chat-form__submit"
        type="button"
        :aria-label="t('chat.stop')"
        @click="handleAbort"
      >
        <Icon name="lucide:octagon-pause" />
      </button>

      <button
        v-else
        class="chat-form__submit"
        type="submit"
        :aria-label="t('chat.send')"
        :disabled="!input.trim()"
      >
        <Icon name="lucide:forward" />
      </button>
    </div>
  </form>
</template>

<style lang="scss">
.chat-form {
  --submit-bg: var(--stone-200);
  --submit-color: var(--stone-800);

  background: var(--color-bg-subtle);
  border: 1px solid var(--color-input-border);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  padding: var(--space-3);
  transition: border-color 200ms ease;

  &:has(textarea:focus) {
    border-color: var(--color-input-border-focus);
  }

  &__actions {
    align-items: center;
    display: flex;
    gap: var(--space-2);
    justify-content: flex-end;
    margin-block-start: var(--space-2);
  }

  &__hint {
    color: var(--color-text-muted);
    font-size: var(--text-xs);

    kbd {
      border: 1px solid var(--color-input-border);
      border-radius: var(--radius-sm);
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      padding: calc(0.5 * var(--space-1)) var(--space-1);
    }
  }

  &__input {
    background: transparent;
    border: none;
    field-sizing: content;
    max-height: 24rem;
    min-height: 1lh;
    overflow-y: auto;
    resize: none;
    width: 100%;

    &:focus {
      outline: none;
    }

    &:disabled {
      color: var(--color-text-muted);
      cursor: not-allowed;
    }
  }

  &__submit {
    align-items: center;
    background: var(--submit-bg);
    border-radius: var(--radius-md);
    color: var(--submit-color);
    display: flex;
    justify-content: center;
    padding: var(--space-2);

    &:disabled {
      background: transparent;
      color: var(--color-text-muted);
      cursor: not-allowed;
    }
  }
}

:root[data-theme='dark'] .chat-form {
  --submit-bg: var(--stone-800);
  --submit-color: var(--stone-100);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) .chat-form {
    --submit-bg: var(--stone-800);
    --submit-color: var(--stone-100);
  }
}
</style>
