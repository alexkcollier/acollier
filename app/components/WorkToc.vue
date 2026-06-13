<script setup lang="ts">
import type { TocLink } from '@nuxt/content';
import { onMounted, onUnmounted, ref } from '#imports';

const props = defineProps<{
  links: TocLink[];
  /** The TOC depth */
  depth: number;
}>();

const activeId = ref<string | null>(null);
let observer: IntersectionObserver | null = null;
let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
const hasUserClicked = ref(false);

/**
 * Collects all heading IDs up to `remaining` levels deep.
 * @param links - TOC links to extract IDs from.
 * @param remaining - How many more levels to recurse; mirrors the configured TOC depth.
 */
function getAllIds(links: TocLink[], remaining: number): string[] {
  return remaining <= 0
    ? []
    : links.flatMap((l) => [
        l.id,
        ...getAllIds(l.children ?? [], remaining - 1),
      ]);
}

/** Interrupt the scrollspy and update active link on click */
function onLinkClick(id: string) {
  activeId.value = id;
  hasUserClicked.value = true;

  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  scrollTimeout = setTimeout(() => (hasUserClicked.value = false), 1000);
}

onMounted(() => {
  const ids = getAllIds(props.links, props.depth);
  const elements = ids
    .map((id) => document.getElementById(id))
    .filter((elem) => !!elem);

  observer = new IntersectionObserver(
    (entries) => {
      if (hasUserClicked.value) {
        return;
      }

      const visible = entries
        .filter((e) => e.isIntersecting)
        .map((e) => e.target.id);

      if (visible[0]) {
        activeId.value = visible[0];
      }
    },
    { rootMargin: '0px 0px -80% 0px' },
  );

  elements.forEach((el) => observer!.observe(el));
});

onUnmounted(() => {
  observer?.disconnect();

  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
});
</script>

<template>
  <nav>
    <ul class="toc__list">
      <li
        v-for="link in links"
        :key="link.id"
        class="toc__item"
      >
        <a
          :href="`#${link.id}`"
          :class="[
            'link',
            'toc__link',
            { 'toc__link--active': activeId === link.id },
          ]"
          @click="onLinkClick(link.id)"
        >
          {{ link.text }}
        </a>

        <ul
          v-if="link.children?.length"
          class="toc__list toc__list--nested"
        >
          <li
            v-for="child in link.children"
            :key="child.id"
            class="toc__item"
          >
            <a
              :href="`#${child.id}`"
              :class="[
                'link',
                'toc__link',
                { 'toc__link--active': activeId === child.id },
              ]"
              @click="onLinkClick(child.id)"
            >
              {{ child.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@use '~/assets/styles/utils/mixins';

.toc {
  &__list {
    @include mixins.unstyled-list;
  }

  &__list--nested {
    padding-block-start: var(--space-4);
    padding-inline-start: var(--space-4);
  }

  &__item {
    &:not(:last-child) {
      margin-block-end: var(--space-4);
    }
  }

  &__link {
    color: var(--color-text-muted);
    text-decoration: none;
    position: relative;
    transition: color 150ms ease-in-out;

    &--active,
    &:hover {
      color: var(--color-link);
    }

    &--active {
      font-weight: 700;

      &::before {
        animation: toc-marker-in 150ms ease-out both;
        background-color: currentColor;
        border-radius: var(--radius-full);
        content: '';
        display: inline-block;
        height: 0.75rem;
        width: 0.25rem;
      }

      @keyframes toc-marker-in {
        from {
          opacity: 0;
          margin-inline-end: 0;
          transform: scaleY(0);
        }
        to {
          opacity: 1;
          margin-inline-end: var(--space-3);
          transform: scaleY(1);
        }
      }
    }
  }
}
</style>
