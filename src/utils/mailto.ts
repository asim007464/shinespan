import { COMPANY } from "@/utils/constants";

const DEFAULT_SUBJECT = "Cleaning service enquiry";
const DEFAULT_BODY = "Hello,\n\n";

function resolveEmailContent(options?: { subject?: string; body?: string }) {
  return {
    subject: options?.subject ?? DEFAULT_SUBJECT,
    body: options?.body ?? DEFAULT_BODY,
  };
}

/** Opens Gmail compose with To, subject, and greeting already filled in. */
export function getGmailComposeHref(options?: {
  subject?: string;
  body?: string;
}): string {
  const { subject, body } = resolveEmailContent(options);
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: COMPANY.email,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/** mailto fallback (other email apps) */
export function getMailtoHref(options?: { subject?: string; body?: string }): string {
  const { subject, body } = resolveEmailContent(options);
  const params = new URLSearchParams();
  params.set("subject", subject);
  params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${COMPANY.email}?${query}`;
}

/** Primary email link target for the site */
export function getStandardMailtoHref(): string {
  return getGmailComposeHref();
}

export function getContactFormMailto(
  firstName: string,
  lastName: string,
  fromEmail: string,
  phone: string,
  message: string,
): string {
  const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
  const body = [
    `First name: ${firstName.trim()}`,
    `Last name: ${lastName.trim()}`,
    `Email: ${fromEmail.trim()}`,
    `Phone: ${phone.trim()}`,
    "",
    message.trim(),
  ].join("\n");

  return getGmailComposeHref({
    subject: `Website enquiry from ${fullName}`,
    body,
  });
}
