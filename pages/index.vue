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
  head() {
    return {
      title: 'ALEX COLLIER'
    }
  }
}
</script>

<style lang="scss">
@import url('https://use.typekit.net/zsd1emo.css');

$easing: cubic-bezier(0.6, 0, 0.7, 1);
$base-time: 1500ms;
$white-ish: #eee;

html {
  background: black;
  margin: 0;
}

body {
  margin: 0;
}

h1,
h2 {
  color: $white-ish;
  font-size: 12vmin;
  margin: 0;

  &::selection {
    background: rgb(255, 206, 206);
    text-shadow: 1px 2px 20px rgba(black, 0.25), 0 0 1px rgba(black, 0.25);
  }
}

.container {
  align-items: center;
  display: flex;
  height: 100vh;
  margin: auto;
  width: 60%;

  &::before {
    animation: deblur $base-time * 1.5 $easing;
    background: linear-gradient(rgba(black, 0.05), rgba(black, 0.05)),
      black url('~assets/images/acollier.jpg') right center / cover no-repeat;
    content: '';
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
  }

  @media (max-aspect-ratio: 11/10) {
    justify-content: center;
    text-align: center;
  }
}

.name {
  animation: fadein $base-time $easing;
  font-family: 'futura-pt', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 700;
  line-height: 14vmin;
  text-shadow: 1px 2px 20px rgba(black, 0.5), 0 0 1px rgba(black, 0.5);
  text-transform: uppercase;
}

.tag {
  animation: fadein-delay $base-time * 1.25 $easing;
  font-family: 'adobe-caslon-pro', Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  font-weight: 400;
  margin-top: 3vmin;
  text-shadow: 1px 2px 20px rgba(black, 0.75), 0 0 1px rgba(black, 0.5);
}

.email-cta {
  color: $white-ish;
  font-family: 'adobe-caslon-pro', Georgia, 'Times New Roman', Times, serif;
  font-size: 1.5em;
  margin-top: 3vmin;
  padding-top: 0.5em;
  position: relative;
  text-decoration: none;
  text-shadow: 1px 2px 20px rgba($color: black, $alpha: 0.75),
    0 0 1px rgba($color: black, $alpha: 0.5);

  &::after {
    border: 1px solid $white-ish;
    border-bottom-color: transparent;
    border-left-color: transparent;
    content: '';
    height: 0.25em;
    margin-left: 0.25em;
    opacity: 0;
    position: absolute;
    top: 60%;
    transform: translateY(-60%) rotate(45deg);
    transition: all 100ms ease-in;
    width: 0.25em;
  }

  &::before {
    border: 0.5px solid $white-ish;
    bottom: -0.25vmin;
    content: '';
    height: 0;
    position: absolute;
    width: 6vmin;
    transition: all 100ms ease-in;
  }

  &:hover {
    &::before {
      bottom: -1vmin;
      opacity: 0;
    }

    &::after {
      margin-left: 0.5em;
      opacity: 1;
    }
  }
}

@keyframes deblur {
  from {
    filter: blur(5px);
  }

  to {
    filter: blur(0px);
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

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
