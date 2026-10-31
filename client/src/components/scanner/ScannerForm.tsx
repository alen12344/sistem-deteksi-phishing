"use client";

import React, { useState } from "react";
import { Search, ShieldAlert, Sparkles, ArrowRight, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScanRadar } from "@/components/scanner/ScanRadar";
import { ScanResultCard } from "@/components/scanner/ScanResultCard";
import { scanUrl, ScanResult } from "@/lib/api";

const SAMPLE_URLS = [
  { label: "Google (Aman)", url: "https://accounts.google.com/signin", isSafe: true },
  { label: "Phishing: PayPal Fake", url: "http://paypal-security-update-center.xyz/login?ref=auth", isSafe: false },
  { label: "Phishing: Raw IP Bank", url: "http://192.168.1.105/bank-verification/login.php", isSafe: false },
  { label: "GitHub Security (Aman)", url: "https://github.com/security", isSafe: true },
];

export const ScannerForm: React.FC = () => {
  const [urlInput, setUrlInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) {
      setErrorMsg("Harap masukkan tautan URL yang ingin diperiksa.");
      return;
    }

    setErrorMsg(null);
    setScanResult(null);
    setIsLoading(true);

    try {
      // Simulate slight delay so the radar sweep is clearly visible to the user as requested
      const [res] = await Promise.all([
        scanUrl(urlInput),
        new Promise((resolve) => setTimeout(resolve, 1400)),
      ]);
      setScanResult(res);
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal memindai URL. Periksa koneksi backend FastAPI.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSample = (sampleUrl: string) => {
    setUrlInput(sampleUrl);
    setErrorMsg(null);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Central Search Form Box */}
      <div className="w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="relative group">
          {/* Ambient Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-red-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />

          <div className="relative flex items-center bg-slate-900/95 border-2 border-slate-700/80 group-hover:border-cyan-500/60 rounded-2xl p-2 sm:p-2.5 transition-all shadow-2xl backdrop-blur-2xl">
            <div className="pl-3 sm:pl-4 pr-2 text-cyan-400">
              <Search className="w-6 h-6 animate-pulse" />
            </div>

            <input
              type="text"
              id="url-input"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Masukkan URL untuk dianalisis... (contoh: https://secure-login.xyz)"
              className="w-full bg-transparent border-none text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:ring-0 px-2 font-mono py-2"
              autoComplete="off"
            />

            <Button
              type="submit"
              variant="cyber"
              size="lg"
              isLoading={isLoading}
              className="shrink-0 rounded-xl"
            >
              <span>Analisis URL</span>
              <CornerDownLeft className="hidden sm:inline-block w-4 h-4 ml-1.5 opacity-70" />
            </Button>
          </div>
        </form>

        {/* Validation Error */}
        {errorMsg && (
          <p className="mt-3 text-xs sm:text-sm text-red-400 text-center font-medium bg-red-950/40 border border-red-500/30 p-2.5 rounded-xl">
            {errorMsg}
          </p>
        )}

        {/* Quick Sample Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-500 font-mono">Coba Sampel:</span>
          {SAMPLE_URLS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSample(sample.url)}
              className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition-all cursor-pointer ${
                sample.isSafe
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                  : "border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20"
              }`}
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content: Loading Radar or Results */}
      <div className="w-full mt-10">
        {isLoading && <ScanRadar />}
        {!isLoading && scanResult && <ScanResultCard result={scanResult} />}
      </div>
    </div>
  );
};
