import React, { useState } from "react";
import "./Signup.css";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 added eye icons
import { Link, useNavigate } from "react-router-dom";
import dermalabLogo from "../assets/images/dermalab-logo.png";

// Amplify imports (v6)
import { signUp, resendSignUpCode } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";

Amplify.configure(awsExports);

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
  const [showPassword, setShowPassword] = useState(false); // 👈 added state for password visibility

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

    try {
      const { email, password, fullName } = formData;

      // Try to sign up a new user
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name: fullName,
          },
        },
      });

      console.log("Signup successful");
      navigate("/confirm-signup", { state: { email } });
    } catch (err) {
      console.error("Signup error:", err);

      // Handle existing but unverified users
      if (err.name === "UsernameExistsException") {
        try {
          await resendSignUpCode({ username: formData.email });
          setError("This email is registered but not verified. Please verify your account.");
          navigate("/confirm-signup", { state: { email: formData.email } });
        } catch (innerError) {
          if (innerError.name === "InvalidParameterException") {
            setError("User already exists and is verified. Please log in.");
          } else {
            setError(innerError.message || "An error occurred. Please try again.");
          }
        }
      } else {
        setError(err.message || "Error signing up");
      }
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
              type={showPassword ? "text" : "password"} // 👈 toggle visibility
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
