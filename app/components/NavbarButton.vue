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

<style lang="scss">
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
    background-color: var(--navbar-background-color);
  }

  &.router-link-exact-active {
    font-weight: 700;
    color: var(--color-link);
    letter-spacing: var(--bold-letter-spacing);
  }
}
</style>
