<template>
  <div class="container">
    <section class="about-intro top-offset">
      <h1 class="heading-1">
        About
      </h1>

      <p>
        I'm a product designer in Ottawa, Canada, and I'm incredibly passionate about delivering
        high-quality products that fit the users' needs, and meet business goals.
      </p>

      <div class="about-intro__links">
        <a
          class="link link--arrow"
          href="mailto:alexkcollier@gmail.com?subject=Getting in touch"
          target="_blank"
          rel="noopener nofollow"
        >
          Get in touch

        </a>
        <a
          class="link link--arrow"
          href="/docs/alex-collier-resume.pdf"
          target="_blank"
          rel="noopener nofollow"
        >
          Download my resume
        </a>
      </div>
    </section>

    <div class="two-column about-content">
      <main class="two-column__wide-col">
        <h2 class="heading-1">
          Experience
        </h2>

        <div class="work-experience">
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
            Education
          </h2>

          <div class="education">
            <h3 class="heading-2 title">
              Carleton University
            </h3>

            <p class="subtitle">
              B.Comm., International Business &amp; Marketing
            </p>
          </div>
        </section>

        <section class="sidebar__section">
          <h2 class="heading-1">
            Skills
          </h2>

          <div class="skill-list-group">
            <SkillList
              v-for="({ group, list }) in skills"
              :key="group"
              :title="group"
              :skill-list="list"
              class="skill-list-group__item"
            />
          </div>
        </section>
      </aside>
    </div>
  </div>
</template>

<script>
import SkillList from '~/components/SkillList.vue';
import skills from '~/assets/data/skills';
import WorkExperienceItem from '~/components/WorkExperienceItem.vue';
import workExperience from '~/assets/data/work-experience';

export default {
  components: {
    SkillList,
    WorkExperienceItem,
  },

  data () {
    return {
      workExperience,
      skills,
    };
  },

  head () {
    return {
      title: 'About',
    };
  },
};
</script>

<style lang="scss">
:root {
  --work-spacing: 3rem;

  @media screen and (max-width: 760px) {
    --work-spacing: 1rem;
  }
}

.about-intro {
  &__links {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    a {
      flex: 1 0 50%;
      margin-bottom: 2em;
      min-width: 10rem;
    }
  }

  @media screen and (min-width: 761px) {
    max-width: 2/3 * 100%;
  }

  @media screen and (min-width: 481px) {
    font-size: 1.5rem;
  }
}

.about-content {
  margin-top: 6rem;
}

.work-experience {
  margin-top: var(--work-spacing);
}

.education {
  margin-top: var(--work-spacing);
}

.skill-list-group {
  display: flex;
  flex-wrap: wrap;
  margin-top: var(--work-spacing);

  &__item {
    flex: 1 0 50%;
    min-width: 7.5rem;
    padding-right: 1rem;

    @media screen and (max-width: 760px) {
      flex-basis: 25%;
    }
  }
}
</style>
