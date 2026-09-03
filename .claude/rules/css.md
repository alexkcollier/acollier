# CSS authoring conventions

Styles are plain CSS. There is no preprocessor and no PostCSS plugin —
what you write is what ships.

## File conventions

- Global stylesheets live in `app/assets/styles/*.css` and are listed
  explicitly in the `css` array in `nuxt.config.ts`. There are no
  partials and no import graph.
- Component styles belong in the `<style>` block of the component they
  style. `app/assets/styles` is only for global and reusable styles.
  - An exception can be made for global styles with no corresponding
    component, like `.link`, or overrides for framework components
    provided by Vue or Nuxt and its modules. Avoid this where possible.

## BEM

All styles use BEM. The block is the component or layout class; elements
are `__element`, modifiers are `--modifier`. Native nesting cannot
concatenate a selector, so write element and modifier selectors out in
full, at the top level:

```css
.post-item { … }
.post-item__heading { … }
.post-item__link { … }

.post-item--featured .post-item__heading { … }
```

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

Maximum **3 levels** of nesting. Pseudo-classes and pseudo-elements
count as a level.

Note that `&` in native nesting behaves like `:is()` over the parent
selector list, so with a mixed-specificity parent list the nested rule
takes the specificity of the *most* specific parent. Split the rule up
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
in `theme.css`: sm 480, md 768, lg 960, xl 1200, xxl 1440. Use `--bp-*`
in declarations (`max-width: var(--bp-xl)`); use the literal in queries,
and keep the two in sync by hand.

Use range syntax (`width > 768px`), not `min-width` / `max-width`.

## Design tokens

All colours, spacing, radius, and type values come from the custom
properties in `theme.css`. Never hardcode these values — breakpoints in
query conditions are the one exception, for the reason above.

Both themes are declared once, via `light-dark()` resolving against
`color-scheme`. To add a token that differs between themes, add a single
`light-dark(<light>, <dark>)` declaration; do not add a
`prefers-color-scheme` block.
