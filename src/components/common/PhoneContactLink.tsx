"use client";

import { COMPANY } from "@/utils/constants";
import { getQuoteWhatsAppHref, isMobileUserAgent } from "@/utils/phoneContact";
import type { ComponentProps } from "react";

type PhoneContactLinkProps = ComponentProps<"a"> & {
  /** WhatsApp URL used on desktop/tablet; defaults to quote message */
  whatsappHref?: string;
};

export function PhoneContactLink({
  whatsappHref = getQuoteWhatsAppHref(),
  href,
  onClick,
  children,
  ...props
}: PhoneContactLinkProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (typeof navigator !== "undefined" && !isMobileUserAgent(navigator.userAgent)) {
      e.preventDefault();
      window.open(whatsappHref, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <a href={href ?? COMPANY.phoneHref} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
