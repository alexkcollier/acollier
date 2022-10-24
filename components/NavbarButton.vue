<template>
  <NuxtLink
    :to="href"
    exact
    class="navbar-button"
  >
    {{ text || $props.text }}
  </NuxtLink>
</template>

<script>
export default {
  name: 'NavbarButton',

  props: {
    href: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.navbar-button {
  color: var(--base-font-color);
  display: block;
  font-size: 1.25rem;
  line-height: 100%;
  padding: 1rem;
  text-decoration: none;

  &:hover {
    background-color: var(--navbar-background-color);
  }

  &.nuxt-link-exact-active {
    font-weight: 700;
    letter-spacing: var(--bold-letter-spacing);
  }
}
</style>
