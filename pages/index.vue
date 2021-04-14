<template>
  <main class="home-hero">
    <div class="container">
      <h1 class="name">
        Alex Collier
      </h1>

      <div class="tag">
        Product designer in Ottawa
      </div>

      <a
        class="link link--large link--arrow email-cta"
        href="mailto:alexkcollier@gmail.com?subject=Getting in touch"
        target="_blank"
        rel="noopener nofollow"
      >
        Get in touch
      </a>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'no-page-spacing',
  transition: 'home',
};
</script>

<style lang="scss">
@use '~/assets/styles/utils/breakpoints' as bp;

$easing: cubic-bezier(0.6, 0, 0.7, 1);
$base-time: 1500ms;

.home-hero {
  --gradient-color: transparent;
  --bg-image: url('~assets/images/acollier.jpg');
  --bg-x: right;

  align-items: center;
  display: flex;
  height: 100vh;
  padding: var(--page-top-padding) var(--page-side-padding);
  text-shadow: 1px 2px 20px rgba(black, 0.75), 0 0 1px rgba(black, 0.5);

  // using pseudo element so filter only affects image
  &::before {
    //TODO: #28 load separate image on mobile
    // when the text is over my face, I need to increase contrast significantly

    background: linear-gradient(var(--gradient-color), var(--gradient-color)),
      var(--base-background-color) var(--bg-image) var(--bg-x) center / cover no-repeat;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;

    @include bp.above('md') {
      // a naive attempt to save low power devices from an animated filter
      animation: deblur $base-time * 1.5 $easing;
    }
  }

  @include bp.below('lg') {
    --gradient-color: rgba(0, 0, 0, 0.5);
    --bg-x: 90%;
  }
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
