import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  name: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (inputs: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}
interface AuthContextProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    return userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
  });

  const login = async (inputs: { username: string; password: string }) => {
    const res = await axios.post("http://localhost:3001/auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
