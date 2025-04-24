import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Log In</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Log In</button>
      </form>
    </div>
  );
}

// Styles
const containerStyle = {
  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
  minHeight: "100vh", backgroundColor: "#e0f7fa"
};

const titleStyle = { fontSize: "2rem", marginBottom: "1rem" };
const formStyle = { display: "flex", flexDirection: "column", gap: "1rem", width: "300px" };
const inputStyle = { padding: "0.5rem", fontSize: "1rem", borderRadius: "6px", border: "1px solid #ccc" };
const buttonStyle = { backgroundColor: "#00796b", color: "white", padding: "0.5rem", borderRadius: "6px", fontWeight: "bold" };
