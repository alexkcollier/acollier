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
    background-color: var(--navbar-background-color);
    color: var(--color-link-hover);
  }

  &.router-link-exact-active {
    color: var(--color-link);
    font-weight: 700;
    letter-spacing: var(--bold-letter-spacing);
  }
}
</style>
