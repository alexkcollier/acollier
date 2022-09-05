<template>
  <div class="no-spacing-layout">
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

<style scoped>
.no-spacing-layout {
  height: 100%;
}

.content {
  height: 100%;
}
</style>
