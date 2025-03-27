import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Package, Clock, PenTool as Tool, CheckCircle } from 'lucide-react';

const DeliveryPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-48 pb-16 px-4">
      <div className="container-custom mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Livraison et installation du matériel événementiel</h1>
        
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-center">
            Chez ESIL Events, nous vous proposons trois solutions adaptées à vos besoins pour la livraison et l'installation de votre matériel événementiel. Que ce soit pour une soirée d'exception, un séminaire d'entreprise, une conférence ou toute autre manifestation professionnelle, choisissez la formule qui vous convient.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Option 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-black text-white p-4 flex items-center justify-center">
              <Package className="w-8 h-8" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Retrait sur place</h2>
              <p className="text-green-600 font-bold mb-4">Gratuit</p>
              <p className="mb-4">
                Récupérez votre matériel directement dans notre entrepôt à Mantes-la-Ville.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>Économique</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>Flexible sur les horaires</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>Vérification du matériel sur place</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500">
                Prévoir un véhicule adapté au volume du matériel loué.
              </p>
            </div>
          </div>
          
          {/* Option 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-black text-white p-4 flex items-center justify-center">
              <Truck className="w-8 h-8" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Livraison Économique</h2>
              <p className="text-gray-600 font-bold mb-4">À partir de 50€ HT</p>
              <p className="mb-4">
                Nous livrons sur site et vous participez au déchargement si nécessaire. Pensez à vérifier les accès (escaliers, ascenseurs, largeur des portes…).
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>Livraison à l'adresse de votre choix</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>Solution intermédiaire économique</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>Idéal pour les petites quantités</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500">
                Tarif variable selon la distance et le volume.
              </p>
            </div>
          </div>
          
          {/* Option 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-black text-white p-4 flex items-center justify-center">
              <Tool className="w-8 h-8" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Formule Premium</h2>
              <p className="text-gray-600 font-bold mb-4">Sur devis</p>
              <p className="mb-4">
                Service clé en main : livraison, installation et démontage pris en charge par nos techniciens événementiels 7j/7 et 24h/24, partout en France.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>Installation complète par nos techniciens</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>Démontage et récupération inclus</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>Assistance technique pendant l'événement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>Idéal pour les installations complexes</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500">
                Des frais supplémentaires peuvent s'appliquer pour les interventions de nuit, le week-end ou les longues distances.
              </p>
            </div>
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Informations importantes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Délais de livraison
              </h3>
              <p className="mb-4">
                Pour garantir la disponibilité du matériel et une livraison dans les meilleures conditions, nous vous recommandons de réserver votre matériel au moins :
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>48h à l'avance pour un retrait sur place</li>
                <li>72h à l'avance pour une livraison économique</li>
                <li>1 semaine à l'avance pour la formule premium</li>
              </ul>
              <p>
                Pour les événements importants ou en période de forte demande (mai à septembre), nous vous conseillons de réserver plusieurs semaines à l'avance.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Conditions particulières</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Accès au lieu</p>
                    <p className="text-sm text-gray-600">
                      Vérifiez les contraintes d'accès (étages, ascenseur, largeur des portes) et communiquez-les lors de votre demande.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Horaires spécifiques</p>
                    <p className="text-sm text-gray-600">
                      Des frais supplémentaires peuvent s'appliquer pour les livraisons en dehors des heures ouvrables (avant 8h, après 18h, week-ends et jours fériés).
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Zone géographique</p>
                    <p className="text-sm text-gray-600">
                      Nous intervenons principalement en Île-de-France. Pour les autres régions, un supplément kilométrique peut être appliqué.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-black text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Besoin d'un devis personnalisé ?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Contactez-nous pour obtenir un devis adapté à vos besoins spécifiques. Notre équipe est à votre disposition pour vous conseiller sur la meilleure solution logistique pour votre événement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="btn-primary bg-white text-black hover:bg-gray-100">
              Demander un devis
            </Link>
            <a href="tel:+33XXXXXXXXX" className="btn-secondary border-white text-white hover:bg-gray-900">
              Nous appeler
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;