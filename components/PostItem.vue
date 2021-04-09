<template>
  <article class="post-item">
    <NuxtLink
      :to="href"
      class="post-item__link"
    >
      <h1 class="heading-2 post-item__heading ">
        {{ title }}
      </h1>

      <!-- TODO: replace with `<img />`, preferably lazy load -->
      <div class="post-item__preview-image" />
    </NuxtLink>

    <p class="post-item__description">
      {{ formattedDescription }}

      <NuxtLink
        :to="href"
        class="link link--arrow"
      >
        Read more
      </NuxtLink>
    </p>
  </article>
</template>

<script>
export default {
  name: 'PostItem',

  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      required: true,
    },
  },

  computed: {
    formattedDescription () {
      if (!this.description) return '';

      return this.description.endsWith('.') ? this.description : `${this.description}.`;
    },
  },
};
</script>

<style lang="scss">
.post-item {
  $parent: &;
  $transition: all 100ms ease-in;

  &__link {
    color: var(--base-font-color);
    display: block;
    text-decoration: none;
    transition: $transition;

    &:active {
      transform: scale(102%);
    }

    &:hover {
      transform: scale(103%);
    }
  }

  &__preview-image {
    background-color: #777;
    border-radius: 0.5rem;
    height: 11rem;
    transition: $transition;
    width: 100%;
  }
}
</style>
