<script setup lang="ts">
import GithubIcon from '~/assets/icons/github.svg';
import LinkedinIcon from '~/assets/icons/linkedin.svg';
</script>

<template>
  <div class="social-links cluster">
    <a
      href="https://github.com/alexkcollier"
      class="social-link"
      aria-label="GitHub"
      target="_blank"
      rel="noopener nofollow"
    >
      <GithubIcon />
    </a>

    <a
      href="https://www.linkedin.com/in/alexkcollier/"
      class="social-link"
      aria-label="LinkedIn"
      target="_blank"
      rel="noopener nofollow"
    >
      <LinkedinIcon />
    </a>
  </div>
</template>

<style>
@layer block {
  .social-links {
    --cluster-space: var(--space-6);

    font-size: var(--text-5xl);

    &:not(:last-of-type) {
      margin-bottom: var(--space-12);
    }
  }

  .social-link {
    color: var(--color-text);
    display: flex;
    text-shadow: none;

    &:hover {
      color: var(--color-text);
    }
  }
}
</style>
