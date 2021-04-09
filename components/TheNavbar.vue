<template>
  <nav
    role="primary navigation"
    class="navbar"
  >
    <div class="container">
      <div class="navbar__button-wrapper">
        <NavbarButton
          v-for="({ href, text }) in links"
          :key="text"
          :href="href"
          :text="text"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import NavbarButton from '~/components/NavbarButton.vue';
import links from '~/assets/data/navbar-links';

export default {
  name: 'TheNavbar',

  components: {
    NavbarButton,
  },

  data () {
    return {
      links,
    };
  },
};
</script>

<style lang="scss">
.navbar {
  // TODO: get rid of "magic" numbers
  // use negative margin to ensure navbar doesn't contribute to page height
  // 1.5rem is button font size with 100% line-height, 2rem is top + bottom padding, 1px is border
  margin-bottom: calc(-1 * (1.5rem + 2rem + 1px));
  position: sticky;
  top: 0;

  &__button-wrapper {
    backdrop-filter: blur(16px);
    // TODO: Extract variable
    background-color: rgba(44, 44, 44, 0.1);
    border-bottom: 1px solid var(--base-font-color);
    display: inline-block;
  }
}
</style>
