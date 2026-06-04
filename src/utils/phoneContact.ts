import { COMPANY } from "@/utils/constants";

export const QUOTE_WHATSAPP_MESSAGE = `Hi, I'd like a cleaning quote from ${COMPANY.shortName}. I'm contacting you from your website, please share availability and pricing. Thank you!`;

export function getWhatsAppHref(message: string = COMPANY.whatsappMessage): string {
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function getQuoteWhatsAppHref(): string {
  return getWhatsAppHref(QUOTE_WHATSAPP_MESSAGE);
}

export function isMobileUserAgent(userAgent: string): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(
    userAgent
  );
}
