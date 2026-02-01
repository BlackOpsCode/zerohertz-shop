import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";
import Card from "../auxiliars/Card"; // folosim Card

const monitorImage = "/studio-monitors/studio-monitor-1.png";

const monitorCategories = [
  { name: "Nearfield", items: ["2-Way", "3-Way"] },
  { name: "Midfield", items: ["2-Way", "3-Way"] },
  { name: "Active", items: ["Compact", "Professional"] },
  { name: "Passive", items: ["Compact", "Professional"] },
  { name: "Accessories", items: ["Stands", "Cables", "Isolation Pads"] }
];

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

// helpers URL slug
const slugify = s => s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
const unslug = s => s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

export default function StudioMonitors() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(category || null);

  useEffect(() => {
    if (category) setSelectedCategory(category);
    else setSelectedCategory(null);
  }, [category]);

  const filteredMonitors = selectedCategory
    ? studioMonitors.filter(m => slugify(m.type) === selectedCategory)
    : studioMonitors;

  const readable = selectedCategory ? unslug(selectedCategory) : null;

  const handleSelectCategory = (item) => {
    const slug = slugify(item);
    setSelectedCategory(slug);
    navigate(`/studio-monitors/${slug}`);
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          <Helmet>
            <title>
              {readable ? `${readable} | 0Hz Studio Monitors` : "Studio Monitors | 0Hz"}
            </title>
            <meta
              name="description"
              content={
                readable
                  ? `Explore all ${readable} studio monitors for professional audio.`
                  : "Explore all Nearfield, Midfield, Active, Passive studio monitors and accessories."
              }
            />
          </Helmet>

          {/* Mobile bar */}
          <div className="types-bar" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            {monitorCategories.map(cat => (
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
              {monitorCategories.map(cat => (
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
              {filteredMonitors.map((monitor, idx) => (
                <Card
                  key={idx}
                  imgSrc={monitorImage}
                  title={monitor.name}
                  category={monitor.type}
                  onClick={() =>
                    navigate(`/studio-monitors/${slugify(monitor.type)}/${slugify(monitor.name)}`)
                  }
                  // optional: props pentru inimioară/favorite
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

