import { SITE_URL } from "@/lib/seo";
import { COMPANY, SERVICES_LIST } from "@/utils/constants";

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY.name,
    description: COMPANY.tagline,
    url: SITE_URL,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    areaServed: { "@type": "Country", name: "United Kingdom" },
    priceRange: "££",
    image: `${SITE_URL}/window.svg`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning Services",
      itemListElement: SERVICES_LIST.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.seoDescription,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
