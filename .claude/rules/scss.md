---
description: SCSS authoring conventions for this project
paths:
  - '**/*.scss'
  - '**/*.vue'
---

# SCSS authoring conventions

## File conventions

- SCSS partials should be prefixed with an underscore (e.g.: `_theme.scss`, `_layout.scss`)
- Component styles should be written in the `<style lang="scss">` blocks of the components they belong to. `app/assets/styles` should only contain global and reusable styles, and utilities.
  - An exception can be made for global styles with no corresponding component like `.link` or overrides for framework components provided by Vue or Nuxt and its modules. This should be avoided as much as possible, however.

## BEM

All styles use BEM. The block is the component or layout class; elements use `&__element`; modifiers use `&--modifier`. Store the block selector in `$parent: &` when you need to reference it inside a nested rule.

```scss
.post-item {
  $parent: &;

  &__heading { ... }
  &__link { ... }

  &--featured {
    #{$parent}__heading { ... }
  }
}
```

## Nesting depth

Maximum **3 levels** of nesting. Pseudo-classes (`:hover`, `:first-child`) and pseudo-elements (`::before`) count as a level.

## Native CSS first

Prefer native CSS over SCSS features wherever they are equivalent. In practice this means:

- Use CSS custom properties (`var(--space-4)`) for values — not SCSS variables. Legacy `$scss-variables` exist but should not be added to.
- Use native CSS nesting when writing standalone `.scss` files is not required — SCSS nesting syntax is still used here because the project processes styles through SCSS.
- Use `calc()`, `clamp()`, `min()`, `max()` instead of SCSS math functions unless a SCSS-only context requires it (e.g. `math.div` in layout math that predates `calc`).

SCSS is used for: **mixins**, **`@use`-based module imports**, and **nesting syntax**. That is all. Do not reach for SCSS features that have a CSS equivalent.

## Breakpoints

Use the `bp` mixins — never write raw `@media` queries:

```scss
@use '~/assets/styles/utils/breakpoints' as bp;

.foo {
  // mobile-first default styles

  @include bp.above('md') { ... }
  @include bp.below('sm') { ... }
}
```

Available breakpoint keys are defined in the `$breakpoints` map in `app/assets/styles/utils/_breakpoints.scss`.

## Imports

Use `@use`, never `@import`. Namespace breakpoints as `bp`:

```scss
@use '~/assets/styles/utils/breakpoints' as bp;
@use '~/assets/styles/utils/mixins';
```

## Design tokens

All colours, spacing, radius, and type values come from CSS custom properties defined in `_theme.scss`. Never hardcode these values.
