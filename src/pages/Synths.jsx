import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";
import Card from "../auxiliars/Card"; // importăm Card

const synthImage = "/synths/synth.jpg";

const synthCategories = [
  { name: "Analog", items: ["Monophonic", "Polyphonic"] },
  { name: "Digital", items: ["FM", "Wavetable", "VA"] },
  { name: "Hybrid", items: ["Analog-Digital"] },
  { name: "Modular", items: ["Eurorack", "Semi-Modular"] },
  { name: "Accessories", items: ["Patch Cables", "Cases", "Power Supplies"] }
];

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

// helpers URL slug
const slugify = (s = "") =>
  String(s).trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
const unslug = (s = "") =>
  s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

// titlu SEO
const labelFromSlug = (slug) => {
  if (!slug) return null;
  for (const cat of synthCategories) {
    for (const item of cat.items) {
      if (slugify(item) === slug) return item;
    }
  }
  return unslug(slug);
};

export default function Synths() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(category || null);

  // sincronizare URL → state
  useEffect(() => {
    if (category) setSelectedCategory(category);
    else setSelectedCategory(null);
  }, [category]);

  // filtrare după slug
  const filteredSynths = selectedCategory
    ? synths.filter(s => slugify(s.type) === selectedCategory)
    : synths;

  const readable = labelFromSlug(selectedCategory);

  const handleSelectCategory = (displayName) => {
    const slug = slugify(displayName);
    setSelectedCategory(slug);
    navigate(`/synths/${slug}`);
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          {/* SEO */}
          <Helmet>
            <title>
              {selectedCategory ? `${readable} | 0Hz Synths` : "Synths & Accessories | 0Hz"}
            </title>
            <meta
              name="description"
              content={
                selectedCategory
                  ? `Explore all ${readable} synths. Instruments for studio and stage.`
                  : "Explore all synths and accessories engineered for performance and sound design."
              }
            />
          </Helmet>

          {/* Mobile swipe bar */}
          <div className="types-bar" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            {synthCategories.map(cat => (
              <button
                key={cat.name}
                className={`type-btn ${
                  selectedCategory &&
                  cat.items.map(i => slugify(i)).includes(selectedCategory)
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  (selectedCategory &&
                    cat.items.map(i => slugify(i)).includes(selectedCategory))
                    ? setSelectedCategory(selectedCategory)
                    : handleSelectCategory(cat.items[0])
                }
                style={{ marginRight: "0.5rem", display: "inline-block" }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Desktop layout */}
          <div className="instruments-layout">
            <aside className="types-sidebar">
              {synthCategories.map(cat => (
                <div key={cat.name} className="category-block">
                  <div className="category-title">{cat.name}</div>
                  <div className="subcategory">
                    {cat.items.map(item => (
                      <button
                        key={item}
                        className={`type-btn sub-btn ${
                          selectedCategory === slugify(item) ? "active" : ""
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
              {filteredSynths.map((synth, idx) => (
                <Card
                  key={idx}
                  imgSrc={synthImage}
                  title={synth.name}
                  category={synth.type}
                  onClick={() =>
                    navigate(`/synths/${slugify(synth.type)}/${slugify(synth.name)}`)
                  }
                  // aici poți adăuga props pentru inimioară favorite
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
