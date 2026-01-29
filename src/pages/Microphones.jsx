import React, { useState } from "react";
import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";

// Path imagine microfon
const micImage = "./microphones/microphone-1.webp";

// Categorii și subcategorii pentru microfoane
const micCategories = [
  {
    name: "Dynamic",
    items: ["Vocal", "Instrument"]
  },
  {
    name: "Condenser",
    items: ["Studio", "Large-Diaphragm", "Small-Diaphragm"]
  },
  {
    name: "Ribbon",
    items: ["Vintage", "Modern"]
  },
  {
    name: "USB",
    items: ["Podcast", "Streaming"]
  },
  {
    name: "Accessories",
    items: ["Stands", "Cables", "Pop Filters"]
  }
];

// Dummy grid cu microfoane
const microphones = [
  { name: "Shure SM58", type: "Vocal" },
  { name: "Sennheiser e835", type: "Vocal" },
  { name: "Shure SM57", type: "Instrument" },
  { name: "Neumann TLM 103", type: "Studio" },
  { name: "AKG C214", type: "Large-Diaphragm" },
  { name: "Rode NT5", type: "Small-Diaphragm" },
  { name: "AEA R84", type: "Vintage" },
  { name: "Royer R-121", type: "Modern" },
  { name: "Blue Yeti", type: "Podcast" },
  { name: "Elgato Wave:3", type: "Streaming" },
  { name: "Mic Stand Pro", type: "Stands" },
  { name: "XLR Cable 3m", type: "Cables" },
  { name: "Pop Filter Round", type: "Pop Filters" }
];

export default function Microphones() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredMics = selectedCategory
    ? microphones.filter(m => m.type === selectedCategory)
    : microphones;

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          {/* Mobile type bar */}
          <div className="types-bar">
            {micCategories.map(cat => (
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
              {micCategories.map(cat => (
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

            {/* Microphones grid */}
            <main className="instruments-grid">
              {filteredMics.map((mic, idx) => (
                <div key={idx} className="instrument-card card">
                  <div className="instrument-image">
                    <img
                      src={micImage}
                      alt={mic.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                  <h3 className="instrument-title">{mic.name}</h3>
                  <p className="instrument-cat">{mic.type}</p>
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
