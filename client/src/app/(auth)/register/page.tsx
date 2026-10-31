"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, Lock, Mail, ArrowRight, User } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("Harap lengkapi seluruh formulir pendaftaran.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authErr } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authErr) {
        setError("Pendaftaran gagal. Silakan coba kembali.");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat pendaftaran.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Card className="space-y-6 border-slate-800 bg-slate-900/90 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto shadow-lg shadow-cyan-500/10">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Registrasi Analis Keamanan
            </h1>
            <p className="text-xs text-slate-400">
              Buat akun analis baru untuk memantau ancaman phishing sistem
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              id="register-name"
              label="Nama Lengkap / Unit Identitas"
              type="text"
              placeholder="Alex Vanguard (SOC Lead)"
              icon={<User className="w-4 h-4" />}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              id="register-email"
              label="Email Korporat"
              type="email"
              placeholder="alex@secops.security"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              id="register-password"
              label="Kata Sandi / Kunci Akses"
              type="password"
              placeholder="Minimal 8 karakter"
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
              <span>Daftarkan Akun SecOps</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            Sudah memiliki akun terverifikasi?{" "}
            <Link href="/login" className="text-cyan-400 hover:underline font-semibold">
              Masuk di sini
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
