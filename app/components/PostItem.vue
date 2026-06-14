<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  href: string;
  featureImage: string;
  tags: string[];
}>();

const formattedDescription = computed(() => {
  if (!props.description) {
    return '';
  }

  return props.description.endsWith('.')
    ? props.description
    : `${props.description}.`;
});
</script>

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
        :placeholder="[100, 50, 75, 4]"
        placeholder-class="post-item__preview-image--placeholder"
        height="400"
      />
    </NuxtLink>

    <div class="post-item__footer">
      <ul
        v-if="tags?.length"
        class="post-item__tags"
      >
        <li
          v-for="tag in tags"
          :key="tag"
        >
          <BaseChip>{{ tag }}</BaseChip>
        </li>
      </ul>

      <p class="post-item__description">
        {{ formattedDescription }}

        <NuxtLink
          :to="href"
          class="link link--arrow"
        >
          Read more
        </NuxtLink>
      </p>
    </div>
  </article>
</template>

<style lang="scss">
@use '~/assets/styles/utils/breakpoints' as bp;

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

  &__footer {
    margin-top: var(--space-4);
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    list-style: none;
    margin-block-start: var(--space-6);
    padding: 0;
  }

  &__preview-image {
    background-color: var(--color-bg-subtle);
    border-radius: var(--radius-md);
    box-shadow: 0 4px 4px rgb(0 0 0 / 20%);
    height: 260px;
    object-fit: cover;
    transition: $transition;
    width: 100%;

    @include bp.above('sm') {
      height: 360px;
    }

    @include bp.above('md') {
      height: 260px;
    }

    @include bp.above('lg') {
      height: 300px;
    }

    @include bp.above('xl') {
      height: 400px;
    }
  }

  &__preview-image--placeholder {
    filter: blur(8px);
  }
}
</style>
