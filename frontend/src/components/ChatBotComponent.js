// Chatbot.js
import React, { useState } from 'react';

const Chatbot = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    // Update chat history with user message
    setChatHistory([...chatHistory, { role: 'user', content: inputMessage }]);
    
    // Call the backend API to get the chatbot response
    try {
      const response = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageText: inputMessage }),
      });

      const result = await response.json();
      const botResponse = result.answer;

      // Update chat history with chatbot response
      setChatHistory([...chatHistory, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    }

    // Clear input field
    setInputMessage('');
  };

  return (
    <div className="floating-chat">
      <div className="chat-history">
        {/* Display chat history */}
        {chatHistory.map((message, index) => (
          <div key={index} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        {/* Input field and send button */}
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
