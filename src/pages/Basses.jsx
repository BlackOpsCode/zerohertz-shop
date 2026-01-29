import React, { useState } from "react";
import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";

// Path imagine bass
const bassImage = "./basses/bass-1.jpg";

// Categorii și subcategorii pentru bass
const bassCategories = [
  { name: "Electric Bass", items: ["4-String", "5-String", "6-String"] },
  { name: "Acoustic Bass", items: ["Acoustic", "Electro-Acoustic"] },
  { name: "Upright Bass", items: ["Double Bass"] },
  { name: "Accessories", items: ["Strings", "Cases", "Bows"] }
];

// Dummy grid cu bass-uri
const basses = [
  { name: "Fender Jazz Bass", type: "4-String" },
  { name: "Ibanez SR505", type: "5-String" },
  { name: "Yamaha TRB 6", type: "6-String" },
  { name: "Ibanez Acoustic Bass", type: "Acoustic" },
  { name: "Taylor Electro Acoustic Bass", type: "Electro-Acoustic" },
  { name: "Stentor Double Bass", type: "Double Bass" },
  { name: "D’Addario Bass Strings", type: "Strings" },
  { name: "Hard Case Double Bass", type: "Cases" },
];

export default function Basses() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredBasses = selectedCategory
    ? basses.filter(b => b.type === selectedCategory)
    : basses;

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          {/* Mobile type bar */}
          <div className="types-bar">
            {bassCategories.map(cat => (
              <button
                key={cat.name}
                className={`type-btn ${
                  selectedCategory && cat.items.includes(selectedCategory)
                    ? "active"
                    : ""
                }`}
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
              {bassCategories.map(cat => (
                <div key={cat.name} className="category-block">
                  <div className="category-title">{cat.name}</div>
                  <div className="subcategory">
                    {cat.items.map(item => (
                      <button
                        key={item}
                        className={`type-btn sub-btn ${
                          selectedCategory === item ? "active" : ""
                        }`}
                        onClick={() => setSelectedCategory(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </aside>

            {/* Bass grid */}
            <main className="instruments-grid">
              {filteredBasses.map((bass, idx) => (
                <div key={idx} className="instrument-card card">
                  <div className="instrument-image">
                    <img
                      src={bassImage}
                      alt={bass.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <h3 className="instrument-title">{bass.name}</h3>
                  <p className="instrument-cat">{bass.type}</p>
                </div>
              ))}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
