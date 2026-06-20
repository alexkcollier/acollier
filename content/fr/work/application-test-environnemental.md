---
title: Application de test environnemental
order: 5
tags: [Design, Mobile]
description: Effectue le test Legionella de Spartan depuis ton téléphone.
featureImage: '/images/environmental-testing-app/legionella-mobile-feature.jpg'
tools:
  - {
      name: Adobe XD,
      img: /images/tools/xd.svg,
      href: https://www.adobe.com/ca/products/xd.html,
    }
  - {
      name: Framer,
      img: /images/tools/framer.svg,
      href: https://www.framer.com/,
    }
  - {
      name: React Native,
      img: /images/tools/react.svg,
      href: https://reactnative.dev/,
    }
  - {
      name: Theo,
      img: /images/tools/theo.png,
      href: https://github.com/salesforce-ux/theo,
    }
---

# Application de test environnemental

![Application de test environnemental](/images/environmental-testing-app/legionella-mobile-feature.jpg 'Application de test environnemental')

J'étais le seul designer sur un client mobile pour le test Legionella de Spartan, travaillant avec un développeur mobile pour porter un système sur ordinateur vers iOS et Android. La plupart des fonctionnalités principales ont été conçues et développées avant que le projet ne soit annulé lors de la fermeture de l'entreprise.

## Le problème

Le système original fonctionnait sur un ordinateur portable connecté au Spartan Cube par câble, un ordinateur par Cube, filaire. Les responsables d'installation effectuant des tests sur des sites plus grands avaient besoin de plusieurs systèmes, devaient vérifier manuellement chaque ordinateur pour les résultats, et géraient une empreinte physique significative. Le système fonctionnait ; l'usage en conditions réelles avait rendu ses limites évidentes.

La refonte les adressait directement :

- Contrôle mobile remplaçant l'ordinateur dédié
- Connectivité sans fil via Bluetooth Low Energy (BLE)
- Support pour surveiller plusieurs Cubes simultanément
- Résultats envoyés vers un serveur distant

Les fonctionnalités principales de l'original ont été conservées : un workflow de test guidé, des instructions étape par étape et un journal de résultats recherchable.

## Structure et wireframes

J'ai commencé par cartographier la structure de l'application autour des cas d'usage plutôt que des types de données, aboutissant à cinq sections : workflow de test, statut du Cube, journal de résultats, paramètres et gestion des sources d'eau.

Les wireframes ont suivi pour les écrans clés. L'écran d'instructions nécessitait des actions principales accessibles sans s'étirer sur les grands téléphones, ce qui a écarté plusieurs dispositions lourdes en haut tôt dans le processus. Pour le journal de résultats, j'ai exploré quatre approches avant que les wireframes montrent qu'une liste segmentée avec des en-têtes sticky offrait le meilleur équilibre entre densité d'information et facilité d'utilisation.

![Wireframes de l'écran d'instructions](/images/environmental-testing-app/instructions-wire.png "Wireframes de l'écran d'instructions")

![Wireframes de l'écran du journal](/images/environmental-testing-app/log-wire.png "Wireframes de l'écran du journal")

La navigation était une question ouverte. J'ai construit un prototype dans Adobe XD, l'ai chargé sur mon téléphone et effectué des tests de couloir. La disposition avec barre inférieure l'a emporté ; les participants appréciaient le chemin rapide pour démarrer un test, et trouvaient la carte du journal de résultats sur l'écran d'accueil déroutante.

![Wireframes de l'écran d'accueil](/images/environmental-testing-app/landing-wire.png "Wireframes de l'écran d'accueil")

<video src="/images/environmental-testing-app/navigation.webm" controls muted style="max-height: 400px;" poster="/images/environmental-testing-app/navigation-poster.png"></video>

## Design et prototype

Après le wireframing, je suis passé à Framer, écrivant un prototype entièrement interactif avec des données en direct et des interactions codées. C'était l'outil de transfert principal ; le développeur signalait tout ce qui ne pouvait pas être implémenté ou nécessitait une révision, et nous le travaillions ensemble.

<video src="/images/environmental-testing-app/prototype.webm" controls muted style="max-height: 400px;" poster="/images/environmental-testing-app/prototype-poster.png"></video>

L'écran de statut du Cube nécessitait un contournement pour la limitation fondamentale du BLE : le Bluetooth ne se connecte qu'en 1-à-1, ce qui aurait complètement compromis la surveillance multi-Cube. En travaillant avec le développeur, nous avons opté pour la lecture des paquets publicitaires que les Cubes diffusent passivement plutôt que de maintenir une connexion continue. Pour un test en cours, nous combinions un minuteur (les tests durent un peu moins d'une heure) avec les mises à jour de paquets disponibles à portée. Les utilisateurs hors de portée lors de la fin d'un test recevaient une notification ; ceux à proximité recevaient le résultat directement depuis l'annonce BLE. Les Cubes pouvaient également recevoir des noms significatifs, et le journal de résultats supportait le filtrage.

<img src="/images/environmental-testing-app/applied-filters.png" alt="Filtres appliqués" title="Filtres appliqués" />

Un problème non résolu avant la fin du projet : le curseur double du filtre de résultats. La plage de valeurs significatives était fortement regroupée à l'extrémité basse d'une échelle 0-1000, ce qui le rendait difficile à utiliser précisément. La correction était planifiée (le remplacer par des cases à cocher) mais n'avait pas été planifiée avant l'annulation.

## Développement

J'ai étendu les design tokens de [Schedio](/work/schedio) dans Theo pour ajouter un format de définition TypeScript et des transformations spécifiques à React Native, donnant au développeur une base de style cohérente. J'ai également contribué au code de style côté implémentation.

## Résultat

La plupart des fonctionnalités principales ont été conçues et développées avant la fermeture de Spartan. Le projet n'a pas atteint la production, mais le travail de design a tenu ; le processus de wireframing et de prototype a mis en évidence de vrais problèmes d'utilisabilité tôt, et la contrainte BLE a produit une solution viable qui aurait été réellement utile sur le terrain.
