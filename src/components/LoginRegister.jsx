import React, { useState, useEffect } from "react";
import "./LoginRegister.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signIn, getCurrentUser } from "aws-amplify/auth"; // ✅ Added getCurrentUser
import dermalabLogo from "../assets/images/dermalab-logo.png";

const LoginRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // ✅ Redirect if already logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();
        console.log("Already logged in:", user);
        navigate("/"); // redirect to homepage
      } catch {
        // No user logged in → stay on login page
      }
    };
    checkUser();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await signIn({
        username: formData.email,
        password: formData.password,
      });
      console.log("Login successful:", user);
      alert("Login successful!");
      navigate("/"); // redirect to homepage
    } catch (error) {
      console.error("Error signing in:", error);
      alert(error.message || "Error signing in. Please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* Back to Home */}
      <div className="back-home" onClick={() => navigate("/")}>
        ← Back to Home
      </div>

      <div className="login-box">
        {/* Dermalab Logo */}
        <Link to="/">
          <img src={dermalabLogo} alt="Dermalab logo" className="logo" />
        </Link>

        <h2 className="login-title">Welcome back to Dermalab</h2>
        <p className="login-subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="login-form">
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
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              state={{ email: formData.email }} // ✅ Pass email here
              className="forgot-link"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button type="submit" className="sign-in-btn">
            Sign In
          </button>


          <p className="signup-text">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>

        <p className="terms">
          By signing in, you agree to our{" "}
          <Link to="/terms">Terms of Service</Link> and{" "}
          <Link to="/privacy">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
