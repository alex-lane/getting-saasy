/* eslint react-refresh/only-export-components: "off" */
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from './api';

interface UserInfo {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  [key: string]: unknown;
}

interface AuthContextProps {
  user: UserInfo | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
  refreshUser: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [user, setUser] = useState<UserInfo | null>(null);

  const refreshUser = useCallback(async () => {
    if (token) {
      try {
        const res = await api.get('user/profile/');
        setUser(res.data);
      } catch {
        setUser(null);
      }
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      refreshUser();
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token, refreshUser]);

  const login = async (username: string, password: string) => {
    const res = await api.post('auth/login/', { username, password });
    setToken(res.data.access);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
