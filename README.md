# ESIL Events - Plateforme de Location et d'Organisation d'Événements

Bienvenue sur le dépôt du projet ESIL Events, une plateforme web complète conçue pour la location de matériel événementiel et l'organisation d'événements sur mesure. Cette application permet aux utilisateurs de parcourir un catalogue de produits, de créer des demandes de devis, et offre aux administrateurs des outils puissants pour gérer les produits, les catégories et le contenu du site.

## Table des matières

- [Description du Projet](#description-du-projet)
- [Fonctionnalités Clés](#fonctionnalités-clés)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation et Configuration](#installation-et-configuration)
- [Structure du Projet](#structure-du-projet)
- [Contribution](#contribution)
- [Licence](#licence)
- [Contact](#contact)

## Description du Projet

ESIL Events est une solution complète pour répondre aux besoins en matière d'événements, qu'il s'agisse de mariages, de séminaires d'entreprise ou de soirées privées.  L'objectif est de faciliter l'accès à du matériel de qualité et de proposer une organisation clé en main pour des événements inoubliables.

La plateforme est divisée en deux parties principales :

*   **Partie Publique :**  Un site web vitrine accessible à tous, permettant de consulter le catalogue de produits, de découvrir les services, de demander un devis, et de contacter l'équipe.
*   **Partie Administration :**  Une interface sécurisée réservée aux administrateurs, offrant des outils de gestion des produits, des catégories, des pages statiques, et des clients.

## Fonctionnalités Clés

*   **Catalogue de produits :**
    *   Parcourir les produits par catégories, sous-catégories et sous-sous-catégories.
    *   Recherche de produits.
    *   Affichage détaillé des produits avec images, descriptions, prix et spécifications techniques.
*   **Demande de devis :**
    *   Ajouter des produits au panier.
    *   Formulaire de demande de devis avec informations sur l'événement.
    *   Envoi de la demande à l'équipe ESIL Events.
*   **Gestion des catégories :**
    *   Création, modification et suppression de catégories, sous-catégories et sous-sous-catégories.
    *   Organisation hiérarchique des catégories.
*   **Gestion des produits :**
    *   Ajout, modification et suppression de produits.
    *   Gestion des informations des produits (nom, référence, prix, description, images, etc.).
*   **Gestion des pages statiques :** (Actuellement mockées)
    *   Création, modification et suppression de pages statiques (À propos, Contact, etc.).
*   **Authentification et Autorisation :**
    *   Inscription et connexion des utilisateurs.
    *   Gestion des rôles (administrateur).
    *   Protection des routes administrateur.
*   **SEO Optimisé :**
    *   Intégration de balises meta pour un meilleur référencement.

## Technologies Utilisées

*   **Frontend:**
    *   React
    *   TypeScript
    *   Tailwind CSS
    *   Lucide React (pour les icônes)
    *   react-router-dom
    *   react-helmet-async (pour la gestion du SEO)
*   **Backend:** (Non inclus dans ce dépôt - API à part)
    *   Node.js
    *   Express
    *   SQLite (Exemple pour le serveur, peut être remplacé par d'autres bases de données)
*   **Autres:**
    *   Vite (bundler)

## Installation et Configuration

1.  **Clonez le dépôt :**

    ```bash
    git clone [URL du dépôt]
    cd esil-events
    ```

2.  **Installez les dépendances :**

    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```

3.  **Configurez les variables d'environnement :**

    *   Créez un fichier `.env` à la racine du projet.
    *   Ajoutez les variables d'environnement nécessaires (par exemple, l'URL de l'API backend).

        ```
        VITE_API_URL=http://localhost:3006/api
        ```

4.  **Lancez l'application :**

    ```bash
    npm run dev
    # ou
    yarn dev
    # ou
    pnpm dev
    ```

    L'application sera accessible à l'adresse indiquée dans la console (généralement `http://localhost:5173`).

**Important :** Ce dépôt contient uniquement le code frontend. Pour faire fonctionner l'application complètement, vous devez également configurer et lancer le serveur backend (dont le code n'est pas inclus dans ce dépôt). Assurez-vous que le serveur backend est accessible à l'URL configurée dans la variable d'environnement `VITE_API_URL`.

## Structure du Projet

src/
├── App.tsx # Composant principal de l'application
├── components/ # Composants React réutilisables
│ ├── admin/ # Composants spécifiques à l'administration
│ │ ├── AdminHeader.tsx # En-tête de l'interface d'administration
│ │ └── ProductModal.tsx # Modal pour la gestion des produits
│ ├── AdminRoute.tsx # Route protégée pour l'administration
│ ├── Footer.tsx # Pied de page du site
│ ├── Header.tsx # En-tête du site
│ ├── Layout.tsx # Composant de mise en page principal
│ ├── layouts/ # Différents layouts pour les pages
│ │ └── AdminLayout.tsx # Layout de l'interface d'administration
│ ├── LoginForm.tsx # Formulaire de connexion
│ ├── MegaMenu.tsx # Menu déroulant de navigation
│ ├── RegisterForm.tsx # Formulaire d'inscription
│ ├── SearchBar.tsx # Barre de recherche
│ └── SEO.tsx # Composant pour la gestion du SEO
├── config/ # Fichiers de configuration
│ └── seo.ts # Configuration du SEO
├── context/ # Contextes React
│ └── CartContext.tsx # Contexte pour la gestion du panier
├── hooks/ # Hooks React personnalisés
│ └── useAuth.tsx # Hook pour la gestion de l'authentification
├── pages/ # Pages de l'application
│ ├── AboutPage.tsx # Page "À propos"
│ ├── admin/ # Pages de l'interface d'administration
│ │ ├── Categories.tsx # Page de gestion des catégories
│ │ ├── Customers.tsx # Page de gestion des clients (Mock data)
│ │ ├── Dashboard.tsx # Tableau de bord de l'administration
│ │ ├── Pages.tsx # Page de gestion des pages statiques (Mock data)
│ │ └── Products.tsx # Page de gestion des produits
│ ├── CartPage.tsx # Page du panier
│ ├── CategoriesPage.tsx # Page des catégories
│ ├── ContactPage.tsx # Page de contact
│ ├── DeliveryPage.tsx # Page de livraison
│ ├── HomePage.tsx # Page d'accueil
│ ├── NotFoundPage.tsx # Page 404
│ ├── OrdersPage.tsx # Page des commandes
│ ├── PrivacyPage.tsx # Page de politique de confidentialité
│ ├── ProfilePage.tsx # Page de profil utilisateur
│ ├── RegisterPage.tsx # Page d'inscription
│ └── ShopPage.tsx # Page de la boutique
│ └── TermsPage.tsx # Page des conditions générales
├── services/ # Services pour l'interaction avec l'API
│ ├── authService.ts # Service d'authentification
│ ├── categoryService.ts # Service de gestion des catégories
│ ├── productService.ts # Service de gestion des produits
│ └── sqliteClient.ts # (Déprécié) - Client SQLite
├── types/ # Définitions de types TypeScript
│ └── Product.ts # Type pour les produits
├── index.css # Fichier CSS principal
├── main.tsx # Point d'entrée de l'application
└── vite-env.d.ts # Définitions de types pour Vite

