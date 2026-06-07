<script setup lang="ts">
import NavbarButton from '~/components/NavbarButton.vue';
import ColorSwitcher from '~/components/ColorSwitcher.vue';
import links from '~/assets/data/navbar-links';
import {
  useI18n,
  useLocalePath,
  useSwitchLocalePath,
  useTemplateRef,
  nextTick,
  computed,
  ref,
} from '#imports';

const { locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter((l) => l.code !== locale.value);
});

const isMenuOpen = ref(false);
const menuRef = useTemplateRef<HTMLElement>('menuRef');

function setIsMenuOpen(isOpen: boolean) {
  isMenuOpen.value = isOpen;

  nextTick(() => {
    document.documentElement.style.overflowY = isOpen ? 'hidden' : 'auto';

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
  });
}

function handleClickOutside(event: MouseEvent) {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    isMenuOpen.value = false;
  }
}
</script>

<template>
  <nav
    role="primary navigation"
    class="navbar"
  >
    <NavbarButton
      :href="localePath('/')"
      class="navbar-brand"
    >
      <div class="navbar-brand__name">{{ $t('common.name') }}</div>
      <div class="navbar-brand__title">{{ $t('common.title') }}</div>
    </NavbarButton>

    <button
      :class="[
        'navbar-button',
        'navbar__menu-button',
        { 'navbar__menu-button--open': isMenuOpen },
      ]"
      @click.stop="() => setIsMenuOpen(!isMenuOpen)"
    />

    <div
      ref="menuRef"
      :class="[
        'navbar__button-wrapper',
        { 'navbar__button-wrapper--open': isMenuOpen },
      ]"
    >
      <NavbarButton
        v-for="{ href, key } in links"
        :key="key"
        :href="localePath(href)"
        @click="() => setIsMenuOpen(false)"
      >
        {{ $t(`navigation.${key}`) }}
      </NavbarButton>

      <div
        class="navbar-divider"
        aria-hidden
      >
        |
      </div>

      <div class="navbar-utils">
        <NavbarButton
          v-for="{ code } in availableLocales"
          :key="code"
          class="navbar__locale-switcher"
          :href="switchLocalePath(code)"
          @click="() => setIsMenuOpen(false)"
        >
          {{ code }}
        </NavbarButton>

        <ColorSwitcher />
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
@use '~/assets/styles/utils/breakpoints' as bp;

.navbar {
  --transition-time: 100ms;

  align-items: stretch;
  backdrop-filter: blur(16px);
  background-color: var(--navbar-background-color);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;

  &__button-wrapper {
    align-items: stretch;
    display: none;
    flex-basis: 100%;
    flex-direction: column;
    opacity: 0;
    transition:
      display var(--transition-time) allow-discrete,
      opacity var(--transition-time);

    &--open {
      display: flex;
      inset: 3.5rem 0 0;
      opacity: 1;
      position: static;

      @starting-style {
        opacity: 0;
      }
    }
  }

  &__menu-button {
    --transform-transition-delay: 0ms;
    --top-transition-delay: var(--transition-time);
    --rotation: 0deg;

    display: flex;
    margin-left: auto;
    position: relative;
    width: 3.5rem;

    &::before,
    &::after {
      border-bottom: 1px solid var(--color-text);
      content: '';
      left: 50%;
      margin: auto;
      position: absolute;
      top: calc(50% + var(--bar-offset));
      transform: translate(-50%, -50%) rotate(var(--rotation));
      transition:
        transform var(--transition-time) ease-in-out
          var(--transform-transition-delay),
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
        --transform-transition-delay: var(--transition-time);
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
    padding: 0 var(--space-4);

    &__button-wrapper {
      display: flex;
      flex-basis: auto;
      flex-direction: row;
      opacity: 1;
    }

    &__locale-switcher {
      margin-left: auto;
      text-transform: uppercase;
    }

    &__menu-button {
      display: none;
      margin-left: auto;
    }
  }
}

.navbar-brand {
  &__name {
    color: var(--color-text);
    font-weight: 700;
    margin-block-end: var(--space-1);
  }

  &__title {
    color: var(--color-text);
    font-family: var(--font-mono);
    font-weight: 300;
  }
}

.navbar-divider {
  align-items: center;
  color: var(--color-text-muted);
  display: none;
  padding-left: var(--space-2);
  padding-right: var(--space-2);
  pointer-events: none;

  @include bp.above('sm') {
    display: flex;
  }
}

.navbar-utils {
  display: flex;
  justify-content: space-between;

  @include bp.above('sm') {
    justify-content: flex-start;
  }
}
</style>
