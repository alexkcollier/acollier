---
title: Interface du test ADN, homologuée FDA
order: 7
tags: [Design, Medical]
description: Une interface pour dispositif médical conçue pour la facilité d'utilisation.
featureImage: '/images/dna-test-ui/cyp2c19-feature.png'
tools:
  - {
      name: Adobe XD,
      img: /images/tools/xd.svg,
      href: https://www.adobe.com/ca/products/xd.html,
    }
---

# Interface du test ADN, homologuée FDA

![Interface du test ADN, homologuée FDA](/images/dna-test-ui/cyp2c19-feature.png 'Interface du test ADN, homologuée FDA')

L'interface du test ADN est la composante logicielle du CYP2C19 de Spartan Bio, un test ADN rapide exécuté sur l'analyseur Spartan Cube. J'ai dirigé la conception avec un autre designer, ayant l'approbation finale sur les décisions, à travers le processus formel de contrôle de design de Spartan. Le produit a reçu l'homologation FDA et est toujours commercialisé par l'entreprise qui a acquis les actifs de Spartan.

## Le défi

Les logiciels de dispositifs médicaux opèrent sous des contraintes strictes. Les exigences sont définies tôt, la documentation est rigoureuse, et les modifications après la soumission réglementaire ont des coûts significatifs à travers toute l'organisation. Bien concevoir avant la soumission est essentiel.

L'objectif initial était une désignation CLIA waived de la FDA, ce qui aurait permis à quiconque d'effectuer le test avec une formation minimale (comparable à un glucomètre). La chimie du test l'a finalement placé en haute complexité, mais la cible de design a façonné notre approche tout au long : les instructions devaient être suffisamment claires pour les non-spécialistes, les workflows devaient être suffisamment fiables pour être exécutés sans erreur, et l'interface devait résister à l'examen minutieux.

Les fonctionnalités ont été définies lors des phases de concept et de faisabilité, en parallèle des exigences réglementaires, techniques et des utilisateurs finaux :

- Workflows guidés pour effectuer un test ou un contrôle
- Un journal recherchable des résultats de tests et de contrôles
- Connexions utilisateur et permissions pour protéger les données patient
- Un verrouillage optionnel basé sur le temps
- Un module de formation optionnel

Nous avons construit des prototypes dans XD et utilisé ses fonctionnalités de transfert dans une boucle étroite avec notre développeur Windows, affinant les exigences en continu tout au long du processus.

![Interface du test ADN dans XD](/images/dna-test-ui/cyp2c19-xd.png 'Interface du test ADN dans XD')

## Workflows guidés

S'assurer que les utilisateurs pouvaient réussir le test à chaque fois était au cœur de la valeur du produit. Le workflow guidé fournissait des instructions étape par étape et des illustrations à chaque étape, afin que les utilisateurs n'aient jamais à deviner ce qui venait ensuite. Pour l'étape la plus critique et complexe (taper et mélanger l'échantillon), nous avons intégré une vidéo directement dans l'interface.

<video src="/images/dna-test-ui/cyp2c19-workflow.webm" controls preload="none" muted poster="/images/dna-test-ui/cyp2c19-feature.png"></video>

## Journal de résultats

Le journal donnait aux utilisateurs accès à tous les résultats passés de tests et de contrôles, recherchables au fur et à mesure de l'accumulation des enregistrements. La sélection d'un résultat affichait des détails étendus. Une fonctionnalité d'export supportait les utilisateurs qui maintenaient leurs propres systèmes de gestion des dossiers en dehors du dispositif.

![Journal de résultats vide](/images/dna-test-ui/log-empty.png 'Journal de résultats vide')
![Journal de résultats rempli](/images/dna-test-ui/log.png 'Journal de résultats rempli')
![Journal filtré sur les contrôles](/images/dna-test-ui/log-search.png 'Journal filtré sur les contrôles')
![Écran de résultat](/images/dna-test-ui/result.png 'Écran de résultat')

## Connexions et sécurité

Les connexions utilisateur protégeaient les données patient potentiellement sensibles. Le formulaire de connexion donnait un retour clair sur les tentatives échouées sans révéler quelle information d'identification était incorrecte. Les utilisateurs pouvaient également scanner un code-barres pour s'authentifier, un pattern courant dans les environnements cliniques où le personnel scanne ses badges pour accéder aux équipements.

![Écran de connexion](/images/dna-test-ui/login.png 'Écran de connexion')

![La validation des informations d'identification indique seulement qu'il y a une erreur, sans préciser laquelle](/images/dna-test-ui/login.png "Informations d'identification invalides")

Un verrouillage optionnel basé sur le temps permettait aux utilisateurs de sécuriser le système en leur absence. Comme le dispositif peut exécuter un test alors qu'il est verrouillé, nous avons ajouté le statut du test à l'écran de verrouillage ; avec un seul ordinateur par Cube, il était important d'indiquer si le système était occupé.

![Système verrouillé avec test en cours](/images/dna-test-ui/lock-screen.png 'Système verrouillé avec test en cours')

La gestion des paramètres et des utilisateurs était réservée à l'administrateur système.

![Paramètres système](/images/dna-test-ui/settings.png 'Paramètres système')
![Paramètres utilisateurs](/images/dna-test-ui/settings-users.png 'Paramètres utilisateurs')

## Module de formation

Un module de formation intégré guidait les utilisateurs à travers le workflow complet, de la collecte d'échantillons au fonctionnement de l'analyseur, avec des instructions claires et des conseils complémentaires à chaque étape. Cela soutenait l'objectif de minimiser la charge de formation pour les nouveaux utilisateurs.

![Module de formation](/images/dna-test-ui/training.png 'Module de formation')

## Résultat

La plateforme de test ADN a reçu l'homologation FDA. La désignation CLIA waived vers laquelle nous avions conçu n'a pas été obtenue (une question de chimie du test, pas du logiciel), mais l'approche de conception a résisté au processus réglementaire. Une version du produit est toujours commercialisée par l'entreprise qui a acquis les actifs de Spartan.
