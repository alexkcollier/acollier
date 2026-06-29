<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="default-layout">
    <TheNavbar />

    <div class="default-layout__body">
      <ChatSidebar class="default-layout__sidebar" />

      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import TheNavbar from '~/components/TheNavbar.vue';
import ChatSidebar from '~/components/ChatSidebar.vue';

export default {
  components: {
    TheNavbar,
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
      width: 20rem;
    }
  }

  .content {
    flex: 1;
    padding: var(--page-top-padding) var(--page-side-padding);
    padding-top: 8rem;
  }
}
</style>
