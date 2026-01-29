import React, { useState } from "react";
import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";

const recordingImage = "./recording-gear/recording-gear.jpg";

const recordingCategories = [
  {
    name: "Microphones",
    items: ["Condenser", "Dynamic", "Ribbon", "USB"]
  },
  {
    name: "Audio Interfaces",
    items: ["Focusrite", "Universal Audio", "PreSonus", "M-Audio"]
  },
  {
    name: "Mixers & Preamp",
    items: ["Mixers", "Mic Preamps", "Channel Strips"]
  },
  {
    name: "Cables & Accessories",
    items: ["XLR Cables", "Stands", "Shock Mounts", "Pop Filters"]
  },
  {
    name: "Recording Utilities",
    items: ["DI Boxes", "Audio Splitters", "Headphone Amps"]
  }
];

const recordingGear = [
  /* === Microphones === */
  { name: "Shure SM7B", type: "Dynamic" },
  { name: "Audio-Technica AT2020", type: "Condenser" },
  { name: "Rode NT1-A", type: "Condenser" },
  { name: "Sennheiser e906", type: "Dynamic" },
  { name: "Aston Spirit Ribbon Mic", type: "Ribbon" },
  { name: "Blue Yeti USB Mic", type: "USB" },

  /* === Audio Interfaces === */
  { name: "Focusrite Scarlett 2i2", type: "Focusrite" },
  { name: "Universal Audio Apollo Twin X", type: "Universal Audio" },
  { name: "PreSonus Studio 24c", type: "PreSonus" },
  { name: "M-Audio M-Track 2X2", type: "M-Audio" },

  /* === Mixers & Preamps === */
  { name: "Behringer Xenyx Q802USB", type: "Mixers" },
  { name: "Focusrite ISA One Preamp", type: "Mic Preamps" },
  { name: "Warm Audio WA-2A Channel Strip", type: "Channel Strips" },

  /* === Cables & Accessories === */
  { name: "Mogami Gold XLR Cable", type: "XLR Cables" },
  { name: "K&M Microphone Stand", type: "Stands" },
  { name: "Rode PSM1 Shock Mount", type: "Shock Mounts" },
  { name: "Pop Filter Studio", type: "Pop Filters" },

  /* === Recording Utilities === */
  { name: "Radial JDI DI Box", type: "DI Boxes" },
  { name: "ART SplitCom Audio Splitter", type: "Audio Splitters" },
  { name: "Behringer HA400 Headphone Amp", type: "Headphone Amps" }
];

export default function RecordingGear() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredGear = selectedCategory
    ? recordingGear.filter(g => g.type === selectedCategory)
    : recordingGear;

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          {/* Mobile bar */}
          <div className="types-bar">
            {recordingCategories.map(cat => (
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
              {recordingCategories.map(cat => (
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
              {filteredGear.map((item, idx) => (
                <div key={idx} className="instrument-card card">
                  <div className="instrument-image">
                    <img
                      src={recordingImage}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <h3 className="instrument-title">{item.name}</h3>
                  <p className="instrument-cat">{item.type}</p>
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
