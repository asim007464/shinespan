import Link from "next/link";
import type { ComponentProps } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ss-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-gradient-to-r from-ss-blue-700 to-ss-blue-500 text-white shadow-lg shadow-ss-blue-600/20 hover:shadow-xl hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-slate-200 bg-white text-ss-blue-800 shadow-sm hover:border-ss-blue-300 hover:bg-ss-blue-50",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-ss-blue-800",
} as const;

type Variant = keyof typeof variants;

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  href?: string;
};

export function Button({
  className = "",
  variant = "primary",
  href,
  children,
  ...rest
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
