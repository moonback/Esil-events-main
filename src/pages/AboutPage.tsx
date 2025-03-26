import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        {/* Hero Section avec image de fond */}
        <div className="relative bg-primary-700 dark:bg-primary-800">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://www.solutions-evenements.fr/images/carousel/fr/solev-4.webp"
              alt="Matériel événementiel"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative px-6 py-24 sm:px-12 sm:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-8">
                <img
                  src="/images/logo.png"
                  alt="ESIL Events Logo"
                  className="h-24 mx-auto mb-6"
                />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-4">
                ESIL Events Location
              </h1>
              <p className="mt-6 text-xl text-primary-100 max-w-3xl">
                Votre partenaire de confiance pour la location de matériel événementiel professionnel
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="px-6 py-12 sm:px-12">
          {/* Notre Mission avec image */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Notre Mission
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Nous mettons à votre disposition un large catalogue de matériel événementiel de qualité professionnelle. Notre mission est de vous fournir tout l'équipement nécessaire pour faire de vos événements une réussite totale.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="h-5 w-5 text-primary-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Équipement professionnel haut de gamme</span>
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="h-5 w-5 text-primary-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Livraison et installation incluses</span>
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="h-5 w-5 text-primary-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>Support technique 24/7</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/images/mission.jpg"
                  alt="Notre équipe en action"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* Notre Matériel avec cards améliorées */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Notre Matériel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
                <div className="relative h-48">
                  <img
                    src="/images/lighting.jpg"
                    alt="Équipement d'éclairage"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <svg className="absolute bottom-4 left-4 h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Éclairage</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Projecteurs LED dernière génération</li>
                    <li>• Machines à fumée professionnelles</li>
                    <li>• Systèmes de contrôle DMX</li>
                    <li>• Stroboscopes et lasers</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
                <div className="relative h-48">
                  <img
                    src="/images/sound.jpg"
                    alt="Équipement de sonorisation"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <svg className="absolute bottom-4 left-4 h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Sonorisation</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Systèmes line array professionnels</li>
                    <li>• Tables de mixage numériques</li>
                    <li>• Micros HF Shure et Sennheiser</li>
                    <li>• Retours de scène</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
                <div className="relative h-48">
                  <img
                    src="/images/furniture.jpg"
                    alt="Mobilier événementiel"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <svg className="absolute bottom-4 left-4 h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Mobilier & Structures</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Tentes et chapiteaux</li>
                    <li>• Mobilier design</li>
                    <li>• Bars et comptoirs</li>
                    <li>• Scènes et podiums</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Nos Avantages avec icônes */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Nos Avantages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-700 dark:to-gray-600 p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <svg className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Matériel Premium</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Équipements de grandes marques, régulièrement entretenus et testés pour garantir une performance optimale.
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-700 dark:to-gray-600 p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <svg className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Service Complet</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Livraison, installation, assistance technique et récupération du matériel inclus.
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-700 dark:to-gray-600 p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <svg className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Disponibilité</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Large stock de matériel pour répondre à vos besoins, même pour les événements de dernière minute.
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-700 dark:to-gray-600 p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <svg className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Expertise</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Conseils personnalisés pour choisir le matériel adapté à votre événement et votre budget.
                </p>
              </div>
            </div>
          </section>

          {/* Contact CTA amélioré */}
          <section className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0">
              <img
                src="/images/cta-bg.jpg"
                alt="Background"
                className="w-full h-full object-cover opacity-20"
              />
            </div>
            <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900 p-12 rounded-2xl text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Besoin de Matériel pour Votre Événement ?
              </h2>
              <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
                Contactez-nous pour obtenir un devis personnalisé et découvrir notre catalogue complet. Notre équipe est à votre disposition pour vous conseiller.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-lg text-white bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-105"
                >
                  <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Demander un Devis
                </a>
                <a
                  href="/catalogue"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-lg text-white hover:bg-white hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 transform hover:scale-105"
                >
                  Voir le Catalogue
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 