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
      'Develop and drive user experience strategy and initiatives throughout the product team and organization',
      'Act as the voice of customers in product development',
      'Responsible for creating a coherent user experience for products and digital platforms',
      'Work with sketches, wireframes, and prototypes to communicate with stakeholders and validate concepts and hypotheses with end users',
      'Collaborate with product owners and developers to drive product strategy and the development roadmap',
    ],
  },
  {
    position: 'UX/UI Design Lead',
    company: 'Spartan Bioscience Inc.',
    startDate: 'Jun 2017',
    endDate: 'May 2021',
    description: [
      'Design and create interactive, high fidelity prototypes for medical software and training materials',
      'Revise designs based on tests and UX research',
      'Design, build, and document a design system',
      'Build and maintain web-based support portal',
      'Work collaboratively with cross-functional teams including product managers, software developers, and executives',
      'Incorporate feedback from many channels into revisions',
    ],
  },
  {
    position: 'Marketing Coordinator',
    company: 'Spartan Bioscience Inc.',
    startDate: 'Apr 2015',
    endDate: 'Jun 2017',
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
      "Développer et piloter la strategie et les initiatives d'expérience utilisateur au sein de l'équipe produit et de l'organisation",
      'Être la voix des utilisateurs pendant le développement du produit',
      'Créer une expérience utilisateur cohérente pour des produits et des plateformes numériques',
      'Réaliser des prototypes pour communiquer avec les parties prenantes et valider les hypothèses avec les utilisateurs',
      'Collaborer avec les responsables de produit et les développeurs pour mener à bien la strategie de produit et la feuille de route de développement',
    ],
  },
  {
    position: 'Concepteur UX/UI principal',
    company: 'Spartan Bioscience Inc.',
    startDate: 'juin 2017',
    endDate: 'mai 2021',
    description: [
      'Réaliser les designs et les protoptypes de haute fidélité de logiciels médicaux et de matériels didactiques',
      'Réviser les designs en fonction des vérifications et des recherches UX',
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
      'Maintenir le siteweb et serveur de la compagnie',
      'Concevoir et produire les documents marketing',
      "Coordonner les conférences et la production d'affiches",
      'Faire de la photographie des produits',
    ],
  },
];

export default {
  en,
  fr,
};
