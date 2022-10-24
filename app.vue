<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useHead } from '#imports';

useHead({
  titleTemplate: chunk => chunk ? `${chunk} | Alex Collier` : 'Alex Collier',
});
</script>
