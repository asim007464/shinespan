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

export function bookingFieldErrors(data: {
  name: string;
  email: string;
  phone: string;
  address: string;
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
  if (!data.preferredTime?.trim()) errors.preferredTime = "Preferred time is required";
  if (!data.address?.trim()) errors.address = "Address is required";
  if (!data.name?.trim()) errors.name = "Name is required";
  if (!isValidEmail(data.email)) errors.email = "Valid email required";
  if (!isValidUkPhone(data.phone)) errors.phone = "Valid phone number required";
  return errors;
}

export function combinePreferredDateTime(date: string, time: string): string {
  if (!date?.trim() || !time?.trim()) return "";
  return `${date}T${time}`;
}

export { UK_PHONE_REGEX, EMAIL_REGEX };
