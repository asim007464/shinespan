import { ContactClient } from "./ContactClient";
import { buildPageMetadata } from "@/lib/seo";
import { COMPANY } from "@/utils/constants";

export const metadata = buildPageMetadata({
  title: "Contact Cleaning Services UK",
  description: `Contact ${COMPANY.name} — call ${COMPANY.phone} or email ${COMPANY.email}. Home cleaning services and office cleaning enquiries UK-wide.`,
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
