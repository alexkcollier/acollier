<script setup lang="ts">
import { computed, useI18n } from '#imports';

const props = defineProps<{
  company: string;
  roles: string[];
  startDate: string;
  endDate?: string;
  body: string[];
}>();

const { t } = useI18n();

const dateRange = computed(() =>
  props.endDate
    ? `${props.startDate} ${t('about.toDate')} ${props.endDate}`
    : `${props.startDate} ${t('about.toPresentDate')}`,
);
</script>

<template>
  <article class="work-experience-item">
    <header class="work-experience-item__header">
      <h3 class="work-experience-item__company heading-2 title">
        {{ company }}
      </h3>

      <p class="work-experience-item__meta">
        <span class="work-experience-item__roles">
          {{ roles.join(' · ') }}
        </span>

        <span class="work-experience-item__date">
          {{ dateRange }}
        </span>
      </p>
    </header>

    <div class="work-experience-item__body">
      <p
        v-for="paragraph in body"
        :key="paragraph"
      >
        {{ paragraph }}
      </p>
    </div>
  </article>
</template>

<style lang="scss">
.work-experience-item {
  & ~ & {
    border-block-start: 1px solid var(--color-border);
    margin-block-start: var(--space-12);
    padding-block-start: var(--space-12);
  }
}

.work-experience-item__header {
  margin-block-end: var(--space-6);
}

.work-experience-item__meta {
  color: var(--color-text-muted);
  display: flex;
  flex-direction: column;
  font-size: var(--text-sm);
  gap: var(--space-1);
  margin-block: var(--space-2) 0;

  @container (width >= 480px) {
    align-items: baseline;
    flex-direction: row;
    gap: var(--space-4);
    justify-content: space-between;
  }
}

.work-experience-item__date {
  white-space: nowrap;
}

.work-experience-item__body {
  p {
    margin-block: 0;
  }

  p + p {
    margin-block-start: var(--space-4);
  }
}
</style>
