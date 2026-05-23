import { SERVICES_LIST, type ServiceItem } from "@/utils/constants";

export function getServiceByTitle(title: string): ServiceItem | undefined {
  return SERVICES_LIST.find((s) => s.title === title);
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES_LIST.find((s) => s.slug === slug);
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
