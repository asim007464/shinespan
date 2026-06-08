"use client";

import { COMPANY } from "@/utils/constants";
import Link from "next/link";
import { useState } from "react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { FiLock, FiMail } from "react-icons/fi";

export function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    /* Wire to auth provider later */
  }

  const fieldShell =
    "mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3";

  return (
    <div className="relative flex min-h-[calc(100vh-180px)] items-center justify-center px-4 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.12),_transparent_55%)]" />
      <div className="ss-card relative w-full max-w-md overflow-hidden rounded-[2rem] p-8">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-ss-blue-400/20 blur-3xl" />
        <div className="relative">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-600">
            Welcome back
          </p>
          <h1 className="mt-3 text-center font-display text-3xl text-slate-900">
            Sign in to {COMPANY.shortName}
          </h1>
          <p className="mt-2 text-center text-base text-slate-600">
            Client portal, bookings & invoices (demo UI).
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Email
              </span>
              <span className={fieldShell}>
                <FiMail className="text-ss-blue-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </span>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Password
              </span>
              <span className={fieldShell}>
                <FiLock className="text-ss-blue-600" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </span>
            </label>

            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-slate-400">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-white/30 bg-transparent"
                />
                Remember me
              </label>
              <button type="button" className="font-semibold text-ss-blue-600 hover:text-ss-blue-700">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-ss-blue-700 to-ss-blue-500 py-4 text-sm font-semibold text-white shadow-xl shadow-ss-blue-600/30"
            >
              Sign in
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200/80" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest text-slate-500">
              <span className="bg-white px-3 text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
            >
              <FaGoogle /> Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
            >
              <FaApple /> Apple
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-slate-400">
            New to {COMPANY.shortName}?{" "}
            <Link href="/signup" className="font-semibold text-ss-blue-600 hover:text-ss-blue-700">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
