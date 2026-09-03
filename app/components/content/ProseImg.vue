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

<style>
@layer block {
  html:has(.lightbox[open]) {
    overflow-y: hidden;
  }
}
</style>

<style scoped>
@layer block {
  .lightbox {
    --base-transition:
      display var(--duration-slowest) allow-discrete,
      overlay var(--duration-slowest) allow-discrete,
      opacity var(--duration-slowest), background-color var(--duration-slowest);

    align-items: center;
    background: none;
    border: none;
    box-sizing: border-box;
    color: var(--color-text-on-dark);
    display: flex;
    flex-direction: column;
    font-weight: var(--font-weight-medium);
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
      background-color: var(--color-scrim);
      transition: var(--base-transition);
    }

    &:not([open]) {
      display: none;
      opacity: 0;

      &::backdrop {
        background-color: transparent;
      }
    }

    @starting-style {
      &[open] {
        opacity: 0;

        &::backdrop {
          background-color: transparent;
        }
      }
    }
  }

  .lightbox__preview {
    margin-bottom: var(--space-1);
    margin-top: 0;
  }

  .lightbox__hint {
    text-align: right;
  }

  .lightbox__image {
    flex: 1 1 0;
    max-width: 100%;
    min-height: 0;
    object-fit: scale-down;
    width: 100%;
  }

  .lightbox-wrapper {
    margin: var(--space-12) auto;
    text-align: center;

    button {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
