<script setup>
import { useI18n, useLocalePath, useSwitchLocalePath, computed } from '#imports';

const { locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter(l => l.code !== locale.value);
});
</script>

<template>
  <nav
    role="primary navigation"
    class="navbar"
  >
    <div class="container">
      <div class="navbar__button-wrapper">
        <NavbarButton
          v-for="({ href, key }) in links"
          :key="key"
          :href="localePath(href)"
          :text="$t(`navigation.${key}`)"
        />

        <NavbarButton
          v-for="({ code, name }) in availableLocales"
          :key="code"
          :href="switchLocalePath(code)"
          :text="name"
        />
      </div>
    </div>
  </nav>
</template>

<script>
/* eslint-disable import/first */
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
@use '~/assets/styles/utils/breakpoints' as bp;

.navbar {
  backdrop-filter: blur(16px);
  background-color: var(--navbar-background-color);
  border-bottom: 1px solid #555;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;

  &__button-wrapper {
    display: flex;
  }

  @include bp.above('sm') {
    padding: 0 1rem;
  }
}
</style>
