---
description: TypeScript conventions for this project
paths:
  - '**/*.ts'
  - '**/*.vue'
---

# TypeScript authoring conventions

## Always use TypeScript

All new files use `.ts` or have `lang="ts"` on `<script setup>`. Do not use plain `.js` for app code.

## Declarative, functional patterns

Prefer `map`, `filter`, `reduce`, and `computed` chains over imperative loops. Mutation and `forEach` side-effects are a last resort.

```ts
// preferred
const enabled = computed(() => items.value.filter((i) => i.active));

// avoid
const enabled = [];
for (const item of items.value) {
  if (item.active) enabled.push(item);
}
```

`for` / `forEach` loops are acceptable when a functional equivalent would be materially less readable — for example, building a nested structure in a single pass or accumulating multiple outputs simultaneously.

## Types and interfaces

Use `interface` to define object shapes. Mark genuinely optional fields with `?` rather than `T | undefined`.

Use `as const` for static readonly arrays and objects to get the narrowest inferred type:

```ts
export default [{ key: 'about', href: '/about/' }] as const;
```

Avoid `any`. Prefer `unknown` when the type is truly unknown and narrow it explicitly.

## Functions

Prefer named function declarations for module-level functions. Use arrow functions for callbacks and inline expressions.

Keep functions small and single-purpose. Derive values with `computed` rather than syncing state manually with `watch` wherever possible.
