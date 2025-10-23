import React, { useState, useEffect } from "react";
import "./Chatbot.css";
import Chat from "./Chat";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // allow entrance animation after mount
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`chatbot-float ${mounted ? "enter" : ""}`}>
      <button
        className={`chat-toggle ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        title={isOpen ? "Close chat" : "Open chat"}
      >
        <span className={`chat-icon ${isOpen ? "open" : ""}`}>
          {isOpen ? "✕" : "💬"}
        </span>
      </button>

      <div className={`chat-panel ${isOpen ? "open" : ""}`} aria-hidden={!isOpen}>
        {isOpen && <Chat />}
      </div>
    </div>
  );
};

export default Chatbot;