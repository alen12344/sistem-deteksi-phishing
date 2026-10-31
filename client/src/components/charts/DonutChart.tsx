import React from "react";

interface DonutChartProps {
  safeCount: number;
  phishingCount: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({ safeCount, phishingCount }) => {
  const total = Math.max(1, safeCount + phishingCount);
  const safePercent = Math.round((safeCount / total) * 100);
  const phishingPercent = 100 - safePercent;

  // SVG Circumference calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const safeOffset = circumference * (1 - safePercent / 100);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-around gap-6 p-4">
      {/* SVG Donut */}
      <div className="relative w-44 h-44 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-slate-800"
            strokeWidth="18"
            fill="transparent"
          />
          {/* Phishing arc (Crimson Red) */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-red-500 transition-all duration-1000 ease-out"
            strokeWidth="18"
            strokeDasharray={circumference}
            strokeDashoffset="0"
            fill="transparent"
          />
          {/* Safe arc (Neon Green) */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-emerald-400 transition-all duration-1000 ease-out"
            strokeWidth="18"
            strokeDasharray={circumference}
            strokeDashoffset={safeOffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-black text-white">{total.toLocaleString()}</span>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            Total Evaluasi
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="w-3.5 h-3.5 rounded-md bg-emerald-400 shadow-[0_0_10px_#10B981]" />
          <div>
            <div className="text-xs font-mono text-slate-400">Tervalidasi Aman</div>
            <div className="text-lg font-bold text-slate-100">
              {safeCount.toLocaleString()}{" "}
              <span className="text-xs text-emerald-400 font-normal">({safePercent}%)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-3.5 h-3.5 rounded-md bg-red-500 shadow-[0_0_10px_#EF4444]" />
          <div>
            <div className="text-xs font-mono text-slate-400">Terdeteksi Phishing</div>
            <div className="text-lg font-bold text-slate-100">
              {phishingCount.toLocaleString()}{" "}
              <span className="text-xs text-red-400 font-normal">({phishingPercent}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
