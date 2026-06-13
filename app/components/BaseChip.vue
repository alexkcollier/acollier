<template>
  <span class="base-chip">
    <slot />
  </span>
</template>

<style lang="scss">
.base-chip {
  background-color: var(--color-bg-subtle);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  line-height: 1;
  padding: var(--space-2) var(--space-3);
}
</style>
