import { HomePage } from "@/views/HomePage";
import { COMPANY } from "@/utils/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Cleaning Services UK",
  description: `${COMPANY.tagline} Book house, office, Airbnb & commercial cleans.`,
};

export default function Page() {
  return <HomePage />;
}
