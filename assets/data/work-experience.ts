interface WorkExperienceItem {
  /** The title of the position */
  position: string;
  /** The company name */
  company: string;
  /** Start date */
  startDate: string;
  /** End date */
  endDate?: string;
  /** List items for the description */
  description: string[];
}

const en: WorkExperienceItem[] = [
  {
    position: 'UX/UI Developer',
    company: 'Keatext',
    startDate: 'May 2021',
    description: [
      'Drive user experience strategy and initiatives throughout the product team and organization',
      'Implement and facilitate design-development workflows',
      'Revamp and formalize existing design system',
      'Work with sketches, wireframes, and prototypes to communicate with stakeholders and validate concepts and hypotheses with end users',
      'Collaborate with product owners and developers to drive product strategy and the development roadmap',
    ],
  },
  {
    position: 'UX/UI Design Lead',
    company: 'Spartan Bioscience Inc.',
    startDate: 'June 2017',
    endDate: 'May 2021',
    description: [
      'Design and create interactive, high fidelity prototypes for medical software and training materials',
      'Design, build, and document a design system',
      'Build and maintain web-based support portal',
      'Collaborate with cross-functional teams including managers, developers, and executives',
      'Incorporate feedback from many channels into revisions',
    ],
  },
  {
    position: 'Marketing Coordinator',
    company: 'Spartan Bioscience Inc.',
    startDate: 'April 2015',
    endDate: 'June 2017',
    description: [
      'Assisted in user experience design',
      'Maintained company WordPress site and server',
      'Designed and produced marketing documents',
      'Coordinate conferences and display production',
      'Product photography',
    ],
  },
];

const fr: WorkExperienceItem[] = [
  {
    position: 'Développeur UX/UI',
    company: 'Keatext',
    startDate: 'mai 2021',
    description: [
      "Piloter la stratégie et les initiatives d'expérience utilisateur au sein de l'équipe produit et de l'organisation",
      'Implémenter et faciliter les flux de travail design-développement',
      'Réorganiser et formaliser le système de design existant',
      'Réaliser des prototypes pour communiquer avec les parties prenantes et valider les hypothèses avec les utilisateurs',
      'Collaborer avec les responsables de produit et les développeurs pour mener à bien la stratégie de produit et la feuille de route de développement',
    ],
  },
  {
    position: 'Concepteur UX/UI principal',
    company: 'Spartan Bioscience Inc.',
    startDate: 'juin 2017',
    endDate: 'mai 2021',
    description: [
      'Réaliser les designs et les prototypes de haute fidélité de logiciels médicaux et de matériel didactique',
      'Concevoir, développer et documenter un système de design',
      "Développer et maintenir un portail d'assistance en ligne",
      'Travailler en collaboration avec des équipes polyvalentes y compris des gestionnaires produits, des développeurs et des cadres',
      'Gérer un autre concepteur et former un futur concepteur UX',
    ],
  },
  {
    position: 'Coordinateur marketing',
    company: 'Spartan Bioscience Inc.',
    startDate: 'avril 2015',
    endDate: 'juin 2017',
    description: [
      'Aider au design UX',
      'Maintenir le site web et serveur de la compagnie',
      'Concevoir et produire les documents marketing',
      "Coordonner les conférences et la production d'affiches",
      'Faire de la photographie de produits',
    ],
  },
];

export default {
  en,
  fr,
};
