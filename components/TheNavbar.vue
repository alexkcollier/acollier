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
  backdrop-filter: blur(16px);
  // TODO: Extract variable
  background-color: rgba(44, 44, 44, 0.1);
  border-bottom: 1px solid #555;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;
}
</style>
