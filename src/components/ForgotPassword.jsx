import React, { useState } from "react";
import "./LoginRegister.css";
import { resetPassword, confirmResetPassword } from "aws-amplify/auth";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import dermalabLogo from "../assets/images/dermalab-logo.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await resetPassword({ username: email });
      alert("Verification code sent to your email.");
      setStep(2);
    } catch (err) {
      console.error("Error requesting reset code:", err);
      setError(err.message || "Error sending reset code.");
    }
  };

  const handleConfirmNewPassword = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword,
      });

      alert("Password reset successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Error confirming new password:", err);
      setError(err.message || "Error resetting password.");
    }
  };

  return (
    <div className="login-container">
      {/* Back to Home */}
      <div className="back-home" onClick={() => navigate("/")}>
        ← Back to Home
      </div>

      <div className="login-box">
        {/* Logo */}
        <Link to="/">
          <img src={dermalabLogo} alt="Dermalab logo" className="logo" />
        </Link>

        <h2 className="login-title">Forgot Password</h2>
        <p className="login-subtitle">
          {step === 1
            ? "Enter your email to reset your password"
            : "Enter the code sent to your email and set a new password"}
        </p>

        {error && <p className="error-message">{error}</p>}

        {step === 1 ? (
          <form onSubmit={handleRequestCode} className="login-form">
            <label htmlFor="email" className="input-label">
              Email Address
            </label>
            <div className="input-group">
              <input
  id="email"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

            </div>

            <button type="submit" className="sign-in-btn">
              Send Reset Code
            </button>
          </form>
        ) : (
          <form onSubmit={handleConfirmNewPassword} className="login-form">
            <label htmlFor="code" className="input-label">
              Verification Code
            </label>
            <div className="input-group">
              <input
                id="code"
                type="text"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            <label htmlFor="newPassword" className="input-label">
              New Password
            </label>
            <div className="input-group">
              <input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="sign-in-btn">
              Reset Password
            </button>
          </form>
        )}

        <p className="signup-text">
          Remember your password?{" "}
          <Link to="/login" className="login-link">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
