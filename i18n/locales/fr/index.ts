import type en from '../en';

type LangSchema = typeof en;

export default <LangSchema>{
  common: {
    contact: 'Travaillons ensemble',
    name: 'Alex Collier',
    translationMissing:
      "Désolé, cette section n'est pas encore disponible en français.",
    postTranslationMissing:
      "Désolé, cet article n'est pas encore disponible en français. Voici la version anglaise.",
    title: 'Design Engineer',
  },
  colorSwitcher: {
    switchToMode: 'Passer en mode {mode}',
    dark: 'sombre',
    light: 'clair',
  },
  navigation: {
    home: 'AC',
    about: 'À propos',
    work: 'Projets',
    contact: 'Contact',
  },
  home: {
    tag: "Moi, c'est Alex. Je donne forme aux expèriences {0}.",
    experienceType: 'réfléchies',
    description:
      "À la croisée du design et du développment frontend. Une solide expérience dans la conception et la mise en production d'interfaces pour des produits d'IA, incluant les interactions conversationnelles et fondées sur des LLM.",
  },
  about: {
    metaTitle: 'À propos',
    mainHeading: 'À propos',
    blurb:
      "Design Engineer à la croisée du design et de l'ingénierie front-end, avec une solide expérience dans la conception et la mise en production d'interfaces pour des produits d'IA, incluant les interactions conversationnelles et fondées sur des LLM.",
    resumeDownload: 'Télécharger mon CV',
    experienceHeading: 'Expérience professionelle',
    educationHeading: 'Éducation',
    bcomm: 'Baccalauréat en commerce, commerce international et marketing',
    toPresentDate: 'au présent',
    toDate: 'à',
    skillsHeading: 'Compétences',
    linksHeading: 'Liens',
  },
  contact: {
    metaTitle: 'Contact',
    mainHeading: 'Envie de collaborer ?',
    mainHeadingLine2: 'Écris-moi.',
    thankYouHeading: 'Merci',
    thankYouMessage: 'Ton message à été envoyé',
    thankYouMessageLine2: 'Je reviendrai vers toi dans les prochaines 48h.',
    contactFormNameLabel: 'Nom',
    contactFormEmailLabel: 'Adresse courriel',
    contactFormMessageLabel: 'Message',
    contactFormErrorMessage:
      "Une erreur s'est produite et ton message n'a pas pu être envoyé. Essaie de nouveau ou contacte-moi sur",
    send: 'Envoyer',
  },
  work: {
    metaTitle: 'Projets',
    mainHeading: 'Projets',
    clickToZoom: 'Cliquer pour développer 🔎',
    clickAnywhereToClose: 'Cliquer ou ESC pour fermer ❌',
  },
};
