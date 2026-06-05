import { SERVICES_LIST, type ServiceItem } from "@/utils/constants";

export type ServiceCategory = "domestic" | "commercial";

const DOMESTIC_SERVICE_SLUGS = [
  "regular-cleaning",
  "deep-cleaning",
  "carpet-cleaning",
  "window-cleaning",
  "end-of-tenancy",
] as const;

const COMMERCIAL_SERVICE_SLUGS = [
  "gp-surgery-medical-cleaning",
  "dental-practice-cleaning",
  "regular-cleaning",
  "office-cleaning",
  "carpet-cleaning",
  "window-cleaning",
  "airbnb-cleaning",
] as const;

function servicesInSlugOrder(slugs: readonly string[]): ServiceItem[] {
  return slugs
    .map((slug) => SERVICES_LIST.find((s) => s.slug === slug))
    .filter((s): s is ServiceItem => !!s);
}

export function parseServiceCategory(
  value: string | string[] | undefined
): ServiceCategory | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "domestic" || raw === "commercial") return raw;
  return undefined;
}

export function getServicesForCategory(category?: ServiceCategory): ServiceItem[] {
  if (category === "domestic") return servicesInSlugOrder(DOMESTIC_SERVICE_SLUGS);
  if (category === "commercial") return servicesInSlugOrder(COMMERCIAL_SERVICE_SLUGS);
  return [...SERVICES_LIST];
}

const SERVICE_TITLE_ALIASES: Record<string, string> = {
  "House Cleaning": "Regular Cleaning",
  "End of Tenancy Cleaning": "End of Tenancy Cleaning (Move In / Move Out Cleaning)",
  "Move In / Move Out Cleaning": "End of Tenancy Cleaning (Move In / Move Out Cleaning)",
};

export function getServiceByTitle(title: string): ServiceItem | undefined {
  const resolved = SERVICE_TITLE_ALIASES[title] ?? title;
  return SERVICES_LIST.find((s) => s.title === resolved);
}

const SERVICE_SLUG_ALIASES: Record<string, string> = {
  "house-cleaning": "regular-cleaning",
  "move-in-out": "end-of-tenancy",
};

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  const resolved = SERVICE_SLUG_ALIASES[slug] ?? slug;
  return SERVICES_LIST.find((s) => s.slug === resolved);
}

export function searchServices(query: string): ServiceItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return [...SERVICES_LIST];
  return SERVICES_LIST.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.slug.includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.seoDescription.toLowerCase().includes(q) ||
      s.details.some((d) => d.toLowerCase().includes(q))
  );
}

export function formatServiceList(limit = 8): string {
  return SERVICES_LIST.slice(0, limit)
    .map((s) => `• ${s.title}`)
    .join("\n");
}
