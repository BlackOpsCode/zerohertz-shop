import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";
import Card from "../auxiliars/Card"; // Card universal
import Seo from "../auxiliars/Seo"; // helper SEO

const recordingImage = "/recording-gear/recording-gear.jpg";

const recordingCategories = [
  { name: "Microphones", items: ["Condenser", "Dynamic", "Ribbon", "USB"] },
  { name: "Audio Interfaces", items: ["Focusrite", "Universal Audio", "PreSonus", "M-Audio"] },
  { name: "Mixers & Preamp", items: ["Mixers", "Mic Preamps", "Channel Strips"] },
  { name: "Cables & Accessories", items: ["XLR Cables", "Stands", "Shock Mounts", "Pop Filters"] },
  { name: "Recording Utilities", items: ["DI Boxes", "Audio Splitters", "Headphone Amps"] }
];

const recordingGear = [
  { name: "Shure SM7B", type: "Dynamic" },
  { name: "Audio-Technica AT2020", type: "Condenser" },
  { name: "Rode NT1-A", type: "Condenser" },
  { name: "Sennheiser e906", type: "Dynamic" },
  { name: "Aston Spirit Ribbon Mic", type: "Ribbon" },
  { name: "Blue Yeti USB Mic", type: "USB" },
  { name: "Focusrite Scarlett 2i2", type: "Focusrite" },
  { name: "Universal Audio Apollo Twin X", type: "Universal Audio" },
  { name: "PreSonus Studio 24c", type: "PreSonus" },
  { name: "M-Audio M-Track 2X2", type: "M-Audio" },
  { name: "Behringer Xenyx Q802USB", type: "Mixers" },
  { name: "Focusrite ISA One Preamp", type: "Mic Preamps" },
  { name: "Warm Audio WA-2A Channel Strip", type: "Channel Strips" },
  { name: "Mogami Gold XLR Cable", type: "XLR Cables" },
  { name: "K&M Microphone Stand", type: "Stands" },
  { name: "Rode PSM1 Shock Mount", type: "Shock Mounts" },
  { name: "Pop Filter Studio", type: "Pop Filters" },
  { name: "Radial JDI DI Box", type: "DI Boxes" },
  { name: "ART SplitCom Audio Splitter", type: "Audio Splitters" },
  { name: "Behringer HA400 Headphone Amp", type: "Headphone Amps" }
];

// helpers URL slug
const slugify = s => s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
const unslug = s => s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

export default function RecordingGear() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(category || null);

  useEffect(() => {
    setSelectedCategory(category || null);
  }, [category]);

  const filteredGear = selectedCategory
    ? recordingGear.filter(g => slugify(g.type) === selectedCategory)
    : recordingGear;

  const readable = selectedCategory ? unslug(selectedCategory) : null;

  const handleSelectCategory = (item) => {
    const slug = slugify(item);
    setSelectedCategory(slug);
    navigate(`/recording-gear/${slug}`);
  };

  // SEO
  const seoTitle = readable
    ? `${readable} | 0Hz Recording Gear`
    : "Recording Gear & Accessories | 0Hz";
  const seoDescription = readable
    ? `Explore all ${readable} recording gear and accessories.`
    : "Explore microphones, audio interfaces, mixers, cables, and recording utilities.";

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          {/* SEO */}
          <Seo title={seoTitle} description={seoDescription} />

          {/* Mobile swipe bar */}
          <div className="types-bar" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            {recordingCategories.map(cat => (
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
              {recordingCategories.map(cat => (
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
              {filteredGear.map((item, idx) => (
                <Card
                  key={idx}
                  imgSrc={recordingImage}
                  title={item.name}
                  category={item.type}
                  onClick={() =>
                    navigate(`/recording-gear/${slugify(item.type)}/${slugify(item.name)}`)
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
