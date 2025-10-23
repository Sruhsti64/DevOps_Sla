import React from "react";
import { useNavigate } from "react-router-dom";
import "./Terms.css"; // using same style as Terms page

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="terms-container">
      <div className="terms-box">
        <h1 className="terms-title">Privacy Policy</h1>
        <p className="terms-updated">Last updated: October 2025</p>

        <section>
          <p>
            At <strong>DermaLab</strong>, your privacy is our top priority. This
            Privacy Policy explains how we collect, use, and protect your
            personal information when you use our website, mobile application,
            and related services.
          </p>
        </section>

        <section>
          <h2>1. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              Personal details such as your name, email, and contact number when
              you create an account.
            </li>
            <li>Images or data uploaded for skin analysis.</li>
            <li>
              Usage information like device type, IP address, and browser
              details.
            </li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To create and manage your DermaLab account.</li>
            <li>To analyze and improve our AI-based skin detection services.</li>
            <li>To send you updates or verification emails.</li>
          </ul>
        </section>

        <section>
          <h2>3. Data Protection</h2>
          <p>
            We use secure cloud storage and encryption to keep your information
            safe. Your data will never be shared with unauthorized third
            parties.
          </p>
        </section>

        <section>
          <h2>4. Cookies</h2>
          <p>
            Our website uses cookies to enhance your experience and collect
            anonymous usage data. You can manage your cookie preferences through
            browser settings.
          </p>
        </section>

        <section>
          <h2>5. Third-Party Services</h2>
          <p>
            We may use trusted third-party services (like AWS Amplify) for
            authentication and hosting. These providers follow strict data
            protection standards.
          </p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <ul>
            <li>Access, update, or delete your data at any time.</li>
            <li>Withdraw consent by contacting us.</li>
          </ul>
        </section>

        <section>
          <h2>7. Contact Us</h2>
          <p>
            For any questions regarding our Privacy Policy, please reach out to
            us at: <strong>dermalab9@gmail.com</strong>
          </p>
        </section>

        <button onClick={() => navigate("/signup")} className="back-btn">
          ← Back to Signup
        </button>
      </div>
    </div>
  );
}
