---
title: Rapport d'analyse agentique
order: 0
tags: [Design, Development, AI]
featured: true
featureImage: '/images/agentic-analysis-report/agentic-report-thumbnail.png'
description: Rapport CX généré par IA avec une interface de clavardage agentique
tools:
  - { name: Figma, img: /images/tools/figma.svg, href: https://www.figma.com }
  - { name: React, img: /images/tools/react.svg, href: https://react.dev }
  - {
      name: TypeScript,
      img: /images/tools/typescript.svg,
      href: https://www.typescriptlang.org,
    }
  - { name: MUI, img: /images/tools/mui.svg, href: https://mui.com }
  - {
      name: RTK Query,
      img: /images/tools/redux.svg,
      href: https://redux-toolkit.js.org,
    }
  - {
      name: react-pdf,
      img: /images/tools/react-pdf.png,
      href: https://react-pdf.org,
    }
---

# Rapport d'analyse agentique

<video src="/images/agentic-analysis-report/analysis-report.webm" controls preload="none" muted poster="/images/agentic-analysis-report/analysis-report-feature.png"></video>

## En résumé

J'ai conçu et piloté le développement frontend du Rapport d'analyse agentique, la fonctionnalité la plus ambitieuse techniquement à avoir été mise en production pendant mon passage chez Keatext. Le rapport fait passer un fichier CSV dans le pipeline NLP et un LLM pour générer une analyse écrite détaillée : un résumé global, une analyse des sujets clés, des recommandations et une feuille de route d'implémentation. Il comprenait également un workflow de filtrage, un export PDF dans le navigateur, la génération multilingue et une interface de clavardage agentique pour interroger le jeu de données. Une fonctionnalité phare qui a suscité un fort enthousiasme auprès des clients potentiels.

## Contexte

**Mon rôle :** Designer et principal développeur frontend ; environ 50 % de l'implémentation active, avec une participation à la revue de chaque PR mis en production

**Stack :** React, TypeScript, RTK Query, server-sent events, react-pdf

**Calendrier :** Conception et développement à partir du T3 2025 ; première mise en production T4 2025 ; filtrage, PDF, panneau agentique et fonctionnalités additionnelles mis en production entre T1 et T2 2026 ; support multilingue en QA

## Contexte du projet

Le Rapport d'analyse agentique était la pièce maîtresse d'une initiative plus longue visant à faire de Keatext l'analyste autonome, réduisant le travail d'interprétation qu'un professionnel CX doit effectuer en confiant davantage de travail au produit. Les étapes précédentes de cette initiative comprenaient Focus Recommendations et son module d'Actionable Insights. Le Rapport d'analyse agentique représentait un changement de dimension : un rapport écrit complet, généré par un LLM, ancré dans la sortie du pipeline NLP de la plateforme.

Le projet est parti de zéro, construit autour du chargement d'un seul fichier CSV contenant un nombre quelconque de champs texte et de métadonnées. Contrairement aux implémentations précédentes qui demandaient aux utilisateurs de configurer manuellement le champ de satisfaction, le Rapport d'analyse agentique le détectait automatiquement côté backend. Les utilisateurs pouvaient corriger un champ mal identifié, mais dans la plupart des cas, la configuration ne demandait rien de leur part. La question qui animait le projet était de savoir quelle partie du workflow analytique on pouvait déléguer au modèle.

_Focus Recommendations, que le Rapport d'analyse agentique a largement supplanté, fait l'objet d'une [étude de cas distincte ->](/work/focus-recommendations)_

## Ce que j'ai fait

J'ai conçu la fonctionnalité de bout en bout et piloté le développement frontend, en prenant en charge l'affichage du rapport, l'intégration API, les états intermédiaires et d'erreur, l'implémentation des graphiques, le workflow de filtrage, la génération PDF et l'interface agentique. J'ai également proposé l'architecture pour le support multilingue et collaboré avec l'équipe NLP pour traduire l'élasticité en quelque chose de plus compréhensible pour des non-techniciens.

Quatre problèmes ont guidé les décisions les plus importantes et des entretiens clients lors de la phase prototype ont défini ce que la fonctionnalité allait devenir.

### Recherche et affinement

On a impliqué des clients via des entretiens sur un prototype préliminaire, testant nos hypothèses avant de nous engager dans la construction complète. Les résultats ont modifié la fonctionnalité de manière concrète.

Au départ, il y avait une section « drivers » et une section « topics ». Les entretiens ont montré que les utilisateurs ne faisaient pas réellement de distinction entre eux ; la séparation ajoutait de la structure sans apporter de clarté. On les a fusionnées. Une analyse de segmentation qui avait bien performé lors du prototypage n'a pas répondu aux attentes des vrais clients et a été supprimée.

L'impact était le changement le plus significatif. Le prototype le présentait principalement comme un chiffre, ce qui nécessitait des explications et créait des frictions. On l'a remplacé par une visualisation de type jauge, en gardant les chiffres bruts accessibles pour les utilisateurs qui voulaient creuser plus profondément, mais en mettant le visuel de l’avant. C'est devenu le principe général : passer des chiffres aux visualisations libellées autant que possible, préservant la profondeur sans la mettre de l’avant par défaut. Les entretiens ont également permis de clarifier quelles sections du rapport avaient besoin de texte descriptif pour orienter les utilisateurs, et lesquelles pouvaient se passer d'explication, ce qui a directement influencé la façon dont la sortie LLM était structurée entre prose et données.

### Concevoir dans un espace contraint

L'application était construite autour de panneaux verticaux (navigation, filtres, données) qui s'étaient accumulés au fil du temps. L'ajout d'une interface de clavardage pour l'agent introduisait une pression significative sur l'espace horizontal, notamment à 1366x768, la plus petite fenêtre d'affichage à supporter selon nos données d'utilisateur.

La contrainte principale était que le panneau agentique devait être redimensionnable mais pas masquable. La navigation était déjà masquable, et on pouvait raisonnablement supposer que les utilisateurs la masqueraient pendant les workflows de rapport où elle n'est pas au cœur de la tâche. Le panneau de filtres était également masquable. Le problème venait surtout de l'écran de configuration du rapport, qui incluait un tableau de données et où l'agent serait finalement aussi intégré.

J'ai opté pour une disposition horizontale des filtres, positionnée au-dessus du tableau plutôt que dans un panneau latéral. Cette décision a libéré l'espace horizontal dont le tableau avait besoin, réduit le nombre total de panneaux en compétition et établi un modèle réutilisable pour les options de configuration supplémentaires dans les futurs écrans.

![Les couches sont maintenant disposées au-dessus du tableau, économisant l'espace horizontal critique](/images/agentic-analysis-report/report-creation-filters.png 'Écran de configuration du rapport avec filtres horizontaux')

### Communiquer l'impact

Comme pour Focus Recommendations, le Rapport d'analyse agentique présente un graphique à quatre quadrants représentant les sujets selon deux axes. La méthodologie utilise ici l'élasticité plutôt que la corrélation, une mesure plus rigoureuse de la force avec laquelle les variations d'un sujet sont liées aux variations de la satisfaction. Le défi était le même : rendre ça significatif pour des professionnels CX qui ne sont probablement pas familiers avec l'élasticité en tant que concept.

Je l'ai appelé « impact », évitant complètement le terme dans l'interface utilisateur.

La valeur d'élasticité nette (positive moins négative) était visualisée sous forme de jauge. La jauge pouvait être agrandie pour révéler séparément les composantes positives et négatives, offrant aux utilisateurs qui voulaient plus de détails un chemin vers cette information sans exposer cette complexité par défaut.

Le tri introduisait un problème plus subtil. Trier les sujets par élasticité nette seule aurait mal représenté les sujets volatils ; un sujet avec une forte élasticité positive et négative produirait une valeur nette faible et descendrait vers le bas de la liste, malgré son importance élevée. J'ai trié les sujets par l'ampleur totale (la somme absolue de l'élasticité positive et négative), faisant remonter les sujets les plus impactants et non seulement les sujets les plus polarisés. L'ampleur totale n'était pas exposée directement aux utilisateurs ; elle informait l'ordre sans nécessiter d'explication.

![La jauge d'impact pouvait être développée pour accéder aux statistiques brutes](/images/agentic-analysis-report/impact-meter-states.png "Jauge d'impact, réduite et développée")

![Le graphique d'impact classe les sujets en points forts, points faibles ou agréables à avoir](/images/agentic-analysis-report/impact-chart.png 'Graphique impact vs. satisfaction')

### L'interface agentique

Le panneau agentique fournit une interface de clavardage pour interroger le jeu de données et poser des questions sur le rapport après sa génération. La vision à long terme est d'intégrer l'agent dans toute l'application, pas seulement dans le rapport.

Le travail de conception pour l'agent portait sur les micro-interactions. Dans une application centrée sur les données où la plupart des interactions sont immédiates, une interface conversationnelle introduit un nouveau type d'attente et la façon dont cette attente se ressent compte. Des éléments de clavardage qui apparaissent sans transition sont heurtants ; ils romprent le rythme conversationnel que l'interface essaie d'établir.

J'ai implémenté des animations et des transitions subtiles partout : des éléments qui s'animent en douceur plutôt que d'apparaître brusquement et une animation de points en mouvement en attendant les réponses de l'agent, le même modèle que les applications de messagerie utilisent pour montrer qu'un contact est en train d'écrire. L'effet est discret mais important : il signale qu'un travail est en cours, maintient le sentiment d'un échange en direct et confère à l'interface une qualité de réactivité que la latence sous-jacente compromettrait autrement.

<video src="/images/agentic-analysis-report/chat-interaction.webm" style="width: 380px;" controls preload="none" muted poster="/images/agentic-analysis-report/chat-interaction.png"></video>

## Travaux techniques complémentaires

**Rapports multilingues :** L'application supportait la localisation en anglais et en français via react-i18n, mais le LLM pouvait générer des rapports dans de nombreuses langues. Ça créait un décalage : les chaînes fixes de l'application et le contenu variable du modèle devaient coexister dans le même document. J'ai proposé un modèle pour stocker tout le contenu du rapport (y compris les chaînes fixes) dans le backend, les traduire et les mettre en cache à la demande, et assembler la sortie finale côté serveur. L'application n'avait donc pas à gérer le rendu linguistique arbitraire et la logique de traduction restait centralisée dans un seul endroit. Ça reduisait aussi la variabilité d'un processus intrinsèquement non déterministe : les chaînes fixes étaient traduites une fois et mises en cache plutôt que regénérées à chaque requête et le LLM n'était jamais sollicité pour les produire, seulement pour les traduire. Les descriptions clés restent cohérentes d'une exécution de rapport à l'autre, quelle que soit la langue.

**Améliorations des graphiques :** Le graphique du rapport partageait son approche avec Focus Recommendations, mais avec une implémentation plus dynamique des limites de quadrants. J'ai ajouté une détection des collisions d'étiquettes pour éviter que les libellés des sujets se chevauchent, une amélioration significative par rapport au graphique FR qui n'avait aucun mécanisme pour gérer ça.

**Génération PDF dans le navigateur :** Le rapport était conçu comme un livrable final ; quelque chose que les clients pouvaient remettre directement aux parties prenantes plutôt qu'un écran de travail. Le PDF était généré dans le navigateur via react-pdf, produisant un document avec du texte enrichi correctement sélectionnable plutôt qu'une image matricielle. Pour un rapport destiné à être partagé, annoté et cité, la qualité du texte n'est pas une préoccupation cosmétique.

**Développement assisté par l'IA :** J'ai utilisé des outils IA tout au long du projet ; de l'itération préalable et du prototypage jusqu'à l'implémentation. Pour une fonctionnalité de cette envergure, cette approche a le gain de temps était considérable.

![La qualité de la génération PDF dans le navigateur permettait de le partager facilement avec les parties prenantes](/images/agentic-analysis-report/pdf-report-example.png "Aperçu d'une page de l'export PDF")

## Mise en production par étapes

La fonctionnalité a été mise en production par phases :

- **T4 2025 :** Première version du rapport : génération, affichage, graphique, rendu Markdown, états intermédiaires et d'erreur
- **Fin T1 2026 :** Export PDF dans le navigateur
- **T1-T2 2026 :** Workflow de filtrage ; refactorisation du composant de filtre composable
- **T2 2026 :** Panneau agentique ; feuille de route pour retirer Focus Recommendations
- **T2-T3 2026 :** Support multilingue (en QA au moment de la rédaction)

## Résultat

Le Rapport d'analyse agentique est devenu une fonctionnalité phare pour les démos et les événements sectoriels, générant un fort enthousiasme auprès des clients potentiels. Le cycle de vente était trop long pour attribuer des contrats signés au moment de mon départ, mais l'accueil lors de la phase bêta était le plus fort de toutes les fonctionnalités lancées pendant mon passage dans l'entreprise.
