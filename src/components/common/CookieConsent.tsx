"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "ss-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        if (!localStorage.getItem(KEY)) setVisible(true);
      } catch {
        setVisible(true);
      }
    });
  }, []);

  function accept() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-lg rounded-2xl border border-white/12 bg-ss-blue-950/98 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:bottom-6 sm:right-6 sm:left-auto">
      <p className="text-sm font-medium text-white">Cookies &amp; privacy</p>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">
        We use essential cookies to run this site and optional analytics to improve experience. See our{" "}
        <Link href="/contact" className="text-ss-blue-400 underline hover:text-ss-blue-300">
          contact page
        </Link>{" "}
        for details.
      </p>
      <button
        type="button"
        onClick={accept}
        className="mt-4 w-full rounded-xl bg-gradient-to-r from-ss-blue-700 to-ss-blue-500 py-3 text-sm font-semibold text-white shadow-lg"
      >
        Accept
      </button>
    </div>
  );
}
