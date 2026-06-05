<script setup lang="ts">
import GithubIcon from '~/assets/icons/github.svg';
import LinkedinIcon from '~/assets/icons/linkedin.svg';
</script>

<template>
  <div class="social-links">
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

<style lang="scss">
.social-links {
  display: flex;
  font-size: 2rem;
  gap: 1.5rem;

  &:not(:last-of-type) {
    margin-bottom: 3rem;
  }
}

.social-link {
  color: var(--base-font-color);
  display: flex;
  text-shadow: none;

  &:hover {
    color: var(--base-font-color);
  }
}
</style>
