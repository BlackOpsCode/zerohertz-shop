import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-title">Follow Us</h3>
        <div className="social-icons">
          <a href="#" className="icon" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" className="icon" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" className="icon" aria-label="TikTok">
            <FaTiktok />
          </a>
        </div>
      </div>
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} ZeroHertz Shop. All rights reserved.
      </p>
    </footer>
  );
}
