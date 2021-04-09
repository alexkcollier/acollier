<template>
  <div class="skill-list">
    <strong
      v-if="title"
      class="skill-list__title"
    >
      {{ title }}
    </strong>

    <ul class="skill-list__list">
      <li
        v-for="skill in skillList"
        :key="skill"
        class="skill-list__item"
      >
        {{ skill }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SkillList',

  props: {
    skillList: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss">
.skill-list {
  margin-bottom: 1rem;

  &__title {
    display: block;
    margin-bottom: 0.5rem;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
