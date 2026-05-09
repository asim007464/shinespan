import { ContactClient } from "./ContactClient";
import { COMPANY } from "@/utils/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${COMPANY.name} — phone ${COMPANY.phone}, email ${COMPANY.email}. UK cleaning enquiries.`,
};

export default function ContactPage() {
  return <ContactClient />;
}
