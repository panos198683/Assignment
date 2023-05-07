import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth.tsx";
import "../styles/LoginPage.css";

const LoginPage: React.FC = () => {
  const [authToken, setAuthToken] = useState<string>("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    auth.login(authToken);
    navigate("home");
  };

  return (
    <div className="page-wrapper">
      <form className="login-form">
        <h1>Login</h1>
        <label>
          <input
            placeholder="UserName"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthToken(e.target.value)
            }
          />
        </label>
        <button onClick={handleLogin}>Log in</button>
      </form>
    </div>
  );
};

export default LoginPage;
