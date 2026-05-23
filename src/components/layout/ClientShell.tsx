"use client";

import { CookieConsent } from "@/components/common/CookieConsent";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { AmbientBackdrop } from "@/components/layout/AmbientBackdrop";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import type { ReactNode } from "react";

export function ClientShell({ children }: { children: ReactNode }) {
  return (
    <>
      <AmbientBackdrop />
      <Navbar />
      <main className="relative z-0 flex-1">{children}</main>
      <Footer />
      <CookieConsent />
      <ScrollToTop />
    </>
  );
}
