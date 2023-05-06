import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { generateMockToken } from "../utils/helpers";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
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
  return useContext(AuthContext);
};
