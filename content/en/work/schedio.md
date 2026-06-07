---
title: 'Schedio: A Vue design system'
order: 4
featureImage: '/images/schedio/schedio-feature.png'
description: A design system and component library for Spartan Bio
links:
  - { title: Schedio, href: https://spartanbio-design.netlify.app }
  - {
      title: Schedio fork on GitHub,
      href: https://github.com/alexkcollier/schedio,
    }
  - {
      title: Schedio Tokens,
      href: https://spartanbio.github.io/schedio-tokens/,
    }
  - {
      title: Schedio Tokens fork on GitHub,
      href: https://github.com/alexkcollier/schedio-tokens,
    }
tools:
  - {
      name: Adobe XD,
      img: /images/tools/xd.svg,
      href: https://www.adobe.com/ca/products/xd.html,
    }
  - { name: Vue.js, img: /images/tools/vue.svg, href: https://vuejs.org }
  - {
      name: Storybook,
      img: /images/tools/storybook.svg,
      href: https://storybook.js.org/,
    }
  - {
      name: Theo,
      img: /images/tools/theo.png,
      href: https://github.com/salesforce-ux/theo,
    }
  - { name: Sass, img: /images/tools/sass.svg, href: https://sass-lang.com }
  - { name: Jest, img: /images/tools/jest.png, href: https://jestjs.io/ }
---

# Schedio: A Vue design system

<img src="/images/schedio/schedio-feature.png" alt="schedio" title="schedio">

Schedio is a Vue component library and design system I built for Spartan Bio. The goal was to formalize design at a small company where efficiency and consistency mattered more, not less, because of the team's size. I initiated it independently, shipped v1 over a couple of months, and maintained it for two years. The name comes from the Greek word for design (schédio, more or less); Spartan likes Greek themes.

## Design tokens

The first step was defining the system's foundational elements: type, colour, spacing, motion. I structured these as [design tokens](https://www.lightningdesignsystem.com/design-tokens/) using [Theo](https://github.com/salesforce-ux/theo), which provided a single source of truth exportable in multiple formats. The tokens ended up informing work not just in Vue, but across our Windows (WPF) and React Native platforms, even where the components themselves couldn't be consumed directly.

![Working on colors in Theo](/images/schedio/schedio-tokens-colors.png 'Working on colors in Theo')

Some tokens, like transition easing and timing, only make sense in the context of components. I worked through the foundational tokens first, then developed them further alongside the component work.

## Component library

I designed components in Adobe XD (Figma was new at the time and XD had better tooling for what I needed), generating static designs before building. [Storybook](https://storybook.js.org/) provided the development sandbox and documentation layer. Some addons primarily supported React at the time, which required workarounds for Vue; none were significant, and the tradeoff was worth it. Our Windows developer could reference Storybook to understand design intent even when he couldn't consume the components directly.

![Components in XD](/images/schedio/schedio-xd.png 'Components in XD')

![Schedio in Storybook](/images/schedio/schedio-storybook.png 'Schedio in Storybook')

Every component was designed to WCAG 2.0 AA. I used Jest and Storybook to enforce accessibility standards during development rather than audit after the fact.

## Documentation

Storybook is not ideal for non-technical documentation (usage guidelines, interaction philosophy, colour application). I needed somewhere to put it and didn't have the bandwidth to build a separate documentation site, so it stayed in Storybook alongside the components. For a small, mostly technical team, it worked. The limitation was a conscious tradeoff for the scale we were at.

![Documentation for Schedio](/images/schedio/schedio-logo-usage.png 'Documentation for Schedio')

## Outcome

Schedio shipped as the foundation for Spartan's Vue corporate site and was used across internal tools. Its design tokens and interaction patterns informed work on our WPF and React Native platforms. Shopify's [Polaris](https://github.com/Shopify/polaris-react/) was a significant influence on the approach, particularly its thinking on how a design system should serve a product team without constraining it.
