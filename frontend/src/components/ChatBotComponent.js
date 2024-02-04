// src/components/ChatBotComponent.js
import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import bot from '../assets/img/bot.png';

const ChatBotComponent = () => {
  const [steps, setSteps] = useState([
    {
      id: '1',
      message: 'Hello! How can I assist you today?',
      trigger: 'getUserInput',
    },
    {
      id: 'getUserInput',
      user: true,
      trigger: 'apiResponse',
    },
    {
      id: 'apiResponse',
      message: 'GAN, or Generative Adversarial Networks, is a type of machine learning model consisting of two components - a generator and a discriminator - working together in a competitive manner to generate realistic synthetic data.',
      end: true,
    },
  ]);

  const chatBotConfig = {
    botAvatar: bot,
    floating: true,
  };

  return (
    <ChatBot
      steps={steps}
      headerTitle="ResearchBot"
      {...chatBotConfig}
    />
  );
};

export default ChatBotComponent;
