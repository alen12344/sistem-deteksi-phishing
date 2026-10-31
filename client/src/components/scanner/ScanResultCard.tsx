import React from "react";
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  ExternalLink, 
  Cpu, 
  Lock, 
  Unlock, 
  Hash, 
  Globe, 
  Check, 
  X,
  FileCode2
} from "lucide-react";
import { ScanResult, RiskIndicator } from "@/lib/api";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface ScanResultCardProps {
  result: ScanResult;
}

export const ScanResultCard: React.FC<ScanResultCardProps> = ({ result }) => {
  const isPhishing = result.is_phishing;
  const confidence = result.confidence_percentage;

  const getSeverityBadge = (severity: RiskIndicator["severity"]) => {
    switch (severity) {
      case "CRITICAL":
      case "HIGH":
        return <Badge variant="danger">{severity}</Badge>;
      case "MEDIUM":
        return <Badge variant="warning">{severity}</Badge>;
      case "SAFE":
        return <Badge variant="safe">AMAN</Badge>;
      default:
        return <Badge variant="info">INFO</Badge>;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Primary Result Banner */}
      <div
        className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 ${
          isPhishing
            ? "border-red-500/80 bg-red-950/20 animate-pulse-danger"
            : "border-emerald-500/60 bg-emerald-950/15 animate-pulse-safe"
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div
              className={`p-4 rounded-2xl border ${
                isPhishing
                  ? "bg-red-500/10 border-red-500/40 text-red-400 shadow-xl shadow-red-500/20"
                  : "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-xl shadow-emerald-500/20"
              }`}
            >
              {isPhishing ? (
                <ShieldAlert className="w-10 h-10 animate-bounce" />
              ) : (
                <ShieldCheck className="w-10 h-10" />
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {isPhishing ? "ANACAMAN PHISHING TERDETEKSI!" : "WEBSITE TERVALIDASI AMAN"}
                </h2>
                <Badge
                  variant={isPhishing ? "danger" : "safe"}
                  pulse={isPhishing}
                  className="text-xs"
                >
                  {result.risk_level}
                </Badge>
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm text-slate-300 font-mono break-all">
                <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-100 font-semibold">{result.hostname}</span>
              </div>
              <p className="mt-1 text-xs text-slate-400 font-mono break-all line-clamp-1">
                {result.url}
              </p>
            </div>
          </div>

          {/* Confidence Score Gauge */}
          <div className="w-full md:w-auto flex md:flex-col items-center justify-between md:justify-center p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 min-w-[170px]">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Tingkat Keyakinan AI
            </span>
            <div className="flex items-baseline gap-1 my-1">
              <span
                className={`text-3xl sm:text-4xl font-black ${
                  isPhishing ? "text-red-400" : "text-emerald-400"
                }`}
              >
                {confidence}%
              </span>
            </div>
            {/* Visual bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isPhishing
                    ? "bg-gradient-to-r from-red-600 to-red-400"
                    : "bg-gradient-to-r from-emerald-600 to-emerald-400"
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>
        </div>

        {/* Security Recommendation notice */}
        <div
          className={`mt-6 p-4 rounded-xl border flex items-center gap-3 text-sm ${
            isPhishing
              ? "bg-red-500/10 border-red-500/30 text-red-200"
              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
          }`}
        >
          {isPhishing ? (
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <span>
            {isPhishing
              ? "PERINGATAN: Jangan masukkan kata sandi, informasi perbankan, atau kode OTP pada tautan ini. Segera tutup tab peramban Anda."
              : "Situs web ini menunjukkan pola leksikal dan infrastruktur yang konsisten dengan domain resmi terdaftar."}
          </span>
        </div>
      </div>

      {/* Breakdown Indikator Ancaman */}
      <Card glow="none" className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-base text-slate-100">
              Breakdown Indikator Keamanan
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {result.indicators.length} Temuan Analisis
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {result.indicators.map((indicator, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-800/90 bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-slate-200">
                    {indicator.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {indicator.description}
                </p>
              </div>
              <div className="self-start sm:self-center shrink-0">
                {getSeverityBadge(indicator.severity)}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Extracted Features Specs */}
      {result.features && (
        <Card glow="none" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-slate-100">
              Spesifikasi Fitur Machine Learning
            </h3>
            <span className="ml-auto text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {result.model_used}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 block">Panjang URL</span>
              <span className="text-slate-200 font-bold text-sm">
                {result.features.url_length} Karakter
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 block">Status HTTPS</span>
              <span className={`font-bold text-sm ${result.features.has_https ? "text-emerald-400" : "text-red-400"}`}>
                {result.features.has_https ? "Aktif (SSL Valid)" : "Tidak Aktif (HTTP)"}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 block">Karakter '@' Obfuscation</span>
              <span className={`font-bold text-sm ${result.features.has_at ? "text-red-400" : "text-emerald-400"}`}>
                {result.features.has_at ? "Terdeteksi" : "Nihil"}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 block">Alamat IP Langsung</span>
              <span className={`font-bold text-sm ${result.features.is_ip ? "text-red-400" : "text-emerald-400"}`}>
                {result.features.is_ip ? "Ya (IP Host)" : "Tidak (Domain Asli)"}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 block">Entropi Shannon</span>
              <span className="text-slate-200 font-bold text-sm">
                {result.features.entropy}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 block">Kedalaman Subdomain</span>
              <span className="text-slate-200 font-bold text-sm">
                {result.features.subdomain_depth} Tingkat
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 block">TLD Berisiko (.xyz/dll)</span>
              <span className={`font-bold text-sm ${result.features.suspicious_tld ? "text-red-400" : "text-emerald-400"}`}>
                {result.features.suspicious_tld ? "Ya (Berisiko)" : "Standar / Aman"}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 block">Kata Kunci Sensitif</span>
              <span className="text-slate-200 font-bold text-sm">
                {result.features.keywords.length > 0 ? result.features.keywords.join(", ") : "Nihil"}
              </span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
