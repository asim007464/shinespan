import { HomePage } from "@/views/HomePage";
import { buildPageMetadata } from "@/lib/seo";
import { COMPANY } from "@/utils/constants";

export const metadata = buildPageMetadata({
  title: "Cleaning Services London — Home & Office",
  description: `${COMPANY.tagline} Book home cleaning services, office cleaning, and deep cleaning services with professional cleaners across London.`,
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
