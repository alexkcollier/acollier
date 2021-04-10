<template>
  <main class="container top-offset">
    <NuxtContent :document="content" />
  </main>
</template>

<script>
export default {
  async asyncData ({ $content, route }) {
    const content = await $content(route.path).fetch();

    return {
      content,
    };
  },

  head () {
    return {
      title: this.content.title,
      meta: [
        { hid: 'description', name: 'description', content: this.content.description },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.content.title },
        { hid: 'og:description', property: 'og:description', content: this.content.description },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: this.content.title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.content.description },
      ],
    };
  },
};
</script>

<style lang="scss">
@use '~/assets/styles/nuxt-content';
</style>
