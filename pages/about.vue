<script setup>
const localePath = useLocalePath();

const { locale } = useI18n();
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
          href="/docs/alex-collier-resume.pdf"
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

          <div
            v-if="locale === 'fr'"
            class="missing-translation"
          >
            {{ $t('common.translationMissing') }}
          </div>
        </div>

        <div class="work-experience__list">
          <WorkExperienceItem
            v-for="item in workExperience"
            :key="item.position"
            v-bind="item"
          />
        </div>
      </main>

      <aside class="two-column__narrow-col sidebar">
        <section class="sidebar__section">
          <h2 class="heading-1">
            {{ $t('about.educationHeading') }}
          </h2>

          <div>
            <h3 class="heading-2 title">
              Carleton University
            </h3>

            <p class="subtitle">
              {{ $t('about.bcomm') }}
            </p>
          </div>
        </section>
      </aside>
    </div>
  </div>
</template>

<script>
/* eslint-disable import/first */
import WorkExperienceItem from '~/components/WorkExperienceItem.vue';
import workExperience from '~/assets/data/work-experience';

export default {
  components: {
    WorkExperienceItem,
  },

  data () {
    return {
      workExperience,
    };
  },

  // head () {
  //   return {
  //     title: 'About',
  //   };
  // },
};
</script>

<style lang="scss">
@use 'sass:math';
@use '~/assets/styles/utils/breakpoints' as bp;

.about-intro {
  &__links {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    a {
      flex: 1 0 50%;
      min-width: 10rem;

      &:not(:last-child) {
        margin-bottom: 1em;
      }
    }
  }

  @include bp.above('md') {
    max-width: math.div(2, 3) * 100%;
  }

  @include bp.above('sm') {
    font-size: 1.5rem;
  }
}

.about-content {
  margin-top: 5rem;
}

.work-experience {
  &__heading {
    margin-bottom: var(--heading-1-bottom-margin);

    .heading-1 {
      margin-bottom: 0;
    }
  }

  .missing-translation {
    margin-top: 0.5rem;
  }

  @include bp.above('md') {
    &__heading {
      margin-left: calc((math.div(1, 7) * 100%) + 1rem);
    }
  }
}
</style>
