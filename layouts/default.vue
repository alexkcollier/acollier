<template>
  <div class="default-layout">
    <TheNavbar />

    <div class="default-layout__content">
      <Nuxt />
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
  &__content {
    margin-top: 4rem;
    padding: var(--page-top-padding) var(--page-side-padding);
    padding-top: 4rem;
  }
}
</style>
