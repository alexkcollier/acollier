<template>
  <div class="no-spacing-layout">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
@layer block {
  .no-spacing-layout {
    height: 100%;
  }

  .content {
    height: 100%;
  }
}
</style>
