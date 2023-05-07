import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { generateMockToken } from "../utils/helpers";
import { AuthContextType, Props, User } from "../types";



const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>(null);

  const login = (user: User) => {
    setUser(user);
    const Token = generateMockToken(user);
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