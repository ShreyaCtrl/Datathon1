import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

const FlipCard = ({ imageUrl, name, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  return (
    <div className="car-card">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        {/* Front side */}
        <div
          className="card-front"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            cursor: "pointer",
          }}
        >
          <img src={imageUrl} alt={name} />
        </div>
        {/* Back side */}
        <div className="card-back" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default FlipCard;
