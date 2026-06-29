<script setup lang="ts">
import { ref, watch, nextTick, onMounted, useI18n } from '#imports';
import { isBusy } from '~/utils/stream';
import { useChat } from '~/composables/useChat';
import AssistantPip from '~/components/AssistantPip.vue';
import ChatMessage from '~/components/ChatMessage.vue';
import ChatForm from '~/components/ChatForm.vue';

const { t } = useI18n();
const { messages, status, error, sendMessage, abort } = useChat();
const messagesEl = ref<HTMLElement | null>(null);
const isCollapsed = ref(false);

onMounted(() => {
  isCollapsed.value = localStorage.getItem('sidebar-collapsed') === 'true';
});

watch(isCollapsed, (val) => {
  localStorage.setItem('sidebar-collapsed', String(val));
});

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
  <aside :class="['chat-sidebar', { 'chat-sidebar--collapsed': isCollapsed }]">
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

    <div class="chat-sidebar__body">
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
  view-transition-name: chat;
  width: 30rem;

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
  }

  &__greeting {
    flex-shrink: 0;
    padding-top: var(--space-10);
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
    padding-block-end: var(--space-12);
  }

  &__error {
    color: var(--color-text-accent);
    flex-shrink: 0;
    font-size: var(--text-sm);
  }

  &--collapsed {
    background: transparent;
    width: 3rem;

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
