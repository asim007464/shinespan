import { COMPANY } from "@/utils/constants";

/** Opens the user’s email app to cleaning@shinespan.co.uk with a helpful subject line. */
export function getMailtoHref(options?: {
  subject?: string;
  body?: string;
}): string {
  const params = new URLSearchParams();
  params.set("subject", options?.subject ?? "Cleaning service enquiry");
  if (options?.body?.trim()) {
    params.set("body", options.body.trim());
  }
  return `mailto:${COMPANY.email}?${params.toString()}`;
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
