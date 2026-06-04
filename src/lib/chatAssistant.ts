import { formatServiceList, getServiceByTitle, searchServices } from "@/lib/services";
import { SERVICES_LIST } from "@/utils/constants";

export type ChatReply = {
  text: string;
  suggestBooking?: boolean;
};

export function getAssistantReply(input: string, cleaningType?: string): ChatReply {
  const lower = input.toLowerCase().trim();

  if (
    lower.includes("help me choose") ||
    lower.includes("which service") ||
    lower.includes("not sure") ||
    lower.includes("recommend")
  ) {
    return {
      text:
        "Happy to help you choose:\n\n• Regular upkeep → Regular Cleaning\n• Moving or inventory → End of Tenancy (Move In / Move Out)\n• Workplace → Office Cleaning\n• GP surgery or clinic → GP Surgery & Other Medical Services\n• Dental surgery → Dental Practices\n• Short lets → Airbnb Cleaning\n• One-off refresh → Deep Cleaning\n\nTell me your property type (home, office, medical, dental, rental) and I will narrow it down.",
    };
  }

  if (
    lower.includes("list") &&
    (lower.includes("service") || lower.includes("offer") || lower.includes("what do you"))
  ) {
    return {
      text: `Our cleaning services in London:\n\n${formatServiceList()}\n\nAsk about any service by name for full details, or tap Book Now to reserve a slot.`,
      suggestBooking: true,
    };
  }

  if (lower.includes("search") || lower.includes("find")) {
    const term = lower.replace(/search|find|for|service|cleaning/gi, "").trim() || input;
    const hits = searchServices(term);
    if (hits.length === 0) {
      return {
        text: `No exact match for "${input.trim()}". Try: house, deep, office, medical, GP, tenancy, carpet, or window.`,
      };
    }
    if (hits.length === 1) {
      return { text: formatServiceDetail(hits[0]!.title), suggestBooking: true };
    }
    return {
      text: `Found ${hits.length} services:\n${hits.map((s) => `• ${s.title}`).join("\n")}\n\nReply with a service name for details.`,
    };
  }

  const matched = SERVICES_LIST.find(
    (s) =>
      lower.includes(s.slug.replace(/-/g, " ")) ||
      lower.includes(s.title.toLowerCase()) ||
      (s.title === "Regular Cleaning" && (lower.includes("home") || lower.includes("house") || lower.includes("regular"))) ||
      (s.title === "Deep Cleaning" && lower.includes("deep")) ||
      (s.title === "Office Cleaning" && lower.includes("office")) ||
      (s.title === "Dental Practices" &&
        (lower.includes("dental") ||
          lower.includes("dentist") ||
          lower.includes("orthodont"))) ||
      (s.title.startsWith("GP Surgery") &&
        (lower.includes("gp") ||
          lower.includes("surgery") ||
          lower.includes("medical") ||
          lower.includes("clinic") ||
          lower.includes("cqc"))) ||
      (s.title.startsWith("End of Tenancy Cleaning") &&
        (lower.includes("tenancy") || lower.includes("move out") || lower.includes("move in")))
  );

  if (matched) {
    return { text: formatServiceDetail(matched.title), suggestBooking: true };
  }

  if (cleaningType) {
    const prior = getServiceByTitle(cleaningType);
    if (prior && (lower.includes("detail") || lower.includes("more") || lower.includes("include"))) {
      return { text: formatServiceDetail(prior.title), suggestBooking: true };
    }
  }

  if (lower.includes("budget") || lower.includes("price") || lower.includes("cost")) {
    return {
      text: "Pricing depends on property size, frequency, and service level. Share your postcode and preferred service, we will quote clearly before you book.",
    };
  }

  if (
    lower.includes("book") ||
    lower.includes("appointment") ||
    lower.includes("schedule")
  ) {
    return {
      text: "Use Book Now on our site, one simple form with your address, service, and preferred date & time. We confirm by phone or email.",
      suggestBooking: true,
    };
  }

  if (
    lower.match(/\b([a-z]{1,2}\d[\da-z]?\s*\d[a-z]{2})\b/i) ||
    lower.includes("london") ||
    lower.includes("manchester") ||
    lower.includes("bristol")
  ) {
    return {
      text: "Location noted. We serve clients across London, confirm your postcode at booking. Ready to Book Now?",
      suggestBooking: true,
    };
  }

  if (lower.includes("202") || lower.includes("monday") || lower.includes("tuesday") || lower.includes("date")) {
    return {
      text: "Date preference saved. Complete your booking with date & time on the Book Now form, or tell me your service first.",
      suggestBooking: true,
    };
  }

  if (
    lower.includes("clean") ||
    lower.includes("tenancy") ||
    lower.includes("airbnb") ||
    lower.includes("office") ||
    lower.includes("carpet") ||
    lower.includes("window")
  ) {
    const hits = searchServices(input);
    if (hits.length === 1) {
      return { text: formatServiceDetail(hits[0]!.title), suggestBooking: true };
    }
    return {
      text: `Noted. We offer professional cleaners for homes and businesses. ${hits.length > 0 ? `Did you mean: ${hits.map((s) => s.title).join(", ")}?` : "Type a service name or say 'list services'."}`,
    };
  }

  return {
    text: "I can search our cleaning services, explain each option, and guide you to the right bookable service. Try: 'list services', 'deep cleaning details', or 'help me choose'.",
  };
}

function formatServiceDetail(title: string): string {
  const s = getServiceByTitle(title);
  if (!s) return "Service not found.";
  if (s.featured) {
    const f = s.featured;
    const trust = f.trustBadges?.map((b) => b.title).join(", ");
    const serving =
      f.servingTitle && f.servingItems
        ? `\n\n${f.servingTitle}: ${f.servingItems.join(", ")}`
        : "";
    const trustLine = trust ? `\n\n${trust}` : "";
    return `${f.tagline}\n\n${f.subtitle}\n\n${f.headline}\n${f.intro}\n\n${f.focusAreas.map((a) => `• ${a.title}`).join("\n")}${trustLine}${serving}\n\nReady? Tap Book Now to submit your request.`;
  }
  return `${s.title}\n\n${s.seoDescription}\n\nIncludes:\n${s.details.map((d) => `• ${d}`).join("\n")}\n\nReady? Tap Book Now to submit your request.`;
}
