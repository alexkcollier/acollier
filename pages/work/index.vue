<template>
  <main class="container top-offset">
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
.post-grid {
  column-gap: 1rem;
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;
  //TODO: fix this naming
  margin-top: var(--work-spacing);
  row-gap: var(--work-spacing);

  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}
</style>
