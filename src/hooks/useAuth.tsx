import { useState, useEffect, createContext, useContext } from 'react';
import * as authService from '../services/authService';
import type { User } from '../services/authService';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAdminUser: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    checkUser();
    // Clean up expired sessions periodically
    const interval = setInterval(async () => {
      try {
        await authService.cleanExpiredSessions();
      } catch (error) {
        console.error('Error cleaning expired sessions:', error);
      }
    }, 1000 * 60 * 60); // Every hour

    return () => clearInterval(interval);
  }, []);

  async function checkUser() {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const user = await authService.getCurrentUser(token || undefined);
      setUser(user);
      setIsAdminUser(user?.role === 'admin');
    } catch (error) {
      console.error('Error checking user:', error);
      localStorage.removeItem(TOKEN_KEY);
      setIsAdminUser(false);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { user, token } = await authService.signIn(email, password);
      localStorage.setItem(TOKEN_KEY, token);
      setUser(user);
      setIsAdminUser(user?.role === 'admin');
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  async function signOut() {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        await authService.signOut(token);
        localStorage.removeItem(TOKEN_KEY);
      }
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  const value = {
    user,
    loading,
    isAdminUser,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}