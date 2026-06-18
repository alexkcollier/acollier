<script setup lang="ts">
import PostItem from '~/components/PostItem.vue';
import {
  useLocalePath,
  definePageMeta,
  useAsyncData,
  queryCollection,
} from '#imports';

const localePath = useLocalePath();

definePageMeta({
  layout: 'no-page-spacing',
  transition: 'home',
});

const { data: featuredWork } = await useAsyncData('featured-work', () =>
  queryCollection('work_en')
    .where('featured', '=', true)
    .order('order', 'ASC')
    .limit(3)
    .all(),
);
</script>

<template>
  <main class="home-page">
    <section class="home-hero">
      <div class="container">
        <div class="home-content">
          <i18n-t
            keypath="home.tag"
            scope="global"
            tag="div"
            class="tag"
          >
            <span class="tag__highlight">{{ $t('home.experienceType') }}</span>
          </i18n-t>

          <p>
            {{ $t('home.description') }}
          </p>

          <div class="home-links">
            <NuxtLink
              class="link link--large link--button link--button-filled"
              :to="localePath('/work/')"
            >
              {{ $t('common.seeMyWork') }}
            </NuxtLink>

            <NuxtLink
              class="link link--large link--button"
              :to="localePath('/contact/')"
            >
              {{ $t('common.contact') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="featured-work">
      <div class="container">
        <h2 class="heading-1 featured-work__heading">
          {{ $t('home.featuredWork') }}
        </h2>

        <div class="featured-work__grid">
          <PostItem
            v-for="post in featuredWork"
            :key="post.id"
            :title="post.title"
            :description="post.description"
            :href="localePath(post.path)"
            :feature-image="post.featureImage"
            :tags="post.tags"
          />
        </div>

        <NuxtLink
          class="link link--large link--button link--button-filled"
          :to="localePath('/work/')"
        >
          {{ $t('common.viewAllWork') }}
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
@use '~/assets/styles/utils/breakpoints' as bp;
@use '~/assets/styles/utils/mixins';

$easing: cubic-bezier(0.6, 0, 0.7, 1);
$base-time: 1500ms;

.home-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.home-hero {
  @include mixins.face-hero;

  animation: deblur $base-time * 1.5 $easing;
  min-height: 80%;
}

.home-content {
  // Multiplying the animation time staggers the animations nicely
  animation: fadein-delay $base-time * 1.5 $easing;
  font-size: var(--text-xl);
  max-width: 90%;

  > * + * {
    margin-block: var(--space-12) 0;
  }

  @include bp.above('sm') {
    max-width: 60%;
  }

  @include bp.above('md') {
    max-width: 60%;
  }

  @include bp.above('lg') {
    max-width: 55%;
  }
}

.tag {
  font-size: var(--text-4xl);
  font-weight: 700;
  line-height: var(--leading-tight);

  &__highlight {
    color: var(--color-text-primary);
  }

  @include bp.above('sm') {
    font-size: var(--text-5xl);
  }

  @include bp.above('md') {
    font-size: var(--text-6xl);
  }
}

.home-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-4);
}

.featured-work {
  flex: 1;
  padding: var(--space-12) var(--page-side-padding) var(--page-top-padding);

  &__heading {
    margin-bottom: var(--heading-1-bottom-margin);
  }

  &__grid {
    column-gap: var(--space-8);
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    @include bp.below('md') {
      grid-template-columns: repeat(2, 1fr);
    }

    @include bp.below('sm') {
      grid-template-columns: 1fr;
    }
  }
}

@keyframes deblur {
  // I shouldn't be animating a filter, but I am
  from {
    filter: blur(5px);
  }

  to {
    filter: blur(0);
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadein-delay {
  0% {
    opacity: 0;
  }

  // These 0% and 50% keyframes fake a delay
  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
