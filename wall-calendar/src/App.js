import React, { useState, useEffect, useCallback } from "react";
import Calendar from "./components/Calendar";
import "./App.css";

const MONTH_IMAGES = [
  { month: "January", gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)", accent: "#e94560", scene: "❄️", label: "Winter Peaks" },
  { month: "February", gradient: "linear-gradient(135deg, #2d1b33 0%, #4a1942 40%, #7b2d8b 100%)", accent: "#ff6b9d", scene: "🌸", label: "Blossom Bloom" },
  { month: "March", gradient: "linear-gradient(135deg, #0d2137 0%, #1a4a3a 40%, #2d6a4f 100%)", accent: "#52b788", scene: "🌿", label: "Spring Awakening" },
  { month: "April", gradient: "linear-gradient(135deg, #1b2838 0%, #2c4a6e 40%, #3a7bd5 100%)", accent: "#74b9ff", scene: "🌦️", label: "April Showers" },
  { month: "May", gradient: "linear-gradient(135deg, #1a2f1a 0%, #2d5a1b 40%, #4a9c2f 100%)", accent: "#a8e063", scene: "🌻", label: "Golden Fields" },
  { month: "June", gradient: "linear-gradient(135deg, #2d1b00 0%, #5c3d00 40%, #f39c12 100%)", accent: "#ffd32a", scene: "☀️", label: "Summer Solstice" },
  { month: "July", gradient: "linear-gradient(135deg, #1a0a00 0%, #5c1a00 40%, #c0392b 100%)", accent: "#ff7675", scene: "🏖️", label: "Coastal Heat" },
  { month: "August", gradient: "linear-gradient(135deg, #1a1200 0%, #4a3500 40%, #d4a017 100%)", accent: "#fdcb6e", scene: "🌅", label: "Golden Dusk" },
  { month: "September", gradient: "linear-gradient(135deg, #1a0f00 0%, #5c2d00 40%, #a0522d 100%)", accent: "#e17055", scene: "🍂", label: "Autumn Ember" },
  { month: "October", gradient: "linear-gradient(135deg, #0d0d1a 0%, #1a0d2e 40%, #4a0e8f 100%)", accent: "#a29bfe", scene: "🎃", label: "Harvest Moon" },
  { month: "November", gradient: "linear-gradient(135deg, #0a0f1a 0%, #1a2535 40%, #2c3e50 100%)", accent: "#b2bec3", scene: "🌫️", label: "Misty Mornings" },
  { month: "December", gradient: "linear-gradient(135deg, #0d1a2e 0%, #1a3a5c 40%, #2980b9 100%)", accent: "#74b9ff", scene: "⛄", label: "Frost & Snow" },
];

export default function App() {
  return (
    <div className="app-root">
      <Calendar monthImages={MONTH_IMAGES} />
    </div>
  );
}
