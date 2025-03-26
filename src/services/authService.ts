
export type User = {
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
    const response = await fetch('http://localhost:3004/api/auth/current-user', {
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
    const response = await fetch('http://localhost:3004/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : {};
    const data = responseData.data || responseData;

    if (!response.ok) {
      throw new Error(data.error || `Erreur HTTP ${response.status}`);
    }

    if (!data.token || !data.user) {
      console.error('Structure de réponse invalide:', responseData);
      throw new Error('Réponse du serveur invalide');
    }

    return data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error(error instanceof SyntaxError 
      ? 'Réponse serveur invalide' 
      : (error instanceof Error ? error.message : 'Erreur de connexion'));
  }
};

export const signUp = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  try {
    const response = await fetch('http://localhost:3004/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : {};
    const data = responseData.data || responseData;

    if (!response.ok) {
      throw new Error(data.error || `Erreur HTTP ${response.status}`);
    }

    if (!data.token || !data.user) {
      console.error('Structure de réponse invalide:', responseData);
      throw new Error('Réponse du serveur invalide');
    }

    return data;
  } catch (error) {
    console.error('Registration failed:', error);
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