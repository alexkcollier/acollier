<template>
  <div>
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
