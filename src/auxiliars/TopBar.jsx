import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaSearch, FaBars, FaTimes, FaHeart, FaUser, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);           // Mobile full-screen menu
  const [dropdownActive, setDropdownActive] = useState(null); // "search" | "user" | null

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
        {/* LOGO */}
        <div className="topbar-left">
          <Link to="/" className="logo">
            <span className="logo-full">ZeroHertz</span>
            <span className="logo-short">0Hz</span>
          </Link>
        </div>

        {/* RIGHT AREA */}
        <div className="topbar-right">
          {/* SEARCH */}
          <div className="search-wrapper">
            <FaSearch
              className="icon search-icon"
              onClick={() =>
                setDropdownActive(prev => prev === "search" ? null : "search")
              }
            />
            <input
              type="text"
              placeholder="Search products..."
              className={`search-input ${dropdownActive === "search" ? "open" : ""}`}
            />
          </div>

          {/* USER DROPDOWN */}
          <div className="user-wrapper">
            <FaUser
              className="icon"
              onClick={() =>
                setDropdownActive(prev => prev === "user" ? null : "user")
              }
            />

            <div className={`user-dropdown ${dropdownActive === "user" ? "open" : ""}`}>
              <Link to="/account">
                <FaSignInAlt />
                <span>Account</span>
              </Link>
              <Link to="/favorites">
                <FaHeart />
                <span>Favorites</span>
              </Link>
              <Link to="/cart">
                <FaShoppingCart />
                <span>Cart</span>
              </Link>
            </div>
          </div>

          {/* MOBILE MENU */}
          <FaBars className="icon burger" onClick={() => setMenuOpen(true)} />
        </div>
      </header>

      {/* CATEGORIES DESKTOP */}
      <nav className="categories">
        {categories.map(cat => (
          <Link key={cat.name} to={cat.path} className="category">
            {cat.name}
          </Link>
        ))}
      </nav>

      {/* MOBILE MENU FULL SCREEN */}
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
