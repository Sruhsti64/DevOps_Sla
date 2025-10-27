import React, { useState } from "react";
import "./Signup.css";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import dermalabLogo from "../assets/images/dermalab-logo.png";

// 🔴 AWS Amplify imports removed
// import { signUp, resendSignUpCode } from "aws-amplify/auth";
// import { Amplify } from "aws-amplify";
// import awsExports from "../aws-exports";
// Amplify.configure(awsExports);

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agree: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 🔴 Replaced Amplify signup logic with a simple local simulation
    try {
      console.log("Signup data:", formData);
      alert("Signup successful! (Demo mode — no AWS connection)");
      navigate("/login"); // Redirect to login after successful demo signup
    } catch (err) {
      console.error("Signup error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
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

        <h2 className="login-title">Welcome to Dermalab</h2>
        <p className="login-subtitle">Create your account to get started</p>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Full Name */}
          <label htmlFor="fullName" className="input-label">
            Full Name
          </label>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <label htmlFor="email" className="input-label">
            Email Address
          </label>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <div className="input-group password-group">
            <FaLock className="input-icon" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Terms & Conditions */}
          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
              />
              I agree to the{" "}
              <Link to="/terms" className="terms-link">
                Terms and Conditions
              </Link>
            </label>
          </div>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Register Button */}
          <button type="submit" className="sign-in-btn" disabled={loading}>
            {loading ? "Signing up..." : "Get Started"}
          </button>

          {/* Already have account */}
          <p className="signup-text">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
