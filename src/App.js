// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Diseases from "./components/Diseases";
import DiseaseAnalyzer from "./components/DiseaseAnalyzer";
import Faq from "./components/FAQ";
import LoginRegister from "./components/LoginRegister";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ConfirmSignup from "./components/ConfirmSignup";
import Chatbot from "./components/Chatbot";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";

function AppLayout() {
  const location = useLocation();

  // Auth-related routes (no scroll + no navbar)
  const authRoutes = ["/login", "/signup", "/forgot-password", "/confirm-signup","/terms","/privacy"];
  const isAuthPage = authRoutes.includes(location.pathname);

  useEffect(() => {
    // Ensure no leftover classes/styles
    document.body.classList.remove("auth-page");

    if (isAuthPage) {
      document.body.classList.add("auth-page");
      document.body.style.overflowY = "hidden"; // disable scroll on auth pages
      document.body.style.paddingTop = "0"; // remove top spacing for navbar
    } else {
      document.body.style.overflowY = "overlay"; // scroll visible on main pages
      document.body.style.paddingTop = "90px"; // offset for fixed navbar
    }

    // Cleanup when component unmounts
    return () => {
      document.body.classList.remove("auth-page");
      document.body.style.overflowY = "";
      document.body.style.paddingTop = "";
    };
  }, [isAuthPage]);

  // Only show navbar for non-auth pages
  const shouldShowNavbar = !isAuthPage;

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features />
              <Diseases />
              <DiseaseAnalyzer />
              <Faq />
            </>
          }
        />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm-signup" element={<ConfirmSignup />} />
        <Route path="/terms" element={<Terms />} />  {/* ✅ NEW route added here */}
        <Route path="/privacy" element={<Privacy />} />
        <Route
          path="*"
          element={<h1 style={{ padding: 40 }}>404 — Page Not Found</h1>}
        />
      </Routes>
      <Chatbot/>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
/*This comment is to perform git pull operation*/
// to test how it works
//for performing DevOps Sla
