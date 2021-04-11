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

<style lang="scss">
$easing: cubic-bezier(0.6, 0, 0.7, 1);
$base-time: 1500ms;
$text-contrast-shadow: 1px 2px 20px rgba(black, 0.75), 0 0 1px rgba(black, 0.5);

.home-hero {
  align-items: center;
  display: flex;
  height: 100vh;
  margin: -1rem 0;

  // using pseudo element so filter only affects image
  &::before {
    background: linear-gradient(rgba(black, 0.05), rgba(black, 0.05)),
      black url('~assets/images/acollier.jpg') right center / cover no-repeat;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;

    @media screen and (min-width: 769px) {
      // a naive attempt to save low power devices from an animated filter
      animation: deblur $base-time * 1.5 $easing;
    }
  }

  //TODO: make this query more sane
  @media (max-aspect-ratio: 11/10) {
    text-align: center;

    &::before {
      align-content: center;
      //TODO: load separate image on mobile
      // when the text is over my face, I need to increase contrast significantly
      background: linear-gradient(rgba(black, 0.5), rgba(black, 0.5)),
        black url('~assets/images/acollier.jpg') 90% center / cover no-repeat;
    }
  }
}

.name {
  animation: fadein $base-time $easing;
  font-size: 4rem;
  font-weight: 700;
  line-height: 125%;
  margin-bottom: 1rem;
  text-shadow: $text-contrast-shadow;
}

.tag {
  // Multiplying the animation time staggers the animations nicely
  animation: fadein-delay $base-time * 1.25 $easing;
  font-size: 2.5rem;
  line-height: 125%;
  margin-bottom: 6rem;
  text-shadow: $text-contrast-shadow;
}

.email-cta {
  // Multiplying the animation time staggers the animations nicely
  animation: fadein-delay $base-time * 1.5 $easing;
  text-shadow: $text-contrast-shadow;

  // arrow
  &::after {
    @media (max-aspect-ratio: 11/10) {
      display: none;
    }
  }
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
