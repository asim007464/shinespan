import { LoginClient } from "./LoginClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Shine & Span client portal (demo authentication UI).",
};

export default function LoginPage() {
  return <LoginClient />;
}
