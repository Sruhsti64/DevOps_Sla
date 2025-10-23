import { useState } from "react";
import "./Diseases.css";

function Diseases() {
  const [selectedDisease, setSelectedDisease] = useState(null);

  const diseases = [
    {
      name: "Acne",
      img: "/images/acne.jpg",
      brief: "A common skin condition caused by clogged hair follicles.",
      details:
        "Acne occurs when hair follicles become clogged with oil and dead skin cells. It can appear as pimples, blackheads, or cysts, often on the face, chest, and back.",
    },
    {
      name: "Eczema",
      img: "/images/eczema.jpg",
      brief: "A condition that makes skin red, inflamed, and itchy.",
      details:
        "Eczema is a group of conditions that cause skin inflammation. It is often linked to an overactive immune response to irritants. Symptoms include itching, redness, and dryness.",
    },
    {
      name: "Psoriasis",
      img: "/images/psoarisis.png",
      brief: "A chronic autoimmune condition causing rapid skin cell buildup.",
      details:
        "Psoriasis speeds up the life cycle of skin cells, leading to scales and red patches that can be itchy and painful. It commonly affects the scalp, elbows, and knees.",
    },
    {
      name: "Rosacea",
      img: "/images/rosacea.webp",
      brief: "A long-term skin condition causing redness and visible blood vessels.",
      details:
        "Rosacea causes persistent facial redness, visible blood vessels, and sometimes small red bumps. Triggers include sun exposure, alcohol, spicy foods, and stress.",
    },
    {
      name: "Vitiligo",
      img: "/images/vitiligo.jpg",
      brief: "Loss of skin pigment causing white patches.",
      details:
        "Vitiligo occurs when pigment-producing cells die or stop functioning. It leads to irregular white patches of skin. The condition is not contagious but can spread over time.",
    },
    {
      name: "Melanoma",
      img: "/images/melanoma.webp",
      brief: "A serious form of skin cancer.",
      details:
        "Melanoma develops in the cells that produce melanin. It can spread quickly if not detected early. Warning signs include irregular moles, color changes, and uneven edges.",
    },
  ];

  return (
    <section className="diseases" id="diseases">
      <div className="diseases-container">
        <h2 className="diseases-title">Common Skin Diseases</h2>
        <p className="diseases-subtitle">
          Our analyzer is trained on multiple skin disease categories.
        </p>

        <div className="diseases-grid">
          {diseases.map((disease) => (
            <div className="disease-card" key={disease.name}>
              {/* ✅ fixed wrapper for CSS match */}
              <div className="disease-image">
                <img src={disease.img} alt={disease.name} />
              </div>

              <div className="disease-content">
                <h3 className="disease-heading">{disease.name}</h3>
                <p className="disease-desc">{disease.brief}</p>
                <button
                  className="learn-more"
                  onClick={() => setSelectedDisease(disease)}
                >
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedDisease && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedDisease(null)}
        >
          <div
            className="modal-content animated"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{selectedDisease.name}</h3>
            <img
              src={selectedDisease.img}
              alt={selectedDisease.name}
              className="modal-img"
            />
            <p>{selectedDisease.details}</p>
            <button
              className="close-btn"
              onClick={() => setSelectedDisease(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Diseases;
