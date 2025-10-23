import React from "react";
import { useNavigate } from "react-router-dom";
import "./Terms.css"; // We'll style it separately

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="terms-container">
      <div className="terms-box">
        <h1 className="terms-title">Terms and Conditions</h1>
        <p className="terms-updated">Last updated: October 2025</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong>DermaLab</strong>. By creating an account or using our
            services, you agree to these Terms and Conditions. Please read them carefully.
          </p>
        </section>

        <section>
          <h2>2. Privacy Policy</h2>
          <p>
            We collect minimal user data such as email and usage statistics to improve
            our services. Your data is not shared with third parties. For queries, contact us
            at <a href="mailto:dermalab9@gmail.com">dermalab9@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2>3. Use of Service</h2>
          <p>
            You agree to use DermaLab only for lawful purposes. Misuse, tampering, or
            any attempt to harm the system is strictly prohibited.
          </p>
        </section>

        <section>
          <h2>4. Account Responsibility</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials
            and for all activities under your account.
          </p>
        </section>

        <section>
          <h2>5. Disclaimer</h2>
          <p>
            DermaLab provides AI-based skin analysis as an educational and awareness tool only.
            It does not replace medical consultation.
          </p>
        </section>

        <section>
          <h2>6. Contact Us</h2>
          <p>
            For questions about these Terms, reach out to us at{" "}
            <a href="mailto:dermalab9@gmail.com">dermalab9@gmail.com</a>.
          </p>
        </section>

        {/* ✅ Back to Signup Button */}
        <button className="back-btn" onClick={() => navigate("/signup")}>
          ← Back to Signup
        </button>
      </div>
    </div>
  );
}
