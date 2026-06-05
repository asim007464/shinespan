import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Container } from "@/components/ui/Container";
import { buildPageMetadata } from "@/lib/seo";
import { SERVICES_LIST } from "@/utils/constants";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: "Cleaning Services London",
  description:
    "Home cleaning services, office cleaning, GP surgery, dental practice and medical facility cleaning, deep cleaning, end of tenancy, Airbnb, carpet and window cleans, professional cleaners across London.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <section className="page-section pb-24 pt-16 sm:pt-20">
      <Container>
        <ScrollReveal className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-600">
            Services
          </p>
          <h1 className="mt-3 font-display text-4xl text-slate-900 md:text-6xl">
            Cleaning services in London homes, offices &amp; apartments
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            Choose from home cleaning services, office cleaning, GP surgery, dental practices,
            and other medical facility cleaning, deep cleaning services, and specialist turnovers.
            Every visit is
            scoped by our professional cleaners to your rooms, surfaces, and schedule.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-stretch lg:grid-cols-3 lg:gap-10">
          {SERVICES_LIST.map((s, i) => (
            <ScrollReveal key={s.slug} delay={(i % 4) * 0.04} className="flex h-full w-full">
              <ServiceCard service={s} headingLevel="h2" priorityImage={i < 3} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="ss-card mt-16 rounded-3xl p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl text-slate-900 md:text-3xl">
            Not sure which service fits?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Our team will recommend the right scope for your property. Contact us for quick,
            personalised guidance.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/booking"
              className="inline-flex rounded-2xl bg-gradient-to-r from-ss-blue-700 to-ss-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg"
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-2xl border border-slate-200 bg-slate-50 px-8 py-3.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Contact us
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
