<template>
  <ul class="tool-list">
    <li
      v-for="({ href, img, name}) in tools"
      :key="name"
      class="tool-list__item"
    >
      <a
        :href="href"
        target="_blank"
        rel="nofollow"
      >
        <img
          :src="img"
          :alt="name"
          :title="name"
          class="tool-list__image"
        >
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ToolsList',

  props: {
    tools: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.tool-list {
  // manual gap since `gap` isn't supported for flexbox on Safari
  $space: 0.5rem;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style: none;
  margin: -1 * $space;
  padding-left: 0;

  &__item {
    flex-basis: 1 0 25%;
    margin: $space;
    text-align: center;
  }

  &__image {
    width: 4rem;
  }
}
</style>
