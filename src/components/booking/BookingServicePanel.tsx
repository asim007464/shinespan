import { EmailContactLink } from "@/components/common/EmailContactLink";
import { PhoneContactLink } from "@/components/common/PhoneContactLink";
import type { ServiceItem } from "@/utils/constants";
import { COMPANY } from "@/utils/constants";
import reviewsData from "@/data/reviews.json";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { FiCheck, FiMail, FiPhone, FiStar } from "react-icons/fi";

const panelActionBtn =
  "inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10";

type Props = {
  service: ServiceItem;
};

const panelReviews = reviewsData.filter((r) => r.published !== false).slice(0, 3);

export function BookingServicePanel({ service }: Props) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-ss-blue-900/50">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ss-blue-950/90 via-ss-blue-950/20 to-transparent" />
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ss-blue-400">
            {COMPANY.shortName} · {COMPANY.region}
          </p>
          <h1 className="mt-2 font-display text-2xl leading-tight text-white sm:text-3xl">
            {service.title} in London
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-slate-300">{service.description}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">{service.seoDescription}</p>

          <p className="mt-5 text-sm leading-relaxed text-slate-300">
            Need a quote or ready to book? Call us at{" "}
            <PhoneContactLink className="font-semibold text-ss-blue-300 hover:text-white">
              {COMPANY.phone}
            </PhoneContactLink>{" "}
            or{" "}
            <EmailContactLink className="font-semibold text-ss-blue-300 hover:text-white">
              email {COMPANY.email}
            </EmailContactLink>
            .
          </p>

          <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-ss-blue-300">
            What&apos;s included
          </h2>
          <ul className="mt-3 space-y-2.5">
            {service.details.map((d) => (
              <li key={d} className="flex gap-2.5 text-sm text-slate-300">
                <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-ss-blue-400" aria-hidden />
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={COMPANY.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${panelActionBtn} border-emerald-500/25 hover:border-emerald-400/40 hover:bg-emerald-600/10`}
            >
              <FaWhatsapp className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
              WhatsApp
            </a>
            <PhoneContactLink className={panelActionBtn}>
              <FiPhone className="h-4 w-4 shrink-0 text-ss-blue-400" aria-hidden />
              Call now
            </PhoneContactLink>
            <EmailContactLink className={panelActionBtn}>
              <FiMail className="h-4 w-4 shrink-0 text-ss-blue-400" aria-hidden />
              {COMPANY.email}
            </EmailContactLink>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg text-white">Client testimonials</h2>
        <ul className="mt-4 space-y-4">
          {panelReviews.map((r) => (
            <li
              key={r.id}
              className="rounded-2xl border border-white/10 bg-ss-blue-900/40 p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-white">{r.customerName}</p>
                <span className="flex items-center gap-0.5 text-amber-400" aria-label={`${r.rating} stars`}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <FiStar key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{r.comment}</p>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        <Link href="/services" className="text-ss-blue-400 hover:text-ss-blue-300">
          View all cleaning services
        </Link>
      </p>
    </aside>
  );
}
