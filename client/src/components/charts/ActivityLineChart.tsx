import React from "react";

export const ActivityLineChart: React.FC = () => {
  const data = [
    { day: "Sen", total: 140, phishing: 32 },
    { day: "Sel", total: 195, phishing: 45 },
    { day: "Rab", total: 240, phishing: 62 },
    { day: "Kam", total: 210, phishing: 51 },
    { day: "Jum", total: 290, phishing: 78 },
    { day: "Sab", total: 180, phishing: 39 },
    { day: "Min", total: 225, phishing: 54 },
  ];

  const maxTotal = 320;
  const chartHeight = 160;

  return (
    <div className="w-full flex flex-col p-2 space-y-4">
      {/* Bars/Trend visualization */}
      <div className="flex items-end justify-between gap-2 h-44 border-b border-slate-800 pb-2 px-2">
        {data.map((item, idx) => {
          const totalHeight = (item.total / maxTotal) * chartHeight;
          const phishingHeight = (item.phishing / maxTotal) * chartHeight;

          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full max-w-[36px] flex flex-col items-center justify-end h-40 relative">
                {/* Tooltip on hover */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 px-2 py-1 rounded text-[10px] font-mono text-slate-200 pointer-events-none z-15 whitespace-nowrap shadow-xl">
                  {item.total} scan ({item.phishing} phishing)
                </div>

                {/* Safe portion */}
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-cyan-600/40 to-cyan-400 group-hover:brightness-125 transition-all"
                  style={{ height: `${totalHeight}px` }}
                >
                  {/* Phishing portion inside */}
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-red-600 to-red-400"
                    style={{ height: `${phishingHeight}px` }}
                  />
                </div>
              </div>
              <span className="text-xs font-mono text-slate-400 group-hover:text-cyan-400 transition-colors">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-6 text-xs font-mono text-slate-400 pt-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" />
          <span>Total Pemindaian</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-red-400" />
          <span>Ancaman Phishing</span>
        </div>
      </div>
    </div>
  );
};
