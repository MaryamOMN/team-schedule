import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, role);
    navigate("/login");
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Sign Up</h2>
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
        <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle}>
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={buttonStyle}>Sign Up</button>
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
