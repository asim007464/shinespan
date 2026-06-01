import { SERVICES_LIST, type ServiceItem } from "@/utils/constants";

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
