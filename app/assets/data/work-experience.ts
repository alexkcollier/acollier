interface WorkExperienceItem {
  /** The company name */
  company: string;
  /** Roles held at the company, most recent first */
  roles: string[];
  /** Start date */
  startDate: string;
  /** End date */
  endDate?: string;
  /** Prose describing the work, one entry per paragraph */
  body: string[];
}

const en: WorkExperienceItem[] = [
  {
    company: 'Volume7',
    roles: ['Design Engineer'],
    startDate: 'July 2026',
    body: [
      'I work across design and frontend development, moving between Figma and production code on the same client projects. Building the thing I designed changes how I design the next one, so I try to stay on both sides of that line.',
      "So far I've shipped frontend improvements to a live client product, fixing interaction defects and modernizing older UI, and I'm building new B2B credit limit review features from the first designs through to implementation. The team is growing, so I've also been helping work out how we organize design and development, including how work gets handed off and which conventions we hold in common.",
    ],
  },
  {
    company: 'Keatext',
    roles: ['UX Engineer'],
    startDate: 'May 2021',
    endDate: 'May 2026',
    body: [
      "For five years I owned product design and frontend direction for an AI analytics platform, sitting between design and engineering for the whole product lifecycle. The work I liked most was the interface for an agentic analysis product: an LLM-generated report with custom data visualization, plus a conversational interface for digging into the results. Traditional UI patterns don't hold up well in conversational AI, so a lot of the job was working out interaction models for things like streaming output, uncertain answers, and actions the agent takes on its own.",
      'The rest of the job was systems work. I turned a fragmented UI into a reusable component system built on design tokens, then maintained it as production React and TypeScript, with accessibility and interaction fidelity treated as requirements rather than finishing touches. Figma had no support for variables yet, so I built token export and import tooling against its API to keep design and code working from one source. I also set up design to development workflows with product owners and engineers, which cut down handoff loops and made design decisions easier to follow in code.',
    ],
  },
  {
    company: 'Spartan Bioscience',
    roles: ['UX/UI Design Lead', 'Marketing Coordinator'],
    startDate: 'April 2015',
    endDate: 'May 2021',
    body: [
      'I was at Spartan for six years, starting in marketing and moving into design. As Marketing Coordinator I worked on UX and product design with the core team while looking after the company WordPress site and its server infrastructure. I took over design in 2017.',
      'After that I built a design system from scratch for medical device software in a regulated environment, covering components, documentation, and Storybook. I designed and built high fidelity prototypes and production interfaces for diagnostic software and training products. Because the environment was regulated, my design documentation fed into FDA 510(k) submissions and anything I shipped had to be HIPAA compliant. I also built and maintained a customer support portal and the corporate site on a headless CMS, working directly with engineering, management, and executive leadership.',
    ],
  },
];

const fr: WorkExperienceItem[] = [
  {
    company: 'Volume7',
    roles: ['Design Engineer'],
    startDate: 'juillet 2026',
    body: [
      "Je travaille à la fois en design et en développement front-end, en passant de Figma au code de production sur les mêmes projets clients. Développer ce que j'ai conçu change ma façon de concevoir la fois suivante, alors j'essaie de rester des deux côtés de cette ligne.",
      "Jusqu'ici, j'ai livré des améliorations front-end sur un produit client en production, en corrigeant des défauts d'interaction et en modernisant une interface vieillissante, et je développe de nouvelles fonctionnalités B2B de révision des limites de crédit, des premières maquettes jusqu'à l'implémentation. Comme l'équipe grandit, j'aide aussi à définir la façon dont nous organisons le design et le développement, y compris le processus de passation et les conventions que nous partageons.",
    ],
  },
  {
    company: 'Keatext',
    roles: ['UX Engineer'],
    startDate: 'mai 2021',
    endDate: 'mai 2026',
    body: [
      "Pendant cinq ans, j'ai été responsable du design produit et de la direction front-end d'une plateforme d'analyse par IA, entre le design et l'ingénierie sur tout le cycle de vie du produit. Ce que j'ai préféré, c'est l'interface d'un produit d'analyse agentique : un rapport généré par LLM avec des visualisations de données sur mesure, et une interface conversationnelle pour creuser les résultats. Les conventions d'interface traditionnelles tiennent mal en IA conversationnelle, alors une bonne partie du travail a consisté à trouver des modèles d'interaction pour le streaming, pour les réponses incertaines et pour les actions que l'agent entreprend de lui-même.",
      "Le reste du poste relevait des systèmes. J'ai transformé une interface fragmentée en système de composants réutilisables basé sur des design tokens, puis je l'ai maintenu en React et TypeScript de production, avec l'accessibilité et la fidélité des interactions traitées comme des exigences plutôt que comme des finitions. Figma ne prenait pas encore en charge les variables, alors j'ai développé des outils d'export et d'import de tokens via son API pour que le design et le code travaillent à partir d'une seule source. J'ai aussi mis en place des flux de travail design-développement avec les product owners et les ingénieurs, ce qui a réduit les allers-retours de passation et rendu les décisions de design plus faciles à suivre dans le code.",
    ],
  },
  {
    company: 'Spartan Bioscience',
    roles: ['UX/UI Design Lead', 'Marketing Coordinator'],
    startDate: 'avril 2015',
    endDate: 'mai 2021',
    body: [
      "J'ai passé six ans chez Spartan, en commençant du côté marketing avant de passer au design. Comme Marketing Coordinator, je travaillais sur le design UX et produit avec l'équipe principale, tout en m'occupant du site WordPress de l'entreprise et de son infrastructure serveur. J'ai pris la direction du design en 2017.",
      "J'ai ensuite créé un système de design à partir de zéro pour des logiciels de dispositifs médicaux en environnement réglementé, avec les composants, la documentation et Storybook. J'ai conçu et réalisé des prototypes haute-fidélité et des interfaces de production pour des logiciels de diagnostic et des produits de formation. Le contexte réglementaire faisait que ma documentation de design alimentait les dossiers réglementaires FDA 510(k) et que tout ce que je livrais devait être conforme à la HIPAA. J'ai aussi développé et maintenu un portail d'assistance client et le site d'entreprise sur un CMS headless, en collaborant directement avec l'ingénierie, la gestion et la direction générale.",
    ],
  },
];

export default {
  en,
  fr,
};
