// ChatbotUI.js
import React, { useState } from 'react';
import ChatbotComponent from './ChatBotComponent'
import Chatbot from './ChatBotComponent';


const ChatbotUI = () => {
    const [isMinimized, setIsMinimized] = useState(false);
  
    const toggleMinimize = () => {
      setIsMinimized(!isMinimized);
    };
  
    return (
      <div className={`chatbot-ui ${isMinimized ? 'minimized' : ''}`}>
        <div className="header">
          <h1>Chatbot</h1>
          <button onClick={toggleMinimize}>{isMinimized ? '+' : '-'}</button>
        </div>
        {!isMinimized && (
          <div className="content">
            <Chatbot />
          </div>
        )}
      </div>
    );
  };
  
  export default ChatbotUI;