import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Conditions Générales de Vente
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Dernière mise à jour : {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-8 space-y-8">
          {/* Article 1 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Article 1 - Objet et Champ d'Application
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Les présentes conditions générales de vente s'appliquent à toutes les ventes conclues sur le site Internet [Nom du Site], entre le vendeur et les clients non professionnels, ci-après dénommés "le Client".
            </p>
          </section>

          {/* Article 2 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Article 2 - Prix
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Les prix de nos produits sont indiqués en euros toutes taxes comprises (TVA + autres taxes applicables), hors participation aux frais de traitement et d'expédition.
            </p>
          </section>

          {/* Article 3 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Article 3 - Commandes
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Les informations contractuelles sont présentées en langue française et feront l'objet d'une confirmation au plus tard au moment de la validation de votre commande.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                La société se réserve le droit de ne pas enregistrer un paiement, et de ne pas confirmer une commande pour quelque raison que ce soit.
              </p>
            </div>
          </section>

          {/* Article 4 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Article 4 - Validation de la Commande
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Toute commande figurant sur le site Internet suppose l'adhésion aux présentes Conditions Générales. Toute confirmation de commande entraîne votre adhésion pleine et entière aux présentes conditions générales de vente.
            </p>
          </section>

          {/* Article 5 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Article 5 - Paiement
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Le fait de valider votre commande implique pour vous l'obligation de payer le prix indiqué. Le règlement de vos achats peut s'effectuer par carte bancaire ou selon les autres modalités affichées sur le site.
            </p>
          </section>

          {/* Article 6 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Article 6 - Rétractation
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Conformément aux dispositions de l'article L.121-21 du Code de la Consommation, vous disposez d'un délai de rétractation de 14 jours à compter de la réception de vos produits pour exercer votre droit de rétraction sans avoir à justifier de motifs ni à payer de pénalité.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Les retours sont à effectuer dans leur état d'origine et complets (emballage, accessoires, notice). Dans ce cadre, votre responsabilité est engagée. Tout dommage subi par le produit à cette occasion peut être de nature à faire échec au droit de rétractation.
              </p>
            </div>
          </section>

          {/* Article 7 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Article 7 - Disponibilité
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Nos produits sont proposés tant qu'ils sont visibles sur le site et dans la limite des stocks disponibles. En cas d'indisponibilité de produit après passation de votre commande, nous vous en informerons par mail.
            </p>
          </section>

          {/* Contact Section */}
          <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Des Questions ?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Si vous avez des questions concernant nos conditions générales de vente, n'hésitez pas à nous contacter.
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

export default TermsPage; 