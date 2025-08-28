import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

interface User {
  email: string;
  name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Credenciais fixas para demonstração
const FIXED_CREDENTIALS = {
  email: "admin@ddm.com",
  password: "123456",
  name: "Administrador",
};

const AUTH_STORAGE_KEY = "@DDMTemplate:auth";

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authData = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (authData) {
        const parsedAuth = JSON.parse(authData);
        setUser(parsedAuth.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Erro na verificação do status de autenticação:", error);
    } finally {
      setIsLoading(false);
    }
  }; 

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
    
      if (
        email === FIXED_CREDENTIALS.email &&
        password === FIXED_CREDENTIALS.password
      ) {
        const userData: User = {
          email: FIXED_CREDENTIALS.email,
          name: FIXED_CREDENTIALS.name,
        };

        
        await AsyncStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({
            user: userData,
            loginTime: new Date().toISOString(),
          })
        );

        setUser(userData);
        setIsAuthenticated(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
