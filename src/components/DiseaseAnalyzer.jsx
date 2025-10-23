import React, { useState } from "react";
import Upload from "./Upload";
import Results from "./Results";

function DiseaseAnalyzer() {
  const [showResults, setShowResults] = useState(false);
  const [preview, setPreview] = useState(null);
  const [analyzedImage, setAnalyzedImage] = useState(null);
  const [label, setLabel] = useState(null);
  const [confidence, setConfidence] = useState(null);

  // ✅ Called when Analyze button is clicked (data comes from Upload.jsx)
  const handleAnalyze = ({ preview, analyzedImage, label, confidence }) => {
    setPreview(preview);
    setAnalyzedImage(analyzedImage);
    setLabel(label);
    setConfidence(confidence);
    setShowResults(true);
  };

  // ✅ Reset everything
  const handleReset = () => {
    setPreview(null);
    setAnalyzedImage(null);
    setLabel(null);
    setConfidence(null);
    setShowResults(false);
  };

  return (
    <>
      {!showResults ? (
        // Show Upload component until analysis is done
        <Upload onAnalyze={handleAnalyze} />
      ) : (
        // Show Results component after analysis
        <Results
          visible={showResults}
          preview={preview}           // Uploaded image
          analyzedImage={analyzedImage} // Analyzed mask image
          label={label}               // Predicted disease label
          confidence={confidence}     // Confidence score
          onReset={handleReset}
        />
      )}
    </>
  );
}

export default DiseaseAnalyzer;
