'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

type LoginStep = 'username' | 'secureWord' | 'password' | 'success';

type AuthContextType = {
  secureWord: string | undefined;
  username: string;
  loginStep: LoginStep;
  isAuthenticated: boolean;
  // setSecureWord: (secureWord: string | undefined) => void;
  setSecureWord: Dispatch<SetStateAction<string | undefined>>;
  setUsername: Dispatch<SetStateAction<string>>;
  setLoginStep: Dispatch<SetStateAction<LoginStep>>;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

type AuthProviderProps = {
  isAuth: boolean;
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ isAuth, children }: AuthProviderProps) => {
  const [secureWord, setSecureWord] =
    useState<AuthContextType['secureWord']>(undefined);
  const [username, setUsername] = useState<AuthContextType['username']>('');
  const [loginStep, setLoginStep] = useState<LoginStep>('username'); // login step will always start with username

  // Note: In real world, this would be a state provided by library. E.g. if using Auth.js, we can obtain this from `useSession` hook at client
  // Since this is just a test app, I resorted to just do this in this provider for simplicity's sake
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth ?? false);

  useEffect(() => {
    setIsAuthenticated(isAuth);
  }, [isAuth]);

  const value: AuthContextType = {
    secureWord,
    username,
    loginStep,
    isAuthenticated,
    setSecureWord,
    setUsername,
    setLoginStep,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};
