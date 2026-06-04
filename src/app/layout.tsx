import { ClientShell } from "@/components/layout/ClientShell";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { COMPANY, IMAGES } from "@/utils/constants";
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
    default: `${COMPANY.shortName} | Cleaning Services London, Professional Cleaners`,
    template: `%s | ${COMPANY.shortName}`,
  },
  description: `${COMPANY.tagline} Home cleaning services, office cleaning, and deep cleaning services with insured professional cleaners across London.`,
  keywords: [
    "cleaning services London",
    "home cleaning services",
    "office cleaning",
    "deep cleaning services",
    "professional cleaners",
    "end of tenancy cleaning",
    "Airbnb cleaning",
    "GP surgery cleaning",
    "dental practice cleaning",
    "medical facility cleaning",
  ],
  openGraph: {
    title: `${COMPANY.shortName} | Cleaning Services London`,
    description: COMPANY.tagline,
    locale: "en_GB",
    type: "website",
    siteName: COMPANY.shortName,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: IMAGES.logo, type: "image/png" }],
    apple: IMAGES.logo,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning className="h-full">
      <body
        className={`${plusJakarta.variable} ${dmSerif.variable} flex min-h-full flex-col font-sans antialiased`}
      >
        <LocalBusinessJsonLd />
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
