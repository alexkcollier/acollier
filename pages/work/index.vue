
<script setup>
const route = useRoute();
// TODO: #26 Design error/empty state in case this happens for some reason
const { data: content } = await useAsyncData('get-posts', () => {
  return queryContent(route.name)
    .sort({ title: -1 })
    .find();
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

    <h1 class="heading-1">
      {{ $t('work.mainHeading') }}
    </h1>

    <div class="post-grid">
      <PostItem
        v-for="post in content"
        :key="post._id"
        :title="post.title"
        :description="post.description"
        :href="post._path"
        :feature-image="post.featureImage"
      />
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
