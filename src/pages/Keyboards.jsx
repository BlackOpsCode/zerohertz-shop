import React, { useState } from "react";
import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";

// Path imagine keyboard
const keyboardImage = "./keyboards/keyboard.jpg";

// Categorii și subcategorii pentru keyboards
const keyboardCategories = [
  {
    name: "Digital Pianos",
    items: ["Stage Piano", "Home Piano", "Portable"]
  },
  {
    name: "Acoustic Pianos",
    items: ["Upright Piano", "Grand Piano"]
  },
  {
    name: "Keyboards",
    items: ["61 Keys", "76 Keys", "88 Keys"]
  },
  {
    name: "Accessories",
    items: ["Stands", "Pedals", "Covers"]
  }
];

// Dummy grid cu piane & keyboards
const keyboards = [
  { name: "Yamaha P-125", type: "Stage Piano" },
  { name: "Roland FP-30X", type: "Home Piano" },
  { name: "Casio CT-S300", type: "Portable" },
  { name: "Yamaha U1 Upright", type: "Upright Piano" },
  { name: "Steinway Model D", type: "Grand Piano" },
  { name: "Korg Kross 61", type: "61 Keys" },
  { name: "Nord Stage 3 76", type: "76 Keys" },
  { name: "Roland RD-2000", type: "88 Keys" },
  { name: "Keyboard Stand Pro", type: "Stands" },
  { name: "Sustain Pedal", type: "Pedals" }
];

export default function Keyboards() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredKeyboards = selectedCategory
    ? keyboards.filter(k => k.type === selectedCategory)
    : keyboards;

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          {/* Mobile type bar */}
          <div className="types-bar">
            {keyboardCategories.map(cat => (
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
              {keyboardCategories.map(cat => (
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

            {/* Keyboards grid */}
            <main className="instruments-grid">
              {filteredKeyboards.map((keyboard, idx) => (
                <div key={idx} className="instrument-card card">
                  <div className="instrument-image">
                    <img
                      src={keyboardImage}
                      alt={keyboard.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                  <h3 className="instrument-title">{keyboard.name}</h3>
                  <p className="instrument-cat">{keyboard.type}</p>
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
