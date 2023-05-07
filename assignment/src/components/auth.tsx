import { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { generateMockToken } from "../utils/helpers";

type User = string | null;

interface AuthContextType {
  user: User;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>(null);

  const login = (user: User) => {
    setUser(user);
    console.log(user);
    const Token = generateMockToken(user);
    console.log(Token);
    Cookies.set("user_token", Token);
  };
  const logout = () => {
    setUser(null);
    Cookies.remove("user_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};