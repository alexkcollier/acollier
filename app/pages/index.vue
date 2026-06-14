<script setup>
import { useLocalePath, definePageMeta } from '#imports';

const localePath = useLocalePath();

definePageMeta({
  layout: 'no-page-spacing',
  transition: 'home',
});
</script>

<template>
  <main class="home-hero">
    <div class="container">
      <div class="home-content">
        <i18n-t
          keypath="home.tag"
          scope="global"
          tag="div"
          class="tag"
        >
          <span class="tag__highlight">{{ $t('home.experienceType') }}</span>
        </i18n-t>

        <p>
          {{ $t('home.description') }}
        </p>

        <div class="home-links">
          <NuxtLink
            class="link link--large link--button link--button-filled"
            :to="localePath('/work/')"
          >
            {{ $t('common.seeMyWork') }}
          </NuxtLink>

          <NuxtLink
            class="link link--large link--button"
            :to="localePath('/contact/')"
          >
            {{ $t('common.contact') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@use '~/assets/styles/utils/breakpoints' as bp;
@use '~/assets/styles/utils/mixins';

$easing: cubic-bezier(0.6, 0, 0.7, 1);
$base-time: 1500ms;

.home-hero {
  @include mixins.face-hero;

  animation: deblur $base-time * 1.5 $easing;
}

.home-content {
  // Multiplying the animation time staggers the animations nicely
  animation: fadein-delay $base-time * 1.5 $easing;
  font-size: var(--text-xl);
  max-width: 90%;

  > * + * {
    margin-block: var(--space-12) 0;
  }

  @include bp.above('sm') {
    max-width: 60%;
  }

  @include bp.above('md') {
    max-width: 60%;
  }

  @include bp.above('lg') {
    max-width: 55%;
  }
}

.tag {
  font-size: var(--text-4xl);
  font-weight: 700;
  line-height: var(--leading-tight);

  &__highlight {
    color: var(--color-text-primary);
  }

  @include bp.above('sm') {
    font-size: var(--text-5xl);
  }

  @include bp.above('md') {
    font-size: var(--text-6xl);
  }
}

.home-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-4);
}

@keyframes deblur {
  // I shouldn't be animating a filter, but I am
  from {
    filter: blur(5px);
  }

  to {
    filter: blur(0);
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadein-delay {
  0% {
    opacity: 0;
  }

  // These 0% and 50% keyframes fake a delay
  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
