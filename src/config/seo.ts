export const seoConfig = {
  defaultTitle: 'ESIL Events - Votre Partenaire Événementiel',
  titleTemplate: '%s | ESIL Events',
  defaultDescription: 'ESIL Events vous accompagne dans l\'organisation de vos événements professionnels et particuliers. Découvrez nos services sur mesure.',
  defaultKeywords: 'événementiel, organisation événements, ESIL Events, événements professionnels, événements particuliers, organisation mariage, séminaires entreprise, conférences',
  siteUrl: 'https://esil-events.com', // À remplacer par votre URL réelle
  defaultImage: '/images/logo.png',
  social: {
    facebook: 'https://facebook.com/esilevents', // À remplacer par vos liens réels
    twitter: 'https://twitter.com/esilevents',
    instagram: 'https://instagram.com/esilevents',
    linkedin: 'https://linkedin.com/company/esil-events'
  },
  organization: {
    name: 'ESIL Events',
    logo: '/images/logo.png',
    contactEmail: 'contact@esil-events.com',
    phone: '+33-XXX-XXX-XXX', // À remplacer par votre numéro réel
    address: {
      street: '', // À remplir avec vos informations
      city: '',
      postalCode: '',
      country: 'France'
    }
  }
} as const; 