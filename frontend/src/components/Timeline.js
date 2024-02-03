import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-scroll";
import "../App.css";
import { ReactComponent as WorkIcon } from "../assets/img/work.svg";
import { ReactComponent as SchoolIcon } from "../assets/img/school.svg";
import timelineElements from "./timelineElements.js";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

function Timeline() {
  const [scrollDirection, setScrollDirection] = useState("down");
  const isMounted = useRef(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 0 && scrollDirection !== "up") {
        setScrollDirection("up");
      } else if (currentScroll === 0 && scrollDirection !== "down") {
        setScrollDirection("down");
      } else {
        setScrollDirection("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      isMounted.current = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollDirection]);

  let workIconStyles = { background: "#06D6A0" };
  let schoolIconStyles = { background: "#f9c74f" };

  return (
    <div className={`timeline1 ${scrollDirection === "up" ? "scroll-up" : ""}`}>
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
                <Link
                  className={`button ${
                    isWorkIcon ? "workButton" : "schoolButton"
                  }`}
                  to="project" // assuming "project" is the ID of the target element
                  smooth={true}
                  duration={500}
                  style={{ cursor: "pointer" }}
                >
                  {element.buttonText}
                </Link>
              )}
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
}

export default Timeline;
