"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, ArrowRight, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Harap isi seluruh bidang email dan kata sandi.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authErr) {
        setError("Autentikasi gagal. Periksa kembali kredensial Anda.");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat masuk.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Card className="space-y-6 border-slate-800 bg-slate-900/90 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/10">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Portal SecOps Masuk
            </h1>
            <p className="text-xs text-slate-400">
              Akses panel analitik dan log pemantauan ancaman phishing
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              id="login-email"
              label="Email Petugas Keamanan"
              type="email"
              placeholder="analyst@secops.security"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              id="login-password"
              label="Kata Sandi / Token"
              type="password"
              placeholder="••••••••••••"
              icon={<Lock className="w-4 h-4" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="cyber"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
            >
              <span>Autentikasi Akses</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            Belum memiliki token analis?{" "}
            <Link href="/register" className="text-cyan-400 hover:underline font-semibold">
              Daftar Petugas Baru
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
