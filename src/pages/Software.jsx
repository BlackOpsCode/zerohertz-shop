import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";
import Card from "../auxiliars/Card"; // folosim Card

const softwareImage = "/software/audiomass.jpg";

const softwareCategories = [
  { name: "DAW", items: ["Ableton Live", "FL Studio", "Logic Pro", "Cubase", "Reaper"] },
  { name: "Recording Tools", items: ["Pro Tools", "Audacity", "Studio One", "GarageBand"] },
  { name: "Isolation & Noise Reduction", items: ["iZotope RX", "Accusonus ERA Bundle", "Waves X-Noise"] },
  { name: "Mixing & Mastering", items: ["FabFilter Pro-Q", "Waves SSL G-Master Buss", "Ozone 10"] },
  { name: "Plugins & Effects", items: ["Kontakt", "Serum", "Massive", "Valhalla Reverb", "Nexus"] }
];

const softwareList = [
  { name: "Ableton Live 11", type: "Ableton Live" },
  { name: "FL Studio 20", type: "FL Studio" },
  { name: "Logic Pro X", type: "Logic Pro" },
  { name: "Cubase 12", type: "Cubase" },
  { name: "Reaper 6", type: "Reaper" },
  { name: "Pro Tools 2023", type: "Pro Tools" },
  { name: "Audacity 3.2", type: "Audacity" },
  { name: "Studio One 6", type: "Studio One" },
  { name: "GarageBand 10", type: "GarageBand" },
  { name: "iZotope RX 10 Advanced", type: "iZotope RX" },
  { name: "Accusonus ERA Bundle", type: "Accusonus ERA Bundle" },
  { name: "Waves X-Noise", type: "Waves X-Noise" },
  { name: "FabFilter Pro-Q 3", type: "FabFilter Pro-Q" },
  { name: "Waves SSL G-Master Buss", type: "Waves SSL G-Master Buss" },
  { name: "iZotope Ozone 10", type: "Ozone 10" },
  { name: "Native Instruments Kontakt 7", type: "Kontakt" },
  { name: "Xfer Serum", type: "Serum" },
  { name: "Native Instruments Massive X", type: "Massive" },
  { name: "Valhalla VintageVerb", type: "Valhalla Reverb" },
  { name: "Nexus 3", type: "Nexus" }
];

// helpers URL slug
const slugify = s => s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
const unslug = s => s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

export default function Software() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(category || null);

  useEffect(() => {
    if (category) setSelectedCategory(category);
    else setSelectedCategory(null);
  }, [category]);

  const filteredSoftware = selectedCategory
    ? softwareList.filter(s => slugify(s.type) === selectedCategory)
    : softwareList;

  const readable = selectedCategory ? unslug(selectedCategory) : null;

  const handleSelectCategory = (item) => {
    const slug = slugify(item);
    setSelectedCategory(slug);
    navigate(`/software/${slug}`);
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          <Helmet>
            <title>
              {readable ? `${readable} | 0Hz Software` : "Audio Software | 0Hz"}
            </title>
            <meta
              name="description"
              content={
                readable
                  ? `Explore all ${readable} audio software tools.`
                  : "Explore DAWs, plugins, mixing, mastering, and recording tools."
              }
            />
          </Helmet>

          {/* Mobile bar */}
          <div className="types-bar" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            {softwareCategories.map(cat => (
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
              {softwareCategories.map(cat => (
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
              {filteredSoftware.map((software, idx) => (
                <Card
                  key={idx}
                  imgSrc={softwareImage}
                  title={software.name}
                  category={software.type}
                  onClick={() =>
                    navigate(`/software/${slugify(software.type)}/${slugify(software.name)}`)
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
