import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";
import Card from "../auxiliars/Card";
import Seo from "../auxiliars/Seo"; // <- helper SEO

const bassImage = "/basses/bass-1.jpg";

const bassCategories = [
  { name: "Electric Bass", items: ["4-String", "5-String", "6-String"] },
  { name: "Acoustic Bass", items: ["Acoustic", "Electro-Acoustic"] },
  { name: "Upright Bass", items: ["Double Bass"] },
  { name: "Accessories", items: ["Strings", "Cases", "Bows"] }
];

const basses = [
  { name: "Fender Jazz Bass", type: "4-String" },
  { name: "Ibanez SR505", type: "5-String" },
  { name: "Yamaha TRB 6", type: "6-String" },
  { name: "Ibanez Acoustic Bass", type: "Acoustic" },
  { name: "Taylor Electro Acoustic Bass", type: "Electro-Acoustic" },
  { name: "Stentor Double Bass", type: "Double Bass" },
  { name: "D’Addario Bass Strings", type: "Strings" },
  { name: "Hard Case Double Bass", type: "Cases" }
];

// helper: slugify & unslug
const slugify = (s = "") =>
  String(s).trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

const unslug = (s = "") =>
  s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

const labelFromSlug = (slug) => {
  if (!slug) return null;
  for (const cat of bassCategories) {
    for (const item of cat.items) {
      if (slugify(item) === slug) return item;
    }
  }
  return unslug(slug);
};

export default function Basses() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(category || null);

  useEffect(() => {
    setSelectedCategory(category || null);
  }, [category]);

  const filteredBasses = selectedCategory
    ? basses.filter(b => slugify(b.type) === selectedCategory)
    : basses;

  const handleSelectCategory = (displayName) => {
    const slug = slugify(displayName);
    setSelectedCategory(slug);
    navigate(`/bass/${slug}`);
  };

  const readable = labelFromSlug(selectedCategory);

  // SEO
  const seoTitle = selectedCategory ? `${readable} | 0Hz Basses` : "Basses & Accessories | 0Hz";
  const seoDescription = selectedCategory
    ? `Explore all ${readable} basses. Built for groove and power.`
    : "Explore all bass guitars and accessories engineered for tone and depth.";

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          {/* SEO helper */}
          <Seo title={seoTitle} description={seoDescription} />

          {/* Mobile swipe bar */}
          <div className="types-bar" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            {bassCategories.map(cat => (
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
              {bassCategories.map(cat => (
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
              {filteredBasses.map((bass, idx) => (
                <Card
                  key={idx}
                  imgSrc={bassImage}
                  title={bass.name}
                  category={bass.type}
                  onClick={() =>
                    navigate(`/bass/${slugify(bass.type)}/${slugify(bass.name)}`)
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
