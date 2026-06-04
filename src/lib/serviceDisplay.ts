import type { ServiceItem } from "@/utils/constants";

export function getServiceCardHeading(service: ServiceItem): {
  title: string;
  subtitle?: string;
} {
  if (service.cardTitle) {
    return {
      title: service.cardTitle,
      subtitle: service.cardSubtitle,
    };
  }

  if (service.slug === "end-of-tenancy") {
    return {
      title: "End of Tenancy Cleaning",
      subtitle: "Move in / move out",
    };
  }

  return { title: service.title };
}
