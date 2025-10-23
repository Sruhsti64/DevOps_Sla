import React from "react";
import {
  FaStethoscope,
  FaInfoCircle,
  FaExclamationTriangle,
  FaListAlt,
  FaPills,
  FaHeartbeat,
  FaCrosshairs,
  FaRedo,
  FaExternalLinkAlt,
} from "react-icons/fa";
import diseaseData from "./diseaseData.json";
import "./Results.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import dermalabLogo from "../assets/images/dermalab-logo.png";

function Results({ visible, preview, analyzedImage, label, confidence, onReset }) {
  if (!visible) return null;

  const diseaseInfo = label ? diseaseData[label] : null;

  const computeSeverity = (confidence) => {
    if (confidence == null) return "Unknown";
    if (confidence < 0.4) return "Mild";
    if (confidence < 0.7) return "Moderate";
    return "Severe";
  };

  const severity = computeSeverity(confidence);
  const severityClass =
    severity === "Severe"
      ? "badge red"
      : severity === "Moderate"
      ? "badge yellow"
      : severity === "Mild"
      ? "badge green"
      : "badge gray";

  const severityDetails = diseaseInfo?.severity_logic?.[severity.toLowerCase()] || "";

  // 📸 High-Resolution PDF Capture






const generatePDF = async (data, uploadedImgBase64, analyzedImgBase64) => {
  const pdf = new jsPDF("p", "mm", "a4", true);
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;

  // 🎨 Header theme color (blue)
  const headerColor = [41, 128, 185];

  // 🌈 Header
  pdf.setFillColor(...headerColor);
  pdf.rect(0, 0, pageWidth, 28, "F");

  // Logo + Title
  try {
    pdf.addImage(dermalabLogo, "PNG", margin, 5, 26, 18);
  } catch (e) {
    console.warn("Logo addImage failed:", e);
  }
  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text("DermLab", margin + 32, 14);
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(12);
  pdf.text("AI-Powered Skin Health Report", margin + 32, 22);

  // 🖼️ Uploaded and Analyzed Images
  const imageY = 38;
  const imageGap = 8;
  const imageWidth = (pageWidth - margin * 2 - imageGap) / 2;
  const imageHeight = 60;

  if (uploadedImgBase64) {
    try {
      pdf.addImage(uploadedImgBase64, "JPEG", margin, imageY, imageWidth, imageHeight);
      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      pdf.text("Uploaded Image", margin + 4, imageY + imageHeight + 6);
    } catch (e) {
      console.warn("uploaded image add failed:", e);
    }
  }

  if (analyzedImgBase64) {
    try {
      pdf.addImage(
        analyzedImgBase64,
        "JPEG",
        margin + imageWidth + imageGap,
        imageY,
        imageWidth,
        imageHeight
      );
      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      pdf.text(
        "Analyzed Image",
        margin + imageWidth + imageGap + 4,
        imageY + imageHeight + 6
      );
    } catch (e) {
      console.warn("analyzed image add failed:", e);
    }
  }

  let currentY = imageY + imageHeight + 16;

  // Helper: ensure content -> string
  const contentToString = (content) => {
    if (content === null || content === undefined) return "";
    if (Array.isArray(content)) {
      return content.join("\n• "); // nice bullet join
    }
    if (typeof content === "object") {
      try {
        return JSON.stringify(content, null, 2);
      } catch {
        return String(content);
      }
    }
    return String(content);
  };

  // 🧾 Section Helper: robust card with dynamic height based on wrapped lines
  const addCard = (title, content, accentColor = [0, 0, 0]) => {
    const cardX = margin;
    const cardWidth = pageWidth - margin * 2;
    const innerPadding = 6;
    const titleHeight = 8;

    // convert content to string and split into wrapped lines
    const contentStr = contentToString(content);
    const maxTextWidth = cardWidth - innerPadding * 2;
    const textLines = pdf.splitTextToSize(contentStr, maxTextWidth);
    const lineHeight = 6; // mm per line
    const contentHeight = Math.max(lineHeight, textLines.length * lineHeight);

    const cardHeight = titleHeight + contentHeight + innerPadding * 2;

    // if card doesn't fit the page, add page
    if (currentY + cardHeight + margin > pageHeight - 30) {
      pdf.addPage();
      // re-draw header on new page
      pdf.setFillColor(...headerColor);
      pdf.rect(0, 0, pageWidth, 28, "F");
      try {
        pdf.addImage(dermalabLogo, "PNG", margin, 5, 26, 18);
      } catch {}
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(22);
      pdf.text("DermLab", margin + 32, 14);
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(12);
      pdf.text("AI-Powered Skin Health Report", margin + 32, 22);
      currentY = 38; // reset below header
    }

    // Draw card background (white) and light border with accent color
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(...accentColor);
    // use roundedRect if available; fallback to rect if not
    if (typeof pdf.roundedRect === "function") {
      pdf.roundedRect(cardX, currentY, cardWidth, cardHeight, 3, 3, "F");
      pdf.setDrawColor(...accentColor);
      pdf.roundedRect(cardX, currentY, cardWidth, cardHeight, 3, 3, "S");
    } else {
      pdf.rect(cardX, currentY, cardWidth, cardHeight, "F");
      pdf.setDrawColor(...accentColor);
      pdf.rect(cardX, currentY, cardWidth, cardHeight, "S");
    }

    // Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.setTextColor(...accentColor);
    pdf.text(title, cardX + innerPadding, currentY + 6);

    // Content
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.setTextColor(20, 20, 20);
    // start text a bit lower
    pdf.text(textLines, cardX + innerPadding, currentY + titleHeight + innerPadding + 2);

    // advance currentY
    currentY += cardHeight + 8; // spacing between cards
  };

  // 🧠 Cards (like your UI)
  addCard(
    "Detected Condition",
    `${data.condition || "N/A"}\nProbability: ${data.probability || "N/A"}\nSeverity: ${data.severity || "N/A"}\n${data.details ||
      ""}`,
    [231, 76, 60]
  );

  addCard("Description", data.description || "N/A", [52, 152, 219]);

  addCard("Urgency / Severity", data.urgency || "N/A", [243, 156, 18]);

  addCard(
    "Risk Factors / Potential Causes",
    data.risks || [],
    [46, 204, 113]
  );

  addCard("Recommended Treatment", data.treatment || "N/A", [155, 89, 182]);

  addCard("Precautions / Prevention", data.precautions || "N/A", [231, 76, 60]);

  // 🕓 Footer
  const timestamp = new Date().toLocaleString();
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  pdf.text(`Generated on: ${timestamp}`, margin, pageHeight - 12);
  pdf.text(
    "Disclaimer: This report is for informational purposes only, not a medical diagnosis.",
    margin,
    pageHeight - 6
  );

  // 💾 Save
  pdf.save("DermLab_Analysis_Report.pdf");
};



  return (
    <section id="results" className="results-section">
      <div className="results-container">
        <h2 className="results-title">Analysis Results</h2>

        {/* Uploaded + Analyzed Image Side by Side */}
        <div className="results-images">
          {preview && (
            <div className="results-preview">
              <h3>Uploaded Image</h3>
              <img src={preview} alt="Uploaded skin" />
            </div>
          )}

          {analyzedImage && (
            <div className="results-preview">
              <h3>Analyzed Image</h3>
              <img src={analyzedImage} alt="Analyzed skin" />
            </div>
          )}
        </div>

        {/* Results Grid */}
        <div className="results-grid">
          <div className="result-card">
            <FaStethoscope className="result-icon red" />
            <h3>Detected Condition</h3>
            <p>{diseaseInfo?.full_name || "Unknown Condition"}</p>

            {confidence != null && (
              <span className="badge red">
                Probability: {Math.round(confidence * 100)}%
              </span>
            )}

            <p className="severity">
              Severity: <span className={severityClass}>{severity}</span>
            </p>

            {severityDetails && (
              <p className="severity-description">{severityDetails}</p>
            )}
          </div>

          <div className="result-card">
            <FaInfoCircle className="result-icon blue" />
            <h3>Description</h3>
            <p>{diseaseInfo?.description || "No description available."}</p>
          </div>

          <div className="result-card">
            <FaExclamationTriangle className="result-icon yellow" />
            <h3>Urgency / Severity</h3>
            <p>{diseaseInfo?.urgency_level || "Unknown"}</p>
            {diseaseInfo?.recommendation && (
              <span className="badge yellow">{diseaseInfo.recommendation}</span>
            )}
          </div>

          <div className="result-card">
            <FaListAlt className="result-icon green" />
            <h3>Risk Factors / Potential Causes</h3>
            <ul>
              {Array.isArray(diseaseInfo?.risk_factors) ? (
                diseaseInfo.risk_factors.map((rf, i) => <li key={i}>{rf}</li>)
              ) : (
                <li>{diseaseInfo?.risk_factors || "Information not available"}</li>
              )}
            </ul>
          </div>

          <div className="result-card">
            <FaPills className="result-icon purple" />
            <h3>Recommended Treatment</h3>
            <p>{diseaseInfo?.treatment || "Consult a dermatologist for advice."}</p>
          </div>

          <div className="result-card">
            <FaHeartbeat className="result-icon pink" />
            <h3>Precautions / Prevention</h3>
            <ul>
              {Array.isArray(diseaseInfo?.precautions) ? (
                diseaseInfo.precautions.map((p, i) => <li key={i}>{p}</li>)
              ) : (
                <li>{diseaseInfo?.precautions || "General skin care recommended"}</li>
              )}
            </ul>
          </div>

          <div className="result-card">
            <FaCrosshairs className="result-icon indigo" />
            <h3>Common Symptoms</h3>
            <ul>
              {diseaseInfo?.symptoms?.length
                ? diseaseInfo.symptoms.map((symptom, i) => (
                    <li key={i}>{symptom}</li>
                  ))
                : <li>No symptom details available.</li>}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="results-actions">
          <button className="reset-btn" onClick={onReset}>
            <FaRedo style={{ marginRight: "8px" }} />
            Analyze Another Image
          </button>

          <button className="download-btn" onClick={()=>generatePDF(
      {
        condition: diseaseInfo?.full_name || label || "Unknown Condition",
        probability: confidence ? `${(confidence * 100).toFixed(2)}%` : "N/A",
        severity,
        details: severityDetails || "",
        description: diseaseInfo?.description || "No description available.",
        urgency: diseaseInfo?.urgency_level || "Unknown",
        risks: diseaseInfo?.risk_factors || [],
        treatment: diseaseInfo?.treatment || "Consult a dermatologist for advice.",
        precautions: diseaseInfo?.precautions || "General skin care recommended",
      },
      preview, // uploaded image
      analyzedImage // analyzed image
    )}>
            <FaExternalLinkAlt style={{ marginRight: "8px" }} />
            Download Analysis Report
          </button>
        </div>
      </div>
    </section>
  );
}

export default Results;
