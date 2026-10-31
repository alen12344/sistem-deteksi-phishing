"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldAlert, Radar, LayoutDashboard, UserCheck, LogOut, Terminal } from "lucide-react";
import { getStoredSession, setStoredSession, UserSession } from "@/lib/supabase";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [session, setSession] = useState<UserSession | null>(null);

  useEffect(() => {
    setSession(getStoredSession());
  }, [pathname]);

  const handleLogout = () => {
    setStoredSession(null);
    setSession(null);
  };

  const navLinks = [
    { href: "/scan", label: "Scanner", icon: <Radar className="w-4 h-4" /> },
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-red-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:border-cyan-400 transition-all shadow-md shadow-emerald-500/10">
            <ShieldAlert className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-wide bg-gradient-to-r from-emerald-400 via-cyan-300 to-slate-100 bg-clip-text text-transparent">
              PHISHGUARD AI
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
              Cyber Defense Engine
            </span>
          </div>
        </Link>

        {/* Navigation items */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-slate-800 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10"
                    : "text-slate-300 hover:text-white hover:bg-slate-900"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Auth Info */}
        <div className="flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-slate-200">{session.name}</span>
                <span className="text-[10px] font-mono text-emerald-400">{session.role}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg border border-slate-700/80 bg-slate-900 hover:bg-red-500/10 hover:border-red-500/40 text-slate-400 hover:text-red-400 transition-all"
                title="Keluar"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-850 rounded-lg transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm shadow-emerald-500/20 transition-all"
              >
                Daftar SecOps
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
