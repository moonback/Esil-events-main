import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SEO from './SEO';
import { seoConfig } from '../config/seo';

const Layout: React.FC = () => {
  const location = useLocation();
  
  // Fonction pour obtenir le titre de la page en fonction de l'URL
  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return seoConfig.defaultTitle;
      case '/about':
        return 'À propos';
      case '/contact':
        return 'Contact';
      case '/services':
        return 'Nos Services';
      default:
        return seoConfig.defaultTitle;
    }
  };

  // Fonction pour obtenir la description de la page en fonction de l'URL
  const getPageDescription = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return seoConfig.defaultDescription;
      case '/about':
        return 'Découvrez l\'histoire et les valeurs d\'ESIL Events, votre partenaire de confiance pour l\'organisation d\'événements.';
      case '/contact':
        return 'Contactez ESIL Events pour organiser votre prochain événement. Notre équipe est à votre écoute.';
      case '/services':
        return 'ESIL Events propose une large gamme de services événementiels pour les particuliers et les professionnels.';
      default:
        return seoConfig.defaultDescription;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title={getPageTitle()}
        description={getPageDescription()}
        keywords={seoConfig.defaultKeywords}
        url={`${seoConfig.siteUrl}${location.pathname}`}
        image={seoConfig.defaultImage}
      />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 