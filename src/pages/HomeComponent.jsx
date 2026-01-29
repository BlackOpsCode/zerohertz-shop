import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import TopBar from "../auxiliars/TopBar";
import Contact from "../auxiliars/Contact";
import Footer from "../auxiliars/Footer";

export default function HomeComponent() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const milestones = document.querySelectorAll(".milestone");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-up-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    milestones.forEach((milestone) => observer.observe(milestone));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="home">
      <TopBar />

      {/* ================= HERO ================= */}
      <section className="hero hero-main">
        {/* Background overlay div */}
        <div className="hero-bg"></div>

        <div className="hero-content container">
          <h1 className="hero-title hero-title-main">0Hz</h1>
          <p className="hero-subtitle">
            Engineering sound for artists, studios, and stages worldwide.
            Premium instruments. Proven performance. No compromises.
          </p>

          <div className="hero-cta">
            <button
              className="button primary large"
              onClick={() => scrollTo("shop")}
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>


      {/* ================= STORY ================= */}
      <section className="about container">
        <div className="about-inner">
          <h2 className="about-title">Our Story</h2>
          <p className="about-text">
            ZeroHertz was founded by musicians, engineers, and touring technicians
            who were tired of unreliable gear, inflated marketing promises, and
            equipment that failed when it mattered most.
          </p>
          <p className="about-text">
            What started as a small collective sourcing professional-grade
            instruments for studio sessions evolved into a full-scale music gear
            platform trusted by touring bands, producers, and sound engineers.
          </p>
          <p className="about-text">
            Every product we carry is selected with one question in mind:
            <strong> would we trust this on stage?</strong>  
            If the answer is not an absolute yes, it does not belong at ZeroHertz.
          </p>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="about container">
        <div className="about-inner">
          <h2 className="about-title">Mission & Philosophy</h2>
          <p className="about-text">
            Our mission is to remove limitations between artists and their sound.
            We believe music technology should enhance creativity, not restrict it.
          </p>
          <p className="about-text">
            ZeroHertz focuses on durability, sonic clarity, and precision.
            From sharp transient response to clean harmonic detail, every setup
            we recommend is optimized for real-world performance.
          </p>
          <p className="about-text">
            We don’t chase trends — we evaluate technology based on reliability,
            sound integrity, and long-term value for professionals.
          </p>
        </div>
      </section>

      {/* ================= MILESTONES ================= */}
      <section className="about container">
        <div className="milestones-wrapper">
          <h2 className="milestones-title">Milestones</h2>

          <div className="milestones">
            <div className="milestone">
              <strong>15+</strong>
              <span>Years of combined industry experience</span>
            </div>
            <div className="milestone">
              <strong>500+</strong>
              <span>Artists and bands supported</span>
            </div>
            <div className="milestone">
              <strong>1200+</strong>
              <span>Professional units delivered</span>
            </div>
            <div className="milestone">
              <strong>98%</strong>
              <span>Client satisfaction rate</span>
            </div>
            <div className="milestone">
              <strong>40+</strong>
              <span>Tours equipped worldwide</span>
            </div>
            <div className="milestone">
              <strong>24/7</strong>
              <span>On-tour technical support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COLLABORATIONS ================= */}
      <section className="about container">
        <div className="about-inner">
          <h2 className="about-title">Collaborations & Trust</h2>
          <p className="about-text">
            ZeroHertz collaborates with independent artists, touring professionals,
            recording studios, and live production teams across Europe and beyond.
          </p>
          <p className="about-text">
            Our partnerships are built on trust, transparency, and consistent
            performance. We work closely with manufacturers, boutique builders,
            and audio engineers to deliver solutions that stand up to real usage.
          </p>
          <p className="about-text">
            When artists choose ZeroHertz, they choose a long-term technical partner,
            not just a supplier.
          </p>
        </div>
      </section>

      {/* ================= SHOP INTRO ================= */}
      <section id="shop" className="about container">
        <div className="about-inner">
          <h2 className="about-title">Explore Our Gear</h2>
          <p className="about-text">
            Our catalog is curated for musicians who demand precision, power,
            and consistency. Below are some of the core categories we specialize in.
          </p>
        </div>
      </section>

      {/* ================= PRODUCT REGIONS ================= */}
      <section className="features container">
        <div className="feature">
          <h3>Drums & Percussion</h3>
          <p>
            From tight studio kits to arena-level setups, our drum selection delivers
            sharp attack, controlled resonance, and clean rhythmic definition.
            Built for precision, power, and consistency across every performance.
          </p>
          <a href="/shop#drums" className="card-button">
            Go <FaArrowRight />
          </a>
        </div>

        <div className="feature">
          <h3>Guitars & Basses</h3>
          <p>
            Instruments engineered for tonal clarity, sustain, and expressive range.
            Whether clean, driven, or experimental, our guitars respond exactly
            as the player intends.
          </p>
          <a href="/shop#guitars" className="card-button">
            Go <FaArrowRight />
          </a>
        </div>

        <div className="feature">
          <h3>Audio & Studio Gear</h3>
          <p>
            Interfaces, microphones, monitoring, and signal chains designed for
            clean sound, low noise, and professional-grade reliability.
            Trusted in studios and live environments alike.
          </p>
          <a href="/shop#audio" className="card-button">
            Go <FaArrowRight />
          </a>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="hero hero-cta-final">
        <div className="hero-content container">
          <h2 className="hero-title hero-title-final">Let’s Build Your Sound</h2>
          <p className="hero-subtitle hero-subtitle-final">
            Talk to our team and get a setup tailored exactly to your needs.
          </p>
          <div className="hero-cta">
            <button
              className="button primary large"
              onClick={() => scrollTo("contact")}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
