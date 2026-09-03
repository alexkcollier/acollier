<script setup lang="ts">
import { ref, watch, useI18n } from '#imports';

const props = defineProps<{
  target: HTMLElement | null;
}>();

const { t } = useI18n();
const isScrolledUp = ref(false);

function checkScroll() {
  if (!props.target) {
    return;
  }

  const { scrollTop, scrollHeight, clientHeight } = props.target;

  const offset = Math.min(100, clientHeight / 3);

  // distance scrolled < total distance
  isScrolledUp.value = scrollTop + clientHeight < scrollHeight - offset;
}

function scrollToEnd() {
  props.target?.scrollTo({
    top: props.target.scrollHeight,
    behavior: 'smooth',
  });
}

watch(
  () => props.target,
  (el, _, onCleanup) => {
    if (!el) {
      isScrolledUp.value = false;

      return;
    }

    el.addEventListener('scroll', checkScroll, { passive: true });

    onCleanup(() => el.removeEventListener('scroll', checkScroll));
  },
  { immediate: true },
);
</script>

<template>
  <Transition name="chat-scroll-btn">
    <button
      v-if="isScrolledUp"
      class="chat-scroll-btn"
      :aria-label="t('chat.scrollToEnd')"
      @click="scrollToEnd"
    >
      <Icon name="lucide:arrow-down" />
    </button>
  </Transition>
</template>

<style>
@layer block {
  .chat-scroll-btn {
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    bottom: var(--space-4);
    box-shadow: var(--shadow-sm);
    color: var(--color-text-muted);
    cursor: pointer;
    display: flex;
    left: 50%;
    padding: var(--space-2) var(--space-3);
    position: absolute;
    transform: translateX(-50%);
    transition:
      background var(--duration-slow) ease,
      box-shadow var(--duration-slow) ease;

    &:hover {
      background: var(--color-bg-subtle);
    }
  }

  .chat-scroll-btn-enter-active,
  .chat-scroll-btn-leave-active {
    transition:
      opacity var(--duration-slow) ease,
      translate var(--duration-slow) ease;
  }

  .chat-scroll-btn-enter-from,
  .chat-scroll-btn-leave-to {
    opacity: 0;
    translate: 0 var(--space-2);
  }
}
</style>
