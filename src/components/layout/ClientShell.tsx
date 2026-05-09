"use client";

import { ChatbotWidget } from "@/components/chat/ChatbotWidget";
import { CookieConsent } from "@/components/common/CookieConsent";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import type { ReactNode } from "react";

export function ClientShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatbotWidget />
      <CookieConsent />
      <ScrollToTop />
    </>
  );
}
