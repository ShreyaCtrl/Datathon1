import {BrowserRouter , Routes , Route} from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
// import NoPage from './pages/noPage';
import React, { useState,useEffect } from 'react';
import NavbarC from './components/navv';
import './App.css';
import HomePage from "./components/homePage";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import AboutPage from "./components/AboutPage";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import bot from './assets/img/bot.png';
import ChatBotComponent from "./components/ChatBotComponent";

function App() {
  const chatBotTheme = {
    background: '#C9FF8F',
    headerBgColor: '#197B22',
    headerFontSize: '20px',
    botBubbleColor: '#0F3789',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#FF5733',
    userFontColor: 'white',
  };
  return (
    <div className="App">
     <BrowserRouter>
     <NavbarC/>
     <Routes>
      <Route path='/' element={<HomePage/>}/>
      {/* <Route path='login' element={<Loginpage/>}/>
      
      <Route path="admin" element={<AdminPage />} />
      <Route path='signup' element={<SignupPage/>}/>
      <Route path='*' element={<NoPage/>}/> */}
       <Route path='/about' element={<AboutPage/>}/>
      </Routes>
      {/* <Footer/> */}
      {/* <ThemeProvider theme={chatBotTheme}>
         <ChatBotComponent/>
        </ThemeProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;