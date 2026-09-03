<template>
  <ul class="tool-list list-bare">
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

        <span class="tool-list__link-text font-mono">
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

<style>
@layer block {
  .tool-list {
    --column-number: 3;

    align-items: flex-end;
    display: grid;
    gap: var(--space-8);
    grid-template-columns: repeat(var(--column-number), 1fr);

    &:not(:last-child) {
      margin-bottom: inherit;
    }

    @container (width >= 768px) {
      --column-number: 6;
    }
  }

  .tool-list__item {
    text-align: center;
  }

  .tool-list__image {
    display: block;
    margin: 0 auto;
    max-height: 3rem;
    width: 3rem;
  }

  .tool-list__link {
    color: var(--color-text);
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    text-decoration: none;
  }

  .tool-list__link-text {
    font-size: var(--text-sm);
    margin-top: 0.5rem;
  }
}
</style>
