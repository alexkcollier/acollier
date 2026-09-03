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
@layer reset, tokens, theme, global, composition, utility, block, exception;
```

| Layer         | Holds                                                     |
| ------------- | --------------------------------------------------------- |
| `reset`       | `sanitize.css`, imported with `layer(reset)`              |
| `tokens`      | `tokens.css` — custom properties only, nothing else       |
| `theme`       | `theme.css` — the light/dark switch, nothing else         |
| `global`      | `base.css` — bare element styling                         |
| `composition` | `compositions.css` — layout primitives                    |
| `utility`     | `utilities.css` — single-job, token-derived classes       |
| `block`       | components: global block sheets and every `<style>` block |
| `exception`   | state and variant rules, keyed off `data-*` attributes    |

A later layer beats an earlier one **regardless of specificity**, so
nothing in this project needs `!important` or a selector-weight trick to
win. The order is CUBE's own acronym: compositions arrange, utilities
carry the default for a recurring decision, blocks specialise it, and
exceptions override everything.

Note the direction that implies — **a block beats a utility**, not the
other way round. That is what lets `.work-list-item__tags` take
`.list-bare` for the reset and still set its own top margin.

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
  style, wrapped in `@layer block { … }`, with an `@layer exception { … }`
  block after it if the component has states or variants.
  `app/assets/styles` is only for global and reusable styles.
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

`theme.css` holds the switch itself — `color-scheme` and the `[data-theme]`
overrides `ColorSwitcher` stamps — and nothing else. It is a layer of its
own, after `tokens`, so a theme that ever needs to restate a palette token
outranks the default by layer instead of by selector weight.

A ramp step (`--stone-700`) is not a value to style with — reach for the
semantic palette (`--color-text-muted`). Naming a themed colour a
component owns is the one place a ramp is fair game outside `tokens.css`,
because that is what `light-dark()` needs:

```css
.chat-form {
  --submit-bg: light-dark(var(--stone-200), var(--stone-800));
}
```

That form is also the answer whenever a component's value differs between
themes. Never hand-roll the switch with a `[data-theme]` rule plus a
`prefers-color-scheme` block — it takes six lines to say what
`light-dark()` says in one, and it is easy to write the pair so that
pinning a theme stops working. If what varies is not a colour, express it
as one: an opacity applied to a colour is a colour.

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

## Utilities

`utilities.css` holds single-job classes whose value comes from a token:
`.visually-hidden`, `.list-bare`, `.font-mono`, `.text-muted`.

A utility names a decision that recurs across components with nothing
else in common. It is not a shorthand for an arbitrary declaration, and
not a way to assemble a component out of class names in the template — if
you find yourself reaching for four of them on one element, that element
wants a block.

Because a block outranks a utility, a utility carries the default and the
component departs from it in its own stylesheet. That also means a
utility cannot rescue you from a block that sets the same property: fix
the block instead.

Only reach for a utility where a template can actually carry the class.
Styling that lands on rendered markdown (`nuxt-content.css`), on a bare
element (`label`, `code`, `kbd`), or on a pseudo-element stays a
declaration.

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

## Exceptions

An exception is a block in a state (`data-open`, `data-active`) or in a
variant (`data-variant="mini"`, `data-role="user"`). Both live in the
`exception` layer, which is last, so they beat the block without needing
to out-specify it:

```css
@layer block {
  .work-list-item__title {
    font-size: var(--text-2xl);
  }
}

@layer exception {
  .work-list-item[data-variant='mini'] .work-list-item__title {
    font-size: var(--text-sm);
  }
}
```

State and variant are **attributes, not classes** — a `--modifier` class
would sit in the block layer alongside the thing it is meant to override,
and would have to win on selector weight. The attribute keeps the block's
class list stable, and it reads as what it is: markup describing state.

Bind a boolean state so the attribute is absent when off:

```
:data-open="isMenuOpen || undefined"
```

`|| undefined` is the load-bearing part. Vue drops an attribute bound to
`undefined`, but `false` renders as `data-open="false"` — present, and
matching `[data-open]`.

Where the value is already data, bind it straight through instead of
composing a class name from it — `:data-role="role"`, not
`` `chat-message--${role}` ``.

A structural distinction that is not state — two placements of the same
component, say — stays a modifier class. `.navbar__sidebar-toggle--mobile`
and `--desktop` are two different elements, not one element in two states.

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
