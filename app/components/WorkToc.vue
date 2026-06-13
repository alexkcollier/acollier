<script setup lang="ts">
import type { TocLink } from '@nuxt/content';

defineProps<{
  links: TocLink[];
}>();
</script>

<template>
  <nav>
    <ul class="toc__list">
      <li
        v-for="link in links"
        :key="link.id"
        class="toc__item"
      >
        <a
          :href="`#${link.id}`"
          class="link toc__link"
          >{{ link.text }}</a
        >

        <ul
          v-if="link.children?.length"
          class="toc__list toc__list--nested"
        >
          <li
            v-for="child in link.children"
            :key="child.id"
            class="toc__item"
          >
            <a
              :href="`#${child.id}`"
              class="link toc__link"
              >{{ child.text }}</a
            >
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@use '~/assets/styles/utils/mixins';

.toc {
  &__list {
    @include mixins.unstyled-list;
  }

  &__list--nested {
    padding-block-start: var(--space-4);
    padding-inline-start: var(--space-4);
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: var(--space-4);
    }
  }

  &__link {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
