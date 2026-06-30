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

<style lang="scss">
.chat-scroll-btn {
  --transition-duration: 200ms;

  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  bottom: var(--space-4);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--stone-900) 16%, transparent);
  color: var(--color-text-subtle);
  cursor: pointer;
  display: flex;
  left: 50%;
  padding: var(--space-2) var(--space-3);
  position: absolute;
  transform: translateX(-50%);
  transition:
    background var(--transition-duration) ease,
    box-shadow var(--transition-duration) ease;

  &:hover {
    background: var(--color-bg-subtle);
  }

  &-enter-active,
  &-leave-active {
    transition:
      opacity var(--transition-duration) ease,
      translate var(--transition-duration) ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    translate: 0 var(--space-2);
  }
}
</style>
