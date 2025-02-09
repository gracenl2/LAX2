
import { useEffect, useRef, useState } from "react";

const WaterLevel = ({
  currentLevel,
  averageLevel,
}: {
  currentLevel: number;
  averageLevel: number;
}) => {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const draw = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw average water level line
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * (1 - averageLevel/100));
      ctx.lineTo(canvas.width, canvas.height * (1 - averageLevel/100));
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw animated wave
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      
      for (let i = 0; i <= canvas.width; i++) {
        const y = Math.sin(i * 0.02 + offset) * 5 + (canvas.height * (1 - currentLevel/100));
        ctx.lineTo(i, y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 160, 206, 0.7)');
      gradient.addColorStop(1, 'rgba(15, 160, 206, 0.3)');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      offset += 0.05;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentLevel, averageLevel]);

  return (
    <div
      className={`relative w-full h-[240px] rounded-xl overflow-hidden bg-monitor-card/30 backdrop-blur-sm transition-opacity duration-500 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        width={800}
        height={240}
      />

      {/* Average Level Text */}
      <div 
        className="absolute left-6 bg-monitor-card/30 backdrop-blur-md rounded-lg px-4 py-2"
        style={{
          top: `${(1 - averageLevel/100) * 240 - 40}px`
        }}
      >
        <p className="text-sm font-medium text-white">Average (Past 7 Days)</p>
      </div>

      {/* Current Level Indicator */}
      <div className="absolute right-6 bottom-6 bg-monitor-card/30 backdrop-blur-md rounded-lg px-4 py-3">
        <p className="text-sm font-medium text-white/60">Current Level</p>
        <p className="text-3xl font-bold text-white">{currentLevel}m</p>
      </div>
    </div>
  );
};

export default WaterLevel;
