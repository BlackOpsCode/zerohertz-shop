import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";
import Card from "../auxiliars/Card"; // importăm componenta Card

const instrumentImage = '/drums/dw_drums.png';

const instrumentCategories = [
  { name: "Sets", items: ["Acoustic", "Electronic", "Pads"] },
  { name: "Snare", items: ["Wood Snare", "Metal Snare"] },
  { name: "Toms", items: ["Rack Tom", "Floor Tom"] },
  { name: "Kicks", items: ["Single Kick", "Double Kick"] },
  { name: "Cymbals", items: ["Rides", "Crashes", "Hi-Hats", "Chinas"] },
  { name: "Pedals", items: ["Kick Pedals", "Hi-Hat Pedals"] }
];

const instruments = [
  { name: "Yamaha Stage Custom", type: "Acoustic" },
  { name: "Roland TD-17KV", type: "Electronic" },
  { name: "Pearl Export", type: "Acoustic" },
  { name: "Alesis Nitro Mesh", type: "Electronic" },
  { name: "Gretsch Catalina", type: "Acoustic" },
  { name: "Tama Imperialstar", type: "Acoustic" },
  { name: "Roland V-Drums TD-1K", type: "Electronic" },
  { name: "Mapex Mars", type: "Acoustic" },
  { name: 'Wood Snare 14"', type: "Wood Snare" },
  { name: 'Metal Snare 14"', type: "Metal Snare" },
  { name: 'Rack Tom 12"', type: "Rack Tom" },
  { name: 'Floor Tom 16"', type: "Floor Tom" },
  { name: 'Ride Cymbal 20"', type: "Rides" },
  { name: 'Crash Cymbal 16"', type: "Crashes" },
  { name: 'Hi-Hat 14"', type: "Hi-Hats" },
  { name: 'China Cymbal 18"', type: "Chinas" }
];

export default function Drums() {
  const { category, instrumentName } = useParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(category || null);

  const filteredInstruments = selectedCategory
    ? instruments.filter(inst => inst.type.toLowerCase() === selectedCategory.toLowerCase())
    : instruments;

  const handleSelectCategory = (catName) => {
    setSelectedCategory(catName);
    navigate(`/drums/${catName.toLowerCase()}`);
  };

  const handleSelectInstrument = (instName) => {
    const urlName = instName.toLowerCase().replace(/\s+/g, "-");
    if (selectedCategory) {
      navigate(`/drums/${selectedCategory.toLowerCase()}/${urlName}`);
    } else {
      navigate(`/drums/${urlName}`);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          <Helmet>
            <title>
              {instrumentName
                ? `${instrumentName} | ${selectedCategory} | 0Hz Drums`
                : selectedCategory
                ? `${selectedCategory} | 0Hz Drums`
                : "Drums & Percussion | 0Hz"}
            </title>
          </Helmet>

          {/* Mobile type bar */}
          <div className="types-bar" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            {instrumentCategories.map(cat => (
              <button
                key={cat.name}
                className={`type-btn ${
                  selectedCategory && cat.items.includes(selectedCategory) ? "active" : ""
                }`}
                onClick={() => handleSelectCategory(cat.items[0])}
                style={{ display: "inline-block", marginRight: "0.5rem" }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Desktop layout */}
          <div className="instruments-layout">
            <aside className="types-sidebar">
              {instrumentCategories.map(cat => (
                <div key={cat.name} className="category-block">
                  <div className="category-title">{cat.name}</div>
                  <div className="subcategory">
                    {cat.items.map(item => (
                      <button
                        key={item}
                        className={`type-btn sub-btn ${
                          selectedCategory === item ? "active" : ""
                        }`}
                        onClick={() => handleSelectCategory(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </aside>

            <main className="instruments-grid">
              {filteredInstruments.map((inst, idx) => (
                <Card
                  key={idx}
                  imgSrc={instrumentImage}
                  title={inst.name}
                  category={inst.type}
                  onClick={() => handleSelectInstrument(inst.name)}
                />
              ))}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
