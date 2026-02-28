import React, { useState } from "react";
import { registerUser } from "../services/api";
import "./Login.css";

function Register({ switchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      if (!email || !password) {
        setMessage({ type: "error", text: "All fields are required." });
        return;
      }

      setLoading(true);
      setMessage(null);

      await registerUser({ email, password });

      setMessage({
        type: "success",
        text: "Registration successful! You can now login."
      });

    } catch (error) {
      setMessage({
        type: "error",
        text: "User already exists or something went wrong."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-title">
          Create Account 
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
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating..." : "Register"}
        </button>

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div
          className="footer-text"
          onClick={switchToLogin}
          style={{ cursor: "pointer" }}
        >
          Already have an account? Login
        </div>

      </div>
    </div>
  );
}

export default Register;