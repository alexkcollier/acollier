<script setup lang="ts">
import { definePageMeta, useI18n, useLocalePath } from '#imports';

const localePath = useLocalePath();
const { locale } = useI18n();

definePageMeta({
  i18n: {
    paths: {
      en: '/about',
      fr: '/a-propos',
    },
  },
});
</script>

<template>
  <div class="container">
    <Head>
      <Title>
        {{ $t('about.metaTitle') }}
      </Title>
    </Head>

    <section class="about-intro">
      <h1 class="heading-1">
        {{ $t('about.mainHeading') }}
      </h1>

      <p>
        {{ $t('about.blurb') }}
      </p>

      <div class="about-intro__links">
        <NuxtLink
          :to="localePath('/contact/')"
          class="link link--arrow"
        >
          {{ $t('common.contact') }}
        </NuxtLink>

        <a
          class="link link--arrow"
          :href="`/docs/${locale === 'en' ? 'alex-collier-resume' : 'cv-alex-collier'}.pdf`"
          target="_blank"
          rel="noopener nofollow"
        >
          {{ $t('about.resumeDownload') }}
        </a>
      </div>
    </section>

    <div class="two-column about-content">
      <main class="work-experience two-column__wide-col">
        <div class="work-experience__heading">
          <h2 class="heading-1">
            {{ $t('about.experienceHeading') }}
          </h2>
        </div>

        <div class="work-experience__list">
          <WorkExperienceItem
            v-for="item in workExperience[
              locale as keyof typeof workExperience
            ]"
            :key="item.position"
            v-bind="item"
          />
        </div>
      </main>

      <aside class="two-column__narrow-col sidebar">
        <section class="sidebar__section">
          <h2 class="heading-1">
            {{ $t('about.skillsHeading') }}
          </h2>

          <ul class="about-skills">
            <li
              v-for="(skill, index) in skills[locale]"
              :key="index"
            >
              {{ skill }}
            </li>
          </ul>

          <h2 class="heading-1">
            {{ $t('about.educationHeading') }}
          </h2>

          <h3 class="heading-2 title">Carleton University</h3>

          <p class="subtitle">
            {{ $t('about.bcomm') }}
          </p>

          <h2 class="heading-1">
            {{ $t('about.linksHeading') }}
          </h2>

          <SocialLinks />
        </section>
      </aside>
    </div>
  </div>
</template>

<script lang="ts">
import workExperience, { skills } from '~/assets/data/work-experience';
import WorkExperienceItem from '~/components/WorkExperienceItem.vue';

export default {
  components: {
    WorkExperienceItem,
  },

  data() {
    return {
      workExperience,
    };
  },
};
</script>

<style lang="scss">
@use 'sass:math';
@use '~/assets/styles/utils/breakpoints' as bp;

.about-intro {
  font-size: var(--text-lg);

  &__links {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    justify-content: flex-start;

    @include bp.above('md') {
      gap: var(--space-4) var(--space-24);
    }
  }

  @include bp.above('sm') {
    font-size: var(--text-xl);
  }

  @include bp.above('md') {
    font-size: var(--text-2xl);
    margin-inline: (math.div(1, 9) * 100%);
    max-width: math.div(3, 4) * 100%;
  }
}

.about-content {
  margin-block-start: var(--space-12);

  @include bp.above('md') {
    margin-block-start: 5rem;
  }
}

.about-skills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  list-style: none;
  padding-left: 0;

  li {
    background-color: var(--color-bg-subtle);
    border-radius: var(--radius-sm);
    font-size: var(--text-sm);
    line-height: 1;
    padding: var(--space-2) var(--space-3);
  }
}

.work-experience {
  &__heading {
    margin-bottom: var(--heading-1-bottom-margin);

    .heading-1 {
      margin-bottom: 0;
    }
  }

  @include bp.above('md') {
    &__heading {
      margin-left: calc((math.div(1, 6) * 100%) + 1rem);
    }
  }
}
</style>
