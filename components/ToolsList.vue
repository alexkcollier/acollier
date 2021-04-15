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
        class="tool-list__link"
      >
        <img
          v-lazy="img"
          :alt="name"
          :title="name"
          class="tool-list__image"
        >

        <span class="tool-list__link-text">
          {{ name }}
        </span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ToolsList',

  props: {
    tools: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@use '~/assets/styles/utils/mixins';

.tool-list {
  // manual gap since `gap` isn't supported for flexbox on Safari
  $space: 1rem;

  @include mixins.unstyled-list;

  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  margin: -1 * $space;

  &__item {
    flex-basis: 1 0 auto;
    margin: $space;
    text-align: center;
  }

  &__image {
    display: block;
    margin: 0 auto;
    max-height: 3rem;
    width: 3rem;
  }

  &__link {
    color: var(--base-font-color);
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    text-decoration: none;
  }

  &__link-text {
    margin-top: 0.5rem;
  }
}
</style>
