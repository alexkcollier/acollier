<script setup lang="ts">
import {
  useRouteBaseName,
  useRoute,
  useAsyncData,
  queryCollection,
  definePageMeta,
  useI18n,
  useLocalePath,
  computed,
} from '#imports';
import type { Collections } from '@nuxt/content';

const route = useRoute();
const routeBaseName = useRouteBaseName();
const { locale } = useI18n();
const localePath = useLocalePath();
const baseRouteName = computed(() =>
  String(routeBaseName(route.name as string)),
);

// TODO: #26 Design error/empty state in case this happens for some reason
const { data: content } = await useAsyncData(route.path, async () => {
  const queryAll = (collection: keyof Collections) =>
    queryCollection(collection)
      .order('order', 'ASC')
      .order('title', 'ASC')
      .all();

  const fallbackCollection = `${baseRouteName.value}_en` as keyof Collections;

  return queryAll(fallbackCollection);
});

definePageMeta({
  i18n: {
    paths: {
      en: '/work',
      fr: '/projets',
    },
  },
});
</script>

<template>
  <main class="container container--narrow">
    <Head>
      <Title>
        {{ $t('work.metaTitle') }}
      </Title>
    </Head>

    <div class="work-heading">
      <h1 class="heading-1">
        {{ $t('work.mainHeading') }}
      </h1>

      <div
        v-if="locale === 'fr'"
        class="missing-translation"
      >
        {{ $t('common.translationMissing') }}
      </div>
    </div>

    <div class="work-list">
      <WorkListItem
        v-for="(post, index) in content"
        :key="post.id"
        :index="index"
        :title="post.title"
        :description="post.description"
        :href="localePath(post.path)"
        :feature-image="post.featureImage"
        :tags="post.tags"
      />
    </div>
  </main>
</template>

<script lang="ts">
import WorkListItem from '~/components/WorkListItem.vue';

export default {
  components: {
    WorkListItem,
  },
};
</script>

<style lang="scss">
.work-heading {
  margin-bottom: var(--heading-1-bottom-margin);

  .heading-1 {
    margin-bottom: 0;
  }

  .missing-translation {
    margin-top: var(--space-2);
  }
}

.work-list {
  border-top: 1px solid var(--color-border);
}
</style>
