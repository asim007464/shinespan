"use client";

import { COMPANY } from "@/utils/constants";
import { isMobileUserAgent } from "@/utils/phoneContact";
import type { ComponentProps, MouseEvent } from "react";

type PhoneContactLinkProps = ComponentProps<"a">;

export function PhoneContactLink({ href, onClick, children, ...props }: PhoneContactLinkProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (typeof navigator !== "undefined" && !isMobileUserAgent(navigator.userAgent)) {
      e.preventDefault();
    }
  }

  return (
    <a
      href={href ?? COMPANY.phoneHref}
      onClick={handleClick}
      title={`Call ${COMPANY.phone} (mobile). On desktop, use WhatsApp.`}
      aria-label={`Call ${COMPANY.phone}`}
      {...props}
    >
      {children}
    </a>
  );
}
