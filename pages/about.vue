<template>
  <div class="container two-column">
    <main class="two-column__wide-col">
      <h1 class="heading-1">
        Experience
      </h1>

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
};
</script>

<style lang="scss">
:root {
  --work-spacing: 3rem;

  @media screen and (max-width: 760px) {
    --work-spacing: 1rem;
  }
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
