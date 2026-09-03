<script setup lang="ts">
import NavbarButton from '~/components/NavbarButton.vue';
import ColorSwitcher from '~/components/ColorSwitcher.vue';
import SidebarToggle from '~/components/SidebarToggle.vue';
import { useSidebar } from '~/composables/useSidebar';
import links from '~/assets/data/navbar-links';
import {
  useI18n,
  useLocalePath,
  useSwitchLocalePath,
  useRoute,
  useTemplateRef,
  nextTick,
  computed,
  onMounted,
  onUnmounted,
  ref,
} from '#imports';

const { locale, locales } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const isHome = computed(() => route.path === localePath('/'));

const availableLocales = computed(() => {
  return locales.value.filter((l) => l.code !== locale.value);
});

const { isCollapsed, isMobileOpen } = useSidebar();

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
    resetMenu();
  }
}

function resetMenu() {
  isMenuOpen.value = false;
  document.documentElement.style.overflowY = 'auto';
  document.removeEventListener('click', handleClickOutside);
}

onMounted(() => window.addEventListener('resize', resetMenu));
onUnmounted(() => window.removeEventListener('resize', resetMenu));
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

    <div class="navbar__mobile-controls">
      <SidebarToggle
        v-if="!isHome"
        class="navbar__sidebar-toggle--mobile"
        :is-active="isMobileOpen"
      />

      <button
        class="navbar-button navbar__menu-button"
        aria-controls="navbar-menu"
        :aria-expanded="isMenuOpen"
        @click.stop="() => setIsMenuOpen(!isMenuOpen)"
      />
    </div>

    <div
      id="navbar-menu"
      ref="menuRef"
      class="navbar__button-wrapper"
      :data-open="isMenuOpen"
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

        <SidebarToggle
          v-if="!isHome"
          class="navbar__sidebar-toggle--desktop"
          :is-active="!isCollapsed"
        />
      </div>
    </div>
  </nav>
</template>

<style>
@layer block {
  .navbar {
    align-items: stretch;
    backdrop-filter: blur(16px);
    background-color: rgb(from var(--color-bg) r g b / 50%);
    border-bottom: 1px solid var(--color-border);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: var(--z-nav);

    @media screen and (width > 768px) {
      padding: 0 var(--space-4);
    }
  }

  .navbar__button-wrapper {
    align-items: stretch;
    display: none;
    flex-basis: 100%;
    flex-direction: column;
    opacity: 0;
    transition:
      display var(--duration-fast) allow-discrete,
      opacity var(--duration-fast);
  }

  .navbar__mobile-controls {
    display: flex;
    margin-left: auto;
  }

  .navbar__sidebar-toggle--mobile {
    display: flex;
  }

  .navbar__sidebar-toggle--desktop {
    display: none;
  }

  .navbar__menu-button {
    --transform-transition-delay: 0ms;
    --top-transition-delay: var(--duration-fast);
    --rotation: 0deg;

    display: flex;
    position: relative;
    width: 3rem;

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
        transform var(--duration-fast) ease-in-out
          var(--transform-transition-delay),
        top var(--duration-fast) ease-in-out var(--top-transition-delay);
      width: 1rem;
    }

    &::before {
      --bar-offset: -4px;
    }

    &::after {
      --bar-offset: 4px;
    }
  }

  .navbar__locale-switcher {
    text-transform: uppercase;
  }

  .navbar-brand__name {
    color: var(--color-text);
    font-weight: var(--font-weight-bold);
    margin-block-end: var(--space-1);
  }

  .navbar-brand__title {
    color: var(--color-text);
    font-weight: var(--font-weight-light);
  }

  .navbar-divider {
    align-items: center;
    display: none;
    padding-left: var(--space-2);
    padding-right: var(--space-2);
    pointer-events: none;

    @media screen and (width > 768px) {
      display: flex;
    }
  }

  .navbar-utils {
    display: flex;
    justify-content: space-between;

    @media screen and (width > 768px) {
      justify-content: flex-start;
    }
  }

  @media screen and (width > 768px) {
    .navbar__button-wrapper {
      display: flex;
      flex-basis: auto;
      flex-direction: row;
      opacity: 1;
    }
  }

  @media screen and (width > 768px) {
    .navbar__menu-button {
      display: none;
      margin-left: auto;
    }
  }

  @media screen and (width > 768px) {
    .navbar__sidebar-toggle--mobile {
      display: none;
    }
  }

  @media screen and (width > 768px) {
    .navbar__sidebar-toggle--desktop {
      display: flex;
    }
  }
}

@layer exception {
  .navbar__button-wrapper[data-open='true'] {
    display: flex;
    inset: 3.5rem 0 0;
    opacity: 1;
    position: static;

    @starting-style {
      opacity: 0;
    }
  }

  .navbar__menu-button[aria-expanded='true'] {
    &::before,
    &::after {
      /* having unit enables animating this variable properly */
      --bar-offset: 0px;
      --transform-transition-delay: var(--duration-fast);
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
</style>
