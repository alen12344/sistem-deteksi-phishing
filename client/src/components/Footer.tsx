import React from "react";
import { ShieldCheck, Cpu, Terminal } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-200">Phishing Detector System & AI Security</p>
            <p className="text-[11px] text-slate-400">
              Heuristic Feature Extractor + Scikit-Learn Model & Next.js Architecture
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-300">Live AI Threat Sentinel</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 font-mono">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>FastAPI ML Microservice</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
