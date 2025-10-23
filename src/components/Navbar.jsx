import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, signOut, fetchUserAttributes } from "aws-amplify/auth";
import "./Navbar.css";
import dermalabLogo from "../assets/images/dermalab-logo.png";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        setUser(currentUser);
        setUserDetails({
          email: attributes.email,
          name: attributes.name || "User",
        });
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      alert("Signed out!");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left — Logo */}
        <div className="logo" onClick={() => scrollToSection("hero")}>
  <img
    src={dermalabLogo}
    alt="DermaLab Logo"
    className="logo-img"
  />
  <span className="logo-text">DermaLab</span>
</div>




        {/* Center — Menu */}
        <ul className="menu">
          <li><span onClick={() => scrollToSection("hero")}>Home</span></li>
          <li><span onClick={() => scrollToSection("features")}>Features</span></li>
          <li><span onClick={() => scrollToSection("diseases")}>Diseases</span></li>
          <li><span onClick={() => scrollToSection("upload")}>Upload</span></li>
          <li><span onClick={() => scrollToSection("faq")}>FAQ</span></li>
        </ul>

        {/* Right — Profile / Login */}
        <div className="cta">
          {!user ? (
            <span className="btn" onClick={() => navigate("/login")}>
              Get Started
            </span>
          ) : (
            <div className="profile-container">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="avatar"
                className="profile-avatar"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="profile-dropdown">
                  <p className="profile-name">{userDetails?.name}</p>
                  <p className="profile-email">{userDetails?.email}</p>
                  <button className="logout-btn" onClick={handleSignOut}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="hamburger" onClick={toggleMenu}>
          {isOpen ? "✕" : "☰"}
        </div>
      </div>

      {/* Mobile Menu (slide from right) */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <li><span onClick={() => scrollToSection("hero")}>Home</span></li>
        <li><span onClick={() => scrollToSection("features")}>Features</span></li>
        <li><span onClick={() => scrollToSection("diseases")}>Diseases</span></li>
        <li><span onClick={() => scrollToSection("upload")}>Upload</span></li>
        <li><span onClick={() => scrollToSection("faq")}>FAQ</span></li>

        {!user ? (
          <li>
            <button
              className="mobile-btn"
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
            >
              Get Started
            </button>
          </li>
        ) : (
          <li>
            <button
              className="mobile-btn"
              onClick={() => {
                handleSignOut();
                setIsOpen(false);
              }}
            >
              Logout
            </button>
          </li>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
