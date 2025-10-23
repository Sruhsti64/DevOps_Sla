import React, { useState } from "react";
import "./FAQ.css";

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Skin Disease Analyzer?",
      answer:
        "Skin Disease Analyzer is a web-based platform that allows users to upload skin images and receive a preliminary analysis using AI technology.",
    },
    {
      question: "Is this tool a replacement for visiting a dermatologist?",
      answer:
        "No. This tool is intended only for informational and educational purposes. For an accurate diagnosis and treatment, please consult a certified dermatologist.",
    },
    {
      question: "Which image formats are supported?",
      answer:
        "We currently support JPG and PNG image formats with a maximum file size of 10MB.",
    },
    {
      question: "Will my uploaded image be stored?",
      answer:
        "No. Your image is processed temporarily for analysis and is not stored on our servers.",
    },
    {
      question: "How accurate is the analysis?",
      answer:
        "The analysis is based on AI models trained on dermatology datasets. While it can provide useful insights, it should not be considered a medical diagnosis.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                <span className="faq-icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
