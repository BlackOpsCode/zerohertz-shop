import React, { useState } from "react";
import TopBar from "../auxiliars/TopBar";
import Footer from "../auxiliars/Footer";

const accessoryImage = "./accessories/accessory.jpg";

const accessoryCategories = [
  {
    name: "Drum Accessories",
    items: ["Drum Sticks", "Brushes", "Practice Pads"]
  },
  {
    name: "Guitar Accessories",
    items: ["Picks", "Capos", "Straps"]
  },
  {
    name: "Effects Pedals",
    items: ["Overdrive", "Distortion", "Delay", "Reverb"]
  },
  {
    name: "Amplification",
    items: ["Combo Amps", "Amp Heads", "Speaker Cabinets"]
  },
  {
    name: "Sound & Utility",
    items: ["Stands", "Cases", "Tuners"]
  }
];

const accessories = [
  /* ================= DRUM ACCESSORIES ================= */
  { name: "Vic Firth 5A Drum Sticks", type: "Drum Sticks" },
  { name: "Vic Firth 5B Drum Sticks", type: "Drum Sticks" },
  { name: "Vic Firth 7A Drum Sticks", type: "Drum Sticks" },
  { name: "ProMark Forward 5A", type: "Drum Sticks" },
  { name: "ProMark Rebound 5B", type: "Drum Sticks" },
  { name: "Zildjian Heavy Drum Sticks", type: "Drum Sticks" },
  { name: "Meinl Hybrid Drum Sticks", type: "Drum Sticks" },
  { name: "Ahead Aluminum Drum Sticks", type: "Drum Sticks" },

  { name: "Jazz Drum Brushes", type: "Brushes" },
  { name: "Vic Firth Wire Brushes", type: "Brushes" },
  { name: "Promark Light Brushes", type: "Brushes" },
  { name: "Meinl Nylon Brushes", type: "Brushes" },

  { name: "Evans Practice Pad 12\"", type: "Practice Pads" },
  { name: "Evans RealFeel Practice Pad", type: "Practice Pads" },
  { name: "Meinl Training Pad", type: "Practice Pads" },
  { name: "Remo Silent Stroke Pad", type: "Practice Pads" },

  /* ================= GUITAR ACCESSORIES ================= */
  { name: "Dunlop Tortex Picks 0.88mm", type: "Picks" },
  { name: "Dunlop Jazz III Picks", type: "Picks" },
  { name: "Ernie Ball Pick Variety Pack", type: "Picks" },
  { name: "Fender Medium Celluloid Picks", type: "Picks" },
  { name: "Dava Control Picks", type: "Picks" },

  { name: "Kyser Quick Change Capo", type: "Capos" },
  { name: "Shubb C1 Capo", type: "Capos" },
  { name: "Dunlop Trigger Capo", type: "Capos" },
  { name: "G7th Performance Capo", type: "Capos" },

  { name: "Fender Vintage Guitar Strap", type: "Straps" },
  { name: "Levy's Leather Strap", type: "Straps" },
  { name: "Ernie Ball Polypro Strap", type: "Straps" },
  { name: "DiMarzio ClipLock Strap", type: "Straps" },

  /* ================= EFFECTS PEDALS ================= */
  { name: "Boss DS-1 Distortion", type: "Distortion" },
  { name: "Boss MT-2 Metal Zone", type: "Distortion" },
  { name: "ProCo RAT Distortion", type: "Distortion" },
  { name: "MXR Distortion+", type: "Distortion" },

  { name: "Ibanez Tube Screamer TS9", type: "Overdrive" },
  { name: "Fulltone OCD Overdrive", type: "Overdrive" },
  { name: "Boss SD-1 Super Overdrive", type: "Overdrive" },
  { name: "MXR Custom Badass OD", type: "Overdrive" },

  { name: "TC Electronic Flashback Delay", type: "Delay" },
  { name: "Boss DD-8 Digital Delay", type: "Delay" },
  { name: "MXR Carbon Copy Delay", type: "Delay" },
  { name: "Electro-Harmonix Canyon Delay", type: "Delay" },

  { name: "Electro-Harmonix Holy Grail", type: "Reverb" },
  { name: "TC Hall of Fame Reverb", type: "Reverb" },
  { name: "Boss RV-6 Reverb", type: "Reverb" },
  { name: "Strymon BigSky Reverb", type: "Reverb" },

  /* ================= AMPLIFICATION ================= */
  /* ================= AMPLIFICATION ================= */

/* === COMBO AMPS === */
{ name: "Fender Champion 40", type: "Combo Amps" },
{ name: "Boss Katana 50 MkII", type: "Combo Amps" },
{ name: "Boss Katana 100 MkII", type: "Combo Amps" },
{ name: "Orange Crush 20RT", type: "Combo Amps" },
{ name: "Orange Crush 35RT", type: "Combo Amps" },
{ name: "Marshall MG30GFX", type: "Combo Amps" },
{ name: "Marshall DSL40CR", type: "Combo Amps" },
{ name: "Blackstar ID:Core 20", type: "Combo Amps" },
{ name: "Blackstar ID:Core 40", type: "Combo Amps" },
{ name: "Blackstar HT Club 40", type: "Combo Amps" },
{ name: "Vox AC10C1", type: "Combo Amps" },
{ name: "Vox AC15C1", type: "Combo Amps" },
{ name: "Laney LX35R", type: "Combo Amps" },
{ name: "Laney Cub 12R", type: "Combo Amps" },
{ name: "Peavey Bandit 112", type: "Combo Amps" },
{ name: "Roland JC-40 Jazz Chorus", type: "Combo Amps" },

/* === AMP HEADS === */
{ name: "Marshall DSL20 Head", type: "Amp Heads" },
{ name: "Marshall DSL100 Head", type: "Amp Heads" },
{ name: "EVH 5150 III 50W Head", type: "Amp Heads" },
{ name: "EVH 5150 III 100W Head", type: "Amp Heads" },
{ name: "Peavey 6505 MH Head", type: "Amp Heads" },
{ name: "Peavey 6505+ Head", type: "Amp Heads" },
{ name: "Mesa Boogie Mini Rectifier", type: "Amp Heads" },
{ name: "Mesa Boogie Dual Rectifier", type: "Amp Heads" },
{ name: "Orange Rocker 15 Terror", type: "Amp Heads" },
{ name: "Orange Dual Terror", type: "Amp Heads" },
{ name: "PRS MT15 Mark Tremonti", type: "Amp Heads" },
{ name: "Friedman BE-100 Head", type: "Amp Heads" },
{ name: "ENGL Fireball 25", type: "Amp Heads" },
{ name: "ENGL Powerball II", type: "Amp Heads" },

/* === SPEAKER CABINETS === */
{ name: "Marshall 1960A 4x12 Cabinet", type: "Speaker Cabinets" },
{ name: "Marshall 1936 2x12 Cabinet", type: "Speaker Cabinets" },
{ name: "Orange PPC112 Cabinet", type: "Speaker Cabinets" },
{ name: "Orange PPC212 Cabinet", type: "Speaker Cabinets" },
{ name: "Mesa Boogie Rectifier 4x12", type: "Speaker Cabinets" },
{ name: "Mesa Boogie Rectifier 2x12", type: "Speaker Cabinets" },
{ name: "Harley Benton G212 Vintage", type: "Speaker Cabinets" },
{ name: "Harley Benton G412A Vintage", type: "Speaker Cabinets" },
{ name: "EVH 5150III 2x12 Cabinet", type: "Speaker Cabinets" },
{ name: "PRS Stealth 2x12 Cabinet", type: "Speaker Cabinets" },

  /* ================= SOUND & UTILITY ================= */
  { name: "Hercules Guitar Stand", type: "Stands" },
  { name: "K&M Adjustable Stand", type: "Stands" },
  { name: "Fender Universal A-Frame Stand", type: "Stands" },
  { name: "On-Stage Folding Stand", type: "Stands" },

  { name: "Hard Case Electric Guitar", type: "Cases" },
  { name: "Bass Guitar Gig Bag", type: "Cases" },
  { name: "Gator Molded Guitar Case", type: "Cases" },
  { name: "Thomann Deluxe Gig Bag", type: "Cases" },

  { name: "Boss TU-3 Chromatic Tuner", type: "Tuners" },
  { name: "Korg Pitchblack Tuner", type: "Tuners" },
  { name: "D'Addario Micro Tuner", type: "Tuners" },
  { name: "Snark SN-5X Clip-On Tuner", type: "Tuners" }
];


