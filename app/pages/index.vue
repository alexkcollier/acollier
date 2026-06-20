<script setup lang="ts">
import WorkListItem from '~/components/WorkListItem.vue';
import {
  useLocalePath,
  definePageMeta,
  useAsyncData,
  queryCollection,
  useI18n,
} from '#imports';
import type { Collections } from '@nuxt/content';

const localePath = useLocalePath();
const { locale } = useI18n();

definePageMeta({
  layout: 'no-page-spacing',
  transition: 'home',
});

const { data: featuredWork } = await useAsyncData(
  `featured-work-${locale.value}`,
  () =>
    queryCollection(`work_${locale.value}` as keyof Collections)
      .where('featured', '=', true)
      .order('order', 'ASC')
      .limit(3)
      .all(),
  { watch: [locale] },
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

          <p class="description">
            {{ $t('home.description') }}
          </p>

          <div class="featured-work">
            <div class="featured-work__heading">
              <span class="featured-work__heading-label">
                {{ $t('home.featuredWork') }}
              </span>
              <span
                class="featured-work__heading-rule"
                aria-hidden="true"
              ></span>
            </div>

            <div class="featured-work__list">
              <WorkListItem
                v-for="(post, index) in featuredWork"
                :key="post.id"
                :index="index"
                :title="post.title"
                :description="post.description"
                :href="localePath(post.path)"
                compact
              />
            </div>
          </div>

          <div class="home-links">
            <NuxtLink
              class="link link--arrow"
              :to="localePath('/work/')"
            >
              {{ $t('common.viewAllWork') }}
            </NuxtLink>
            <NuxtLink
              class="link link--arrow"
              :to="localePath('/contact/')"
            >
              {{ $t('common.contact') }}
            </NuxtLink>
          </div>
        </div>
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
  animation: deblur $base-time * 1.5 $easing;
  padding-block: var(--space-8);
  padding-inline: var(--page-side-padding);
  overflow: auto;

  @include bp.above('sm') {
    background-attachment: fixed;
    flex: 1;
    padding-block-start: var(--space-12);

    @include mixins.face-hero;
  }

  @include bp.above('lg') {
    padding-block-start: var(--space-16);
  }

  @include bp.above('xl') {
    padding-block-start: var(--space-24);
  }

  @include bp.above('xxl') {
    padding-block-start: var(--space-36);
  }
}

.home-content {
  // Multiplying the animation time staggers the animations nicely
  animation: fadein-delay $base-time * 1.5 $easing;

  @include bp.above('sm') {
    max-width: 70%;
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
  margin-block-start: var(--space-12);

  &__highlight {
    color: var(--color-text-primary);
  }

  @include bp.above('sm') {
    font-size: var(--text-5xl);
  }

  @include bp.above('lg') {
    font-size: var(--text-6xl);
  }
}

.description {
  font-size: var(--text-xl);
  margin-block: var(--space-12);
}

.featured-work {
  margin-block: var(--space-12);
  width: 100%;

  @include bp.above('sm') {
    max-width: 80%;
  }

  @include bp.above('md') {
    margin-block: var(--space-16);
  }

  &__heading {
    align-items: center;
    display: flex;
    gap: var(--space-4);
  }

  &__heading-label {
    color: var(--color-text-accent);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &__heading-rule {
    background: var(--color-border);
    flex: 1;
    height: 1px;
  }
}

.home-links {
  display: flex;
  flex-wrap: wrap;
  font-size: var(--text-lg);
  gap: var(--space-4) var(--space-8);
  padding-block-end: var(--space-6);
}

@keyframes deblur {
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
