<template>
  <main class="container">
    <h1 class="name">
      Alex<br>Collier
    </h1>

    <h2 class="tag">
      Make stuff.
    </h2>

    <a
      class="email-cta"
      href="mailto:alexkcollier@gmail.com?subject=Getting in touch"
      target="_blank"
      rel="noopener nofollow"
    >
      Email me
    </a>
  </main>
</template>

<script>
export default {
  head () {
    return {
      title: 'ALEX COLLIER',
    };
  },
};
</script>

<style lang="scss">
$easing: cubic-bezier(0.6, 0, 0.7, 1);
$base-time: 1500ms;
$white-ish: #eee;

$family-sans-serif: 'Noah', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
  Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
$family-serif: 'Bona Nova', Georgia, 'Times New Roman', Times, serif;

$text-contrast-shadow: 1px 2px 20px rgba(black, 0.75), 0 0 1px rgba(black, 0.5);

html {
  background: black;
  color: $white-ish;
  margin: 0;
}

h1,
h2 {
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  margin: auto;
  width: 60%;

  &::selection {
    background: rgb(255, 206, 206);
    text-shadow: 1px 2px 20px rgba(black, 0.25), 0 0 1px rgba(black, 0.25);
  }

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

  @media (max-aspect-ratio: 11/10) {
    text-align: center;

    &::before {
      align-content: center;
      // when the text is over my face, I need to increase contrast significantly
      background: linear-gradient(rgba(black, 0.3), rgba(black, 0.3)),
        black url('~assets/images/acollier.jpg') right center / cover no-repeat;
    }
  }
}

.name {
  animation: fadein $base-time $easing;
  font-family: $family-sans-serif;
  font-size: 12vmin;
  font-weight: 700;
  line-height: 14vmin;
  text-shadow: $text-contrast-shadow;
  // fake bold; FF and Edge support the `-webkit` prefix; there is no unprefixed support
  -webkit-text-stroke: 2px $white-ish;
  text-transform: uppercase;
}

.tag {
  // Multiplying the animation time staggers the animations nicely
  animation: fadein-delay $base-time * 1.25 $easing;
  font-family: $family-serif;
  font-size: 10vmin;
  font-style: italic;
  font-weight: 400;
  margin-top: 3vmin;
  text-shadow: $text-contrast-shadow;
}

.email-cta {
  // Multiplying the animation time staggers the animations nicely
  animation: fadein-delay $base-time * 1.5 $easing;
  color: $white-ish;
  font-family: $family-sans-serif;
  font-size: 1.5em;
  margin-top: 8vmin;
  position: relative;
  text-decoration: none;
  text-shadow: $text-contrast-shadow;

  // line
  &::before {
    border: 0.5px solid $white-ish;
    bottom: -0.35em;
    content: '';
    height: 0;
    position: absolute;
    transition: all 100ms ease-in;
    width: 6vmin;

    @media (max-aspect-ratio: 11/10) {
      display: none;
    }
  }

  // arrow
  &::after {
    border: 1px solid $white-ish;
    border-bottom-color: transparent;
    border-left-color: transparent;
    content: '';
    height: 0.25em;
    margin-left: 0.25em;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    transition: all 100ms ease-in;
    width: 0.25em;

    @media (max-aspect-ratio: 11/10) {
      opacity: 1;
    }
  }

  &:hover::after {
    margin-left: 0.5em;
    opacity: 1;
  }

  &:active {
    &::before {
      bottom: -1em;
      opacity: 0;
    }

    &::after {
      opacity: 0;
      transform: translateX(0.5em) translateY(-50%) rotate(45deg);
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
