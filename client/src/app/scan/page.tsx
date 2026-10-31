import { ScannerForm } from "@/components/scanner/ScannerForm";
import { Radar, ShieldCheck, Terminal } from "lucide-react";

export const metadata = {
  title: "URL Scanner — PhishGuard AI",
  description: "Pemindai URL interaktif untuk mendeteksi ancaman phishing secara real-time.",
};

export default function ScanPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-2xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
          <Radar className="w-3.5 h-3.5" />
          <span>Interactive URL Threat Scanner</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Pemindai Tautan Phishing
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400">
          Masukkan tautan web yang mencurigakan di bawah ini. Sistem akan mengekstrak indikator keamanan dan mengevaluasi probabilitas ancaman secara instan.
        </p>
      </div>

      {/* Main Scanner */}
      <div className="w-full">
        <ScannerForm />
      </div>
    </div>
  );
}
