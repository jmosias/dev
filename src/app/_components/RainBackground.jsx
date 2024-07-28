import React from "react";
import "./RainBackground.scss";

const NUM_RAINDROPS = 100;

export default function RainBackground() {
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
}
