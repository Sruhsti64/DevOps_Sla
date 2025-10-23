import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import dermalabLogo from "../assets/images/dermalab-logo.png";
import { FaKey } from "react-icons/fa";

const ConfirmSignup = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // disable scroll and hide navbar when this page mounts
    document.body.classList.add("no-scroll");
    document.body.classList.add("hide-navbar");

    // ensure container fits exactly one screen
    const root = document.getElementById("root");
    if (root) root.style.height = "100vh";

    return () => {
      // restore on unmount
      document.body.classList.remove("no-scroll");
      document.body.classList.remove("hide-navbar");
      if (root) root.style.height = "";
    };
  }, []);

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      setMessage("Account confirmed — redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err?.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setMessage("");
    try {
      await resendSignUpCode({ username: email });
      setMessage("Verification code resent to your email.");
    } catch (err) {
      setError(err?.message || "Could not resend code");
    }
  };

  return (
    <div className="login-container" aria-live="polite">
      <div className="back-home" onClick={() => navigate("/signup")}>
        ← Back to Signup
      </div>

      <div className="login-box">
        <Link to="/">
          <img src={dermalabLogo} alt="Dermalab logo" className="logo" />
        </Link>

        <h2 className="login-title">Confirm Your Account</h2>
        <p className="login-subtitle">Enter the verification code sent to <strong>{email}</strong></p>

        <form onSubmit={handleConfirm} className="login-form" noValidate>
          <label htmlFor="code" className="input-label">Verification Code</label>
          <div className="input-group" style={{ position: "relative" }}>
            <FaKey className="input-icon" />
            <input
              id="code"
              name="code"
              type="text"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message" style={{ color: "#e63946" }}>{error}</p>}
          {message && <p className="success-message" style={{ color: "#2a9d8f" }}>{message}</p>}

          <button type="submit" className="sign-in-btn" disabled={loading}>
            {loading ? "Confirming..." : "Confirm"}
          </button>

          <p className="signup-text">
            Didn’t get a code?{" "}
            <button type="button" className="resend-btn" onClick={handleResend} style={{ padding: 0, background: "none", border: "none", cursor: "pointer" }}>
              Resend Code
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ConfirmSignup;
