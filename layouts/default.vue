<template>
  <div class="default-layout">
    <TheNavbar />

    <div class="content">
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
  .content {
    margin-top: 4rem;
    padding: var(--page-top-padding) var(--page-side-padding);
    padding-top: 4rem;
  }
}
</style>
