---
description: Vue SFC authoring conventions for this project
paths:
  - '**/*.vue'
---

# Vue authoring conventions

## Script

Use `<script setup lang="ts">` for all new components. Legacy Options API files exist — leave them as-is, do not migrate opportunistically.

SFC block order: `<script setup>` → `<template>` → `<style lang="scss">`.

Import Vue composables and Nuxt utilities from `'#imports'`, not `'vue'`:

```ts
import { ref, computed, onMounted, useRoute } from '#imports';
```

Define props with TypeScript generics:

```ts
const props = defineProps<{
  title: string;
  tags: string[];
}>();
```

## Component naming

- All components are **multi-word PascalCase** — never single-word names.
- Components that appear at most once per page are prefixed with **`The`** (e.g. `TheNavbar`).
- Generic, reusable primitives are prefixed with **`Base`** (e.g. `BaseChip`).

## Template

HTML tags are not self-closed (`vue/html-self-closing` is off). Write `<img />` as `<img>`, etc.

Use `NuxtLink` for internal navigation. All `NuxtLink` hrefs must use a trailing slash — this is enforced globally in `nuxt.config.ts`, but be explicit when constructing paths manually.

Use `localePath()` for any route that needs i18n-aware linking.
