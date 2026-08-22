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
    company: 'Volume7',
    startDate: 'July 2026',
    description: [
      'Work across design and frontend development, moving between Figma and production code on the same client projects',
      'Shipped frontend improvements to a live client product, resolving interaction defects and modernizing legacy UI',
      'Building new B2B credit limit review features, carrying flows from design through implementation',
      'Led discussions on how the team organizes design and development work as the org scales, covering handoff process and shared conventions',
    ],
  },
  {
    position: 'UX Engineer',
    company: 'Keatext',
    startDate: 'May 2021',
    endDate: 'May 2026',
    description: [
      'Owned product design and frontend direction for an AI analytics platform, serving as the bridge between design and engineering across the full product lifecycle',
      'Designed and shipped the interface for an agentic analysis product, including an LLM-driven report with custom data visualization and a conversational interface for interrogating results',
      'Redesigned the core experience for conversational AI where traditional UI patterns broke down, defining interaction models for streaming, uncertainty, and agent-initiated actions',
      'Converted a fragmented UI into a reusable component system built on design tokens, then maintained it as production React and TypeScript with accessibility and interaction fidelity as requirements, not polish',
      'Built token export and import tooling against the Figma API before the platform supported variables natively, keeping design and code in sync from a single source',
      'Established design-to-development workflows with product owners and engineers that cut handoff loops and made design decisions legible in code',
    ],
  },
  {
    position: 'UX/UI Design Lead',
    company: 'Spartan Bioscience',
    startDate: 'June 2017',
    endDate: 'May 2021',
    description: [
      'Built a design system from scratch, components, documentation, and Storybook, for medical device software in a regulated environment',
      'Designed and built high-fidelity prototypes and production interfaces for diagnostic software and training products',
      'Contributed design documentation to FDA 510(k) submissions and shipped HIPAA-compliant product surfaces',
      'Developed and maintained a customer support portal and corporate site with headless CMS integration',
      'Worked directly with engineering, management, and executive leadership to move design decisions forward',
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
    ],
  },
];

const fr: WorkExperienceItem[] = [
  {
    position: 'Design Engineer',
    company: 'Volume7',
    startDate: 'juillet 2026',
    description: [
      'Travail à la fois en design et en développement front-end, en passant de Figma au code de production sur les mêmes projets clients',
      "Livraison d'améliorations front-end sur un produit client en production, en corrigeant des défauts d'interaction et en modernisant une interface existante",
      "Développement de nouvelles fonctionnalités B2B de révision des limites de crédit, du design jusqu'à l'implémentation",
      "Animation des discussions sur l'organisation du travail design et développement à mesure que l'équipe grandit, incluant le processus de passation et les conventions communes",
    ],
  },
  {
    position: 'UX Engineer',
    company: 'Keatext',
    startDate: 'mai 2021',
    endDate: 'mai 2026',
    description: [
      "Responsable du design produit et de la direction front-end d'une plateforme d'analyse par IA, assurant la liaison entre design et ingénierie sur tout le cycle de vie du produit",
      "Conception et livraison de l'interface d'un produit d'analyse agentique, incluant un rapport généré par LLM avec des visualisations de données sur mesure et une interface conversationnelle pour interroger les résultats",
      "Refonte de l'expérience principale pour l'IA conversationnelle, là où les conventions d'interface traditionnelles ne tenaient plus, en définissant les modèles d'interaction pour le streaming, l'incertitude et les actions initiées par l'agent",
      "Transformation d'une interface fragmentée en système de composants réutilisables basé sur des design tokens, puis maintien en React et TypeScript de production, avec l'accessibilité et la fidélité des interactions comme exigences et non comme finition",
      "Développement d'outils d'export et d'import de tokens via l'API Figma, avant que la plateforme ne prenne en charge les variables nativement, gardant design et code synchronisés à partir d'une source unique",
      'Mise en place de flux de travail design-développement avec les product owners et les ingénieurs, réduisant les allers-retours de passation et rendant les décisions de design lisibles dans le code',
    ],
  },
  {
    position: 'UX/UI Design Lead',
    company: 'Spartan Bioscience',
    startDate: 'juin 2017',
    endDate: 'mai 2021',
    description: [
      "Création d'un système de design à partir de zéro, composants, documentation et Storybook, pour des logiciels de dispositifs médicaux en environnement réglementé",
      "Conception et réalisation de prototypes haute-fidélité et d'interfaces de production pour des logiciels de diagnostic et des produits de formation",
      'Contribution à la documentation de design des dossiers réglementaires FDA 510(k) et livraison de fonctionnalités produit conformes à la HIPAA',
      "Mise en œuvre et maintenance d'un portail d'assistance client et d'un site d'entreprise avec intégration CMS headless",
      "Collaboration directe avec l'ingénierie, la gestion et la direction générale pour faire avancer les décisions de design",
    ],
  },
  {
    position: 'Marketing Coordinator',
    company: 'Spartan Bioscience',
    startDate: 'avril 2015',
    endDate: 'juin 2017',
    description: [
      "Participation aux initiatives de design UX et produit aux côtés de l'équipe principale",
      "Gestion du site WordPress de l'entreprise et de l'infrastructure serveur",
    ],
  },
];

export const skills = {
  en: [
    'Design Systems',
    'Tokens & Component Architecture',
    'Agentic and LLM Interface Design',
    'Conversational UI',
    'UX Design',
    'Accessibility',
    'Prototyping',
    'React',
    'Vue/Nuxt',
    'TypeScript/JavaScript',
    'CSS',
    'Figma',
    'Figma API',
    'Storybook',
    'AI-assisted Workflows',
  ],
  fr: [
    'Systèmes de design',
    'Tokens et architecture de composants',
    "Conception d'interfaces agentiques et LLM",
    'UI conversationnelle',
    'Design UX',
    'Accessibilité',
    'Prototypage',
    'React',
    'Vue/Nuxt',
    'TypeScript/JavaScript',
    'CSS',
    'Figma',
    'API Figma',
    'Storybook',
    'Flux de travail assistés par IA',
  ],
};

export const languages = {
  en: ['English (native)', 'French'],
  fr: ['Anglais (natif)', 'Français'],
};

export default {
  en,
  fr,
};
