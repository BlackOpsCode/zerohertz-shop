import React, { useState } from "react";
import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";

// Path imagine studio monitor
const monitorImage = "./studio-monitors/studio-monitor-1.png";

// Categorii și subcategorii pentru Studio Monitors
const monitorCategories = [
  {
    name: "Nearfield",
    items: ["2-Way", "3-Way"]
  },
  {
    name: "Midfield",
    items: ["2-Way", "3-Way"]
  },
  {
    name: "Active",
    items: ["Compact", "Professional"]
  },
  {
    name: "Passive",
    items: ["Compact", "Professional"]
  },
  {
    name: "Accessories",
    items: ["Stands", "Cables", "Isolation Pads"]
  }
];

// Dummy grid cu Studio Monitors
const studioMonitors = [
  { name: "KRK Rokit 5 G4", type: "2-Way" },
  { name: "Yamaha HS8", type: "3-Way" },
  { name: "Adam Audio A7X", type: "Compact" },
  { name: "Focal Solo6 Be", type: "Professional" },
  { name: "Mackie MR824", type: "Midfield" },
  { name: "Genelec 8040B", type: "Professional" },
  { name: "IsoAcoustics Stands", type: "Stands" },
  { name: "XLR Cable 3m", type: "Cables" },
  { name: "Auralex Isolation Pad", type: "Isolation Pads" }
];

export default function StudioMonitors() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredMonitors = selectedCategory
    ? studioMonitors.filter(m => m.type === selectedCategory)
    : studioMonitors;

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          {/* Mobile type bar */}
          <div className="types-bar">
            {monitorCategories.map(cat => (
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
              {monitorCategories.map(cat => (
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

            {/* Studio Monitors grid */}
            <main className="instruments-grid">
              {filteredMonitors.map((monitor, idx) => (
                <div key={idx} className="instrument-card card">
                  <div className="instrument-image">
                    <img
                      src={monitorImage}
                      alt={monitor.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                  <h3 className="instrument-title">{monitor.name}</h3>
                  <p className="instrument-cat">{monitor.type}</p>
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
