import React from "react";
import { ShieldCheck, ShieldAlert, Cpu, Activity, TrendingUp } from "lucide-react";
import { StatsResponse } from "@/lib/api";

interface MetricCardsProps {
  stats: StatsResponse;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Scanned */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all backdrop-blur-md">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-mono uppercase tracking-wider">Total URL Dipindai</span>
          <Activity className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-white">
            {stats.total_scanned.toLocaleString()}
          </span>
          <span className="text-xs text-emerald-400 font-mono flex items-center">
            <TrendingUp className="w-3 h-3 mr-0.5 inline" /> +14%
          </span>
        </div>
        <span className="text-[11px] text-slate-500 mt-1 block">
          Akumulasi pemindaian sistem global
        </span>
      </div>

      {/* Phishing Ratio */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-red-500/40 transition-all backdrop-blur-md">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-mono uppercase tracking-wider">Rasio Phishing</span>
          <ShieldAlert className="w-4 h-4 text-red-400" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-red-400">
            {stats.phishing_percentage}%
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ({stats.phishing_detected} Kasus)
          </span>
        </div>
        <span className="text-[11px] text-slate-500 mt-1 block">
          Dideteksi dan diberi tanda peringatan
        </span>
      </div>

      {/* Model Accuracy */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all backdrop-blur-md">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-mono uppercase tracking-wider">Tingkat Akurasi AI</span>
          <Cpu className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-emerald-400">
            {stats.model_accuracy}%
          </span>
          <span className="text-xs text-emerald-400/80 font-mono">F1: 0.99</span>
        </div>
        <span className="text-[11px] text-slate-500 mt-1 block">
          Random Forest Classifier v1.4
        </span>
      </div>

      {/* Threats Blocked Today */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all backdrop-blur-md">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-mono uppercase tracking-wider">Ancaman Hari Ini</span>
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-white">
            {stats.threats_blocked_today}
          </span>
          <span className="text-xs text-cyan-400 font-mono">Aktif</span>
        </div>
        <span className="text-[11px] text-slate-500 mt-1 block">
          Insiden phishing dicegah secara real-time
        </span>
      </div>
    </div>
  );
};
