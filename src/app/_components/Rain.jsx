import React from "react";
import "./Rain.scss";

const NUM_RAINDROPS = 75;

const Rain = () => {
  return (
    <div className="rain-container">
      {[...Array(NUM_RAINDROPS)].map((_, index) => (
        <div
          key={index}
          className="rain"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 6 + 1}s`,
            animationDelay: `${Math.random() * 2 - 1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Rain;