export default function Accessories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredAccessories = selectedCategory
    ? accessories.filter(a => a.type === selectedCategory)
    : accessories;

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="instruments-page">
          <TopBar />

          {/* Mobile bar */}
          <div className="types-bar">
            {accessoryCategories.map(cat => (
              <button
                key={cat.name}
                className={`type-btn ${
                  selectedCategory && cat.items.includes(selectedCategory)
                    ? "active"
                    : ""
                }`}
                onClick={() => setSelectedCategory(cat.items[0])}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="instruments-layout">
            {/* Sidebar */}
            <aside className="types-sidebar">
              {accessoryCategories.map(cat => (
                <div key={cat.name} className="category-block">
                  <div className="category-title">{cat.name}</div>
                  <div className="subcategory">
                    {cat.items.map(item => (
                      <button
                        key={item}
                        className={`type-btn sub-btn ${
                          selectedCategory === item ? "active" : ""
                        }`}
                        onClick={() => setSelectedCategory(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </aside>

            {/* Grid */}
            <main className="instruments-grid">
              {filteredAccessories.map((item, idx) => (
                <div key={idx} className="instrument-card card">
                  <div className="instrument-image">
                    <img
                      src={accessoryImage}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <h3 className="instrument-title">{item.name}</h3>
                  <p className="instrument-cat">{item.type}</p>
                </div>
              ))}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
