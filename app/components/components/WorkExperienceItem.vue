<template>
  <article class="work-experience-item">
    <div class="work-experience-item__date">
      <div class="work-experience-item__date-start">
        {{ startDate }}
      </div>

      <div>
        &nbsp;{{ endDate ? `${$t("about.toDate")} ${endDate}` : $t("about.toPresentDate") }}
      </div>
    </div>

    <div class="work-experience-item__heading">
      <h1 class="heading-2 title">
        {{ position }}
      </h1>
      <div class="subtitle">
        {{ company }}
      </div>
    </div>

    <div class="work-experience-item__description">
      <ul class="work-experience-item__description-list">
        <li
          v-for="item in description"
          :key="item"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
export default {
  name: 'WorkExperienceItem',

  props: {
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    description: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@use 'sass:math';
@use '~/assets/styles/utils/breakpoints' as bp;

.work-experience-item {
  display: grid;
  gap: 1rem;
  grid-template:
    'date heading'
    '. description'
    / (math.div(1, 6) * 100%) auto;

  & ~ & {
    margin-top: 3rem;
  }

  &__date {
    align-self: end;
    color: var(--caption-font-color);
    grid-area: date;
    text-align: right;

    // roughly aligns start date with post title
    // TODO: remove magic;
    &-start {
      line-height: 2rem;
    }
  }

  &__heading {
    grid-area: heading;

    .subtitle {
      color: var(--caption-font-color);
    }
  }

  &__description {
    grid-area: description;

    &-list {
      margin: 0;
      padding-left: 1.25rem;
    }
  }

  @include bp.below('sm') {
    column-gap: 0;
    grid-template:
      'heading date'
      'description description' / 1fr auto;

    &__date {
      display: inline-flex;
      justify-content: flex-end;

      &-start {
        line-height: 1.5;
      }
    }
  }
}
</style>
