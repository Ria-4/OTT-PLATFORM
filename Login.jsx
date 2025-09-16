import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy credentials
    if (email === "test@test.com" && password === "1234") {
      localStorage.setItem("auth", "true");
      setIsAuthenticated(true); // ✅ update state in App
      navigate("/"); // go to Home
    } else {
      setError("Invalid email or password. Use test@test.com / 1234");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">🎬 Movie App Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
