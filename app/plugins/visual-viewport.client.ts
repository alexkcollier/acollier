import { defineNuxtPlugin } from '#imports';

/**
 * Mirrors the visual viewport's height and offset onto CSS custom properties so
 * layouts can size to the area not covered by the on-screen keyboard.
 *
 * This is the iOS Safari fallback for the `interactive-widget=resizes-content`
 * viewport hint (which Safari does not support): there, the layout viewport
 * stays full-size and the keyboard overlays fixed elements, so we drive sizing
 * from `window.visualViewport` instead.
 */
export default defineNuxtPlugin(() => {
  const viewport = window.visualViewport;

  if (!viewport) {
    return;
  }

  const root = document.documentElement;

  function update() {
    if (!viewport) {
      return;
    }

    root.style.setProperty('--visual-viewport-height', `${viewport.height}px`);
    root.style.setProperty(
      '--visual-viewport-offset-top',
      `${viewport.offsetTop}px`,
    );
  }

  update();
  viewport.addEventListener('resize', update);
  viewport.addEventListener('scroll', update);
});
