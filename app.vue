<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  titleTemplate: chunk => chunk ? `${chunk} | Alex Collier` : 'Alex Collier',
});
</script>
