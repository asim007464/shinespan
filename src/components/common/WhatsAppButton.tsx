"use client";

import { COMPANY } from "@/utils/constants";
import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton() {
  return (
    <a
      href={COMPANY.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-[5.25rem] z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] text-slate-900 shadow-2xl shadow-emerald-900/40 transition hover:scale-105 hover:brightness-110 sm:bottom-6 sm:right-24"
    >
      <FaWhatsapp className="h-7 w-7" />
    </a>
  );
}
