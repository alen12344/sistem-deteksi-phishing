import Link from "next/link";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Radar, 
  Cpu, 
  ArrowRight, 
  Lock, 
  Binary, 
  Activity,
  FileSearch,
  Sparkles
} from "lucide-react";
import { ScannerForm } from "@/components/scanner/ScannerForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 flex flex-col items-center text-center">
        {/* Security Alert Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-6 shadow-sm shadow-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Sentinel AI Online — Machine Learning Detection Active</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1]">
          Lindungi Diri dari Serangan{" "}
          <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">
            Phishing URL
          </span>{" "}
          secara Real-Time
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl font-normal leading-relaxed">
          Sistem deteksi cerdas berbasis algoritma Machine Learning yang mengekstrak fitur keamanan, mendeteksi serangan homograph, manipulasi TLD, serta URL obfuscation dalam hitungan milidetik.
        </p>

        {/* Central Search Scanner Section */}
        <div className="w-full mt-12">
          <ScannerForm />
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="w-full border-t border-slate-800/80 bg-slate-950/60 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Arsitektur Pertahanan Siber Berlapis
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              Kombinasi analisis heuristik heuristik leksikal mendalam dan model Random Forest teruji untuk akurasi klasifikasi hingga 98.4%.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-7 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                <FileSearch className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Ekstraksi Fitur Leksikal
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Membedah struktur URL secara komprehensif: deteksi simbol '@', panjang URL, jumlah subdomain, keberadaan IP mentah, dan pola kata kunci kredensial.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-7 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                <Binary className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Deteksi Homograph & Cyrillic
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Mendeteksi karakter unicode/cyrillic non-ASCII yang sengaja dipakai meniru huruf Latin domain resmi perbankan atau korporat terpercaya.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-7 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-red-500/40 hover:bg-slate-900/90 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-5 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Model Machine Learning AI
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Klasifikasi real-time menggunakan pipeline scikit-learn dengan kalkulasi tingkat keyakinan (confidence score) dan respon instan via FastAPI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Callout to Dashboard */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-slate-900 to-slate-950 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Pantau Analitik Ancaman di Dashboard
            </h3>
            <p className="text-sm text-slate-400 max-w-xl">
              Lihat rasio ancaman terkini, riwayat pemindaian seluruh tautan yang dievaluasi, dan tren aktivitas mingguan.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm inline-flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all shrink-0"
          >
            <span>Buka Dashboard Analitik</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
