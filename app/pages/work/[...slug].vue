<script setup lang="ts">
import { useI18n, useRoute, useAsyncData, definePageMeta } from '#imports';
import type { Collections } from '@nuxt/content';

const route = useRoute();
const { locale } = useI18n();

const slug = computed(() =>
  Array.isArray(route.params.slug)
    ? route.params.slug.join('/')
    : route.params.slug,
);

const { data: doc } = await useAsyncData(
  `page-${slug.value}`,
  async () => {
    const query = (collection: keyof Collections) =>
      queryCollection(collection).path(`/work/${slug.value}`).first();

    const content = await query(`work_${locale.value}` as keyof Collections);

    // Fallback if language not available
    if (!content && locale.value !== 'en') {
      return await query('work_en');
    }

    return content;
  },
  { watch: [locale, slug] },
);

definePageMeta({
  i18n: {
    paths: {
      en: '/work/[slug]',
      fr: '/projets/[slug]',
    },
  },
});
</script>

<template>
  <div class="container">
    <div v-if="locale === 'fr'">
      {{ $t('common.postTranslationMissing') }}
    </div>

    <Head>
      <Title>{{ doc?.title }}</Title>
      <Meta
        hid="description"
        name="description"
        :content="doc?.description"
      />
      <Meta
        hid="og:title"
        property="og:title"
        :content="doc?.title"
      />
      <Meta
        hid="og:description"
        property="og:description"
        :content="doc?.description"
      />
      <Meta
        hid="twitter:title"
        name="twitter:title"
        :content="doc?.title"
      />
      <Meta
        hid="twitter:description"
        name="twitter:description"
        :content="doc?.description"
      />
    </Head>

    <div class="two-column">
      <main class="two-column__wide-col">
        <ContentRenderer
          v-if="doc"
          class="nuxt-content"
          :value="doc"
        />
      </main>

      <aside class="two-column__narrow-col sidebar">
        <section
          v-if="doc?.body?.toc?.links?.length"
          class="sidebar__section"
        >
          <h2 class="heading-1">Contents</h2>

          <WorkToc :links="doc.body.toc.links" />
        </section>

        <section
          v-if="doc?.tools && doc.tools.length"
          class="sidebar__section"
        >
          <h2 class="heading-1">Built with</h2>

          <ToolsList :tools="doc.tools" />
        </section>

        <section
          v-if="doc?.links && doc.links.length"
          class="sidebar__section work-links"
        >
          <h2 class="heading-1">Links</h2>

          <ul class="work-links__list">
            <li
              v-for="{ href, title } in doc.links"
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
  </div>
</template>

<script lang="ts">
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
      margin-bottom: var(--space-6);
    }
  }
}
</style>
