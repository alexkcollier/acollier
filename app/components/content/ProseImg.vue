<script setup lang="ts">
const targetId = useId();
const dialogEl = ref<HTMLDialogElement | null>(null);
</script>

<template>
  <div class="lightbox-wrapper">
    <button
      command="show-modal"
      :commandfor="targetId"
      type="button"
      :aria-describedby="`${targetId}-hint`"
    >
      <NuxtImg
        v-bind="$attrs"
        class="lightbox__preview"
        height="400"
      />

      <small
        :id="`${targetId}-hint`"
        class="lightbox__hint"
      >
        {{ $t('work.clickToZoom') }}
      </small>
    </button>

    <dialog
      :id="targetId"
      ref="dialogEl"
      class="lightbox"
      @click="dialogEl?.close()"
    >
      <img
        v-bind="$attrs"
        loading="lazy"
        class="lightbox__image"
      />
      {{ $t('work.clickAnywhereToClose') }}
    </dialog>
  </div>
</template>

<style lang="scss">
html:has(.lightbox[open]) {
  overflow-y: hidden;
}
</style>

<style lang="scss" scoped>
.lightbox {
  --transition-time: 300ms;
  --base-transition:
    display var(--transition-time) allow-discrete,
    overlay var(--transition-time) allow-discrete,
    opacity var(--transition-time), background-color var(--transition-time);

  align-items: center;
  background: none;
  border: none;
  box-sizing: border-box;
  color: var(--color-text-on-dark);
  display: flex;
  flex-direction: column;
  font-weight: 500;
  gap: var(--space-4);
  height: 100dvh;
  inset: 0;
  justify-content: center;
  margin: auto;
  max-width: 100dvw;
  overflow: hidden;
  padding: var(--space-8);
  position: fixed;
  transition: var(--base-transition);
  width: 100dvw;

  &::backdrop {
    backdrop-filter: blur(4px) brightness(60%);
    background-color: rgb(0 0 0 / 50%);
    transition: var(--base-transition);
  }

  &:not([open]) {
    display: none;
    opacity: 0;

    &::backdrop {
      background-color: rgb(0 0 0 / 0%);
    }
  }

  @starting-style {
    &[open] {
      opacity: 0;

      &::backdrop {
        background-color: rgb(0 0 0 / 0%);
      }
    }
  }

  &__preview {
    margin-bottom: var(--space-1);
    margin-top: 0;
  }

  &__hint {
    text-align: right;
  }

  &__image {
    flex: 1 1 0;
    max-width: 100%;
    min-height: 0;
    object-fit: scale-down;
    width: 100%;
  }

  &-wrapper {
    margin: var(--space-12) auto;
    text-align: center;

    button: {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
