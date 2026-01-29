import React, { useState } from "react";
import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";

// Path imagine cablu
const cableImage = "./cables/cable.jpg";

// Categorii și subcategorii pentru Cables
const cableCategories = [
  {
    name: "Instrument Cables",
    items: ["1/4\" TS", "1/4\" TRS", "XLR"]
  },
  {
    name: "Patch Cables",
    items: ["1/4\" TS Patch", "1/8\" TRS Patch"]
  },
  {
    name: "MIDI Cables",
    items: ["5-Pin MIDI", "USB MIDI"]
  },
  {
    name: "Power Cables",
    items: ["IEC", "C13", "C19"]
  },
  {
    name: "Accessories",
    items: ["Cable Ties", "Cable Clips"]
  }
];

// Dummy grid cu cabluri
const cables = [
  { name: "Planet Waves 3m TS Cable", type: "1/4\" TS" },
  { name: "Mogami Gold TRS 5m", type: "1/4\" TRS" },
  { name: "Pro XLR Mic Cable", type: "XLR" },
  { name: "Patch 1/4\" TS 10cm", type: "1/4\" TS Patch" },
  { name: "Patch 1/8\" TRS 15cm", type: "1/8\" TRS Patch" },
  { name: "MIDI 5-Pin 2m", type: "5-Pin MIDI" },
  { name: "USB MIDI Cable 1.5m", type: "USB MIDI" },
  { name: "IEC Power Cable 2m", type: "IEC" },
  { name: "C13 Power Cable", type: "C13" },
  { name: "C19 Power Cable", type: "C19" },
  { name: "Velcro Cable Ties 10pcs", type: "Cable Ties" },
  { name: "Plastic Cable Clips 20pcs", type: "Cable Clips" }
];

export default function Cables() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredCables = selectedCategory
    ? cables.filter(c => c.type === selectedCategory)
    : cables;

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          {/* Mobile type bar */}
          <div className="types-bar">
            {cableCategories.map(cat => (
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
              {cableCategories.map(cat => (
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

            {/* Cables grid */}
            <main className="instruments-grid">
              {filteredCables.map((cable, idx) => (
                <div key={idx} className="instrument-card card">
                  <div className="instrument-image">
                    <img
                      src={cableImage}
                      alt={cable.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                  <h3 className="instrument-title">{cable.name}</h3>
                  <p className="instrument-cat">{cable.type}</p>
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
