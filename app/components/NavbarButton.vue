<script setup lang="ts">
import { computed, useRoute } from '#imports';

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
  /** Match this path only, not the section under it. For the brand link. */
  exact: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();

/**
 * Whether this link owns the page being viewed.
 *
 * `router-link-exact-active` can't answer this: Nuxt generates `/work` and
 * `/work/:slug(.*)*` as sibling route records rather than parent and child,
 * so a case study leaves every navbar link inactive. Compare paths instead,
 * and treat a link as current for its whole section.
 */
const isCurrent = computed(() => {
  const href = props.href.replace(/\/$/, '');
  const path = route.path.replace(/\/$/, '');

  // The site root is always exact — every path starts with it.
  if (props.exact || href === '') {
    return path === href;
  }

  return path === href || path.startsWith(`${href}/`);
});
</script>

<template>
  <NuxtLink
    :to="href"
    :aria-current="isCurrent ? 'page' : undefined"
    class="navbar-button"
  >
    <slot />
  </NuxtLink>
</template>

<style>
@layer block {
  .navbar-button {
    color: var(--color-text);
    display: flex;
    flex-direction: column;
    font-size: var(--text-base);
    justify-content: center;
    line-height: 100%;
    padding: var(--space-4);
    text-decoration: none;

    &:hover {
      color: var(--color-link-hover);
    }
  }
}

@layer exception {
  .navbar-button[aria-current='page'] {
    color: var(--color-link);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--letter-spacing-bold);
  }
}
</style>
