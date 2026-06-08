import { SignupClient } from "./SignupClient";
import { COMPANY } from "@/utils/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: `Create a ${COMPANY.shortName} account, demo authentication UI for future client portal.`,
};

export default function SignupPage() {
  return <SignupClient />;
}
