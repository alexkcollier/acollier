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
    seeMyWork: 'Voir mes projets',
    viewAllWork: 'Voir tous les projets',
  },
  colorSwitcher: {
    switchToMode: 'Passer en mode {mode}',
    dark: 'sombre',
    light: 'clair',
  },
  navigation: {
    about: 'À propos',
    work: 'Projets',
    contact: 'Contact',
  },
  home: {
    tag: "Moi, c'est Alex. Je donne forme aux expériences {0}.",
    experienceType: 'réfléchies',
  },
  about: {
    metaTitle: 'À propos',
    mainHeading: 'À propos',
    blurb:
      "À l'aise dans les environnements complexes, j'ai près de 10 ans d'expérience en conception, notamment pour les tests médicaux et scientifiques, et pour des expériences agentiques.",
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
    thankYouMessage: 'Ton message a été envoyé',
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
    onThisPage: 'Sur cette page',
    tags: 'Tags',
    builtWith: 'Réalisé avec',
    links: 'Liens',
  },
  chat: {
    formLabel: 'Clavardage',
    placeholder: "Qu'est-ce que tu aimerais savoir ?",
    send: 'Envoyer',
    stop: 'Arrêter',
    scrollToEnd: 'Défiler vers le bas',
    thinking: 'En train de réfléchir…',
    you: 'Tu',
    assistant: 'Assistant',
    featuredWork: 'Ou, vas directement à mes projets :',
  },
};
