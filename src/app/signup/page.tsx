import { SignupClient } from "./SignupClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a Shine & Span account, demo authentication UI for future client portal.",
};

export default function SignupPage() {
  return <SignupClient />;
}
