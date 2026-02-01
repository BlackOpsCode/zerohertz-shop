import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";
import Card from "../auxiliars/Card";
import Seo from "../auxiliars/Seo"; // helper SEO universal

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

// extrage titlu SEO din slug
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
    setSelectedCategory(category || null);
  }, [category]);

  // filtrare după slug
  const filteredSynths = selectedCategory
    ? synths.filter(s => slugify(s.type) === selectedCategory)
    : synths;

  const readable = labelFromSlug(selectedCategory);

  const handleSelectCategory = (item) => {
    const slug = slugify(item);
    setSelectedCategory(slug);
    navigate(`/synths/${slug}`);
  };

  // SEO
  const seoTitle = readable ? `${readable} | 0Hz Synths` : "Synths & Accessories | 0Hz";
  const seoDescription = readable
    ? `Explore all ${readable} synths for studio and stage.`
    : "Explore all synths, modulars, hybrids, and accessories for music production.";

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          {/* SEO */}
          <Seo title={seoTitle} description={seoDescription} />

          {/* Mobile category bar */}
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
                  selectedCategory &&
                  cat.items.map(i => slugify(i)).includes(selectedCategory)
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
