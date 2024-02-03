import React from "react";
import FlipCard from "./FlipCard";

const cars = [
  {
    imageUrl: "https://i.ibb.co/FXtFBSh/martin-katler-0-Sm-GWb-Zzw-unsplash.jpg",
    name: "Black Coupe",
    description: "Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit  Lorem ipsum dolor sit ",
  },
  {
    imageUrl: "https://i.ibb.co/7C3nkfr/niklas-du-EI1op-VNk4yg-unsplash.jpg",
    name: "Porsche",
    description: "Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit  Lorem ipsum dolor sit",
  },
  {
    imageUrl: "https://i.ibb.co/b22kSx7/marek-pospisil-o-UBjd22g-F6w-unsplash.jpg",
    name: "Orange Lambogini",
    description: "Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit  Lorem ipsum dolor sit",
  },
];

function MultipleFlipCards() {
  return (
    <div className="bo">
      <h1>Features</h1>
      <div className="car-container">
        {cars.map((car, index) => (
          <FlipCard
            key={index}
            imageUrl={car.imageUrl}
            name={car.name}
            description={car.description}
          />
        ))}
      </div>
    </div>
  );
}

export default MultipleFlipCards;