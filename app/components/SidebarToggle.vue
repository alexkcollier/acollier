<script setup lang="ts">
import { useI18n } from '#imports';
import { useSidebar } from '~/composables/useSidebar';

defineProps<{
  isActive: boolean;
}>();

const { t } = useI18n();
const { toggle } = useSidebar();
</script>

<template>
  <button
    :class="['navbar-button', { 'sidebar-toggle--active': isActive }]"
    :aria-label="t('chat.sidebarToggle')"
    @click="toggle"
  >
    <Icon name="lucide:sparkles" />
  </button>
</template>

<style lang="scss">
.sidebar-toggle {
  transition: color 150ms ease;

  &--active,
  &--active:hover {
    color: var(--color-text-primary);
  }
}
</style>
