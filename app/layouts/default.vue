<script setup lang="ts">
import ChatSidebar from '~/components/ChatSidebar.vue';
import { nextTick, onMounted, onUnmounted, useRouter } from '#imports';

const router = useRouter();
const scrollPositions = new Map<string, number>();
let isPopState = false;

function onPopState() {
  isPopState = true;
}

const unregisterBefore = router.beforeEach(() => {
  const el = document.querySelector('.content');
  if (el) scrollPositions.set(router.currentRoute.value.fullPath, el.scrollTop);
});

const unregisterAfter = router.afterEach((to) => {
  nextTick(() => {
    const el = document.querySelector('.content');
    if (!el) return;
    el.scrollTo({
      top: isPopState ? (scrollPositions.get(to.fullPath) ?? 0) : 0,
    });
    isPopState = false;
  });
});

onMounted(() => window.addEventListener('popstate', onPopState));
onUnmounted(() => {
  window.removeEventListener('popstate', onPopState);
  unregisterBefore();
  unregisterAfter();
});
</script>

<template>
  <div class="default-layout">
    <div class="default-layout__body">
      <div class="content">
        <slot />
      </div>

      <ChatSidebar class="default-layout__sidebar" />
    </div>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/utils/breakpoints' as bp;

.default-layout {
  &__body {
    align-items: flex-start;
    display: flex;
    min-height: 100%;
  }

  &__sidebar {
    display: none;

    @include bp.above('lg') {
      display: flex;
      flex-shrink: 0;
    }
  }

  .content {
    flex: 1;
    padding: var(--page-top-padding) var(--page-side-padding);
    padding-top: 8rem;
  }

  @include bp.above('lg') {
    height: 100%;

    &__body {
      height: 100%;
      min-height: unset;
    }

    .content {
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
