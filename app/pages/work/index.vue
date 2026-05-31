<script setup>
import {
  useRouteBaseName,
  useRoute,
  useAsyncData,
  queryCollection,
  defineI18nRoute,
  useI18n,
  useLocalePath,
  computed,
} from '#imports';

const route = useRoute()
const routeBaseName = useRouteBaseName();
const { locale } = useI18n();
const localePath = useLocalePath();
const baseRouteName = computed(() => routeBaseName(route.name));

// TODO: #26 Design error/empty state in case this happens for some reason
const { data: content } = await useAsyncData(route.path, () => {
  return queryCollection(baseRouteName.value)
    .order('title', 'DESC')
    .all();
});


defineI18nRoute({
  paths: {
    en: '/work',
    fr: '/portfolio',
  },
});

</script>

<template>
  <main class="container">

    <Head>
      <Title>
        {{ $t('work.metaTitle') }}
      </Title>
    </Head>

    <div class="work-heading">
      <h1 class="heading-1">
        {{ $t('work.mainHeading') }}
      </h1>

      <div v-if="locale === 'fr'" class="missing-translation">
        {{ $t('common.translationMissing') }}
      </div>
    </div>

    <div class="post-grid">
      <PostItem v-for="post in content" :key="post._id" :title="post.title" :description="post.description"
        :href="localePath(post.path)" :feature-image="post.featureImage" />
    </div>
  </main>
</template>

<script>
/* eslint-disable import/first */
import PostItem from '~/components/PostItem.vue';

export default {
  components: {
    PostItem,
  },
};
</script>

<style lang="scss">
@use '~/assets/styles/utils/breakpoints' as bp;

.work-heading {
  margin-bottom: var(--heading-1-bottom-margin);

  .heading-1 {
    margin-bottom: 0;
  }

  .missing-translation {
    margin-top: 0.5rem;
  }
}

.post-grid {
  column-gap: 1rem;
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;

  @include bp.below('md') {
    grid-template-columns: 1fr 1fr;
  }

  @include bp.below('sm') {
    grid-template-columns: 1fr;
  }
}
</style>
