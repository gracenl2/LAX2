import { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

// Sample data - in a real app this would come from an API
const sampleData = [
  { date: 'Feb', level: 223 },
  { date: 'Mar', level: 240 },
  { date: 'Apr', level: 255 },
  { date: 'May', level: 270 },
  { date: 'Jun', level: 311 },
  { date: 'Jul', level: 290 },
  { date: 'Aug', level: 300 },
  { date: 'Sep', level: 320 },
  { date: 'Oct', level: 380 },
  { date: 'Nov', level: 399 },
  { date: 'Dec', level: 370 },
  { date: 'Feb', level: 350 }
];

const timeframes = ['1W', '1M', '3M', '6M', 'YTD', '1Y', '2Y', '5Y', '10Y'];

interface HistoricalChartProps {
  className?: string;
}

const HistoricalChart = ({ className }: HistoricalChartProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  const highValue = Math.max(...sampleData.map(d => d.level));
  const lowValue = Math.min(...sampleData.map(d => d.level));

  return (
    <Card className={`bg-monitor-card/30 backdrop-blur-lg border-white/10 ${className}`}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Historical Data</h2>
          
          {/* Timeframe selector */}
          <div className="flex gap-2">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedTimeframe === timeframe
                    ? 'bg-monitor-card/50 text-white'
                    : 'text-white/60 hover:bg-white/10'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={sampleData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="waterLevel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0FA0CE" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#0FA0CE" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(255, 255, 255, 0.1)"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255, 255, 255, 0.6)' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255, 255, 255, 0.6)' }}
                domain={[0, 400]}
                ticks={[0, 100, 200, 300, 400]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-monitor-card/30 backdrop-blur p-3 rounded-lg border border-white/10">
                        <p className="text-white/60">{payload[0].payload.date}</p>
                        <p className="text-xl font-bold text-white">
                          {payload[0].value}m
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="level"
                stroke="#0FA0CE"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#waterLevel)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-monitor-card/30 backdrop-blur p-4 rounded-lg">
            <div className="text-white/60 text-sm">High</div>
            <div className="text-white text-2xl font-bold">{highValue}m</div>
          </div>
          <div className="bg-monitor-card/30 backdrop-blur p-4 rounded-lg">
            <div className="text-white/60 text-sm">Low</div>
            <div className="text-white text-2xl font-bold">{lowValue}m</div>
          </div>
          <div className="bg-monitor-card/30 backdrop-blur p-4 rounded-lg">
            <div className="text-white/60 text-sm">Avg Vol</div>
            <div className="text-white text-2xl font-bold">86.31M</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HistoricalChart;
