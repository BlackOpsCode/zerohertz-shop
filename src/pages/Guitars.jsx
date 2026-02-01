import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";
import Card from "../auxiliars/Card";
import Seo from "../auxiliars/Seo"; // <- helper SEO

const guitarImage = "/guitars/HB_Amarok.jpg";

const guitarCategories = [
  { name: "Electric", items: ["Stratocaster", "Les Paul", "Telecaster"] },
  { name: "Acoustic", items: ["Dreadnought", "Parlor", "Concert"] },
  { name: "Bass", items: ["4-String", "5-String"] },
  { name: "Accessories", items: ["Strings", "Pickups", "Straps"] }
];

const guitars = [
  { name: "Fender Stratocaster", type: "Stratocaster" },
  { name: "Gibson Les Paul", type: "Les Paul" },
  { name: "Fender Telecaster", type: "Telecaster" },
  { name: "Yamaha Acoustic Dreadnought", type: "Dreadnought" },
  { name: "Martin Parlor", type: "Parlor" },
  { name: "Ibanez 5-String Bass", type: "5-String" },
  { name: "GHS Strings Pack", type: "Strings" },
  { name: "Fender Strap", type: "Straps" }
];

// helper: make slug from display name
const slugify = (s = "") =>
  String(s)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

// helper: get human readable label from slug (search categories)
const labelFromSlug = (slug) => {
  if (!slug) return null;
  for (const cat of guitarCategories) {
    for (const item of cat.items) {
      if (slugify(item) === slug) return item;
    }
  }
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

export default function Guitars() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(category || null);


  const location = useLocation();
 useEffect(() => {
    const pathParts = location.pathname.split("/"); // ex: ["", "drums", "acoustic", "yamaha-stage-custom"]
    const cat = pathParts[2]; // "/drums/:category"
    setSelectedCategory(cat || null);
  }, [location.pathname]);


  useEffect(() => {
    if (category) setSelectedCategory(category);
    else setSelectedCategory(null);
  }, [category]);

  const filteredGuitars = selectedCategory
    ? guitars.filter((g) => slugify(g.type) === selectedCategory)
    : guitars;

  const handleSelectCategory = (displayName) => {
    const slug = slugify(displayName);
    setSelectedCategory(slug);
    navigate(`/guitars/${slug}`);
  };

  const readable = labelFromSlug(selectedCategory);

  // Titlu + descriere SEO
  const seoTitle = selectedCategory ? `${readable} | 0Hz Guitars` : "Guitars & Accessories | 0Hz";
  const seoDescription = selectedCategory
    ? `Explore all ${readable} guitars. Premium instruments for studios and stages.`
    : "Explore all guitars, basses, and accessories engineered for studio and stage.";

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          {/* Helper SEO */}
          <Seo title={seoTitle} description={seoDescription} />

          {/* Mobile swipe bar */}
          <div className="types-bar" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            {guitarCategories.map((cat) => (
              <button
                key={cat.name}
                className={`type-btn ${
                  selectedCategory && cat.items.map((i) => slugify(i)).includes(selectedCategory)
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  (selectedCategory && cat.items.map((i) => slugify(i)).includes(selectedCategory))
                    ? setSelectedCategory(selectedCategory)
                    : handleSelectCategory(cat.items[0])
                }
                style={{ display: "inline-block", marginRight: "0.5rem" }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Desktop layout */}
          <div className="instruments-layout">
            <aside className="types-sidebar">
              {guitarCategories.map((cat) => (
                <div key={cat.name} className="category-block">
                  <div className="category-title">{cat.name}</div>
                  <div className="subcategory">
                    {cat.items.map((item) => (
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
              {filteredGuitars.map((guitar, idx) => (
                <Card
                  key={idx}
                  imgSrc={guitarImage}
                  title={guitar.name}
                  category={guitar.type}
                  onClick={() =>
                    navigate(
                      `/guitars/${slugify(guitar.type)}/${slugify(guitar.name)}`
                    )
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
