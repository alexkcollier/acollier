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
    --top-padding: 2rem;
    --side-padding: 2rem;

    padding: var(--top-padding) var(--side-padding);
    padding-top: 8rem;

    @include bp.below('sm') {
      --side-padding: 1rem;
    }
  }
}
</style>
