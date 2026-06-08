import { COMPANY } from "@/utils/constants";
import type { Metadata } from "next";

const SITE_URL = "https://opalshine.co.uk";

export function buildPageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path || "/" },
    openGraph: {
      title: `${title} | ${COMPANY.shortName}`,
      description,
      url,
      locale: "en_GB",
      type: "website",
      siteName: COMPANY.shortName,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${COMPANY.shortName}`,
      description,
    },
  };
}

export { SITE_URL };
