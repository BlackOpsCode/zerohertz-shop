import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function Card({ imgSrc, title, category }) {
  const [favorite, setFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // prevenim eventual click-uri pe card
    setFavorite(prev => !prev);
  };

  return (
    <div className="instrument-card card" style={{ position: "relative" }}>
      {/* Inimă Favorite */}
      <div
        onClick={toggleFavorite}
        style={{
          position: "absolute",
          bottom: "0.6rem",
          right: "0.6rem",
          zIndex: 2,
          cursor: "pointer",
          color: favorite ? "red" : "white",
          fontSize: "1.5rem",
          textShadow: "0 0 5px rgba(0,0,0,0.5)"
        }}
      >
        {favorite ? <AiFillHeart  color="white"/> : <AiOutlineHeart />}
      </div>

      <div className="instrument-image">
        <img
          src={imgSrc}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <h3 className="instrument-title">{title}</h3>
      <p className="instrument-cat">{category}</p>
    </div>
  );
}
