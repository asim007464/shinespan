import { COMPANY } from "@/utils/constants";

/** Opens the user’s email app to cleaning@shinespan.co.uk with a helpful subject line. */
export function getMailtoHref(options?: {
  subject?: string;
  body?: string;
}): string {
  const params = new URLSearchParams();
  params.set("subject", options?.subject ?? "Cleaning service enquiry");
  if (options?.body !== undefined) {
    params.set("body", options.body);
  } else {
    params.set("body", "Hello,\n\n");
  }
  // Use %20 instead of + so all mail clients open correctly
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${COMPANY.email}?${query}`;
}

/** Standard site-wide mailto with subject and greeting in body */
export function getStandardMailtoHref(): string {
  return getMailtoHref();
}

export function getContactFormMailto(name: string, fromEmail: string, message: string): string {
  const body = [
    `Name: ${name.trim()}`,
    `Email: ${fromEmail.trim()}`,
    "",
    message.trim(),
  ].join("\n");

  return getMailtoHref({
    subject: `Website enquiry from ${name.trim()}`,
    body,
  });
}
