import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  align?: "center" | "left";
}) {
  const a = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`mb-12 max-w-3xl ${a}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-400">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}
