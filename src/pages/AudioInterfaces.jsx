import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";
import Card from "../auxiliars/Card";
import Seo from "../auxiliars/Seo"; // SEO universal

const interfaceImage = "/audio-interfaces/audio-interface-1.webp";

const interfaceCategories = [
  { name: "USB", items: ["2-Channel", "4-Channel", "8-Channel"] },
  { name: "Thunderbolt", items: ["High-End", "Pro Studio"] },
  { name: "PCIe", items: ["Internal", "DSP"] },
  { name: "Wireless", items: ["Bluetooth", "Wi-Fi"] },
  { name: "Accessories", items: ["Cables", "Adapters", "Stands"] }
];

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

// helpers URL slug
const slugify = (s = "") =>
  String(s).trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
const unslug = (s = "") =>
  s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

// extrage titlu SEO din slug
const labelFromSlug = (slug) => {
  if (!slug) return null;
  for (const cat of interfaceCategories) {
    for (const item of cat.items) {
      if (slugify(item) === slug) return item;
    }
  }
  return unslug(slug);
};

export default function AudioInterfaces() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(category || null);

  // sincronizare URL → state
  useEffect(() => {
    setSelectedCategory(category || null);
  }, [category]);

  // filtrare după categorie
  const filteredInterfaces = selectedCategory
    ? audioInterfaces.filter(ai => slugify(ai.type) === selectedCategory)
    : audioInterfaces;

  const readable = labelFromSlug(selectedCategory);

  const handleSelectCategory = (item) => {
    const slug = slugify(item);
    setSelectedCategory(slug);
    navigate(`/audio-interfaces/${slug}`);
  };

  // SEO
  const seoTitle = readable
    ? `${readable} | 0Hz Audio Interfaces`
    : "Audio Interfaces | 0Hz";
  const seoDescription = readable
    ? `Explore all ${readable} audio interfaces for studio and live use.`
    : "Explore all USB, Thunderbolt, PCIe, Wireless audio interfaces and accessories.";

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          <Seo title={seoTitle} description={seoDescription} />

          {/* Mobile category bar */}
          <div className="types-bar" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            {interfaceCategories.map(cat => (
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
              {interfaceCategories.map(cat => (
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
              {filteredInterfaces.map((ai, idx) => (
                <Card
                  key={idx}
                  imgSrc={interfaceImage}
                  title={ai.name}
                  category={ai.type}
                  onClick={() =>
                    navigate(`/audio-interfaces/${slugify(ai.type)}/${slugify(ai.name)}`)
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
