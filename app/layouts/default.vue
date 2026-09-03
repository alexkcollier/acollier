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

  if (el) {
    scrollPositions.set(router.currentRoute.value.fullPath, el.scrollTop);
  }
});

const unregisterAfter = router.afterEach((to, from) => {
  if (to.path === from.path) {
    isPopState = false;

    return;
  }

  nextTick(() => {
    const el = document.querySelector('.content');

    if (!el) {
      return;
    }

    el.scrollTo({
      top: isPopState ? (scrollPositions.get(to.fullPath) ?? 0) : 0,
      behavior: 'instant',
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

<style>
.default-layout {
  .content {
    container-type: inline-size;
    flex: 1;
    padding: var(--page-top-padding) var(--page-side-padding);
    padding-top: 8rem;
  }

  @media screen and (width > 960px) {
    height: 100%;

    .content {
      height: 100%;
      overflow-y: auto;
      scroll-behavior: smooth;
    }
  }
}

.default-layout__body {
  align-items: flex-start;
  display: flex;
  min-height: 100%;
}

.default-layout__sidebar {
  @media screen and (width > 960px) {
    flex-shrink: 0;
  }
}

@media screen and (width > 960px) {
  .default-layout__body {
    height: 100%;
    min-height: unset;
  }
}
</style>
