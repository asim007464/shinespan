/** Type of service (frequency / scope), booking form dropdown */
export const BOOKING_SERVICE_TYPES = [
  "One-off cleaning",
  "Weekly cleaning",
  "Fortnightly cleaning",
  "Monthly cleaning",
  "Deep clean (one-off)",
  "End of tenancy",
  "Move in / move out",
  "Airbnb turnover",
  "Office, daily",
  "Office, weekly",
  "Not sure, contact us for a quote",
] as const;

/** Optional add-on checkboxes, booking form */
export const BOOKING_ADDITIONAL_SERVICES = [
  "Inside Cabinets",
  "Interior Windows",
  "Wet Wipe Window Blinds",
  "Inside Fridge",
  "Inside Oven",
  "Organization",
  "Laundry & Folding",
  "Dishes",
  "Dishwasher Cleaning",
  "Washing Machine Cleaning",
  "Microwave Cleaning",
  "Carpet Cleaning",
] as const;

export type BookingServiceType = (typeof BOOKING_SERVICE_TYPES)[number];
export type BookingAdditionalService = (typeof BOOKING_ADDITIONAL_SERVICES)[number];

export function buildBookingMessage(fields: {
  serviceType: string;
  roomCount: string;
  bathroomCount?: string;
  additionalServices: string[];
  additionalServicesNotes: string;
  jobNotes: string;
  attachmentNames: string[];
  legacyMessage?: string;
}): string {
  const lines: string[] = [];
  lines.push(`Type of service: ${fields.serviceType}`);
  lines.push(`Number of rooms: ${fields.roomCount}`);
  if (fields.bathroomCount?.trim()) {
    lines.push(`Number of bathrooms: ${fields.bathroomCount.trim()}`);
  }
  if (fields.additionalServices.length > 0) {
    lines.push(`Additional services: ${fields.additionalServices.join(", ")}`);
  }
  if (fields.additionalServicesNotes.trim()) {
    lines.push(`Additional services notes: ${fields.additionalServicesNotes.trim()}`);
  }
  if (fields.jobNotes.trim()) {
    lines.push(`Key information & job notes: ${fields.jobNotes.trim()}`);
  }
  if (fields.attachmentNames.length > 0) {
    lines.push(`Photos shared: ${fields.attachmentNames.join(", ")}`);
  }
  if (fields.legacyMessage?.trim()) {
    lines.push(fields.legacyMessage.trim());
  }
  return lines.join("\n");
}
