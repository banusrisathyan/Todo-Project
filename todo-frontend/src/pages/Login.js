import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import backgroundImage from "../assests/to-do.png";

const API = "https://todo-backend-a8kh.onrender.com";

function Login() {
  const navigate = useNavigate();

  // ✅ Handle redirect with token from backend
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, [navigate]);

  // ✅ Login triggers your backend, not Google's URL directly
  const handleGoogleLogin = () => {
    window.location.href = `${API}/auth/google`;
  };

  const handleGitHubLogin = () => {
    window.location.href = `${API}/auth/github`;
  };

  return (
    <div
      className="login-wrapper"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="Login-page">
        <h2>Login to Todo App</h2>
        <button className="login-button" onClick={handleGoogleLogin}>
          Login with Google
        </button>
        <br />
        <button className="login-button" onClick={handleGitHubLogin}>
          Login with GitHub
        </button>
      </div>
    </div>
  );
}

export default Login;
