
import { useState } from "react";
import Navigation from "../components/Navigation";
import WaterLevel from "../components/WaterLevel";
import HistoricalChart from "../components/HistoricalChart";
import Location from "../components/Location";
import DateTime from "../components/DateTime";
import { Search as SearchIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

const Search = () => {
  const [currentLevel] = useState(75);
  const [averageLevel] = useState(50);

  return (
    <div className="min-h-screen bg-gradient-to-b from-water-dark to-water flex flex-col items-center p-4">
      <Navigation />
      <div className="w-full max-w-4xl space-y-6 mt-16">
        <h1 className="text-4xl font-bold text-white text-center mb-12 animate-fade-up">
          Sea Near Me
        </h1>
        
        {/* Search Input */}
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-water-dark h-5 w-5" />
          <input
            type="text"
            placeholder="Search cities..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        {/* Location and Time */}
        <div className="space-y-2">
          <Location />
          <DateTime />
        </div>

        {/* Water Level Monitor */}
        <Card className="bg-white/15 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white pl-4">Water Level Monitor</h2>
            </div>
            <WaterLevel currentLevel={currentLevel} averageLevel={averageLevel} />
          </div>
        </Card>

        {/* Historical Chart */}
        <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10">
          <HistoricalChart />
        </div>
      </div>
    </div>
  );
};

export default Search;
