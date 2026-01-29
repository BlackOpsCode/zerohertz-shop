import React, { useState } from "react";
import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";

// Path imagine synth
const synthImage = "./synths/synth.jpg";

// Categorii și subcategorii pentru synths
const synthCategories = [
  {
    name: "Analog",
    items: ["Monophonic", "Polyphonic"]
  },
  {
    name: "Digital",
    items: ["FM", "Wavetable", "VA"]
  },
  {
    name: "Hybrid",
    items: ["Analog-Digital"]
  },
  {
    name: "Modular",
    items: ["Eurorack", "Semi-Modular"]
  },
  {
    name: "Accessories",
    items: ["Patch Cables", "Cases", "Power Supplies"]
  }
];

// Dummy grid cu synths
const synths = [
  { name: "Moog Subsequent 37", type: "Monophonic" },
  { name: "Korg Minilogue XD", type: "Polyphonic" },
  { name: "Yamaha DX7", type: "FM" },
  { name: "ASM Hydrasynth", type: "Wavetable" },
  { name: "Roland System-8", type: "VA" },
  { name: "Arturia PolyBrute", type: "Analog-Digital" },
  { name: "Make Noise Shared System", type: "Eurorack" },
  { name: "Behringer Neutron", type: "Semi-Modular" },
  { name: "Eurorack Patch Cable Set", type: "Patch Cables" },
  { name: "Modular Case 104HP", type: "Cases" }
];

export default function Synths() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredSynths = selectedCategory
    ? synths.filter(s => s.type === selectedCategory)
    : synths;

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          {/* Mobile type bar */}
          <div className="types-bar">
            {synthCategories.map(cat => (
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
              {synthCategories.map(cat => (
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

            {/* Synths grid */}
            <main className="instruments-grid">
              {filteredSynths.map((synth, idx) => (
                <div key={idx} className="instrument-card card">
                  <div className="instrument-image">
                    <img
                      src={synthImage}
                      alt={synth.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                  <h3 className="instrument-title">{synth.name}</h3>
                  <p className="instrument-cat">{synth.type}</p>
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
