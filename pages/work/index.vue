<template>
  <main class="container">
    <h1 class="heading-1">
      Work
    </h1>

    <div class="post-grid">
      <PostItem
        v-for="post in content"
        :key="post.path"
        :title="post.title"
        :description="post.description"
        :href="post.path"
        :feature-image="post.featureImage"
      />
    </div>
  </main>
</template>

<script>
import PostItem from '~/components/PostItem.vue';

export default {
  components: {
    PostItem,
  },

  async asyncData ({ $content, route }) {
    const content = await $content(route.name)
      .only([
        'path',
        'title',
        'description',
        'featureImage',
      ])
      .fetch()
      // swallow errors
      // TODO: Design error/empty state in case this happens for some reason
      .catch(() => { });

    return {
      content,
    };
  },

  head () {
    return {
      title: 'Work',
    };
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
  //TODO: fix this naming
  margin-top: var(--work-spacing);
  row-gap: var(--work-spacing);

  @include bp.below('md') {
    grid-template-columns: 1fr 1fr;
  }

  @include bp.below('sm') {
    grid-template-columns: 1fr;
  }
}
</style>
