<script setup lang="ts">
import { computed } from '#imports';

const props = defineProps<{
  index: number;
  title: string;
  description: string;
  href: string;
  featureImage: string;
  tags: string[];
}>();

const formattedIndex = computed(() => String(props.index + 1).padStart(2, '0'));

const formattedDescription = computed(() => {
  if (!props.description) return '';
  return props.description.endsWith('.') ? props.description : `${props.description}.`;
});
</script>

<template>
  <NuxtLink
    :to="href"
    class="work-list-item"
  >
    <span class="work-list-item__index">{{ formattedIndex }}</span>

    <NuxtImg
      :src="featureImage"
      class="work-list-item__image"
      :alt="formattedDescription"
      :title="title"
      :placeholder="[270, 169, 75, 4]"
      placeholder-class="work-list-item__image--placeholder"
    />

    <div class="work-list-item__content">
      <h2 class="work-list-item__title">{{ title }}</h2>
      <p class="work-list-item__description">{{ formattedDescription }}</p>
      <ul
        v-if="tags?.length"
        class="work-list-item__tags"
      >
        <li
          v-for="tag in tags"
          :key="tag"
        >
          <BaseChip>{{ tag }}</BaseChip>
        </li>
      </ul>
    </div>

    <span
      class="work-list-item__arrow"
      aria-hidden="true"
    >↗</span>
  </NuxtLink>
</template>

<style lang="scss">
@use '~/assets/styles/utils/breakpoints' as bp;

.work-list-item {
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-6) var(--space-1);
  text-decoration: none;
  transition: transform 220ms cubic-bezier(0.2, 0.6, 0.2, 1);

  &:hover {
    transform: translateX(6px);
  }

  &__index {
    color: var(--color-text-muted);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    letter-spacing: 0.1em;
  }

  &__image {
    aspect-ratio: 16 / 10;
    background-color: var(--color-bg-subtle);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    object-fit: cover;
    width: 100%;
  }

  &__image--placeholder {
    filter: blur(8px);
  }

  &__content {
    min-width: 0;
  }

  &__title {
    font-size: var(--text-2xl);
    font-weight: 700;
    letter-spacing: -0.016em;
    line-height: var(--leading-snug);
    margin: 0;
  }

  &__description {
    color: var(--color-text-muted);
    font-size: var(--text-base);
    line-height: var(--leading-normal);
    margin: var(--space-2) 0 0;
    max-width: 56ch;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    list-style: none;
    margin: var(--space-4) 0 0;
    padding: 0;
  }

  &__arrow {
    display: none;
  }

  @include bp.above('md') {
    align-items: center;
    flex-direction: row;
    gap: var(--space-8);
    padding: var(--space-8) var(--space-1);

    &__index {
      align-self: flex-start;
      flex: none;
      padding-top: var(--space-1);
    }

    &__image {
      flex: none;
      width: 270px;
    }

    &__content {
      flex: 1;
    }

    &__arrow {
      align-self: flex-start;
      color: var(--color-text-primary);
      display: block;
      flex: none;
      font-family: var(--font-mono);
      font-size: var(--text-lg);
      padding-top: var(--space-1);
    }
  }
}
</style>
