---
title: Focus Recommendations
order: 1
tags: [Design, Development, Data]
featured: true
featureImage: '/images/focus-recommendations/focus-recommendations-thumbnail.png'
description: Outil d'analyse des facteurs clés pour les scores de satisfaction CX
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

# Focus Recommendations

![Focus Recommendations offrait des insights clés sur ce qui nécessitait de l'attention sur le moment](/images/focus-recommendations/focus-recommendations-feature.png 'La page Focus Recommendations')

## En résumé

J'ai conçu de zéro Focus Recommendations, l'approche de la plateforme pour l'analyse des facteurs clés. La fonctionnalité traduisait en insights actionnables, pour les professionnels CX, les données complexes de corrélation et de satisfaction fournies par l'équipe NLP/stats : quels sujets influençaient leurs scores, et où concentrer leurs efforts. Mise en production en août 2022, elle a ensuite intégré des recommandations générées par IA et est devenue une fonctionnalité phare en démo et un facteur décisif dans la conversion de clients. À mesure que le produit évoluait, j'ai identifié qu'une fonctionnalité plus récente avait supplanté la majeure partie de ses capacités, et j'ai proposé la feuille de route pour la retirer.

## Contexte

**Mon rôle :** Conception de bout en bout, tests internes et itération, contributions à l'implémentation sur le graphique FR et les widgets Actionable Insights

**Calendrier :** Première mise en production août 2022. Actionable Insights octobre 2023

## L'opportunité

Rien dans le produit ne ressemblait à Focus Recommendations avant son existence. La plateforme était déjà performante pour faire remonter ce que les clients disaient, mais elle n'indiquait pas aux clients quoi en faire. FR a été conçue pour combler cet écart : pas seulement de l'analyse, mais des recommandations. Un client pouvait voir quels sujets influençaient son score de satisfaction (NPS, CSAT ou autre échelle) à la hausse ou à la baisse, et où concentrer ses efforts.

Le concept initial venait de l'équipe NLP/stats. Mon rôle était de le traduire en quelque chose qu'un professionnel CX construisant des rapports pour ses parties prenantes pouvait réellement utiliser.

## Ce que j'ai fait

J'ai piloté la conception de bout en bout, traduisant le concept statistique en quelque chose d'utilisable, testant et itérant en interne, et contribuant à l'implémentation sur le graphique FR et les widgets Actionable Insights.

Trois problèmes de conception ont défini le projet.

### Traduire la corrélation en visuel

Le graphique à quatre quadrants donnait la vue d'ensemble. Représenter les sujets par corrélation et score de satisfaction moyen rendait les priorités immédiatement claires. Le problème plus difficile était la vue tableau : communiquer la même information à l'échelle d'un sujet, dans une seule icône, sans que les utilisateurs aient à comprendre ce que signifie la corrélation.

![Le graphique permet d'identifier rapidement ce qui nécessite réellement attention](/images/focus-recommendations/focus-recommendations-chart.png 'Gros plan sur le graphique')

J'ai opté pour une icône en forme de cible : trois anneaux concentriques, où plus d'anneaux remplis indiquaient un impact plus fort. L'impact positif ou négatif était communiqué par la couleur (vert pour positif, rouge pour négatif), en rompant délibérément avec notre palette compliment/problème, puisque cette analyse est basée sur les scores de satisfaction plutôt que sur nos catégories de sentiment. Une icône de flèche et un pourcentage de corrélation renforçaient la direction pour les utilisateurs daltoniens.

![Les icônes d'impact exprimaient l'ampleur et la polarité](/images/focus-recommendations/target-icons.png 'Variantes des icônes cible')

![La vue tableau montre un peu plus de détail](/images/focus-recommendations/table-view.png)

La première version utilisait un seuil absolu pour déterminer combien d'anneaux remplir. Les tests ont révélé le problème : les jeux de données varient considérablement d'un client à l'autre, et les seuils absolus produisaient des résultats très incohérents : certains clients voyant surtout des sujets à trois anneaux, d'autres surtout à un. On est passé à un calcul relatif, en fixant les seuils par rapport à la distribution des résultats dans chaque jeu de données. L'icône est devenue stable et significative quelle que soit la nature du jeu de données. Les libellés ont suivi une itération similaire. Le langage décrivant les quadrants et les niveaux d'impact devait être précis sans nécessiter de formation en statistiques.

### Aller au-delà du NPS

La première mise en production supportait une paire notation-réponse NPS unique, le cas le plus courant mais qui excluait les clients utilisant d'autres échelles de satisfaction ou réalisant des sondages complexes avec plusieurs paires notation-réponse.

On a étendu la couverture par étapes. D'abord, une fenêtre modale permettant aux utilisateurs d'ordonner n'importe quel champ (numérique, ou non numérique, une échelle de Likert par exemple) du moins satisfait au plus satisfait et de l'utiliser comme variable de réponse. Puis le support de plusieurs paires notation-réponse, permettant l'analyse de sondages contenant plusieurs ensembles de questions, un déblocage majeur pour les clients entreprise réalisant des recherches complexes.

![Les notes pouvaient être facilement réordonnées en termes de satisfaction](/images/focus-recommendations/ratings-configuration.png 'La fenêtre de configuration des notes')

### Actionable Insights

En octobre 2023, on a ajouté Actionable Insights : des recommandations générées par IA sur la façon d'améliorer les sujets identifiés comme facteurs clés. Plutôt que de faire remonter des recommandations pour chaque sujet, j'ai défini des critères de sélection (les trois facteurs négatifs les plus corrélés et les trois positifs les plus corrélés), gardant les résultats ciblés et exploitables plutôt qu'exhaustifs.

Les recommandations apparaissaient sous forme de cartes paginées au-dessus du graphique, chacune couvrant un sujet unique avec la possibilité de développer pour plus de détails. J'ai inclus un mécanisme de rejet sur chaque carte, qui servait deux objectifs : permettre aux utilisateurs d'effacer les recommandations sur lesquelles ils avaient agi ou qu'ils trouvaient non pertinentes, et nous donner un signal de feedback implicite sur la qualité des recommandations. Un export PDF du résumé complet des recommandations soutenait le workflow des clients construisant des rapports pour les parties prenantes.

La liste des opinions clés dans la vue tableau a également été migrée vers un résumé généré par IA à ce moment-là, réduisant le bruit et améliorant la lisibilité.

![Actionable Insights fournit de vraies recommandations pour améliorer la satisfaction](/images/focus-recommendations/actionable-insights.png 'Les cartes Actionable Insights')

## Ce qui a suivi

Alors que le Rapport d'analyse agentique approchait de la fin de sa bêta, j'ai constaté que les deux fonctionnalités avaient largement convergé. Le Rapport d'analyse agentique utilisait l'élasticité (présentée aux utilisateurs comme « impact » pour garder le langage accessible) et organisait ses quadrants différemment : points forts, points faibles, souhaitable, et un quatrième intentionnellement sans libellé. Il faisait presque tout ce que faisait Focus Recommendations, avec plus de détails et une meilleure méthodologie.

L'écart était étroit mais réel : le Rapport d'analyse agentique ne supportait pas encore les champs non-NPS ni les sondages complexes multi-paires. J'ai rédigé une feuille de route pour amener les deux fonctionnalités à parité et retirer Focus Recommendations, l'ai présentée au responsable produit, validé l'approche, et transformé les éléments en tickets de backlog priorisés. Les principales lacunes à combler étaient le support des champs non-NPS et des sondages complexes multi-paires dans le Rapport d'analyse agentique, et l'intégration de son graphique impact-satisfaction au tableau de bord. Des ensembles de filtres réutilisables et enregistrables étaient aussi sur la liste, avec une priorité moindre.

Ce n'était pas une décision prise dès le départ. C'était une décision produit que j'ai formulée à mesure que les deux fonctionnalités convergeaient, vers la fin de la bêta du Rapport d'analyse agentique.

_Le widget tableau de bord qui a intégré Focus Recommendations dans le produit plus large est décrit dans l'[étude de cas Tableau de bord personnalisable ->](/work/customizable-dashboard)._

## Résultat

Focus Recommendations a été mise en production en août 2022 et est devenue une fonctionnalité phare en démo et un facteur dans la conversion d'au moins un client. Elle a représenté une expansion notable de la proposition de valeur du produit, passant de faire remonter ce que les clients disaient à indiquer aux clients quoi en faire. L'approche qu'elle a validée a été reprise et améliorée dans le Rapport d'analyse agentique.
