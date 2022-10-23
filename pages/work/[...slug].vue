<script setup>
import { defineI18nRoute, useI18n } from '#imports';

defineI18nRoute({
  paths: {
    en: '/work/:slug',
    fr: '/portfolio/:slug',
  },
});
const { locale } = useI18n();
</script>

<template>
  <div class="container">
    <div v-if="locale === 'fr'">
      {{ $t('common.postTranslationMissing') }}
    </div>

    <ContentDoc
      v-slot="{ doc }"
      key="renderer"
      :path="`/work/${$route.params.slug}`"
    >
      <Head>
        <Title>{{ doc.title }}</Title>
        <Meta
          hid="description"
          name="description"
          :content="doc.description"
        />
        <Meta
          hid="og:title"
          property="og:title"
          :content="doc.title"
        />
        <Meta
          hid="og:description"
          property="og:description"
          :content="doc.description"
        />
        <Meta
          hid="twitter:title"
          name="twitter:title"
          :content="doc.title"
        />
        <Meta
          hid="twitter:description"
          name="twitter:description"
          :content="doc.description"
        />
      </Head>

      <div class="two-column">
        <main class="two-column__wide-col">
          <ContentRenderer
            class="nuxt-content"
            :value="doc"
          />
        </main>

        <aside class="two-column__narrow-col sidebar">
          <section
            v-if="doc.tools && doc.tools.length"
            class="sidebar__section"
          >
            <h2 class="heading-1">
              Built with
            </h2>

            <ToolsList :tools="doc.tools" />
          </section>

          <section
            v-if="doc.links && doc.links.length"
            class="sidebar__section work-links"
          >
            <h2 class="heading-1">
              Links
            </h2>

            <ul class="work-links__list">
              <li
                v-for="({ href, title }) in doc.links"
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
        </aside>
      </div>
    </ContentDoc>
  </div>
</template>

<script>
/* eslint-disable import/first */
import ToolsList from '~/components/ToolsList.vue';

export default {
  components: {
    ToolsList,
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
