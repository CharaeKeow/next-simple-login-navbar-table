"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type LoginStep = "username" | "secureWord" | "password" | "success";

type AuthContextType = {
  secureWord: string | undefined;
  username: string;
  loginStep: LoginStep;
  // setSecureWord: (secureWord: string | undefined) => void;
  setSecureWord: Dispatch<SetStateAction<string | undefined>>;
  setUsername: Dispatch<SetStateAction<string>>;
  setLoginStep: Dispatch<SetStateAction<LoginStep>>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [secureWord, setSecureWord] =
    useState<AuthContextType["secureWord"]>(undefined);
  const [username, setUsername] = useState<AuthContextType["username"]>("");
  const [loginStep, setLoginStep] = useState<LoginStep>("username"); // login step will always start with username

  const value: AuthContextType = {
    secureWord,
    username,
    loginStep,
    setSecureWord,
    setUsername,
    setLoginStep,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
