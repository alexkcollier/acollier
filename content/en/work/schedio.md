---
title: Schedio
featureImage: /images/schedio/schedio-feature.png
description: A design system and component library for Spartan Bio
links:
  - { title: Schedio, href: https://spartanbio-design.netlify.app }
  - { title: Schedio on GitHub, href: https://github.com/spartanbio/schedio }
  - {
      title: Schedio Tokens,
      href: https://spartanbio.github.io/schedio-tokens/,
    }
  - {
      title: Schedio Tokens on GitHub,
      href: https://github.com/spartanbio/schedio-tokens,
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

# Schedio

<img src="/images/schedio/schedio-feature.png" alt="schedio" title="schedio">

Spartan's always had a small team, but that doesn't mean formalizing design
isn't beneficial. T increase the efficiency and consistency of our designs at
Spartan, I built a Vue component library and design system. It informed the
design of our laptop interfaces, as well as much of our marketing design at the
time. I named it Schedio, since Google Translate told me that's the Greek word
for design (_schédio_, anyways), and Spartan likes Greek themes.

I read _a lot_ of design guidelines before putting this together. Reading
through them, I found Shopify's
[Polaris](https://github.com/Shopify/polaris-react/). I really like the approach
used, so mine was influenced by it.

The first step in putting this together, was to determine its basic elements,
like font, colors, spacing. I also planned to document and structure these
elements as
[design tokens](https://www.lightningdesignsystem.com/design-tokens/).
[Theo](https://github.com/salesforce-ux/theo) was incredibly useful for this.
It's powerful export features came in handy when actually builing the component
library.

![Working on colors in Theo](/images/schedio/schedio-tokens-colors.png 'Working on colors in Theo')

Some tokens, like transition easing and timing, are harder than others to work
on without working on components. Once the basic tokens were done, it was time
to move on to and component design. I started by generating static designs in XD
(this was before component states were a thing). These were also used in future
prototyping.

![Components in XD](/images/schedio/schedio-xd.png 'Components in XD')

[Storybook](https://storybook.js.org/) provided a great sandbox for development,
and I bolted on some documentation to save time. I had to make some workarounds
since I was developing in Vue, since some of the Storybook addons primarily
supported React at the time. It wasn't too bad to get working though, and it was
worth it, both in terms of how it let me work, and how it helped our Windows
developer better understand my design intention.

![Schedio in Storybook](/images/schedio/schedio-storybook.png 'Schedio in Storybook')

Every component was designed to be WCAG 2.0 AA accessible. I used tests in Jest
and Storybook to help enforce that during development.

![Documentation for Schedio](/images/schedio/schedio-logo-usage.png 'Documentation for Schedio')

I mentioned above that I bolted on design, and I truly mean that. Storybook
isn't the best place for non-technical documentation, like "how to use a
colour", or "this is our philosophy on interaction". But I needed to put it
_somehwere_, and I didn't have the time or resources to build another site. I
would definitely try and separate them more in the future. Given the small size
of our team, however, it wasn't a big issue, and could be fixed as we scaled.

The outputs from Schedio were incredibly useful in supporting future product
design. I used its components for customer-facing website, and some internal
tools. The XD prototypes were reused as inputs for our product prototypes, and
our Windows developer appreciated having this as a reference, even if he
couldn't consume them.
