<template>
  <div class="container top-offset">
    <div class="two-column">
      <main class="two-column__wide-col">
        <NuxtContent :document="content" />
      </main>

      <aside class="two-column__narrow-col sidebar">
        <section
          v-if="content.tools && content.tools.length"
          class="sidebar__section"
        >
          <h2 class="heading-1">
            Built with
          </h2>

          <ToolsList :tools="content.tools" />
        </section>
      </aside>
    </div>
  </div>
</template>

<script>
import ToolsList from '~/components/ToolsList.vue';

export default {
  components: {
    ToolsList,
  },

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
