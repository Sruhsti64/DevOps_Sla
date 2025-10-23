import { useEffect, useState } from "react";
import { FaRocket, FaPlayCircle } from "react-icons/fa";  // ✅ react-icons
import "./Hero.css";

const slides = [
  "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1546fca3-cb87-43ec-92e6-95e630c1fe97.png",
  "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/72f8286f-577a-4c3b-9585-deed2e9a15a6.png",
  "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/430adba7-2deb-4d7e-9752-c187ed5b7f23.png",
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Floating particles
  useEffect(() => {
    const container = document.getElementById("particles");
    if (!container) return;

    for (let i = 0; i < 40; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 20 + "s";
      particle.style.width = particle.style.height =
        Math.random() * 6 + 2 + "px";
      container.appendChild(particle);
    }
  }, []);

  // Smooth scroll function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero" id="hero">
      {/* Slideshow background */}
      <div className="slideshow">
        {slides.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className={`slide ${index === currentSlide ? "active" : ""}`}
          />
        ))}
      </div>

      {/* Particles */}
      <div className="particles" id="particles"></div>

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">Revolutionary Skin Disease Analyzer</h1>
        <p className="hero-subtitle">
          Harness the power of cutting-edge AI to analyze skin conditions with
          unprecedented accuracy. Upload, analyze, and receive insights in
          seconds.
        </p>
        <div className="hero-buttons">
          <button
            className="btn btn-primary"
            onClick={() => scrollToSection("upload")}
          >
            <FaRocket /> Start Analysis
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => scrollToSection("features")}
          >
            <FaPlayCircle /> Explore Features
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
