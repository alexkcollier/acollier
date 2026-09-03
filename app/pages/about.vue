<script setup lang="ts">
import { definePageMeta, useI18n } from '#imports';
import workExperience from '~/assets/data/work-experience';
import WorkExperienceItem from '~/components/WorkExperienceItem.vue';

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

    <main class="about-layout">
      <section class="about-intro">
        <h1 class="heading-1">
          {{ $t('about.mainHeading') }}
        </h1>

        <p>
          {{ $t('about.blurb') }}
        </p>

        <div class="about-intro__links">
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

      <section class="about-section">
        <h2 class="heading-1">
          {{ $t('about.experienceHeading') }}
        </h2>

        <WorkExperienceItem
          v-for="item in workExperience[locale as keyof typeof workExperience]"
          :key="item.company"
          v-bind="item"
        />
      </section>

      <section class="about-section">
        <h2 class="heading-1">
          {{ $t('about.educationHeading') }}
        </h2>

        <h3 class="heading-2 title">Carleton University</h3>

        <p class="subtitle">
          {{ $t('about.bcomm') }}
        </p>
      </section>

      <section class="about-section">
        <h2 class="heading-1">
          {{ $t('about.linksHeading') }}
        </h2>

        <SocialLinks />
      </section>
    </main>
  </div>
</template>

<style lang="scss">
.about-layout {
  /* Matches the reading column on the portfolio pages: 8 of 12 cols at the xl breakpoint */
  margin-inline: auto;
  max-width: calc(var(--bp-xl) * 2 / 3);
}

.about-intro {
  font-size: var(--text-lg);

  &__links {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    justify-content: flex-start;
  }

  @media screen and (width > 480px) {
    font-size: var(--text-xl);
  }
}

.about-section {
  margin-block-start: var(--space-16);
}
</style>
