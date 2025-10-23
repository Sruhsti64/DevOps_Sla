// src/components/Home.jsx
import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import Diseases from "./Diseases";
import DiseaseAnalyzer from "./DiseaseAnalyzer";
import Faq from "./FAQ";

const Home = () => {
  return (
    <div className="home">
      <section id="hero">
        <Hero />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="diseases">
        <Diseases />
      </section>

      <section id="upload">
        <DiseaseAnalyzer />
      </section>

      <section id="faq">
        <Faq />
      </section>
    </div>
  );
};

export default Home;
