import { ContactClient } from "./ContactClient";
import { buildPageMetadata } from "@/lib/seo";
import { COMPANY } from "@/utils/constants";

export const metadata = buildPageMetadata({
  title: "Contact Cleaning Services London",
  description: `Contact ${COMPANY.name}, call ${COMPANY.phone} or email ${COMPANY.email}. Home cleaning services and office cleaning enquiries across London.`,
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
