import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import logoImage from "../assets/Logo.png";
import bgImage from "../assets/Home.jpg";

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
    <div style={containerStyle(bgImage)}>
      <img src={logoImage} alt="Logo" style={logoStyle} />
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={titleStyle}>Sign Up</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} required />
        <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle}>
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={buttonStyle}>Sign Up</button>
      </form>
      <div style={socialStyle}>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a> |{" "}
        <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a> |{" "}
        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
      </div>
    </div>
  );
}
