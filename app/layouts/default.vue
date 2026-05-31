<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="default-layout">
    <TheNavbar />

    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import TheNavbar from '~/components/TheNavbar.vue';

export default {
  components: {
    TheNavbar,
  },
};
</script>

<style lang="scss">
@use '~/assets/styles/utils/breakpoints' as bp;

.default-layout {
  height: 100%;

  .content {
    padding: var(--page-top-padding) var(--page-side-padding);
    padding-top: 8rem;
  }
}
</style>
