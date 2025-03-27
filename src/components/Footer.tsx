import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container-custom mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 logo-font">ESIL Events</h3>
            <p className="mb-4">
              Expert en organisation d'événements d'entreprise, location de matériel événementiel et prestations techniques.
            </p>
            <p>
              Séminaires, soirées d'exception, conférences, cérémonies internes, lancements de produits… Nous créons des expériences uniques et sur mesure.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-4">Nos services</h4>
            <ul className="space-y-2">
              <li>✔ Location de matériel : Son, lumière, scène, mobilier, jeux, signalétique</li>
              <li>✔ Livraison & Installation : Retrait sur place, livraison économique ou premium</li>
              <li>✔ Solutions événementielles clé en main</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-300 transition-colors">Accueil</Link></li>
              <li><Link to="/products/mobilier" className="hover:text-gray-300 transition-colors">Mobilier & Déco</Link></li>
              <li><Link to="/products/jeux" className="hover:text-gray-300 transition-colors">Jeux</Link></li>
              <li><Link to="/products/signaletique" className="hover:text-gray-300 transition-colors">Signalétique</Link></li>
              <li><Link to="/products/technique" className="hover:text-gray-300 transition-colors">Technique</Link></li>
              <li><Link to="/delivery" className="hover:text-gray-300 transition-colors">Livraison</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1" />
                <span>Mantes-la-Ville, Île-de-France</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>01 XX XX XX XX</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>contact@esil-events.fr</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>© 2025 ESIL Events – Agence événementielle spécialisée en événements BtoB et prestations techniques en Île-de-France et partout en France.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;