import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Politique de Confidentialité
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Dernière mise à jour : {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité vous explique comment nous collectons, utilisons et protégeons vos informations personnelles.
            </p>
          </section>

          {/* Collecte des données */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Collecte des Données
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Nous collectons les informations que vous nous fournissez directement, notamment :
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Adresse postale</li>
                <li>Informations de paiement</li>
                <li>Historique des commandes</li>
              </ul>
            </div>
          </section>

          {/* Utilisation des données */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Utilisation des Données
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Nous utilisons vos données personnelles pour :
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Traiter vos commandes et assurer le service client</li>
                <li>Vous informer sur l'état de vos commandes</li>
                <li>Personnaliser votre expérience sur notre site</li>
                <li>Vous envoyer des communications marketing (avec votre consentement)</li>
                <li>Améliorer nos services et prévenir la fraude</li>
              </ul>
            </div>
          </section>

          {/* Protection des données */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Protection des Données
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisée.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Cookies
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil qui nous aident à :
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Mémoriser vos préférences</li>
                <li>Comprendre comment vous utilisez notre site</li>
                <li>Améliorer nos services</li>
                <li>Vous proposer des contenus personnalisés</li>
              </ul>
            </div>
          </section>

          {/* Vos droits */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Vos Droits
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification de vos données</li>
                <li>Droit à l'effacement de vos données</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité de vos données</li>
                <li>Droit d'opposition au traitement</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Nous Contacter
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Pour toute question concernant notre politique de confidentialité ou pour exercer vos droits, vous pouvez nous contacter :
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              Contactez-nous
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage; 