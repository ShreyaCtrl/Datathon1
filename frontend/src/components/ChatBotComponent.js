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
      message: 'GAN stands for Generative Adversarial Network. It is a type of artificial intelligence algorithm used in machine learning.GANs were introduced by Ian Goodfellow and his colleagues in 2014. The fundamental idea behind GANs is to have two neural networks, a generator, and a discriminator, which are trained simultaneously through adversarial training.',
      trigger: 'getUserInput',
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
