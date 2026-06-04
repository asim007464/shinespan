"use client";

import { COMPANY } from "@/utils/constants";
import { getGmailComposeHref } from "@/utils/mailto";
import type { ComponentProps } from "react";

type EmailContactLinkProps = ComponentProps<"a">;

export function EmailContactLink({
  href,
  children,
  target = "_blank",
  rel = "noopener noreferrer",
  title = "Open Gmail with our email address filled in",
  ...props
}: EmailContactLinkProps) {
  const composeHref = href ?? getGmailComposeHref();

  return (
    <a
      href={composeHref}
      target={target}
      rel={rel}
      title={title}
      aria-label={`Email ${COMPANY.email} in Gmail`}
      {...props}
    >
      {children}
    </a>
  );
}
