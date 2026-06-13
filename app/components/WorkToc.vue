<script setup lang="ts">
import type { TocLink } from '@nuxt/content';
import { computed, onMounted, onUnmounted, ref, watch } from '#imports';

const props = defineProps<{
  links: TocLink[];
  /** The TOC depth */
  depth: number;
}>();

const activeId = ref<string | null>(null);
const isDrawerOpen = ref(false);
let observer: IntersectionObserver | null = null;
let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
const hasUserClicked = ref(false);

const activeLink = computed(() => findLink(props.links, activeId.value));

/**
 * Recursively searches for a link by ID.
 * @param links - TOC links to search.
 * @param id - The heading ID to find.
 */
function findLink(links: TocLink[], id: string | null): TocLink | null {
  if (!id) {
    return null;
  }

  return (
    links.find((l) => l.id === id) ??
    findLink(
      links.flatMap((l) => l.children ?? []),
      id,
    )
  );
}

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
  isDrawerOpen.value = false;

  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  scrollTimeout = setTimeout(() => (hasUserClicked.value = false), 1000);
}

watch(isDrawerOpen, (open) => {
  document.documentElement.style.overflowY = open ? 'hidden' : 'auto';
});

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

  document.documentElement.style.overflowY = 'auto';
});
</script>

<template>
  <!-- Desktop: rendered in sidebar -->
  <nav class="toc__desktop">
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

  <!-- Mobile: FAB + bottom sheet, teleported out of sidebar -->
  <Teleport to="body">
    <div class="toc-mobile">
      <Transition name="toc-overlay">
        <div
          v-if="isDrawerOpen"
          class="toc-mobile__overlay"
          @click="isDrawerOpen = false"
        />
      </Transition>

      <Transition name="toc-sheet">
        <div
          v-if="isDrawerOpen"
          class="toc-mobile__sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Table of contents"
        >
          <div class="toc-mobile__header">
            <span>On this page</span>
            <button
              class="toc-mobile__close"
              aria-label="Close table of contents"
              @click="isDrawerOpen = false"
            >
              <Icon name="lucide:x" />
            </button>
          </div>

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
        </div>
      </Transition>

      <button
        class="toc-mobile__fab"
        :aria-label="`Table of contents${activeLink ? `: ${activeLink.text}` : ''}`"
        @click="isDrawerOpen = true"
      >
        <span class="toc-mobile__fab-label">{{
          activeLink?.text ?? 'On this page'
        }}</span>
        <Icon
          name="lucide:chevron-down"
          class="toc-mobile__fab-icon"
        />
      </button>
    </div>
  </Teleport>
</template>

<style lang="scss">
@use '~/assets/styles/utils/mixins';
@use '~/assets/styles/utils/breakpoints' as bp;

.toc {
  &__desktop {
    display: none;

    @include bp.above('md') {
      display: block;
    }
  }

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

.toc-mobile {
  @include bp.above('md') {
    display: none;
  }

  &__overlay {
    background-color: rgb(0 0 0 / 20%);
    backdrop-filter: blur(4px);
    inset: 0;
    position: fixed;
    z-index: 10;
  }

  &__sheet {
    background-color: var(--color-bg);
    border-top: 1px solid var(--color-border);
    bottom: 0;
    left: 0;
    max-height: 60dvh;
    overflow-y: auto;
    padding: var(--space-6);
    position: fixed;
    right: 0;
    z-index: 11;
  }

  &__header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-block-end: var(--space-6);
  }

  &__close {
    align-items: center;
    background: none;
    border: none;
    color: var(--color-text);
    cursor: pointer;
    display: flex;
    padding: var(--space-3);
  }

  &__fab {
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    bottom: var(--space-6);
    align-items: center;
    box-shadow: 0 2px 12px rgb(0 0 0 / 15%);
    color: var(--color-link);
    cursor: pointer;
    display: flex;
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 700;
    gap: var(--space-3);
    max-width: 70vw;
    padding: var(--space-3) var(--space-6);
    position: fixed;
    right: var(--space-8);
    z-index: 9;

    &-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-icon {
      flex-shrink: 0;
    }
  }
}

.toc-overlay-enter-active,
.toc-overlay-leave-active {
  transition: opacity 200ms ease;
}

.toc-overlay-enter-from,
.toc-overlay-leave-to {
  opacity: 0;
}

.toc-sheet-enter-active,
.toc-sheet-leave-active {
  transition: transform 250ms ease;
}

.toc-sheet-enter-from,
.toc-sheet-leave-to {
  transform: translateY(100%);
}
</style>
