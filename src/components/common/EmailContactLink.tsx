"use client";

import { getStandardMailtoHref } from "@/utils/mailto";
import type { ComponentProps, MouseEvent } from "react";

type EmailContactLinkProps = ComponentProps<"a">;

export function EmailContactLink({
  href,
  onClick,
  children,
  ...props
}: EmailContactLinkProps) {
  const mailto = href ?? getStandardMailtoHref();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;

    e.preventDefault();
    window.location.href = mailto;
  }

  return (
    <a href={mailto} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
