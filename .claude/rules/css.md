# CSS authoring conventions

Styles are plain CSS. There is no preprocessor and no PostCSS plugin —
what you write is what ships.

The organising idea is CUBE CSS: **C**omposition, **U**tility, **B**lock,
**E**xception, over a shared set of design tokens.

## Cascade layers

Every rule in the project lives in a layer. The order is declared once,
at the top of `app/assets/styles/reset.css`, which is the first entry in
the `css` array in `nuxt.config.ts` and must stay first:

```css
@layer reset, tokens, global, composition, utility, block, exception;
```

| Layer         | Holds                                                     |
| ------------- | --------------------------------------------------------- |
| `reset`       | `sanitize.css`, imported with `layer(reset)`              |
| `tokens`      | `tokens.css` — custom properties only, nothing else       |
| `global`      | `base.css` — bare element styling                         |
| `composition` | `compositions.css` — layout primitives                    |
| `utility`     | single-job, token-derived classes (no file yet)           |
| `block`       | components: global block sheets and every `<style>` block |
| `exception`   | state and variant overrides (nothing here yet)            |

A later layer beats an earlier one **regardless of specificity**, so a
utility can override a block without `!important` and without selector
weight tricks.

Two consequences to remember:

- **Unlayered CSS beats every layer.** Anything you add must be inside a
  layer or it silently wins over the whole system. Third-party CSS Nuxt
  injects for its own components (`nuxt-icon`, the error pages, `ProsePre`)
  is unlayered; leave it alone rather than trying to override it from a
  layer.
- **`@import` cannot appear inside `@layer { … }`.** Import into a layer
  instead — `@import url('x.css') layer(reset)` — or keep the `@import` at
  the top of the file, above the layer block, when the imported file wraps
  itself.

## File conventions

- Global stylesheets live in `app/assets/styles/*.css`, each wrapping its
  whole contents in the single `@layer` it belongs to, and each listed
  explicitly in the `css` array in `nuxt.config.ts`. The array order is
  documentation; the cascade order comes from the layer statement.
- Component styles belong in the `<style>` block of the component they
  style, wrapped in `@layer block { … }`. `app/assets/styles` is only for
  global and reusable styles.
  - An exception can be made for global styles with no corresponding
    component, like `.link`, or overrides for framework components
    provided by Vue or Nuxt and its modules. Avoid this where possible.

## Design tokens

All colours, spacing, radius, and type values come from the custom
properties in `tokens.css` — that file is the only place tokens are
declared. Never hardcode these values; breakpoints in query conditions
are the one exception, for the reason below.

Both themes are declared once, via `light-dark()` resolving against
`color-scheme`. To add a token that differs between themes, add a single
`light-dark(<light>, <dark>)` declaration; do not add a
`prefers-color-scheme` block.

## Compositions

`compositions.css` holds layout primitives: `.wrapper`, `.stack`,
`.cluster` and `.with-sidebar`. A composition arranges whatever is placed
inside it and decides nothing else — no colour, no type, no border, no
knowledge of what it contains.

Each is tuned through the custom properties named in its comment, set by
the block that uses it or inline:

```html
<ul
  class="cluster"
  style="--cluster-space: var(--space-2)"
></ul>
```

Prefer a composition to re-declaring `display: flex` inside a block. Add
a new primitive only when it has at least two unrelated call sites; if a
rule would only ever apply to one component, it belongs in that
component's `<style>` block.

Compositions stack on one element, and the block sets the knobs:

```html
<main class="about-layout wrapper stack"></main>
```

```css
.about-layout {
  --wrapper-max: calc(var(--bp-xl) * 2 / 3);
  --stack-space: var(--space-16);
}
```

Knobs are custom properties, so they **inherit**. A knob set for one
composition is visible to every descendant, and a nested composition of
the same kind picks it up unless it sets its own — `.work-links__list`
has to restate `--stack-space` because the sticky rail around it already
set one.

## Blocks and BEM

Blocks use BEM. The block is the component or layout class; elements are
`__element`, modifiers are `--modifier`. Native nesting cannot concatenate
a selector, so write element and modifier selectors out in full, at the
top level:

```css
@layer block {
  .post-item { … }
  .post-item__heading { … }
  .post-item__link { … }

  .post-item--featured .post-item__heading { … }
}
```

A block should hold only what is genuinely idiosyncratic to it. Layout
relationships go to a composition; repeated single-property values go to
a utility.

## Nesting

Native CSS nesting is used for anything that does not need
concatenation — pseudo-classes, pseudo-elements, compound selectors,
descendants, and at-rules:

```css
.post-item__link {
  color: var(--color-link);

  &:hover { … }
  &::after { … }

  @media (width > 768px) { … }
}
```

Maximum **3 levels** of nesting, not counting the `@layer` wrapper.
Pseudo-classes and pseudo-elements count as a level.

Note that `&` in native nesting behaves like `:is()` over the parent
selector list, so with a mixed-specificity parent list the nested rule
takes the specificity of the _most_ specific parent. Split the rule up
if that matters.

## Breakpoints

Media and container query conditions cannot read `var()` — custom
properties resolve per element, and a query has no element to resolve
against. So query conditions hardcode their value:

```css
@media screen and (width > 768px) { … }
@container (width >= 480px) { … }
```

The canonical set is documented alongside the `--bp-*` custom properties
in `tokens.css`: sm 480, md 768, lg 960, xl 1200, xxl 1440. Use `--bp-*`
in declarations (`max-width: var(--bp-xl)`); use the literal in queries,
and keep the two in sync by hand.

Use range syntax (`width > 768px`), not `min-width` / `max-width`.

Prefer an intrinsic composition to a query where one exists —
`.with-sidebar` reflows on its own and needs no container query.

## Ordering

The `stylelint-order` plugin enforces alphabetical property order and,
within each block, custom properties → declarations → nested rules →
`@media` → `@container`. This now applies inside `@layer` blocks too, so
a plain rule may not follow an at-rule in the same layer.
