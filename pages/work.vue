<template>
  <main class="container top-offset">
    <h1 class="heading-1">
      Work
    </h1>

    <div class="post-grid">
      <PostItem
        v-for="i in 5"
        :key="i"
        :title="`Portfolio item ${i}`"
        :description="`Description for item ${i}`"
        href="/work/"
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
