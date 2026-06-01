import type { ServiceItem } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

type ServiceCardProps = {
  service: ServiceItem;
  headingLevel?: "h2" | "h3";
  priorityImage?: boolean;
};

export function ServiceCard({
  service,
  headingLevel = "h3",
  priorityImage = false,
}: ServiceCardProps) {
  const TitleTag = headingLevel;
  const bookingHref = `/booking?service=${encodeURIComponent(service.title)}`;

  return (
    <article className="service-card group flex h-full w-full flex-col rounded-xl border border-white/[0.07] bg-[#0c1528]/90">
      <Link
        href={bookingHref}
        className="relative block aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-xl"
      >
        <Image
          src={service.image}
          alt={`${service.title} — cleaning services in London`}
          fill
          loading={priorityImage ? undefined : "lazy"}
          priority={priorityImage}
          className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0c1528]/50 via-transparent to-transparent"
          aria-hidden
        />
      </Link>

      <div className="flex min-h-0 flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
        <TitleTag className="font-sans text-[1.05rem] font-semibold leading-snug tracking-tight text-white sm:text-base lg:text-lg">
          <Link href={bookingHref} className="transition-colors hover:text-ss-blue-300">
            {service.title}
          </Link>
        </TitleTag>

        <p className="mt-2.5 line-clamp-3 flex-1 text-[0.8125rem] leading-relaxed text-slate-400 sm:text-sm">
          {service.description}
        </p>

        <div className="mt-5 shrink-0 border-t border-white/[0.06] pt-5">
          <Link
            href={bookingHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-ss-blue-400/35 hover:bg-ss-blue-600/10 hover:text-white"
          >
            Book Now
            <FiArrowRight className="h-4 w-4 text-ss-blue-400 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
