import React from 'react'
import Button from 'react-bootstrap/Button';
import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import { useState, useEffect } from "react";
import './LandingIntro.css';
import { textVariant } from './motion';
import AboutPage from './AboutPage';
import VideoBackground from './VideoBackground';
import Working from './Working';
import ChatbotUI from './ChatbotUi';
const HomePage = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState("");
    const [delta, setDelta] = useState(100 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = [ "Summarization", "Future Scope", "Limitation","Chat Help" ];
    const period = 1000;

    useEffect(() => {
      let ticker = setInterval(() => {
        tick();
      }, delta);

      return () => {
        clearInterval(ticker);
      };
    }, [text]);

    const tick = () => {
      let i = loopNum % toRotate.length;
      let fullText = toRotate[i];
      let updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
        setDelta((prevDelta) => prevDelta / 2);
      }

      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setIndex((prevIndex) => prevIndex - 1);
        setDelta(period);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setIndex(1);
        setDelta(250);
      } else {
        setIndex((prevIndex) => prevIndex + 1);
      }
    };
   
  return (
 <> <VideoBackground/>
    <div className='home no-padding-bottom'> 
    
     <div className='welcome '><div className='we'> Welcome to  <span>ResearchRef</span></div>
     <div className='home-title d-flex align-items-center'>
    Get &nbsp;
    <div className='landing-intro-background flex items-center justify-center flex-col w-full h-full'>
      <span
        className="txt-rotate"
        dataperiod="1000"
        data-rotate='[ "Summarization", "Future Scope", "Limitation","Chat Help" ]'
      >
       <span className="landing-intro-wrap text-[#fff] font-bold">{text}</span>
      </span>
    </div>
    &nbsp; of your Research Paper
  </div>
  <Button className='buttons mt-5' href='/#explore'>Explore</Button></div>
     
  </div>
  <AboutPage/>
  <Working/>
  {/* <ChatbotUI/> */}
  </>
  )
}

export default HomePage