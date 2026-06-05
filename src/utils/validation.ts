const UK_PHONE_REGEX = /^(\+44|0)[1-9]\d{9,10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeUkPhone(input: string): string {
  const digits = input.replace(/\s/g, "");
  return digits.startsWith("+44") ? digits : digits.replace(/^0/, "+44");
}

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

export function isValidUkPhone(value: string): boolean {
  const compact = value.replace(/\s/g, "");
  if (compact.startsWith("+44")) {
    return /^\+44[1-9]\d{9,10}$/.test(compact);
  }
  return /^0[1-9]\d{9,10}$/.test(compact);
}

export type UkAddressFields = {
  addressLine1: string;
  addressLine2: string;
  townCity: string;
  county: string;
  postcode: string;
};

export function isValidUkPostcode(value: string): boolean {
  const normalized = value.trim().toUpperCase().replace(/\s+/g, " ");
  return /^[A-Z]{1,2}\d[A-Z\d]?\s\d[A-Z]{2}$/.test(normalized);
}

export function formatUkAddress(fields: UkAddressFields): string {
  const postcode = fields.postcode.trim().toUpperCase().replace(/\s+/g, " ");
  const parts = [
    fields.addressLine1.trim(),
    fields.addressLine2.trim(),
    fields.townCity.trim(),
    fields.county.trim(),
    postcode,
  ].filter(Boolean);
  return parts.join(", ");
}

export function ukAddressFieldErrors(fields: UkAddressFields): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!fields.addressLine1.trim()) errors.addressLine1 = "Address line 1 is required";
  if (!fields.townCity.trim()) errors.townCity = "Town or city is required";
  if (!fields.postcode.trim()) {
    errors.postcode = "Postcode is required";
  } else if (!isValidUkPostcode(fields.postcode)) {
    errors.postcode = "Enter a valid UK postcode";
  }
  return errors;
}

export function bookingFieldErrors(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  townCity: string;
  county: string;
  postcode: string;
  service: string;
  serviceType: string;
  roomCount: string;
  preferredDate: string;
  preferredTime: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.service?.trim()) errors.service = "Choose a service";
  if (!data.serviceType?.trim()) errors.serviceType = "Choose type of service";
  if (!data.roomCount?.trim()) errors.roomCount = "Number of rooms is required";
  if (!data.preferredDate?.trim()) errors.preferredDate = "Preferred date is required";
  if (!data.preferredTime?.trim()) {
    errors.preferredTime = "Preferred arrival time is required";
  } else if (!isWithinBookingArrivalHours(data.preferredTime)) {
    errors.preferredTime = "Choose a time between 8am and 8pm";
  }
  if (!data.firstName?.trim()) errors.firstName = "First name is required";
  if (!data.lastName?.trim()) errors.lastName = "Last name is required";
  if (!isValidEmail(data.email)) errors.email = "Valid email required";
  if (!isValidUkPhone(data.phone)) errors.phone = "Valid phone number required";
  return { ...errors, ...ukAddressFieldErrors(data) };
}

export const BOOKING_ARRIVAL_TIME_MIN = "08:00";
export const BOOKING_ARRIVAL_TIME_MAX = "20:00";

export function isWithinBookingArrivalHours(time: string): boolean {
  const match = /^(\d{2}):(\d{2})$/.exec(time.trim());
  if (!match) return false;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return false;

  const totalMinutes = hours * 60 + minutes;
  const minMinutes = 8 * 60;
  const maxMinutes = 20 * 60;
  return totalMinutes >= minMinutes && totalMinutes <= maxMinutes;
}

export function combinePreferredDateTime(date: string, time: string): string {
  if (!date?.trim() || !time?.trim()) return "";
  return `${date}T${time}`;
}

export { UK_PHONE_REGEX, EMAIL_REGEX };
