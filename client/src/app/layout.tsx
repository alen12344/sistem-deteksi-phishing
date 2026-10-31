import type { Metadata } from "next";
import "@/app/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "PhishGuard AI — Sistem Deteksi Phishing URL Cerdas",
  description: "Platform keamanan siber modern untuk mendeteksi ancaman tautan phishing menggunakan Machine Learning, analisis fitur leksikal, dan deteksi homograph.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 antialiased cyber-grid selection:bg-emerald-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
