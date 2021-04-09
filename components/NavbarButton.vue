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
  display: inline-block;
  font-size: 1.5rem;
  line-height: 100%;
  padding: 1rem;
  text-decoration: none;

  &:hover {
    // TODO: Extract variable, refine
    background-color: rgba(44, 44, 44, 0.45);
  }

  &.nuxt-link-exact-active {
    font-weight: 700;
  }
}
</style>
