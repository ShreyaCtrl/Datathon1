import "../App.css";
import { ReactComponent as WorkIcon } from "../assets/img/work.svg"
import { ReactComponent as SchoolIcon } from "../assets/img/school.svg";
// import snow_gif from "../assets/img/snow_gif.gif"
import timelineElements from "./timelineElements.js";
// import Snowfall from 'react-snowfall'

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import { HashLink } from "react-router-hash-link";

const myprojects = () =>{
    window.location.href="https://github.com/vedantkesharia";
}

function scrollToProjects() {
  const projectsSection = document.getElementById("project");
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: "smooth" });
  }
}



function Timeline() {
  let workIconStyles = { background: "#06D6A0" };
  let schoolIconStyles = { background: "#f9c74f" };

  return (
    <div className="timeline1">
      {/* <Snowfall/> */}
      <h1 className="title1">Features</h1>
      <VerticalTimeline className="verticaltimeline1">
        {timelineElements.map((element) => {
          let isWorkIcon = element.icon === "work";
          let showButton =
            element.buttonText !== undefined &&
            element.buttonText !== null &&
            element.buttonText !== "";

          return (
            <VerticalTimelineElement
              key={element.key}
              date={element.date}
              className="tt"
              dateClassName="date"
              iconStyle={isWorkIcon ? workIconStyles : schoolIconStyles}
              icon={isWorkIcon ? <WorkIcon /> : <SchoolIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                {element.title}
              </h3>
              <h5 className="vertical-timeline-element-subtitle">
                {element.location}
              </h5>
              <p id="description">{element.description}</p>
              {showButton && (
                <a
                  className={`button ${
                    isWorkIcon ? "workButton" : "schoolButton"
                  }`}
                  // onClick={myprojects}
                  onClick={scrollToProjects}
                  style={{cursor:"pointer"}}
                >
                  {element.buttonText}
                </a>
              )}
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
      
    </div>
  );
}

export default Timeline;