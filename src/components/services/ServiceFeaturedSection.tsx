import type { ServiceFeaturedTheme, ServiceItem } from "@/utils/constants";
import { COMPANY } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import {
  FiActivity,
  FiArrowRight,
  FiAward,
  FiHome,
  FiShield,
  FiUserCheck,
} from "react-icons/fi";
import { MdLocalHospital, MdMedicalServices, MdWaterDrop } from "react-icons/md";

const focusIcons = [FiActivity, FiHome, MdWaterDrop] as const;
const trustIcons = [FiAward, FiShield, FiUserCheck, FiShield] as const;

const themeStyles: Record<
  ServiceFeaturedTheme,
  {
    gradient: string;
    border: string;
    badge: string;
    tagline: string;
    chip: string;
    chipText: string;
    iconBg: string;
    iconText: string;
    sectionLabel: string;
    pill: string;
    pillText: string;
    trustBg: string;
    cta: string;
  }
> = {
  medical: {
    gradient: "bg-gradient-to-br from-white via-ss-blue-50/40 to-ss-blue-100/50",
    border: "border-ss-blue-200/80",
    badge: "bg-ss-blue-600 text-white",
    tagline: "text-ss-blue-700",
    chip: "border-ss-blue-200 bg-white/80",
    chipText: "text-ss-blue-800",
    iconBg: "bg-ss-blue-100",
    iconText: "text-ss-blue-700",
    sectionLabel: "text-ss-blue-600",
    pill: "bg-ss-blue-50",
    pillText: "text-ss-blue-900",
    trustBg: "bg-white/70 border-ss-blue-100",
    cta: "from-ss-blue-700 to-ss-blue-500",
  },
  dental: {
    gradient: "bg-gradient-to-br from-white via-teal-50/50 to-cyan-50/60",
    border: "border-teal-200/80",
    badge: "bg-teal-700 text-white",
    tagline: "text-teal-800",
    chip: "border-teal-200 bg-white/80",
    chipText: "text-teal-900",
    iconBg: "bg-teal-100",
    iconText: "text-teal-800",
    sectionLabel: "text-teal-700",
    pill: "bg-teal-50",
    pillText: "text-teal-900",
    trustBg: "bg-white/70 border-teal-100",
    cta: "from-teal-700 to-teal-500",
  },
};

type Props = {
  service: ServiceItem;
  compact?: boolean;
};

export function ServiceFeaturedSection({ service, compact = false }: Props) {
  const featured = service.featured;
  if (!featured) return null;

  const styles = themeStyles[featured.theme];
  const bookingHref = `/booking?service=${encodeURIComponent(service.title)}`;
  const ThemeIcon = featured.theme === "dental" ? MdMedicalServices : MdLocalHospital;

  if (compact) {
    return (
      <div className="space-y-4 text-sm">
        <p className={`font-display text-lg ${styles.tagline}`}>{featured.tagline}</p>
        {featured.subtitle ? (
          <p className="font-medium text-slate-700">{featured.subtitle}</p>
        ) : null}
        <p className="leading-relaxed text-slate-500">{featured.intro}</p>
        <ul className="space-y-2 text-slate-500">
          {featured.focusAreas.map((area) => (
            <li key={area.title}>
              <span className="font-medium text-slate-700">{area.title}</span>
              <span className="text-slate-500"> — {area.description}</span>
            </li>
          ))}
        </ul>
        {featured.trustBadges && featured.trustBadges.length > 0 && (
          <p className="text-slate-500">
            {featured.trustBadges.map((b) => b.title).join(" · ")}
          </p>
        )}
        {featured.servingTitle && featured.servingItems && (
          <>
            <p className={`text-xs font-semibold uppercase tracking-wider ${styles.sectionLabel}`}>
              {featured.servingTitle}
            </p>
            <p className="text-slate-500">{featured.servingItems.join(" · ")}</p>
          </>
        )}
      </div>
    );
  }

  return (
    <article
      className={`overflow-hidden rounded-3xl border shadow-sm lg:shadow-md ${styles.border} ${styles.gradient}`}
    >
      <div className="grid gap-0 lg:grid-cols-[1fr_minmax(280px,38%)]">
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
            >
              <ThemeIcon className="h-3.5 w-3.5" aria-hidden />
              {featured.badgeLabel}
            </span>
            {featured.values.map((v) => (
              <span
                key={v}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${styles.chip} ${styles.chipText}`}
              >
                {v}
              </span>
            ))}
          </div>

          <p className={`mt-5 font-display text-xl sm:text-2xl ${styles.tagline}`}>
            {featured.tagline}
          </p>
          {featured.subtitle ? (
            <p className="mt-2 text-sm font-medium text-slate-700 sm:text-base">
              {featured.subtitle}
            </p>
          ) : null}

          <h2 className="mt-6 font-display text-2xl leading-tight text-slate-900 sm:text-3xl">
            {featured.headline}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {featured.intro}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {featured.focusAreas.map((area, i) => {
              const Icon = focusIcons[i] ?? FiShield;
              return (
                <div
                  key={area.title}
                  className="rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm"
                >
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${styles.iconBg} ${styles.iconText}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold leading-snug text-slate-900">
                    {area.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>

          {featured.trustBadges && featured.trustBadges.length > 0 && (
            <div className={`mt-8 rounded-2xl border p-5 ${styles.trustBg}`}>
              <h3 className={`text-xs font-semibold uppercase tracking-[0.2em] ${styles.sectionLabel}`}>
                Trust &amp; standards
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {featured.trustBadges.map((badge, i) => {
                  const Icon = trustIcons[i] ?? FiShield;
                  return (
                    <li
                      key={badge.title}
                      className="flex items-center gap-3 rounded-xl bg-white/90 px-3 py-3 shadow-sm"
                    >
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${styles.iconBg} ${styles.iconText}`}
                      >
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="text-sm font-semibold text-slate-800">{badge.title}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {featured.servingTitle && featured.servingItems && featured.servingItems.length > 0 && (
            <div className={`mt-8 rounded-2xl border p-5 ${styles.trustBg}`}>
              <h3 className={`text-xs font-semibold uppercase tracking-[0.2em] ${styles.sectionLabel}`}>
                {featured.servingTitle}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {featured.servingItems.map((item) => (
                  <li
                    key={item}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium ${styles.pill} ${styles.pillText}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={bookingHref}
              className={`inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-95 ${styles.cta}`}
            >
              {featured.bookLabel}
              <FiArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className={`inline-flex rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition ${
                featured.theme === "dental"
                  ? "hover:border-teal-300 hover:bg-teal-50"
                  : "hover:border-ss-blue-300 hover:bg-ss-blue-50"
              }`}
            >
              Contact us
            </Link>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            {COMPANY.email} · {COMPANY.phone} · shinespan.co.uk
          </p>
        </div>

        {featured.promoImage && (
          <div className="relative hidden min-h-[280px] border-t border-slate-200/60 lg:block lg:min-h-0 lg:border-l lg:border-t-0">
            <Image
              src={featured.promoImage}
              alt={featured.imageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 0vw, 38vw"
              priority={featured.theme === "dental"}
            />
          </div>
        )}
      </div>

      {featured.promoImage && (
        <div className="relative aspect-video w-full border-t border-slate-200/60 lg:hidden">
          <Image
            src={featured.promoImage}
            alt={featured.imageAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={featured.theme === "dental"}
          />
        </div>
      )}
    </article>
  );
}
