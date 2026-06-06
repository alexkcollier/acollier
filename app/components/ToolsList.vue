<template>
  <ul class="tool-list">
    <li
      v-for="{ href, img, name } in tools"
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
          :src="img"
          :alt="name"
          :title="name"
          class="tool-list__image"
        />

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
  $space: 2rem;

  @include mixins.unstyled-list;

  align-items: flex-end;
  display: grid;
  gap: $space;
  grid-template-columns: 1fr 1fr 1fr;

  &__item {
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
