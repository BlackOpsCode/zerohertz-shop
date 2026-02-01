import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";
import Card from "../auxiliars/Card";
import Seo from "../auxiliars/Seo"; // <- helper SEO

const keyboardImage = "/keyboards/keyboard.jpg";

const keyboardCategories = [
  { name: "Digital Pianos", items: ["Stage Piano", "Home Piano", "Portable"] },
  { name: "Acoustic Pianos", items: ["Upright Piano", "Grand Piano"] },
  { name: "Keyboards", items: ["61 Keys", "76 Keys", "88 Keys"] },
  { name: "Accessories", items: ["Stands", "Pedals", "Covers"] }
];

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

// helpers pentru URL slug
const slugify = (s = "") => s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
const unslug = (s = "") => s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

export default function Keyboards() {
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
    setSelectedCategory(category || null);
  }, [category]);

  const filteredKeyboards = selectedCategory
    ? keyboards.filter(k => slugify(k.type) === selectedCategory)
    : keyboards;

  const readable = selectedCategory ? unslug(selectedCategory) : null;

  const handleSelectCategory = (item) => {
    const slug = slugify(item);
    setSelectedCategory(slug);
    navigate(`/keyboards/${slug}`);
  };

  // SEO
  const seoTitle = readable ? `${readable} | 0Hz Keyboards` : "Keyboards & Pianos | 0Hz";
  const seoDescription = readable
    ? `Explore all ${readable}. Instruments for stage and home use.`
    : "Explore all keyboards, digital and acoustic pianos, and accessories.";

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          {/* SEO */}
          <Seo title={seoTitle} description={seoDescription} />

          {/* Mobile swipe bar */}
          <div className="types-bar" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            {keyboardCategories.map(cat => (
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
              {keyboardCategories.map(cat => (
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
              {filteredKeyboards.map((keyboard, idx) => (
                <Card
                  key={idx}
                  imgSrc={keyboardImage}
                  title={keyboard.name}
                  category={keyboard.type}
                  onClick={() =>
                    navigate(`/keyboards/${slugify(keyboard.type)}/${slugify(keyboard.name)}`)
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


