
import { useState } from "react";
import Location from "../components/Location";
import DateTime from "../components/DateTime";
import WaterLevel from "../components/WaterLevel";
import Navigation from "../components/Navigation";

const Index = () => {
  // Simulated data - in a real app, this would come from an API
  const [currentLevel] = useState(75);
  const [averageLevel] = useState(50);

  return (
    <div className="min-h-screen bg-gradient-to-b from-water-dark to-water flex flex-col items-center justify-center p-4">
      <Navigation />
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-white text-center mb-12 animate-fade-up">
          Sea Near Me
        </h1>
        <h4> Ensure your safety using Sea Near Me</h4>
        <div className="space-y-2">
          <Location />
          <DateTime />
        </div>
        
        <div className="relative bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10 animate-fade-up mt-4">
          <h2 className="text-2xl font-bold text-water-dark mb-6">Water Level Monitor</h2>
          <WaterLevel currentLevel={currentLevel} averageLevel={averageLevel} />
        </div>
      </div>
    </div>
  );
};

export default Index;
