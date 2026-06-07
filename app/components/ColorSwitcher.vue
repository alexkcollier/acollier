<script setup lang="ts">
import { ref, onMounted } from '#imports';

type Theme = 'light' | 'dark';

const theme = ref<Theme>('light');

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

onMounted(() => {
  const stored = localStorage.getItem('theme') as Theme | null;
  theme.value = stored ?? getSystemTheme();
  document.documentElement.dataset.theme = theme.value;
});

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme.value;
  localStorage.setItem('theme', theme.value);
}
</script>

<template>
  <button
    class="navbar-button"
    :aria-label="
      $t('colorSwitcher.switchToMode', {
        mode: $t(`colorSwitcher.${theme === 'light' ? 'dark' : 'light'}`),
      })
    "
    @click="toggleTheme"
  >
    {{ theme === 'light' ? '🌛' : '🌞' }}
  </button>
</template>
