import React, { useState } from "react";
import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";

// Path imagine instrument
const instrumentImage = "./drums/dw_drums.png";

// Vector categorii și subcategorii
const instrumentCategories = [
  { name: "Sets", items: ["Acoustic", "Electronic", "Pads"] },
  { name: "Snare", items: ["Wood Snare", "Metal Snare"] },
  { name: "Toms", items: ["Rack Tom", "Floor Tom"] },
  { name: "Kicks", items: ["Single Kick", "Double Kick"] },
  { name: "Cymbals", items: ["Rides", "Crashes", "Hi-Hats", "Chinas"] },
  { name: "Pedals", items: ["Kick Pedals", "Hi-Hat Pedals"] }
];

// Dummy instrument grid
const instruments = [
  { name: "Yamaha Stage Custom", type: "Acoustic" },
  { name: "Roland TD-17KV", type: "Electronic" },
  { name: "Pearl Export", type: "Acoustic" },
  { name: "Alesis Nitro Mesh", type: "Electronic" },
  { name: "Gretsch Catalina", type: "Acoustic" },
  { name: "Tama Imperialstar", type: "Acoustic" },
  { name: "Roland V-Drums TD-1K", type: "Electronic" },
  { name: "Mapex Mars", type: "Acoustic" },
  { name: "Wood Snare 14\"", type: "Wood Snare" },
  { name: "Metal Snare 14\"", type: "Metal Snare" },
  { name: "Rack Tom 12\"", type: "Rack Tom" },
  { name: "Floor Tom 16\"", type: "Floor Tom" },
  { name: "Ride Cymbal 20\"", type: "Rides" },
  { name: "Crash Cymbal 16\"", type: "Crashes" },
  { name: "Hi-Hat 14\"", type: "Hi-Hats" },
  { name: "China Cymbal 18\"", type: "Chinas" },
];

export default function Instruments() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredInstruments = selectedCategory
    ? instruments.filter(inst => inst.type === selectedCategory)
    : instruments;

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
      <TopBar />

      {/* Mobile type bar */}
      <div className="types-bar">
        {instrumentCategories.map(cat => (
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
          {instrumentCategories.map(cat => (
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

        {/* Instrument grid */}
        <main className="instruments-grid">
          {filteredInstruments.map((inst, idx) => (
            <div key={idx} className="instrument-card card">
              <div className="instrument-image">
                <img 
                  src={instrumentImage}
                  alt={inst.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <h3 className="instrument-title">{inst.name}</h3>
              <p className="instrument-cat">{inst.type}</p>
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
