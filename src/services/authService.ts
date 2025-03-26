
export type User = {
  [x: string]: any;
  id: string;
  email: string;
  role: string;
};

export type Session = {
  id: string;
  user_id: string;
  token: string;
  expires_at: Date;
};

export const getCurrentUser = async (token?: string): Promise<User | null> => {
  if (!token) return null;
  
  try {
    const response = await fetch('http://localhost:3006/api/auth/current-user', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

export const signIn = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  try {
    console.log(`Tentative de connexion pour l'email: ${email}`);
    const response = await fetch('http://localhost:3006/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`Échec de la connexion - Status: ${response.status}, Email: ${email}`);
      if (response.status === 401) {
        throw new Error('Identifiants invalides');
      } else if (response.status === 409) {
        throw new Error('Cet email est déjà utilisé');
      } else if (response.status === 404) {
        throw new Error('Utilisateur non trouvé');
      } else {
        throw new Error(errorData.error || `Erreur de connexion (${response.status})`);
      }
    }

    const data = await response.json();
    console.log(`Connexion réussie pour l'utilisateur: ${data.user.email}`);
    return data;
  } catch (error) {
    console.error('Échec de la connexion:', error);
    throw new Error(error instanceof SyntaxError 
      ? 'Réponse serveur invalide' 
      : (error instanceof Error ? error.message : 'Erreur de connexion'));
  }
};

export const signUp = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  try {
    console.log(`Tentative d'inscription pour l'email: ${email}`);
    const response = await fetch('http://localhost:3006/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`Échec de l'inscription - Status: ${response.status}, Email: ${email}`);
      if (response.status === 401) {
        throw new Error('Identifiants invalides');
      } else if (response.status === 409) {
        throw new Error('Cet email est déjà utilisé');
      } else if (response.status === 404) {
        throw new Error('Utilisateur non trouvé');
      } else {
        throw new Error(errorData.error || `Erreur de connexion (${response.status})`);
      }
    }

    const data = await response.json();
    console.log(`Inscription réussie pour l'utilisateur: ${data.user.email}`);
    return data;
  } catch (error) {
    console.error('Échec de l\'inscription:', error);
    throw new Error(error instanceof SyntaxError 
      ? 'Réponse serveur invalide' 
      : (error instanceof Error ? error.message : 'Erreur lors de l\'inscription'));
  }
};

export const signOut = async (token: string): Promise<void> => {
  if (!token) return;
  
  try {
    await fetch('/api/auth/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

export const isAdmin = async (token?: string): Promise<boolean> => {
  const user = await getCurrentUser(token);
  return user?.role === 'admin';
};

// Cette fonction n'est plus nécessaire car la gestion des sessions est gérée côté serveur
export const cleanExpiredSessions = async (): Promise<void> => {
  console.warn('Session cleanup is now handled automatically by the server');
};