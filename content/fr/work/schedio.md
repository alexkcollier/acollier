---
title: 'Schedio : un système de design Vue'
order: 4
tags: [Design, Development, 'Design System']
featureImage: '/images/schedio/schedio-feature.png'
description: Un système de design et une bibliothèque de composants pour Spartan Bio
links:
  - { title: Schedio, href: https://spartanbio-design.netlify.app }
  - {
      title: Fork de Schedio sur GitHub,
      href: https://github.com/alexkcollier/schedio,
    }
  - {
      title: Schedio Tokens,
      href: https://spartanbio.github.io/schedio-tokens/,
    }
  - {
      title: Fork Schedio Tokens sur GitHub,
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

# Schedio : un système de design Vue

<img src="/images/schedio/schedio-feature.png" alt="schedio" title="schedio">

Schedio est une bibliothèque de composants Vue et un système de design que j'ai construit pour Spartan Bio. L'objectif était de formaliser le design dans une petite entreprise où l'efficacité et la cohérence comptaient d'autant plus que l'équipe était réduite. Je l'ai initié de façon indépendante, livré la v1 en quelques mois et maintenu pendant deux ans. Le nom vient du mot grec pour design (schédio, plus ou moins) ; Spartan appréciait les références grecques.

## Design tokens

La première étape était de définir les éléments fondamentaux du système : typographie, couleurs, espacement, mouvement. Je les ai structurés comme des [design tokens](https://www.lightningdesignsystem.com/design-tokens/) en utilisant [Theo](https://github.com/salesforce-ux/theo), qui fournissait une source de vérité unique exportable dans plusieurs formats. Les tokens ont fini par influencer le travail non seulement en Vue, mais aussi sur nos plateformes Windows (WPF) et React Native, même là où les composants eux-mêmes ne pouvaient pas être consommés directement.

![Travail sur les couleurs dans Theo](/images/schedio/schedio-tokens-colors.png 'Travail sur les couleurs dans Theo')

Certains tokens, comme l'easing et le timing des transitions, n'ont de sens que dans le contexte des composants. J'ai d'abord travaillé sur les tokens fondamentaux, puis les ai développés davantage en parallèle du travail sur les composants.

## Bibliothèque de composants

J'ai conçu les composants dans Adobe XD (Figma était nouveau à l'époque et XD avait de meilleurs outils pour ce dont j'avais besoin), en générant des designs statiques avant de construire. [Storybook](https://storybook.js.org/) fournissait le bac à sable de développement et la couche de documentation. Certains plugins supportaient principalement React à l'époque, ce qui nécessitait des contournements pour Vue ; aucun n'était significatif, et le compromis en valait la peine. Notre développeur Windows pouvait se référer à Storybook pour comprendre l'intention de design même quand il ne pouvait pas consommer les composants directement.

![Composants dans XD](/images/schedio/schedio-xd.png 'Composants dans XD')

![Schedio dans Storybook](/images/schedio/schedio-storybook.png 'Schedio dans Storybook')

Chaque composant a été conçu pour respecter WCAG 2.0 AA. J'ai utilisé Jest et Storybook pour appliquer les standards d'accessibilité pendant le développement plutôt qu'en audit après coup.

## Documentation

Storybook n'est pas idéal pour la documentation non technique (directives d'utilisation, philosophie d'interaction, application des couleurs). J'avais besoin d'un endroit pour la mettre et je n'avais pas la bande passante pour construire un site de documentation séparé, donc elle est restée dans Storybook aux côtés des composants. Pour une équipe petite et majoritairement technique, ça fonctionnait. La limitation était un compromis conscient pour l'échelle à laquelle on opérait.

![Documentation pour Schedio](/images/schedio/schedio-logo-usage.png 'Documentation pour Schedio')

## Résultat

Schedio a été mis en production comme fondation pour le site corporate Vue de Spartan et utilisé dans les outils internes. Ses design tokens et ses patterns d'interaction ont influencé le travail sur nos plateformes WPF et React Native. [Polaris](https://github.com/Shopify/polaris-react/) de Shopify a été une influence significative sur l'approche, particulièrement sa réflexion sur la façon dont un système de design doit servir une équipe produit sans la contraindre.
