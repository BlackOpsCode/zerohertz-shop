import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaSearch, FaBars, FaTimes, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom"; // npm install react-router-dom

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [
    { name: "Drums", path: "/drums" },
    { name: "Guitars", path: "/guitars" },
    { name: "Bass", path: "/bass" },
    { name: "Keyboards", path: "/keyboards" },
    { name: "Synths", path: "/synths" },
    { name: "Audio Interfaces", path: "/audio-interfaces" },
    { name: "Studio Monitors", path: "/studio-monitors" },
    { name: "Software", path: "/software" },
    { name: "Recording Gear", path: "/recording-gear" }
  ];

  // Blocăm scroll pe homepage când meniul burger e deschis
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <Link to={"/"} className="logo">ZeroHertz</Link>
        </div>
        <div className="topbar-right">
          <FaSearch className="icon" />
          <FaHeart className="icon" /> {/* Heart adăugat aici */}
          <FaShoppingCart className="icon" />
          <FaBars className="icon burger" onClick={() => setMenuOpen(true)} />
        </div>
      </header>

      <nav className="categories">
        {categories.map((cat) => (
          <Link key={cat.name} to={cat.path} className="category">
            {cat.name}
          </Link>
        ))}
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <FaTimes className="close" onClick={() => setMenuOpen(false)} />
        <div className="mobile-menu-content">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.path}
              className="mobile-category"
              onClick={() => setMenuOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
