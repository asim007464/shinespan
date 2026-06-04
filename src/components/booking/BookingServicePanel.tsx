import {
  ContactEmailButton,
  ContactPhoneButton,
  ContactWhatsAppButton,
} from "@/components/common/ContactActionButtons";
import { EmailContactLink } from "@/components/common/EmailContactLink";
import { PhoneContactLink } from "@/components/common/PhoneContactLink";
import { ServiceFeaturedSection } from "@/components/services/ServiceFeaturedSection";
import type { ServiceItem } from "@/utils/constants";
import { COMPANY } from "@/utils/constants";
import reviewsData from "@/data/reviews.json";
import Image from "next/image";
import Link from "next/link";
import { FiCheck, FiStar } from "react-icons/fi";

type Props = {
  service: ServiceItem;
};

const panelReviews = reviewsData.filter((r) => r.published !== false).slice(0, 3);

export function BookingServicePanel({ service }: Props) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="ss-card overflow-hidden rounded-[2rem]">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ss-blue-600">
            {COMPANY.shortName} · {COMPANY.region}
          </p>
          <h1 className="mt-2 font-display text-2xl leading-tight text-slate-900 sm:text-3xl">
            {service.title} in London
          </h1>

          {service.featured ? (
            <div className="mt-4">
              <ServiceFeaturedSection service={service} compact />
            </div>
          ) : (
            <>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{service.description}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{service.seoDescription}</p>
            </>
          )}

          <p className="mt-5 text-sm leading-relaxed text-slate-400">
            Need a quote or ready to book? Call us at{" "}
            <PhoneContactLink className="font-semibold text-ss-blue-600 hover:text-ss-blue-700">
              {COMPANY.phone}
            </PhoneContactLink>{" "}
            or{" "}
            <EmailContactLink className="font-semibold text-ss-blue-600 hover:text-ss-blue-700">
              email {COMPANY.email}
            </EmailContactLink>
            .
          </p>

          <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-ss-blue-600">
            What&apos;s included
          </h2>
          <ul className="mt-3 space-y-2.5">
            {service.details.map((d) => (
              <li key={d} className="flex gap-2.5 text-sm text-slate-400">
                <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-ss-blue-600" aria-hidden />
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <ContactWhatsAppButton />
            <ContactPhoneButton>Call now</ContactPhoneButton>
            <ContactEmailButton />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg text-slate-900">Client testimonials</h2>
        <ul className="mt-4 space-y-4">
          {panelReviews.map((r) => (
            <li key={r.id} className="ss-card rounded-2xl p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900">{r.customerName}</p>
                <span className="flex items-center gap-0.5 text-amber-500" aria-label={`${r.rating} stars`}>
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
        <Link href="/services" className="text-ss-blue-600 hover:text-ss-blue-700">
          View all cleaning services
        </Link>
      </p>
    </aside>
  );
}
