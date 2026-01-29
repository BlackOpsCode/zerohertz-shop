import React, { useState } from "react";
import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";

// Path imagine guitar
const guitarImage = "./guitars/HB_Amarok.jpg";

// Categorii și subcategorii pentru chitare
const guitarCategories = [
  { name: "Electric", items: ["Stratocaster", "Les Paul", "Telecaster"] },
  { name: "Acoustic", items: ["Dreadnought", "Parlor", "Concert"] },
  { name: "Bass", items: ["4-String", "5-String"] },
  { name: "Accessories", items: ["Strings", "Pickups", "Straps"] }
];

// Dummy grid cu chitare
const guitars = [
  { name: "Fender Stratocaster", type: "Stratocaster" },
  { name: "Gibson Les Paul", type: "Les Paul" },
  { name: "Fender Telecaster", type: "Telecaster" },
  { name: "Yamaha Acoustic Dreadnought", type: "Dreadnought" },
  { name: "Martin Parlor", type: "Parlor" },
  { name: "Ibanez 5-String Bass", type: "5-String" },
  { name: "GHS Strings Pack", type: "Strings" },
  { name: "Fender Strap", type: "Straps" },
];

export default function Guitars() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredGuitars = selectedCategory
    ? guitars.filter(g => g.type === selectedCategory)
    : guitars;

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
      <TopBar />

      {/* Mobile type bar */}
      <div className="types-bar">
        {guitarCategories.map(cat => (
          <button
            key={cat.name}
            className={`type-btn ${selectedCategory && cat.items.includes(selectedCategory) ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat.items[0])}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Desktop layout */}
      <div className="instruments-layout">
        {/* Sidebar */}
        <aside className="types-sidebar">
          {guitarCategories.map(cat => (
            <div key={cat.name} className="category-block">
              <div className="category-title">{cat.name}</div>
              <div className="subcategory">
                {cat.items.map(item => (
                  <button
                    key={item}
                    className={`type-btn sub-btn ${selectedCategory === item ? "active" : ""}`}
                    onClick={() => setSelectedCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* Guitar grid */}
        <main className="instruments-grid">
          {filteredGuitars.map((guitar, idx) => (
            <div key={idx} className="instrument-card card">
              <div className="instrument-image">
                <img 
                  src={guitarImage}
                  alt={guitar.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <h3 className="instrument-title">{guitar.name}</h3>
              <p className="instrument-cat">{guitar.type}</p>
            </div>
          ))}
        </main>
      </div>
    </div>
      </div>
       <Footer/>
    </div>
  );
}
