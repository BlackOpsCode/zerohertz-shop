import React, { useState } from "react";
import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";

// Path imagine audio interface
const interfaceImage = "./audio-interfaces/audio-interface-1.webp";

// Categorii și subcategorii pentru Audio Interfaces
const interfaceCategories = [
  {
    name: "USB",
    items: ["2-Channel", "4-Channel", "8-Channel"]
  },
  {
    name: "Thunderbolt",
    items: ["High-End", "Pro Studio"]
  },
  {
    name: "PCIe",
    items: ["Internal", "DSP"]
  },
  {
    name: "Wireless",
    items: ["Bluetooth", "Wi-Fi"]
  },
  {
    name: "Accessories",
    items: ["Cables", "Adapters", "Stands"]
  }
];

// Dummy grid cu Audio Interfaces
const audioInterfaces = [
  { name: "Focusrite Scarlett 2i2", type: "2-Channel" },
  { name: "Focusrite Scarlett 4i4", type: "4-Channel" },
  { name: "PreSonus Studio 68c", type: "8-Channel" },
  { name: "Universal Audio Apollo Twin", type: "High-End" },
  { name: "RME Babyface Pro FS", type: "Pro Studio" },
  { name: "MOTU PCIe-424", type: "Internal" },
  { name: "Apollo x8 DSP", type: "DSP" },
  { name: "iRig Pro Duo", type: "Bluetooth" },
  { name: "Roland GO:LIVECAST", type: "Wi-Fi" },
  { name: "XLR Cable 2m", type: "Cables" },
  { name: "USB Adapter", type: "Adapters" },
  { name: "Interface Stand Pro", type: "Stands" }
];

export default function AudioInterfaces() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredInterfaces = selectedCategory
    ? audioInterfaces.filter(ai => ai.type === selectedCategory)
    : audioInterfaces;

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          {/* Mobile type bar */}
          <div className="types-bar">
            {interfaceCategories.map(cat => (
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
              {interfaceCategories.map(cat => (
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

            {/* Audio Interfaces grid */}
            <main className="instruments-grid">
              {filteredInterfaces.map((ai, idx) => (
                <div key={idx} className="instrument-card card">
                  <div className="instrument-image">
                    <img
                      src={interfaceImage}
                      alt={ai.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                  <h3 className="instrument-title">{ai.name}</h3>
                  <p className="instrument-cat">{ai.type}</p>
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
