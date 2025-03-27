// This file is now deprecated as all database operations are handled by the server
// Frontend should use the API endpoints defined in the respective service files

// Fonction de notification de dépréciation
export const deprecatedNotice = () => {
  console.warn('Direct database operations are not supported in the frontend. Please use the API endpoints.');
};

// Cette fonction n'est plus disponible car toutes les opérations de base de données sont gérées par le serveur
export const sqliteClient = () => {
  deprecatedNotice();
  throw new Error('Direct database operations are not supported. Please use the API endpoints defined in the respective service files.');
};