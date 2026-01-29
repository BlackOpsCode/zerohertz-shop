import React, { useState } from "react";
import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";

const softwareImage = "./software/audiomass.jpg";

const softwareCategories = [
  {
    name: "DAW",
    items: ["Ableton Live", "FL Studio", "Logic Pro", "Cubase", "Reaper"]
  },
  {
    name: "Recording Tools",
    items: ["Pro Tools", "Audacity", "Studio One", "GarageBand"]
  },
  {
    name: "Isolation & Noise Reduction",
    items: ["iZotope RX", "Accusonus ERA Bundle", "Waves X-Noise"]
  },
  {
    name: "Mixing & Mastering",
    items: ["FabFilter Pro-Q", "Waves SSL G-Master Buss", "Ozone 10"]
  },
  {
    name: "Plugins & Effects",
    items: ["Kontakt", "Serum", "Massive", "Valhalla Reverb", "Nexus"]
  }
];

const softwareList = [
  /* === DAW === */
  { name: "Ableton Live 11", type: "Ableton Live" },
  { name: "FL Studio 20", type: "FL Studio" },
  { name: "Logic Pro X", type: "Logic Pro" },
  { name: "Cubase 12", type: "Cubase" },
  { name: "Reaper 6", type: "Reaper" },

  /* === Recording Tools === */
  { name: "Pro Tools 2023", type: "Pro Tools" },
  { name: "Audacity 3.2", type: "Audacity" },
  { name: "Studio One 6", type: "Studio One" },
  { name: "GarageBand 10", type: "GarageBand" },

  /* === Isolation & Noise Reduction === */
  { name: "iZotope RX 10 Advanced", type: "iZotope RX" },
  { name: "Accusonus ERA Bundle", type: "Accusonus ERA Bundle" },
  { name: "Waves X-Noise", type: "Waves X-Noise" },

  /* === Mixing & Mastering === */
  { name: "FabFilter Pro-Q 3", type: "FabFilter Pro-Q" },
  { name: "Waves SSL G-Master Buss", type: "Waves SSL G-Master Buss" },
  { name: "iZotope Ozone 10", type: "Ozone 10" },

  /* === Plugins & Effects === */
  { name: "Native Instruments Kontakt 7", type: "Kontakt" },
  { name: "Xfer Serum", type: "Serum" },
  { name: "Native Instruments Massive X", type: "Massive" },
  { name: "Valhalla VintageVerb", type: "Valhalla Reverb" },
  { name: "Nexus 3", type: "Nexus" }
];

export default function Software() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredSoftware = selectedCategory
    ? softwareList.filter(s => s.type === selectedCategory)
    : softwareList;

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          {/* Mobile bar */}
          <div className="types-bar">
            {softwareCategories.map(cat => (
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

          <div className="instruments-layout">
            {/* Sidebar */}
            <aside className="types-sidebar">
              {softwareCategories.map(cat => (
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

            {/* Grid */}
            <main className="instruments-grid">
              {filteredSoftware.map((software, idx) => (
                <div key={idx} className="instrument-card card">
                  <div className="instrument-image">
                    <img
                      src={softwareImage}
                      alt={software.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <h3 className="instrument-title">{software.name}</h3>
                  <p className="instrument-cat">{software.type}</p>
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
