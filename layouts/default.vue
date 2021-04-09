<template>
  <div class="default-layout">
    <TheNavbar />
    <Nuxt />
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
  height: 100%;
}
</style>
