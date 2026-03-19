"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Credenciales incorrectas.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md space-y-5 rounded-2xl border border-white/10 bg-[#171717] p-8 shadow-xl"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <img
          src="/cropped-T2B-Orilla.png"
          alt="T2B Team"
          className="h-14 w-14 object-contain"
        />
        <div>
          <h1 className="font-heading text-xl font-bold text-white">
            Portal Admin
          </h1>
          <p className="text-sm text-[#9CA3AF]">Inicia sesión para continuar</p>
        </div>
      </div>

      {error ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <div>
        <label className="mb-1 block text-sm font-medium text-[#9CA3AF]">
          Email
        </label>
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-[#0B0B0B] px-4 py-3 text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-[#9CA3AF]">
          Contraseña
        </label>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-[#0B0B0B] px-4 py-3 text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  );
}
