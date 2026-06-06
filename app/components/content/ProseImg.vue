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
        loading="lazy"
        class="lightbox__preview"
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
      <NuxtImg
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
  color: currentColor;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  gap: 1rem;
  height: 100dvh;
  inset: 0;
  justify-content: center;
  margin: auto;
  max-width: 100dvw;
  overflow: hidden;
  padding: 2rem;
  position: fixed;
  transition: var(--base-transition);
  width: 100dvw;

  &::backdrop {
    background-color: rgb(0 0 0 / 50%);
    backdrop-filter: blur(4px) brightness(60%);
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
    margin-top: 0;
    margin-bottom: 0.25rem;
  }

  &__hint {
    text-align: right;
  }

  &__image {
    flex: 1 1 0;
    max-width: 100%;
    margin: 0.25rem auto;
    min-height: 0;
    object-fit: scale-down;
  }

  &-wrapper {
    margin: 3rem auto;
    text-align: center;

    button: {
      margin: 0 auto;
      display: block;
    }
  }
}
</style>
