import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import backgroundImage from "../assets/Home.jpg";
import logoImage from "../assets/Logo.png";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        {/* Logo */}
        <div style={{ marginTop: "1rem" }}>
          <img src={logoImage} alt="Logo" style={{ height: "80px", background: "none" }} />
        </div>

        {/* Login Form */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>Log in</h1>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              style={{ ...inputStyle }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{ ...inputStyle }}
            />
            <button type="submit" style={buttonStyle}>Log In</button>
          </form>
        </div>

        {/* Social Icons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "2rem" }}>
          <a href="https://www.instagram.com/omantel" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/40/ffffff/instagram-new.png" alt="Instagram" />
          </a>
          <a href="https://www.youtube.com/@omantelom" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/40/ffffff/youtube-play.png" alt="YouTube" />
          </a>
          <a href="https://www.facebook.com/omantel" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/40/ffffff/facebook.png" alt="Facebook" />
          </a>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: "#FDBA12",
  color: "#fff",
  fontWeight: "bold",
  padding: "1rem 2rem",
  borderRadius: "50px",
  textDecoration: "none",
  marginTop: "1rem",
  border: "none",
  boxShadow: "2px 4px 10px rgba(0,0,0,0.3)",
};

const inputStyle = {
  width: "300px",
  padding: "1rem 2rem",
  borderRadius: "50px",
  border: "none",
  backgroundColor: "#fff",
  color: "#000",
  fontSize: "1rem",
  boxShadow: "2px 4px 10px rgba(0,0,0,0.3)",
};