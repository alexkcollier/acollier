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
  computed,
} from '#imports';
import type { Collections } from '@nuxt/content';

const progress = ref(0);
let contentEl: Element | null = null;

function updateProgress() {
  if (contentEl && contentEl.scrollHeight > contentEl.clientHeight) {
    const scrollable = contentEl.scrollHeight - contentEl.clientHeight;
    progress.value = scrollable > 0 ? contentEl.scrollTop / scrollable : 0;
  } else {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    progress.value = scrollable > 0 ? window.scrollY / scrollable : 0;
  }
}

onMounted(() => {
  contentEl = document.querySelector('.content');
  contentEl?.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
});

onUnmounted(() => {
  contentEl?.removeEventListener('scroll', updateProgress);
  window.removeEventListener('scroll', updateProgress);
});

const route = useRoute();
const { locale } = useI18n();
const localePath = useLocalePath();

const slug = computed(() =>
  Array.isArray(route.params.slug)
    ? route.params.slug.join('/')
    : route.params.slug,
);

const { data: page } = await useAsyncData(
  `page-${slug.value}`,
  async () => {
    const query = (collection: keyof Collections) =>
      queryCollection(collection).path(`/work/${slug.value}`).first();

    const content = await query(`work_${locale.value}` as keyof Collections);

    // Fallback if language not available
    if (!content && locale.value !== 'en') {
      return { doc: await query('work_en'), isFallback: true };
    }

    return { doc: content, isFallback: false };
  },
  { watch: [locale, slug] },
);

const doc = computed(() => page.value?.doc);
const isFallback = computed(() => page.value?.isFallback ?? false);

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

          <div v-if="isFallback">
            {{ $t('common.postTranslationMissing') }}
          </div>

          <ContentRenderer
            v-if="doc"
            class="nuxt-content"
            :value="doc"
          />

          <section v-if="doc?.tools && doc.tools.length">
            <h2 class="heading-2 built-with-section">
              {{ $t('work.builtWith') }}
            </h2>

            <ToolsList :tools="doc.tools" />
          </section>
        </main>

        <aside class="two-column__narrow-col sidebar toc-sidebar">
          <section
            v-if="doc?.body?.toc?.links?.length"
            class="sidebar__section"
          >
            <h2 class="heading-2">{{ $t('work.onThisPage') }}</h2>

            <WorkToc
              :links="doc.body.toc.links"
              :depth="doc.body.toc.depth"
            />
          </section>

          <section
            v-if="doc?.links && doc.links.length"
            class="sidebar__section work-links"
          >
            <h2 class="heading-2">{{ $t('work.links') }}</h2>

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
  margin-block-start: var(--space-4);
  margin-inline: auto;
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
  top: 0;

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

.built-with-section:first-child {
  margin-top: var(--space-8);
}
</style>
