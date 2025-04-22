import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import backgroundImage from "../assets/Home.jpg";
import logoImage from "../assets/Logo.png";

export default function HomePage() {
  const { user, logout } = useAuth();

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
        <div style={{ marginBottom: "2rem" }}>
          <img src={logoImage} alt="Logo" style={{ height: "80px", background: "none" }} />
        </div>

        {/* Main Buttons - Aligned Vertically */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
          {user ? (
            <>
              <Link to="/schedule" style={buttonStyle}>View Schedule</Link>
              <button onClick={logout} style={{ ...buttonStyle, backgroundColor: "#dc3545" }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <a
  href="https://www.omantel.om/About%20us/AboutOmantel/overview"
  target="_blank"
  rel="noopener noreferrer"
  style={buttonStyle}
>
  About Omantel
</a>

              <Link to="/login" style={buttonStyle}>Login</Link>
              <Link to="/signup" style={buttonStyle}>Sign Up</Link>
            </>
          )}
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
  margin: "0.5rem",
  boxShadow: "2px 4px 10px rgba(0,0,0,0.3)",
};
