import { ClientShell } from "@/components/layout/ClientShell";
import { COMPANY } from "@/utils/constants";
import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shinespan.co.uk"),
  title: {
    default: `${COMPANY.shortName} | Premium Cleaning Services UK`,
    template: `%s | ${COMPANY.shortName}`,
  },
  description: `${COMPANY.tagline} Insured teams for homes, offices, Airbnb & commercial spaces across the UK.`,
  keywords: [
    "cleaning services UK",
    "house cleaning",
    "office cleaning",
    "Airbnb cleaning",
    "end of tenancy cleaning",
    "deep cleaning",
  ],
  openGraph: {
    title: `${COMPANY.shortName} | Premium Cleaning Services UK`,
    description: COMPANY.tagline,
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning className="dark h-full">
      <body
        className={`${plusJakarta.variable} ${dmSerif.variable} flex min-h-full flex-col font-sans antialiased`}
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
