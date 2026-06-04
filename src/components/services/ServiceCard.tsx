import { getServiceCardHeading } from "@/lib/serviceDisplay";
import type { ServiceItem } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FiBriefcase,
  FiHome,
  FiKey,
  FiLayers,
  FiMaximize2,
  FiPackage,
} from "react-icons/fi";
import { MdLocalHospital, MdMedicalServices } from "react-icons/md";

type ServiceCardProps = {
  service: ServiceItem;
  headingLevel?: "h2" | "h3";
  priorityImage?: boolean;
};

const serviceIcons: Record<string, IconType> = {
  "gp-surgery-medical-cleaning": MdLocalHospital,
  "dental-practice-cleaning": MdMedicalServices,
  "regular-cleaning": FiHome,
  "deep-cleaning": FiLayers,
  "end-of-tenancy": FiPackage,
  "airbnb-cleaning": FiKey,
  "office-cleaning": FiBriefcase,
  "carpet-cleaning": FiLayers,
  "window-cleaning": FiMaximize2,
};

const cardBlue = "#4A90E2";

export function ServiceCard({
  service,
  headingLevel = "h3",
  priorityImage = false,
}: ServiceCardProps) {
  const TitleTag = headingLevel;
  const bookingHref = `/booking?service=${encodeURIComponent(service.title)}`;
  const { title, subtitle } = getServiceCardHeading(service);
  const highlights = service.details.slice(0, 3);
  const Icon = serviceIcons[service.slug] ?? FiHome;

  return (
    <article className="service-card flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_2px_16px_rgba(15,23,42,0.06)]">
      <Link
        href={bookingHref}
        className="relative block aspect-[5/4] w-full shrink-0 overflow-hidden bg-slate-100"
      >
        <Image
          src={service.image}
          alt={`${title}, cleaning services in London`}
          fill
          loading={priorityImage ? undefined : "lazy"}
          priority={priorityImage}
          className="object-cover"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <span
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-white shadow-sm"
          style={{ backgroundColor: cardBlue }}
          aria-hidden
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.25} />
        </span>
      </Link>

      <div className="flex min-h-0 flex-1 flex-col p-6">
        <div>
          <TitleTag className="font-sans text-xl font-bold leading-snug text-slate-900">
            <Link href={bookingHref} className="line-clamp-2 text-slate-900 hover:text-slate-900">
              {title}
            </Link>
          </TitleTag>
          {subtitle ? (
            <p className="mt-0.5 font-sans text-sm font-medium leading-snug text-slate-500">
              {subtitle}
            </p>
          ) : null}
        </div>

        <p className="mt-1.5 min-h-[4.5rem] line-clamp-3 font-sans text-sm leading-relaxed text-slate-500">
          {service.description}
        </p>

        <ul
          className="mt-4 min-h-[4.75rem] space-y-2.5"
          aria-label="What's included"
        >
          {highlights.map((item) => (
            <li
              key={item}
              className="flex min-w-0 items-center gap-2.5 font-sans text-sm leading-none text-slate-500"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: cardBlue }}
                aria-hidden
              />
              <span className="min-w-0 truncate whitespace-nowrap">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto shrink-0 pt-6">
          <Link
            href={bookingHref}
            className="inline-flex items-center justify-center rounded-lg px-6 py-2.5 font-sans text-sm font-bold text-white transition hover:opacity-95"
            style={{ backgroundColor: cardBlue }}
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
