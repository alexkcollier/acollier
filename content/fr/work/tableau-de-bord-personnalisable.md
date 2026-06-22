---
title: Tableau de bord personnalisable
order: 2
tags: [Design, Development, Data]
featured: true
featureImage: '/images/customizable-dashboard/dashboard-feature.png'
description: Tableau de bord analytique personnalisable avec un éditeur par glisser-déposer
tools:
  - { name: Figma, img: /images/tools/figma.svg, href: https://www.figma.com }
  - { name: React, img: /images/tools/react.svg, href: https://react.dev }
  - {
      name: TypeScript,
      img: /images/tools/typescript.svg,
      href: https://www.typescriptlang.org,
    }
  - { name: MUI, img: /images/tools/mui.svg, href: https://mui.com }
---

# Tableau de bord personnalisable

![Un tableau de bord hautement configurable permettant des insights d'un coup d'œil](/images/customizable-dashboard/dashboard-feature.png "Le tableau de bord avec la fenêtre d'ajout de widget ouverte")

## En résumé

J'ai conçu et développé de zéro un tableau de bord personnalisable pour une plateforme d'analyse de texte IA dédiée au secteur CX. Responsabilité de bout en bout : recherche concurrentielle, conception UX, tests internes et implémentation frontend. Le tableau de bord est devenu le point d'entrée principal de l'application et un facteur clé dans la conversion et le renouvellement de plusieurs clients.

## Contexte

**Produit :** Une plateforme d'analyse de texte IA pour le secteur CX. Un pipeline NLP extrayait des paires sujet-opinion à partir de retours clients libres, les classifiant en compliments, problèmes, suggestions, questions ou neutre, et leur attribuait un score. La plateforme s'intégrait à de nombreuses sources de données et enrichissait l'analyse avec de l'IA générative.

**Mon rôle :** Designer et développeur frontend unique

**Calendrier :** Première mise en production T3-T4 2021, avec des mises en production de fonctionnalités itératives jusqu'en 2025

## Le problème

La plateforme faisait remonter des insights riches et structurés à partir des retours clients (analyse de sentiment, analyse de sujets, tendances de volume, données sources) mais uniquement via des vues tableau et graphique statiques. Un tableau de bord fixe existait, mais il était totalement non personnalisable. Chaque client voyait la même chose quelle que soit la nature de ce qu'il devait réellement surveiller. Il n'y avait aucun moyen d'adapter l'interface à un cas d'usage spécifique, et la profondeur du produit n'était pas visible lors des démos commerciales. Les clients avaient peu de raisons de se connecter régulièrement.

![L'ancien tableau de bord n'offrait quasiment aucune personnalisation](/images/customizable-dashboard/old-dashboard.png "L'ancien tableau de bord")

## Ce que j'ai fait

J'ai piloté le projet depuis la recherche concurrentielle jusqu'à l'implémentation en production, concevant et développant un tableau de bord entièrement personnalisable avec un éditeur de disposition, un système de widgets configurables, plusieurs types de graphiques, le partage interne, des vues publiques non authentifiées, un sélecteur de tableau de bord et un workflow d'ajout de widget.

Trois problèmes ont orienté les décisions les plus importantes.

### L'éditeur de disposition

Le redimensionnement et le repositionnement des widgets ne se produisent qu'en mode édition dédié, une décision architecturale délibérée qui sépare les modifications de disposition de l'utilisation normale du tableau de bord. Dans ce mode, le défi restant était de rendre les interactions précises et claires : supporter le glisser-déposer, communiquer ce que les gestes de redimensionnement et de repositionnement allaient faire avant qu'un utilisateur ne le déclenche, garder la grille compacte sans écraser la disposition voulue, et s'assurer que les zones cliquables étaient suffisamment distinctes pour éviter les erreurs. C'était donc nécessaire de concevoir et de spécifier chaque état de widget explicitement (base, édition, redimensionnement X, redimensionnement Y, survol, et en cours de glissement), chacun avec ses propres affordances.

Compte tenu de la complexité du comportement de la grille (logique de compaction, contraintes de redimensionnement, interactions de glissement), j'ai créé des prototypes en code pour explorer et valider le ressenti des interactions avant de m'engager dans l'implémentation complète. Certains problèmes d'interaction ne se manifestent qu'à l'exécution. Prototyper en code plutôt que dans Figma signifiait que les tests qui suivaient se basaient sur un comportement réaliste.

Les tests avec des utilisateurs internes ont globalement validé la direction. Une exception : l'icône indiquant qu'un widget pouvait être déplacé n'était pas claire. On l'a mise à jour et ça a réglé le problème. Les autres états d'interaction et affordances ont résisté aux tests sans modifications.

J'ai écarté une fonctionnalité pendant le projet : les modèles de tableau de bord préconstruits. Ils n'étaient pas nécessaires. Les utilisateurs pouvaient rapidement créer un premier tableau de bord adapté, l'équipe commerciale en configurait généralement un lors de l'onboarding, et une fonctionnalité de duplication existante offrait déjà à quiconque la possibilité de réutiliser un tableau de bord comme point de départ.

Le tableau de bord a également introduit un nouveau modèle de filtre. Le tableau de bord statique original disposait d'un filtre global appliqué sur toute la vue. On a pris la décision délibérée de le supprimer en faveur de l'indépendance au niveau des widgets, en gardant uniquement les filtres de sentiment comme globaux. Chaque widget pouvait avoir ses propres filtres, locaux et éphémères, avec la possibilité de les rendre réutilisables. Le compromis était intentionnel : l'indépendance des widgets avait plus de valeur à ce stade que le filtrage global et réduisait énormément la complexité du projet. Ça avait été signalé tôt par l'équipe de développement et intégré dans le design.

<video src="/images/customizable-dashboard/layout-editing.webm" controls preload="none" muted poster="/images/customizable-dashboard/layout-editing.png" alt="Le tableau de bord permettait des dispositions personnalisées, mais essayait de combler automatiquement les espaces vides" title="Édition de la disposition"></video>

![Les interactions de glisser-déposer nécessitaient des états d'interaction et des spécifications approfondis](/images/customizable-dashboard/interaction-states.png "La spec des états d'interaction dans les widgets")

### Le système de couleurs

Les graphiques de la plateforme étaient construits autour d'une palette de couleurs sémantique liée aux catégories de retours (vert pour les compliments, jaune pour les problèmes, bleu pour les suggestions, violet clair pour les questions, gris pour les neutres). Ces couleurs portaient du sens. Quand on a ajouté des types de graphiques comme les séries temporelles, où les couleurs représentent des séries de données plutôt que des catégories de retours, cette palette ne pouvait pas être réutilisée. Les associations auraient été trompeuses, et cinq couleurs n'étaient de toute façon pas suffisantes. On avait besoin d'une palette catégorique capable de distinguer jusqu'à 20 séries clairement, sans connotation.

J'ai suivi de près la méthodologie de séquence de couleurs inclusives d'IBM, générant des teintes pour chaque nuance avec Colorbox.io, travaillant la palette complète dans Figma, puis adaptant et étendant notre thème MUI pour l'implémenter de manière systématique. Chaque couleur a été conçue pour satisfaire un ratio de contraste de 3:1 sur fond clair.

![Un ensemble de couleurs de base, sélectionnées pour la visualisation de données](/images/customizable-dashboard/base-palette.png)

Le contraste entre les couleurs a été géré structurellement : la grille a été organisée avec un saut en chevron de sorte que seules les nuances ayant un contraste suffisant entre elles soient adjacentes dans la séquence et une règle d'utilisation a été établie pour toujours itérer dans la palette dans l'ordre plutôt que de choisir les couleurs librement. L'accessibilité est garantie par le système lui-même, elle ne dépend pas de jugements individuels au moment de l'implémentation.

![Un motif en chevron répété a été utilisé pour séquencer les couleurs](/images/customizable-dashboard/chevron-skip.png 'La méthodologie de sélection par saut en chevron')

### Focus Recommendations

Focus Recommendations est l'approche de l'application pour l'analyse des facteurs clés, combinant la corrélation d'un sujet avec les variations du score de satisfaction par rapport à son score de satisfaction moyen pour faire remonter ce qui influence activement la satisfaction ou l'insatisfaction des clients, et où concentrer les efforts.

J'étais fortement impliqué dans le développement de Focus Recommendations en tant que fonctionnalité autonome. Le widget tableau de bord était ce qui l'avait intégrée dans le produit plus large, traduisant le graphique à quatre quadrants et les listes d'insights actionnables pour qu'ils fonctionnent à la fois sur la page dédiée de Focus Recommendations et comme widget redimensionnable aux côtés d'autres contenus du tableau de bord. L'adaptation de la logique de filtre FR pour coexister avec l'architecture de filtre du tableau de bord nécessitait une collaboration étroite avec le développement pour élaborer les différences et trouver un point d'intégration propre.

![Les widgets Focus Recommendations présentaient leurs propres défis uniques](/images/customizable-dashboard/focus-recommendations-widget.png 'Le widget Focus Recommendations')

_Focus Recommendations est traité en profondeur dans une [étude de cas distincte ->](/work/focus-recommendations)._

## Résultat

Le tableau de bord a été mis en production au T3-T4 2021 et est devenu le point d'entrée principal de l'application et la fonctionnalité phare des démos clients. Il a été cité comme facteur clé dans la conversion et le renouvellement de plusieurs clients, des enjeux importants pour une petite entreprise où chaque contrat comptait.

## Après le lancement

Le tableau de bord a continué d'évoluer. L'ensemble de widgets initial était minimal et largement fixe (scores de sentiment, volume, comptages d'enregistrements, ventilations par source, sujets principaux). Ceux-ci ont été progressivement remplacés par des widgets de graphiques entièrement personnalisables : graphiques en barres, séries temporelles, tableaux de données, graphiques circulaires, widget numérique et carte de chaleur retravaillée. Une troisième vague a ajouté des widgets plus complexes et analytiquement avancés : notes en texte enrichi, questions matricielles et Focus Recommendations.

Un filtre au niveau du tableau de bord a également été mis en production dans un cycle ultérieur, réintroduisant le filtrage inter-tableau de bord sous une forme plus puissante. Appliqué sur tous les widgets simultanément, qui restreignait toujours, sans jamais élargir, leurs filtres individuels, et indépendant des filtres d'analyse globaux de l'application, il permettait aux utilisateurs de découper un tableau de bord entier sans perdre le contexte indépendant que chaque widget portait. Le modèle de filtre, conçu en amont pour supporter l'indépendance au niveau des widgets, s'est étendu sans accroc pour l'intégrer.
