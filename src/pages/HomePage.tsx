import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section with Video */}
      <section className="relative h-screen">
        <video 
          className="header-video w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            ESIL Créateur d'Événements Inoubliables
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl">
            Votre événement de A à Z : Location, Installation, Régie Son & Lumière, Animation
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="btn-primary">
              Discuter de mon événement
            </Link>
            <Link to="/products/mobilier" className="btn-secondary">
              Découvrir nos produits
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ESIL Events : Votre Partenaire pour des événements d'Entreprise sur-mesure
              </h2>
              <p className="mb-4">
                Depuis plus de 30 ans, ESIL Events accompagne les entreprises dans la conception et la réalisation de leurs événements professionnels. De la planification stratégique à l'exécution terrain, nous orchestrons chaque détail pour garantir des séminaires d'entreprise, conférences, cérémonies internes et soirées d'exception à la hauteur de vos ambitions.
              </p>
              <p>
                Notre expertise couvre aussi la location de matériel événementiel : sonorisation, éclairage, scène, mobilier et signalétique. Grâce à nos solutions clé en main, nous assurons l'installation, la régie son & lumière et la coordination de vos prestations pour un événement sans fausse note.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Événement d'entreprise" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section bg-gray-100">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Louez votre matériel évènementiel !
          </h2>
          <h3 className="text-xl md:text-2xl font-medium mb-8 text-center">
            Besoin de matériel pour organiser un événement réussi ?
          </h3>
          <p className="text-center mb-12 max-w-3xl mx-auto">
            ESIL Events met à votre disposition une large gamme d'équipements professionnels, disponibles en location avec ou sans installation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Mobilier & Deco */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Mobilier & Déco" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">MOBILIER & DECO</h3>
                <Link to="/products/mobilier" className="flex items-center text-black font-medium hover:underline">
                  Découvrir <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Jeux */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Jeux" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">JEUX</h3>
                <Link to="/products/jeux" className="flex items-center text-black font-medium hover:underline">
                  Découvrir <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Signalétique */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1588412079929-790b9f593d8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Signalétique" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">SIGNALETIQUE</h3>
                <Link to="/products/signaletique" className="flex items-center text-black font-medium hover:underline">
                  Découvrir <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Technique */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Technique" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">TECHNIQUE</h3>
                <Link to="/products/technique" className="flex items-center text-black font-medium hover:underline">
                  Découvrir <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="bg-black text-white rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Parlons de votre projet !
            </h2>
            <p className="mb-8 max-w-3xl mx-auto">
              Chaque événement est unique et mérite une exécution parfaite. Chez ESIL Events, nous transformons vos idées en expériences marquantes, en combinant créativité, expertise technique et gestion rigoureuse.
              <br /><br />
              Vous avez un projet en tête ? Discutons-en et créons ensemble un événement à la hauteur de vos ambitions.
            </p>
            <Link to="/contact" className="btn-primary inline-block">
              Discuter de mon événement
            </Link>
          </div>
        </div>
      </section>

      {/* Delivery Options Section */}
      <section className="section bg-gray-100">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Livraison et installation du matériel événementiel : 3 formules au choix !
          </h2>
          <p className="mb-12 max-w-4xl mx-auto text-center">
            Chez ESIL Events, nous vous proposons trois solutions adaptées à vos besoins pour la livraison et l'installation de votre matériel événementiel. Que ce soit pour une soirée d'exception, un séminaire d'entreprise, une conférence ou toute autre manifestation professionnelle, choisissez la formule qui vous convient :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Option 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Retrait sur place</h3>
              <p className="text-sm text-green-600 font-bold mb-4">Gratuit</p>
              <p>
                Récupérez votre matériel directement dans notre entrepôt à Mantes-la-Ville.
              </p>
            </div>

            {/* Option 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Livraison Économique</h3>
              <p className="mb-4">
                Nous livrons sur site et vous participez au déchargement si nécessaire. Pensez à vérifier les accès (escaliers, ascenseurs, largeur des portes…).
              </p>
            </div>

            {/* Option 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Formule Premium</h3>
              <p className="mb-4">
                Service clé en main : livraison, installation et démontage pris en charge par nos techniciens événementiels 7j/7 et 24h/24, partout en France. Idéal pour les événements nécessitant une régie technique ou une installation complexe.
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-sm">
            Des frais supplémentaires peuvent s'appliquer pour les interventions de nuit, le week-end ou les longues distances.
          </p>

          <div className="text-center mt-8">
            <Link to="/delivery" className="btn-secondary inline-block">
              En savoir plus
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;