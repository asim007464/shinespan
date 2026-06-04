"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ss-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:bottom-6 sm:right-6 sm:left-auto">
      <p className="text-sm font-medium text-slate-900">Cookies &amp; privacy</p>
      <p className="mt-2 text-xs leading-relaxed text-slate-600">
        We use essential cookies to run this site and optional analytics to improve experience. See our{" "}
        <Link href="/contact" className="text-ss-blue-600 underline hover:text-ss-blue-800">
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
