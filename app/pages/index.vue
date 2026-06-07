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
      <h1 class="name">
        {{ $t('common.name') }}
      </h1>

      <div class="tag">
        {{ $t('home.tag') }}
      </div>

      <NuxtLink
        class="link link--large link--arrow email-cta"
        :to="localePath('/contact/')"
      >
        {{ $t('common.contact') }}
      </NuxtLink>
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

.name {
  animation: fadein $base-time $easing;
  font-size: 4rem;
  font-weight: 700;
  line-height: 125%;
  margin-bottom: 1rem;
}

.tag {
  // Multiplying the animation time staggers the animations nicely
  font-size: 2.5rem;
  line-height: 125%;
  margin-bottom: 6rem;
}

.email-cta,
.tag {
  // Multiplying the animation time staggers the animations nicely
  animation: fadein-delay $base-time * 1.5 $easing;
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
