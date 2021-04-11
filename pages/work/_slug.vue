<template>
  <div class="container top-offset">
    <div class="two-column">
      <main class="two-column__wide-col">
        <NuxtContent :document="content" />
      </main>

      <aside class="two-column__narrow-col sidebar">
        <section
          v-if="content.links && content.links.length"
          class="sidebar__section work-links"
        >
          <h2 class="heading-1">
            Links
          </h2>

          <ul class="work-links__list">
            <li
              v-for="({ href, title }) in content.links"
              :key="href"
              class="work-links__list-item"
            >
              <a
                class="link link--arrow"
                :href="href"
                target="_blank"
                rel="noopen"
              >
                {{ title }}
              </a>
            </li>
          </ul>
        </section>

        <section
          v-if="projectLinks && projectLinks.length"
          class="sidebar__section work-links"
        >
          <h2 class="heading-1">
            More projects
          </h2>

          <ul class="work-links__list">
            <li
              v-for="({ path, title }) in projectLinks"
              :key="path"
              class="work-links__list-item"
            >
              <NuxtLink
                class="link link--arrow"
                :to="path"
              >
                {{ title }}
              </NuxtLink>
            </li>
          </ul>
        </section>

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
    const projectLinks = await $content('work')
      .only([
        'path',
        'title',
      ])
      .where({ path: { $ne: route.path } })
      .limit(5)
      .fetch()
      // swallow errors
      .catch(() => { });

    return {
      content,
      projectLinks,
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
@use '~/assets/styles/utils/mixins';

.work-links {
  &__list {
    @include mixins.unstyled-list;
  }

  &__list-item {
    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }
}
</style>
