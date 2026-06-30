<script setup lang="ts">
import { ref, watch, nextTick, onMounted, useI18n } from '#imports';
import { isBusy } from '~/utils/stream';
import { useChat } from '~/composables/useChat';
import AssistantPip from '~/components/AssistantPip.vue';
import ChatMessage from '~/components/ChatMessage.vue';
import ChatForm from '~/components/ChatForm.vue';
import ChatScrollButton from '~/components/ChatScrollButton.vue';

const MIN_WIDTH = 256;
const MAX_WIDTH = 640;

const { t } = useI18n();
const { messages, status, error, sendMessage, abort } = useChat();
const messagesEl = ref<HTMLElement | null>(null);
const sidebarEl = ref<HTMLElement | null>(null);
const isCollapsed = ref(false);
const isResizing = ref(false);

onMounted(() => {
  const savedWidth = localStorage.getItem('sidebar-width');

  if (savedWidth && sidebarEl.value) {
    sidebarEl.value.style.setProperty(
      '--chat-sidebar-width',
      `${savedWidth}px`,
    );
  }

  isCollapsed.value = localStorage.getItem('sidebar-collapsed') === 'true';
});

watch(isCollapsed, (val) => {
  localStorage.setItem('sidebar-collapsed', String(val));
});

function onResizeStart(e: MouseEvent) {
  e.preventDefault();
  const startX = e.clientX;
  const startWidth = sidebarEl.value
    ? parseInt(getComputedStyle(sidebarEl.value).width, 10)
    : 384;

  isResizing.value = true;
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';

  function onMove(e: MouseEvent) {
    const delta = startX - e.clientX;
    const w = Math.min(Math.max(startWidth + delta, MIN_WIDTH), MAX_WIDTH);
    sidebarEl.value?.style.setProperty('--chat-sidebar-width', `${w}px`);
  }

  function onUp() {
    isResizing.value = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    const w = sidebarEl.value
      ? parseInt(getComputedStyle(sidebarEl.value).width, 10)
      : 384;
    localStorage.setItem('sidebar-width', String(w));
  }

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}

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
  <aside
    ref="sidebarEl"
    :class="[
      'chat-sidebar',
      {
        'chat-sidebar--collapsed': isCollapsed,
        'chat-sidebar--resizing': isResizing,
      },
    ]"
  >
    <div
      class="chat-sidebar__resize-handle"
      aria-hidden="true"
      @mousedown.prevent="onResizeStart"
    />

    <button
      class="chat-sidebar__toggle"
      :aria-label="
        isCollapsed ? t('chat.sidebarExpand') : t('chat.sidebarCollapse')
      "
      @click="isCollapsed = !isCollapsed"
    >
      <Icon
        :name="isCollapsed ? 'lucide:chevron-left' : 'lucide:chevron-right'"
      />
    </button>

    <div
      :class="[
        'chat-sidebar__body',
        { 'chat-sidebar__body--empty': !messages.length },
      ]"
    >
      <div
        v-if="messages.length"
        class="chat-sidebar__messages-wrap"
      >
        <div
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

        <ChatScrollButton :target="messagesEl" />
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
    </div>
  </aside>
</template>

<style lang="scss">
.chat-sidebar {
  $parent: &;

  --transition-duration: 200ms;

  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
  padding-top: var(--space-20);
  position: sticky;
  top: 0;
  transition: width var(--transition-duration) cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--chat-sidebar-width, 24rem);

  &__resize-handle {
    cursor: col-resize;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: var(--space-2);
    z-index: 3;

    &::after {
      background: var(--color-text-primary);
      content: '';
      height: 100%;
      left: 0;
      opacity: 0;
      position: absolute;
      top: 0;
      transition: opacity 150ms;
      width: 2px;
    }

    &:hover::after {
      opacity: 0.2;
    }
  }

  &__toggle {
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    color: var(--color-text-subtle);
    cursor: pointer;
    display: flex;
    padding: var(--space-2);
    left: var(--space-4);
    position: absolute;
    top: var(--space-21);
    transition:
      box-shadow var(--transition-duration) ease,
      color var(--transition-duration) ease;
    z-index: 2;

    &:hover {
      box-shadow: 0 2px 8px
        color-mix(in srgb, var(--stone-900) 12%, transparent);
      color: var(--color-text);
    }
  }

  &__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    padding: 0 var(--space-4) var(--space-4);
    transition: opacity 150ms;

    &--empty {
      margin-top: var(--space-12);
    }
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

  &__messages-wrap {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    position: relative;
  }

  &__messages {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--space-6);
    min-height: 0;
    overflow-y: auto;
    padding-block-end: var(--space-12);
  }

  &__error {
    color: var(--color-text-accent);
    flex-shrink: 0;
    font-size: var(--text-sm);
  }

  &--resizing {
    transition: none;

    #{$parent}__resize-handle::after {
      opacity: 0.4;
    }
  }

  &--collapsed {
    background: transparent;
    width: 3rem;

    #{$parent}__resize-handle {
      pointer-events: none;
    }

    #{$parent}__toggle {
      border-color: transparent;
      left: unset;
      right: var(--space-2);
    }

    #{$parent}__body {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
