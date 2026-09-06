<script setup lang="ts">
import { ref, onMounted } from '#imports';

type Theme = 'light' | 'dark';

const theme = ref<Theme>('light');
const mounted = ref(false);

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem('theme');
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

onMounted(() => {
  theme.value = getStoredTheme() ?? getSystemTheme();
  document.documentElement.dataset.theme = theme.value;
  mounted.value = true;
});

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme.value;
  try {
    localStorage.setItem('theme', theme.value);
  } catch {
    // Ignore — privacy modes that block localStorage still let the toggle
    // work for the rest of the session.
  }
}
</script>

<template>
  <button
    class="navbar-button color-switcher"
    :aria-label="
      $t('colorSwitcher.switchToMode', {
        mode: $t(`colorSwitcher.${theme === 'light' ? 'dark' : 'light'}`),
      })
    "
    @click="toggleTheme"
  >
    <Icon
      v-if="mounted"
      :name="theme === 'light' ? 'lucide:moon' : 'lucide:sun'"
    />
    <span
      v-else
      class="color-switcher__placeholder"
      aria-hidden="true"
    ></span>
  </button>
</template>

<style>
@layer block {
  .color-switcher__placeholder {
    display: inline-block;
    height: 1em;
    width: 1em;
  }
}
</style>
