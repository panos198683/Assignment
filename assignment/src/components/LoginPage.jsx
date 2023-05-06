import React, { useState } from "react";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [authToken, setAuthToken] = useState("");
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
            onChange={(e) => setAuthToken(e.target.value)}
          />
        </label>
        <button onClick={handleLogin}>Log in</button>
      </form>
    </div>
  );
};
export default LoginPage;
