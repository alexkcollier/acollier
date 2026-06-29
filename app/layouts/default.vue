<!-- eslint-disable vue/multi-word-component-names -->
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

<script>
import ChatSidebar from '~/components/ChatSidebar.vue';

export default {
  components: {
    ChatSidebar,
  },
};
</script>

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
}
</style>
