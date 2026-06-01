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
    position: 'UX Engineer',
    company: 'Keatext',
    startDate: 'May 2021',
    description: [
      'Led UX strategy and product initiatives across the team and organization',
      'Designed, built and maintained production-grade React + TypeScript components with interaction fidelity and accessibility at their core',
      'Established design-to-development workflows that reduced handoff loops and bespoke one-off UI',
      'Converted fragmented UI work into reusable system components with clear APIs, built on design tokens',
      'Partnered with product owners and engineers to shape strategy and the development roadmap',
    ],
  },
  {
    position: 'UX/UI Design Lead',
    company: 'Spartan Bioscience',
    startDate: 'June 2017',
    endDate: 'May 2021',
    description: [
      'Built a design system from the ground up with full documentation in Storybook',
      'Designed and built interactive, high-fidelity prototypes and production interfaces for medical software and training products',
      'Developed and maintained a web-based customer support portal and corporate site with headless CMS integration',
      'Collaborated with cross-functional teams spanning engineering, management, and executive leadership',
      'Synthesized multi-channel feedback into iterative design revisions, maintaining a single source of truth',
    ],
  },
  {
    position: 'Marketing Coordinator',
    company: 'Spartan Bioscience',
    startDate: 'April 2015',
    endDate: 'June 2017',
    description: [
      'Contributed to UX and product design alongside the core team',
      'Managed the company WordPress site and server infrastructure',
      'Designed marketing collateral, training documentation, and conference materials',
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
