import "./Features.css";
import { FaBrain, FaCloudUploadAlt, FaShieldAlt, FaBolt } from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaBrain />,
      title: "AI-Powered Analysis",
      desc: "Harness advanced deep learning to detect skin diseases with high accuracy.",
    },
    {
      icon: <FaCloudUploadAlt />,
      title: "Easy Image Upload",
      desc: "Simply upload a skin image and let our system do the heavy lifting.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Privacy First",
      desc: "Your images are processed securely, ensuring confidentiality.",
    },
    {
      icon: <FaBolt />,
      title: "Instant Results",
      desc: "Receive detailed insights within seconds of uploading your image.",
    },
  ];

  return (
    <section className="features" id="features">
      <div className="features-container">
        <h2 className="features-title">Why Choose Our Analyzer?</h2>
        <p className="features-subtitle">
          Discover the advantages of using our revolutionary AI-powered skin disease detection system.
        </p>

        <div className="features-grid">
          {features.map((f, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon-wrapper">
                <div className="feature-icon">{f.icon}</div>
              </div>
              <h3 className="feature-heading">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
