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
      'Led product design while playing a central role in front-end direction and implementation',
      'Partnered with product owners and engineers to shape strategy and the development roadmap',
      'Established design-to-development workflows that reduced handoff loops and bespoke one-off UI',
      'Designed, built and maintained production-grade React + TypeScript components with interaction fidelity and accessibility at their core',
      'Converted fragmented UI work into reusable system components with clear APIs, built on design tokens',
    ],
  },
  {
    position: 'UX/UI Design Lead',
    company: 'Spartan Bioscience',
    startDate: 'June 2017',
    endDate: 'May 2021',
    description: [
      'Designed and built interactive, high-fidelity prototypes and production interfaces for medical software and training products',
      'Built a design system from the ground up with full documentation in Storybook',
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
    position: 'Ingénieur UX',
    company: 'Keatext',
    startDate: 'Mai 2021',
    description: [
      "Direction du design produit, avec un rôle central dans l'orientation et l'implémentation front-end",
      'Collaboration avec les chefs de produit et les ingénieurs pour définir la stratégie et la feuille de route',
      'Mise en place de flux de travail design-vers-développement réduisant les cycles de transfert',
      "Conception, développement et maintenance de composants React + TypeScript centrés sur l'accessibilité et la fidélité d'interaction",
      "Transformation d'éléments d'interface fragmentés en composants système réutilisables avec des API claires, fondés sur des tokens de design",
    ],
  },
  {
    position: 'Concepteur UX/UI principal',
    company: 'Spartan Bioscience',
    startDate: 'Juin 2017',
    endDate: 'Mai 2021',
    description: [
      "Développement d'un système de design de zéro avec une documentation complète dans Storybook",
      'Création de prototypes interactifs et hautes-fidélités ainsi que des interfaces de production pour des logiciels médicaux et leurs produits de formation',
      "Mise en œuvre et maintenance d'un portail d'assistance client et d'un site corporatif avec intégration CMS headless",
      'Collaboration avec des équipes transversales regroupant ingénierie, gestion et direction générale',
      'Synthétisation de retours multicanaux en révisions itératives, en maintenant une source de vérité unique',
    ],
  },
  {
    position: 'Coordinateur marketing',
    company: 'Spartan Bioscience',
    startDate: 'Avril 2015',
    endDate: 'Juin 2017',
    description: [
      "Participation aux initiatives de design UX et produit aux côtés de l'équipe principale",
      "Gestion du site WordPress de l'entreprise et l'infrastructure serveur",
      'Production de supports marketing, de documentation de formation et de matériaux de conférence',
    ],
  },
];

export default {
  en,
  fr,
};
