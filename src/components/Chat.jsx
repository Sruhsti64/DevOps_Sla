import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const chatAreaRef = useRef(null);
  const controllerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const streamBotResponse = async (userMessage) => {
    setIsTyping(true);
    setMessages(prev => [...prev, { type: 'bot', text: '...' }]);
    controllerRef.current = new AbortController();

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
        signal: controllerRef.current.signal,
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { ...newMessages[newMessages.length - 1], text: accumulatedText };
          return newMessages;
        });
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error:', error);
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { ...newMessages[newMessages.length - 1], text: '⚠️ Sorry, I encountered an error. Please try again.' };
          return newMessages;
        });
      }
    } finally {
      setIsTyping(false);
      controllerRef.current = null;
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping || questionCount >= 5) return;
    const userMessageText = inputValue.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessageText }]);
    setInputValue('');
    setQuestionCount(prev => prev + 1);
    await streamBotResponse(userMessageText);
  };

  const handleStop = () => {
    if (controllerRef.current) controllerRef.current.abort();
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isInputDisabled = questionCount >= 5;

  return (
    <div className="chat-widget">
      <div className="header">
        <h1>🩺 DermaBot</h1>
      </div>
      <div className="main-content">
        <div ref={chatAreaRef} className="chat-area">
          {messages.length === 0 && (
            <div className="welcome-message">
              <p className="welcome-title">Welcome to DermaBot</p>
              <p className="welcome-subtitle">Ask me anything about dermatology!</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div key={index} className="message-container">
              {message.type === 'user' ? (
                <div className="user-message-wrapper">
                  <div className="user-message">{message.text}</div>
                  <div className="user-avatar">👤</div>
                </div>
              ) : (
                <div className="bot-message-wrapper">
                  <div className="bot-avatar">🩺</div>
                  <div className="bot-message" dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br/>') }}></div>
                </div>
              )}
            </div>
          ))}
          {questionCount >= 5 && (
            <div className="max-questions-notice">
              <div className="notice-text">You've reached the maximum number of questions. Scroll up to review your conversation.</div>
            </div>
          )}
        </div>
        <div className="input-section">
          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isInputDisabled || isTyping}
              placeholder={isInputDisabled ? "Maximum questions reached" : "Type your message here..."}
              className={`message-input ${(isInputDisabled || isTyping) ? 'disabled' : ''}`}
            />
            {isTyping ? (
              <button onClick={handleStop} className="stop-button" title="Stop typing">⏹</button>
            ) : (
              <button onClick={handleSend} disabled={!inputValue.trim() || isInputDisabled} className={`send-button ${(!inputValue.trim() || isInputDisabled) ? 'disabled' : ''}`} title="Send message">➤</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;