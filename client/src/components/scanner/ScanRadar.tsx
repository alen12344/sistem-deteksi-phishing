"use client";

import React, { useEffect, useState } from "react";
import { Radar, ShieldCheck, Binary, Terminal } from "lucide-react";

export const ScanRadar: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    "Memeriksa sertifikat SSL/TLS & validasi HTTPS...",
    "Mengekstrak fitur leksikal & karakter khusus (@, hyphen, dot)...",
    "Mendeteksi homograph attack & karakter Cyrillic...",
    "Menganalisis entropi Shannon domain & reputasi TLD...",
    "Menjalankan inferensi model Random Forest AI...",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 700);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center py-10 px-4">
      {/* Radar Animation Container */}
      <div className="relative w-48 h-48 rounded-full border border-cyan-500/30 bg-slate-950/60 shadow-2xl shadow-cyan-500/10 flex items-center justify-center overflow-hidden">
        {/* Radar concentric rings */}
        <div className="absolute inset-4 rounded-full border border-cyan-500/20" />
        <div className="absolute inset-10 rounded-full border border-cyan-500/25" />
        <div className="absolute inset-16 rounded-full border border-cyan-500/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-[1px] bg-cyan-500/20" />
          <div className="h-full w-[1px] bg-cyan-500/20 absolute" />
        </div>

        {/* Rotating sweep line */}
        <div className="absolute inset-0 animate-radar-sweep pointer-events-none">
          <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/40 via-cyan-500/10 to-transparent rounded-tl-full origin-bottom-right" />
        </div>

        {/* Center icon */}
        <div className="relative z-10 w-12 h-12 rounded-xl bg-slate-900 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-400/20">
          <Radar className="w-6 h-6 animate-pulse" />
        </div>
      </div>

      {/* Cyber inspection ticker */}
      <div className="mt-8 flex flex-col items-center gap-2 max-w-md text-center">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <Binary className="w-4 h-4 animate-spin" />
          <span>Analisis Heuristik & AI Berjalan...</span>
        </div>
        <p className="text-sm font-medium text-slate-300 transition-all duration-300 min-h-[24px]">
          {steps[stepIndex]}
        </p>
      </div>
    </div>
  );
};
