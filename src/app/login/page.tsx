import { LoginClient } from "./LoginClient";
import { COMPANY } from "@/utils/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: `Sign in to your ${COMPANY.shortName} client portal (demo authentication UI).`,
};

export default function LoginPage() {
  return <LoginClient />;
}
