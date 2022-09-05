/**
 * @typedef WorkExperienceItem
 * @property {string} position The title of the position
 * @property {string} company The company name
 * @property {string} startDate
 * @property {string} [endDate]
 * @property {string[]} description
 */

/** @type {WorkExperienceItem[]} */
const experience = [
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
    position: 'Lead UX/UI Designer',
    company: 'Spartan Bioscience Inc.',
    startDate: 'Mar 2021',
    endDate: 'May 2021',
    description: [
      'Lead the design, implementation, and maintenance of Spartan’s customer visible product software, including multi-platform GUIs',
      'Create interactive, high fidelity prototypes for usability testing, and developer hand-off',
      'Work collaboratively with cross-functional teams including product managers, software developers, and executives',
      'Incorporate feedback from many channels into revisions',
    ],
  },
  {
    position: 'Creative Lead',
    company: 'Spartan Bioscience Inc.',
    startDate: 'Nov 2020',
    endDate: 'Mar 2021',
    description: [
      'Championed and maintained corporate design guidelines',
      'Designed and produced marketing documents and graphics',
      'Filmed, and edited video collateral',
      'Produced custom illustrations, icons, and photos',
    ],
  },
  {
    position: 'UX and Graphic Design Lead',
    company: 'Spartan Bioscience Inc.',
    startDate: 'Jun 2017',
    endDate: 'Nov 2020',
    description: [
      'Designed, prototyped, and tested medical device software',
      'Revised designs based on tests and UX research',
      'Worked closely with developers, assisting with code as needed',
      'Designed, built, and documented a design system',
      'Used this design system to redesign and build the company website',
      'Assisted in instructional design for technical workflows',
      'Designed, and produced and marketing and training materials',
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
      'Product photography',
    ],
  },
];
export default experience;
