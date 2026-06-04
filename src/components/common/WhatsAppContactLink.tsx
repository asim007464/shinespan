"use client";

import { COMPANY } from "@/utils/constants";
import { getQuoteWhatsAppHref } from "@/utils/phoneContact";
import type { ComponentProps } from "react";

type WhatsAppContactLinkProps = ComponentProps<"a"> & {
  href?: string;
};

export function WhatsAppContactLink({
  href = getQuoteWhatsAppHref(),
  target = "_blank",
  rel = "noopener noreferrer",
  children,
  ...props
}: WhatsAppContactLinkProps) {
  return (
    <a href={href ?? COMPANY.whatsappHref} target={target} rel={rel} {...props}>
      {children}
    </a>
  );
}
