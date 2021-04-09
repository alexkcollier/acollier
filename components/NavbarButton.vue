<template>
  <a
    :href="href"
    class="navbar-button"
  >
    {{ text || $props.text }}
  </a>
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
    background-color: rgba(10, 10, 10, 0.3);
  }
}
</style>
