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
    position: 'Design Engineer',
    company: 'Keatext',
    startDate: 'May 2021',
    description: [
      'Owned product design and front-end direction, serving as the bridge between design and engineering.',
      "Redesigned the core user experience for conversational AI that traditional UI patterns didn't address",
      'Partnered with product owners and engineers to shape roadmap and strategy, establishing design-to-development workflows that cut handoff loops',
      'Designed, built, and maintained production React + TypeScript components with interaction fidelity and accessibility at their core',
      'Converted fragmented UI work into a reusable component system with clear APIs, built on design tokens',
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
    position: 'Design Engineer',
    company: 'Keatext',
    startDate: 'Mai 2021',
    description: [
      'Responsable du design produit et de la direction front-end, assurant la liaison entre design et ingénierie.',
      "Refondu l'expérience utilisateur principale pour l'IA conversationnelle, que les patterns d'interface traditionnels ne prenaient pas en charge",
      'Collaboré avec les product owners et les ingénieurs pour façonner la feuille de route et la stratégie, en établissant des workflows design-développement réduisant les allers-retours de handoff',
      "Conçu, développé et maintenu des composants React + TypeScript de production, avec la fidélité des interactions et l'accessibilité au cœur",
      'Transformé une interface fragmenté en un système de composants réutilisables aux API claires, fondé sur des design tokens',
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

export const skills = {
  en: [
    'Agentic and LLM Interface Design',
    'Conversational UI',
    'Design Systems',
    'UX Design',
    'Accessibility',
    'React',
    'Figma',
    'TypeScript/JavaScript',
    'CSS',
    'Prototyping',
    'English (native)',
    'French',
  ],
  fr: [
    "Conception d'interfaces agentiques",
    'UI conversationnelle',
    'Systèmes de design',
    'Design UX',
    'Accessibilité',
    'React',
    'Figma',
    'TypeScript/JavaScript',
    'CSS',
    'Prototypage',
    'Anglais (natif)',
    'Français',
  ],
};

export default {
  en,
  fr,
};
