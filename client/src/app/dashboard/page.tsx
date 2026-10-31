"use client";

import React, { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Activity, 
  PieChart, 
  History, 
  Search, 
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  ArrowUpRight,
  Filter
} from "lucide-react";
import { MetricCards } from "@/components/charts/MetricCards";
import { DonutChart } from "@/components/charts/DonutChart";
import { ActivityLineChart } from "@/components/charts/ActivityLineChart";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getStats, getRecentHistory, StatsResponse, ScanResult } from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsResponse>({
    total_scanned: 1482,
    phishing_detected: 396,
    safe_detected: 1086,
    phishing_percentage: 26.7,
    model_accuracy: 98.4,
    threats_blocked_today: 143,
  });

  const [history, setHistory] = useState<ScanResult[]>([]);
  const [filterType, setFilterType] = useState<"ALL" | "SAFE" | "PHISHING">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      const [statsData, historyData] = await Promise.all([
        getStats(),
        getRecentHistory(),
      ]);
      if (statsData) setStats(statsData);
      if (historyData) setHistory(historyData);
    }
    loadData();
  }, []);

  const filteredHistory = history.filter((item) => {
    if (filterType === "SAFE" && item.is_phishing) return false;
    if (filterType === "PHISHING" && !item.is_phishing) return false;
    if (searchQuery && !item.url.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>SecOps Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Dashboard Analitik Keamanan
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Visualisasi telemetri ancaman siber dan riwayat klasifikasi machine learning.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
            Model Engine v1.4 Active
          </span>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <MetricCards stats={stats} />

      {/* Visual Charts Grid: Donut + Line Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Donut Chart: Safe vs Phishing Ratio */}
        <div className="lg:col-span-5">
          <Card className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-sm sm:text-base text-slate-100">
                  Rasio Klasifikasi (Aman vs Phishing)
                </h3>
              </div>
            </div>

            <DonutChart
              safeCount={stats.safe_detected}
              phishingCount={stats.phishing_detected}
            />

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono text-center">
              Evaluasi validasi berdasarkan dataset PhishTank & Alexa Top Sites
            </div>
          </Card>
        </div>

        {/* Line / Bar Chart: Weekly Scan Activity */}
        <div className="lg:col-span-7">
          <Card className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm sm:text-base text-slate-100">
                  Aktivitas Pemindaian Mingguan
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">7 Hari Terakhir</span>
            </div>

            <ActivityLineChart />

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono text-center">
              Puncak aktivitas ancaman terdeteksi pada hari Jumat (78 deteksi)
            </div>
          </Card>
        </div>
      </div>

      {/* Scan History Table with Search & Filtering */}
      <Card className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-bold text-base text-slate-100">
                Riwayat Pemindaian URL Terkini
              </h3>
              <p className="text-xs text-slate-400">
                Log pemeriksaan URL yang dievaluasi oleh sistem analitik AI
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari domain / URL..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center rounded-xl bg-slate-950 border border-slate-850 p-1 text-xs">
              <button
                onClick={() => setFilterType("ALL")}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  filterType === "ALL" ? "bg-slate-800 text-white font-semibold" : "text-slate-400 hover:text-white"
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilterType("SAFE")}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  filterType === "SAFE" ? "bg-emerald-500/20 text-emerald-400 font-semibold" : "text-slate-400 hover:text-white"
                }`}
              >
                Aman
              </button>
              <button
                onClick={() => setFilterType("PHISHING")}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  filterType === "PHISHING" ? "bg-red-500/20 text-red-400 font-semibold" : "text-slate-400 hover:text-white"
                }`}
              >
                Phishing
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-mono tracking-wider">
              <tr>
                <th className="py-3 px-4">Tautan URL</th>
                <th className="py-3 px-4">Klasifikasi</th>
                <th className="py-3 px-4">Keyakinan AI</th>
                <th className="py-3 px-4">Temuan Indikator</th>
                <th className="py-3 px-4 text-right">Waktu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    Tidak ada riwayat pemindaian yang cocok dengan filter.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((scan) => (
                  <tr
                    key={scan.id}
                    className="hover:bg-slate-850/50 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono max-w-[280px] truncate">
                      <span className="font-semibold text-slate-200 block truncate">
                        {scan.hostname || scan.url}
                      </span>
                      <span className="text-[11px] text-slate-500 block truncate">
                        {scan.url}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={scan.is_phishing ? "danger" : "safe"}
                        pulse={scan.is_phishing}
                      >
                        {scan.is_phishing ? "PHISHING" : "AMAN"}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <span
                        className={`font-bold ${
                          scan.is_phishing ? "text-red-400" : "text-emerald-400"
                        }`}
                      >
                        {scan.confidence_percentage}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {scan.indicators && scan.indicators.length > 0 ? (
                        <span className="line-clamp-1 max-w-[240px]">
                          {scan.indicators[0].title}
                          {scan.indicators.length > 1 && ` (+${scan.indicators.length - 1} lainnya)`}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-500 whitespace-nowrap">
                      {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
