<script setup lang="ts">
defineProps({
  href: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <NuxtLink
    :to="href"
    exact
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

    &.router-link-exact-active {
      color: var(--color-link);
      font-weight: var(--font-weight-bold);
      letter-spacing: var(--letter-spacing-bold);
    }
  }
}
</style>
