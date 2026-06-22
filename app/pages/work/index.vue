<script setup lang="ts">
import {
  useRoute,
  useAsyncData,
  queryCollection,
  definePageMeta,
  useI18n,
  useLocalePath,
} from '#imports';
import type { Collections } from '@nuxt/content';

const route = useRoute();
const { locale } = useI18n();
const localePath = useLocalePath();

// TODO: #26 Design error/empty state in case this happens for some reason
const { data: content } = await useAsyncData(
  route.path,
  async () => {
    const queryAll = (collection: keyof Collections) =>
      queryCollection(collection)
        .order('order', 'ASC')
        .order('title', 'ASC')
        .all();

    const results = await queryAll(`work_${locale.value}` as keyof Collections);

    if (!results?.length && locale.value !== 'en') {
      return queryAll('work_en');
    }

    return results;
  },
  { watch: [locale] },
);

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

    <h1 class="heading-1">
      {{ $t('work.mainHeading') }}
    </h1>

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
.work-list {
  border-top: 1px solid var(--color-border);
}
</style>
