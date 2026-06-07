<template>
  <article class="post-item">
    <NuxtLink
      :to="href"
      class="post-item__link"
    >
      <h1 class="heading-2 post-item__heading">
        {{ title }}
      </h1>

      <NuxtImg
        :src="featureImage"
        class="post-item__preview-image"
        :alt="formattedDescription"
        :title="title"
        :placeholder="60"
        height="300"
      />
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
    featureImage: {
      type: String,
      required: true,
    },
  },

  computed: {
    formattedDescription() {
      if (!this.description) return '';

      return this.description.endsWith('.')
        ? this.description
        : `${this.description}.`;
    },
  },
};
</script>

<style lang="scss">
.post-item {
  $parent: &;
  $transition: all 100ms ease-in;

  margin-bottom: var(--space-12);

  &__link {
    color: var(--color-text);
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
    background-color: var(--color-bg-subtle);
    border-radius: var(--radius-md);
    box-shadow: 0 4px 4px rgb(0 0 0 / 20%);
    height: 300px;
    object-fit: cover;
    transition: $transition;
    width: 100%;
  }
}
</style>
