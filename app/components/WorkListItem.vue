<script setup lang="ts">
import { computed } from '#imports';

const props = defineProps<{
  index: number;
  title: string;
  description: string;
  href: string;
  featureImage?: string;
  tags?: string[];
  variant?: 'compact' | 'mini';
}>();

const formattedIndex = computed(() => String(props.index + 1).padStart(2, '0'));

const formattedDescription = computed(() => {
  if (!props.description) return '';
  return props.description.endsWith('.')
    ? props.description
    : `${props.description}.`;
});
</script>

<template>
  <NuxtLink
    :to="href"
    :class="['work-list-item', variant && `work-list-item--${variant}`]"
  >
    <span class="work-list-item__index">{{ formattedIndex }}</span>

    <NuxtImg
      v-if="!variant"
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
      >↗</span
    >
  </NuxtLink>
</template>

<style lang="scss">
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
    transform: translateX(var(--space-4));
  }
}

.work-list-item__index {
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
}

.work-list-item__image {
  aspect-ratio: 16 / 10;
  background-color: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  object-fit: cover;
  width: 100%;
}

.work-list-item__image--placeholder {
  filter: blur(8px);
}

.work-list-item__content {
  min-width: 0;
}

.work-list-item__title {
  font-size: var(--text-2xl);
  font-weight: 700;
  letter-spacing: -0.016em;
  line-height: var(--leading-snug);
  margin: 0;
}

.work-list-item__description {
  color: var(--color-text-muted);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  margin: var(--space-2) 0 0;
  max-width: 56ch;
}

.work-list-item__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  list-style: none;
  margin: var(--space-4) 0 0;
  padding: 0;
}

.work-list-item__arrow {
  display: none;
}

.work-list-item:is(.work-list-item--compact, .work-list-item--mini) {
  .work-list-item__content {
    flex: 1;
  }
}

.work-list-item--compact {
  align-items: flex-start;
  background: transparent;
  flex-direction: row;
  gap: var(--space-4);
  padding: var(--space-4) 0;

  .work-list-item__index {
    flex: none;
    padding-top: 3px;
  }

  .work-list-item__title {
    font-size: var(--text-xl);
  }

  .work-list-item__arrow {
    align-self: flex-start;
    color: var(--color-text-primary);
    display: block;
    flex: none;
    font-family: var(--font-mono);
    font-size: var(--text-base);
    padding-top: 3px;
  }
}

.work-list-item--mini {
  align-items: flex-start;
  flex: 1 1 240px;
  flex-direction: row;
  gap: var(--space-2);
  max-width: 400px;
  padding: var(--space-3) 0;

  &:hover {
    transform: translateY(calc(-1 * var(--space-1)));
  }

  .work-list-item__index {
    display: none;
  }

  .work-list-item__title {
    font-size: var(--text-sm);
    letter-spacing: -0.01em;
  }

  .work-list-item__description {
    -webkit-box-orient: vertical;
    display: -webkit-box;
    font-size: var(--text-xs);
    -webkit-line-clamp: 2;
    line-clamp: 2;
    margin-top: var(--space-1);
    overflow: hidden;
  }
}

@container (width >= 480px) {
  .work-list-item:not(.work-list-item--mini) {
    align-items: center;
    flex-direction: row;
    gap: var(--space-8);
    padding: var(--space-8) var(--space-1);
  }
}

@container (width >= 480px) {
  .work-list-item__index {
    align-self: flex-start;
    flex: none;
    padding-top: var(--space-1);
  }
}

@container (width >= 480px) {
  .work-list-item__image {
    flex: none;
    width: 180px;
  }
}

@container (width >= 480px) {
  .work-list-item__content {
    flex: 1;
  }
}

@container (width >= 480px) {
  .work-list-item:not(.work-list-item--mini) .work-list-item__arrow {
    align-self: flex-start;
    color: var(--color-text-primary);
    display: block;
    flex: none;
    font-family: var(--font-mono);
    font-size: var(--text-lg);
    padding-top: var(--space-1);
  }
}

@container (width >= 768px) {
  .work-list-item__image {
    width: 270px;
  }
}

@container (width >= 1200px) {
  .work-list-item__image {
    display: block;
  }
}
</style>
