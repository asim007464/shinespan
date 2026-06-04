"use client";

import { contactBtnEmail, contactBtnPhone, contactBtnWhatsApp } from "@/components/common/contactButtonStyles";
import { EmailContactLink } from "@/components/common/EmailContactLink";
import { PhoneContactLink } from "@/components/common/PhoneContactLink";
import { WhatsAppContactLink } from "@/components/common/WhatsAppContactLink";
import { COMPANY } from "@/utils/constants";
import { FaWhatsapp } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import type { ComponentProps } from "react";

function mergeClass(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

type ActionProps = Omit<ComponentProps<"a">, "href"> & {
  className?: string;
};

export function ContactPhoneButton({ className, children, ...props }: ActionProps) {
  return (
    <PhoneContactLink className={mergeClass(contactBtnPhone, className)} {...props}>
      <FiPhone className="h-4 w-4 shrink-0 text-ss-blue-600" aria-hidden />
      {children ?? COMPANY.phone}
    </PhoneContactLink>
  );
}

export function ContactEmailButton({ className, children, ...props }: ActionProps) {
  return (
    <EmailContactLink className={mergeClass(contactBtnEmail, className)} {...props}>
      <FiMail className="h-4 w-4 shrink-0 text-ss-blue-600" aria-hidden />
      {children ?? COMPANY.email}
    </EmailContactLink>
  );
}

export function ContactWhatsAppButton({ className, children, ...props }: ActionProps) {
  return (
    <WhatsAppContactLink className={mergeClass(contactBtnWhatsApp, className)} {...props}>
      <FaWhatsapp className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
      {children ?? "WhatsApp"}
    </WhatsAppContactLink>
  );
}
