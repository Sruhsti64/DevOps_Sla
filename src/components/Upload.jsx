import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaSearch, FaTimes } from "react-icons/fa";
import { getCurrentUser } from "aws-amplify/auth";
import axios from "axios";
import "./Upload.css";

function Upload({ onAnalyze }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Check if user is logged in
  const checkLogin = async () => {
    try {
      const user = await getCurrentUser();
      return user;
    } catch {
      return null;
    }
  };

  // ✅ Handle file selection
  const handleFileChange = async (e) => {
    const user = await checkLogin();

    if (!user) {
      alert("Please login to upload an image.");
      navigate("/login");
      return;
    }

    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Remove selected image
  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    document.getElementById("fileInput").value = "";
  };

  // ✅ Handle image upload and backend analysis
  const handleSubmit = async () => {
    const user = await checkLogin();
    if (!user) {
      alert("Please login to analyze the image.");
      navigate("/login");
      return;
    }

    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await axios.post("http://65.2.130.163:9000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("🔍 Full API Response:", res.data);

      const maskBase64 = res.data.mask;
      const analyzedImageUrl = `data:image/png;base64,${maskBase64}`;
      const predictedLabel = res.data.predicted_label;
      const confidence = res.data.confidence || 0;

      console.log("🧠 Predicted Label:", predictedLabel);
      console.log("📊 Confidence:", confidence);

      setResult(res.data);

      // ✅ Pass data to parent (DiseaseAnalyzer)
      onAnalyze({
        preview: preview,
        analyzedImage: analyzedImageUrl,
        label: predictedLabel,
        confidence: confidence,
      });

    } catch (err) {
      console.error("❌ Error analyzing image:", err);
      alert("Error analyzing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="upload" className="upload-section">
      <div className="upload-container">
        <h2 className="upload-title">Upload Your Skin Image</h2>

        {/* Upload Box */}
        <label htmlFor="fileInput" className="upload-slot">
          <FaCloudUploadAlt className="upload-icon" />
          <p className="upload-text">Click to upload or drag and drop</p>
          <p className="upload-subtext">Supports JPG, PNG up to 10MB</p>
        </label>

        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* Buttons */}
        <div className="upload-buttons">
          <button
            type="submit"
            className="action-btn analyze-btn"
            onClick={handleSubmit}
            disabled={!selectedFile || loading}
          >
            {loading ? (
              <>Analyzing...</>
            ) : (
              <>
                <FaSearch style={{ marginRight: "8px" }} />
                Analyze Image
              </>
            )}
          </button>

          {selectedFile && (
            <button
              type="button"
              className="action-btn remove-btn"
              onClick={handleRemove}
              disabled={loading}
            >
              <FaTimes style={{ marginRight: "6px" }} />
              Remove
            </button>
          )}
        </div>

        {/* Preview */}
        {preview && (
          <div className="preview-card">
            <div className="preview">
              <h3>Image Preview</h3>
              <img src={preview} alt="Selected skin" className="preview-img" />
            </div>
            <button className="remove-overlay" onClick={handleRemove}>
              <FaTimes />
            </button>
          </div>
        )}

        {/* Display Raw Result (optional debug) */}
        {result && (
          <div className="result-card">
            <h3>Prediction Result:</h3>
            <pre style={{ textAlign: "left", overflowX: "auto" }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}

export default Upload;
