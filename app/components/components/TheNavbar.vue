<script setup>
import { useI18n, useLocalePath, useSwitchLocalePath, computed, ref } from '#imports';

const { locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter(l => l.code !== locale.value);
});

const isMenuOpen = ref(false);

function setIsMenuOpen (isOpen) {
  isMenuOpen.value = isOpen;

  document.documentElement.style.overflowY = isOpen ? 'hidden' : 'auto';
}
</script>

<template>
  <nav
    role="primary navigation"
    class="navbar"
  >
    <div class="container">
      <button
        :class="[
          'navbar-button',
          'navbar__menu-button',
          { 'navbar__menu-button--open': isMenuOpen },
        ]"
        @click="() => setIsMenuOpen(!isMenuOpen)"
      />

      <div
        :class="[
          'navbar__button-wrapper',
          { 'navbar__button-wrapper--open': isMenuOpen },
        ]"
      >
        <NavbarButton
          v-for="({ href, key }) in links"
          :key="key"
          :href="localePath(href)"
          :text="$t(`navigation.${key}`)"
          @click="() => setIsMenuOpen(false)"
        />

        <NavbarButton
          v-for="({ code, name }) in availableLocales"
          :key="code"
          class="navbar__locale-switcher"
          :href="switchLocalePath(code)"
          :text="name"
          @click="() => setIsMenuOpen(false)"
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
  $transition-base-time: 100ms;

  backdrop-filter: blur(16px);
  background-color: var(--navbar-background-color);
  border-bottom: 1px solid #555;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;

  &__button-wrapper {
    align-items: stretch;
    display: none;
    flex-direction: column;

    &--open {
      display: flex;
      inset: 3.5rem 0 0;
      position: static;
    }
  }

  &__menu-button {
    --transition-time: #{$transition-base-time};
    --transform-transition-delay: 0ms;
    --top-transition-delay: #{$transition-base-time};
    --rotation: 0deg;

    display: flex;
    height: 3.5rem;
    margin-left: auto;
    position: relative;
    width: 3.5rem;

    &::before,
    &::after {
      border-bottom: 1px solid var(--base-font-color);
      content: '';
      left: 50%;
      margin: auto;
      position: absolute;
      top: calc(50% + var(--bar-offset));
      transform: translate(-50%, -50%) rotate(var(--rotation));
      transition:
        transform var(--transition-time) ease-in-out var(--transform-transition-delay),
        top var(--transition-time) ease-in-out var(--top-transition-delay);
      width: 1.5rem;
    }

    &::before {
      --bar-offset: -4px;
    }

    &::after {
      --bar-offset: 4px;
    }

    &--open {
      &::before,
      &::after {
        // having unit enables animating this variable properly
        --bar-offset: 0px;
        --transform-transition-delay: #{$transition-base-time};
        --top-transition-delay: 0ms;
      }

      &::before {
        --rotation: 45deg;
      }

      &::after {
        --rotation: -45deg;
      }
    }
  }

  @include bp.above('sm') {
    padding: 0 1rem;

    &__button-wrapper {
      display: flex;
      flex-direction: row;
    }

    &__locale-switcher {
      margin-left: auto;
    }

    &__menu-button {
      display: none;
      margin-left: auto;
    }
  }
}
</style>
