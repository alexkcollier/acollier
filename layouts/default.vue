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
.default-layout {
  &__content {
    --top-padding: 2rem;
    --side-padding: 2rem;

    padding: var(--top-padding) var(--side-padding);
    padding-top: 8rem;

    @media screen and (max-width: 480px) {
      --side-padding: 1rem;
    }
  }
}
</style>
