import React, { useState } from "react";
import { loginUser } from "../services/api";
import "./Login.css";

function Login({ setToken, switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setMessage({ type: "error", text: "All fields are required." });
        return;
      }

      setLoading(true);
      setMessage(null);

      const response = await loginUser({ email, password });
      const token = response.data.access_token;

      localStorage.setItem("token", token);
      setToken(token);

    } catch (error) {
      setMessage({
        type: "error",
        text: "Invalid credentials. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-title">
          AI Code Review 🚀
        </div>

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="login-button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div
          className="footer-text"
          onClick={switchToRegister}
          style={{ cursor: "pointer" }}
        >
          Don't have an account? Register
        </div>

      </div>
    </div>
  );
}

export default Login;