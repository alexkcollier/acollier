<script setup lang="ts">
import {
  useI18n,
  useLocalePath,
  useRoute,
  useAsyncData,
  definePageMeta,
  onMounted,
  onUnmounted,
  ref,
} from '#imports';
import type { Collections } from '@nuxt/content';

const progress = ref(0);

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = scrollable > 0 ? window.scrollY / scrollable : 0;
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
});

onUnmounted(() => window.removeEventListener('scroll', updateProgress));

const route = useRoute();
const { locale } = useI18n();
const localePath = useLocalePath();

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
  <div>
    <div
      class="reading-progress"
      :style="{ transform: `scaleX(${progress})` }"
    />

    <div class="container">
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

      <div class="content-container two-column">
        <main
          class="two-column__wide-col"
          style="margin-top: -3rem"
        >
          <NuxtLink
            :to="localePath('/work')"
            class="slug-back link"
          >
            <Icon name="lucide:arrow-left" />
            {{ $t('navigation.work') }}
          </NuxtLink>

          <div v-if="locale === 'fr'">
            {{ $t('common.postTranslationMissing') }}
          </div>

          <ContentRenderer
            v-if="doc"
            class="nuxt-content"
            :value="doc"
          />
        </main>

        <aside class="two-column__narrow-col sidebar">
          <section
            v-if="doc?.body?.toc?.links?.length"
            class="sidebar__section toc-sidebar"
          >
            <h2 class="heading-2">On this page</h2>

            <WorkToc
              :links="doc.body.toc.links"
              :depth="doc.body.toc.depth"
            />
          </section>

          <section
            v-if="doc?.tags?.length"
            class="sidebar__section"
          >
            <h2 class="heading-2">Tags</h2>
            <ul class="slug-tags">
              <li
                v-for="tag in doc.tags"
                :key="tag"
              >
                <BaseChip>{{ tag }}</BaseChip>
              </li>
            </ul>
          </section>

          <section
            v-if="doc?.tools && doc.tools.length"
            class="sidebar__section"
          >
            <h2 class="heading-2">Built with</h2>

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
@use '~/assets/styles/utils/breakpoints' as bp;

.reading-progress {
  background-color: var(--color-bg-accent);
  border-bottom-right-radius: var(--radius-full);
  border-top-right-radius: var(--radius-full);
  height: 4px;
  left: 0;
  position: fixed;
  right: 0;
  top: 68px;
  transform-origin: left;
  z-index: 1;
}

.content-container {
  margin-inline: auto;
  margin-block-start: var(--space-4);
  max-width: bp.$xl;
}

.slug-back {
  align-items: center;
  display: inline-flex;
  gap: var(--space-2);
  margin-block: var(--space-3) var(--space-2);
}

.slug-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  list-style: none;
  margin-block-start: 0;
  padding: 0;
}

.toc-sidebar {
  @include bp.below('md') {
    display: none;
  }
}

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
