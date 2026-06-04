import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  ContactPhoneButton,
  ContactWhatsAppButton,
} from "@/components/common/ContactActionButtons";
import { ContactCta } from "@/components/home/ContactCta";
import { Container } from "@/components/ui/Container";
import { COMPANY, IMAGES, SERVICES_LIST } from "@/utils/constants";
import { buildPageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { FiBookmark, FiClipboard, FiEdit3, FiSmile } from "react-icons/fi";

export const metadata = buildPageMetadata({
  title: "About Us, Trusted Cleaning Services London",
  description: `About ${COMPANY.name}, professional cleaners for homes, offices, apartments and commercial spaces across London.`,
  path: "/about",
});

const stepCardClass =
  "ss-card relative flex h-full flex-col rounded-3xl p-8 pt-11";

const contactActionBtn =
  "inline-flex min-h-[3.25rem] flex-1 items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold transition hover:-translate-y-px hover:shadow-md";

const stepCards = [
  {
    icon: FiBookmark,
    title: "Book it",
    text: "Simple booking. Fast scheduling.",
    highlight: "Choose your service and date, we'll handle the rest.",
  },
  {
    icon: FiSmile,
    title: "Breathe & relax",
    text: "Enjoy your clean home or office.",
    highlight: "We do the hard work so you don't have to.",
  },
] as const;

const highlightStats = [
  { value: "98%", label: "Satisfied clients" },
  { value: "750+", label: "Expert cleaners" },
  { value: "120+", label: "Active clients" },
  { value: "12+", label: "Years of service" },
] as const;

export default function AboutPage() {
  const serviceCount = SERVICES_LIST.length;

  return (
    <>
      {/* Hero */}
      <section className="page-section relative overflow-hidden pt-16 sm:pt-20">
        <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden>
          <Image
            src={IMAGES.aboutHero}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ss-blue-950/90 via-ss-blue-950/70 to-[#070d18]" />
        </div>
        <Container className="relative pb-12 text-center sm:pb-16">
          <ScrollReveal>
            <h1 className="font-display text-4xl text-white md:text-6xl">About Us</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-200">
              Trusted cleaning services across London
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Image + story */}
      <section className="page-section pb-16 sm:pb-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80 shadow-lg">
                <Image
                  src={IMAGES.trusted}
                  alt="Professional cleaner at work in London"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </div>
              <Link
                href="/services"
                className="absolute -left-2 top-6 rounded-2xl border border-slate-200/80 bg-white/95 px-7 py-5 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.45)] transition hover:border-ss-blue-300 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ss-blue-500 sm:left-4"
                aria-label={`View all ${serviceCount} cleaning services`}
              >
                <p className="font-display text-4xl font-bold leading-none text-ss-blue-600">
                  {serviceCount}+
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-600">Services we provide</p>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.06}>
              <div className="space-y-5 text-base leading-relaxed text-slate-400">
                <p>
                  At <strong className="text-slate-900">{COMPANY.name}</strong>, we&apos;re on a mission to
                  make homes, apartments, and workspaces across London shine. Whether you&apos;re a
                  homeowner, landlord, tenant, or business owner, we offer flexible, high-quality
                  cleaning tailored to your schedule and space.
                </p>
                <p>
                  We believe a clean environment leads to better living and working. That&apos;s why
                  every clean we deliver is handled with care, attention to detail, and a commitment to
                  your satisfaction. From regular housekeeping and end-of-tenancy cleaning to Airbnb
                  turnovers and commercial maintenance, {COMPANY.shortName} is the name people trust for
                  dependable service.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Smarter way, 3 steps */}
      <section className="page-section border-y border-slate-200/80 py-16 sm:py-20">
        <Container>
          <ScrollReveal className="max-w-3xl">
            <p className="text-sm font-semibold text-ss-blue-600">Get a quote fast</p>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              We provide flexible, high-quality cleaning services across homes, offices, rentals, and
              apartments. From one-time deep cleans to ongoing service plans, our team handles it all,
              so you can focus on what matters.
            </p>
          </ScrollReveal>

          <div className="mt-12 flex flex-col gap-6">
            <ScrollReveal>
              <article className={`${stepCardClass} lg:p-10 lg:pt-12`}>
                <div className="absolute -top-5 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-ss-blue-600 text-slate-900 shadow-lg shadow-ss-blue-600/30">
                  <FiClipboard className="h-6 w-6" aria-hidden />
                </div>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-xl">
                    <h3 className="mt-2 font-display text-2xl text-slate-900 md:text-3xl">Get a price</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">
                      Contact us on WhatsApp or phone, or book online, we&apos;ll reply quickly with a
                      clear quote.
                    </p>
                  </div>
                  <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 lg:max-w-2xl">
                    <ContactWhatsAppButton
                      className={`${contactActionBtn} min-h-[3.25rem] flex-1 border border-emerald-500/30 bg-emerald-600/15 hover:bg-emerald-600/25 hover:shadow-emerald-900/30`}
                    />
                    <ContactPhoneButton
                      className={`${contactActionBtn} min-h-[3.25rem] flex-1 text-xs sm:text-sm`}
                    />
                    <Link
                      href="/booking"
                      className={`${contactActionBtn} border border-ss-blue-400/40 bg-gradient-to-r from-ss-blue-600 to-ss-blue-500 text-white shadow-md shadow-ss-blue-900/20 hover:brightness-110`}
                    >
                      <FiEdit3 className="h-5 w-5 shrink-0" aria-hidden />
                      <span className="truncate">Book online</span>
                    </Link>
                  </div>
                </div>
              </article>
            </ScrollReveal>

            <div className="grid gap-6 md:grid-cols-2">
              {stepCards.map((card, i) => (
                <ScrollReveal key={card.title} delay={0.06 * (i + 1)}>
                  <article className={stepCardClass}>
                    <div className="absolute -top-5 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-ss-blue-600 text-slate-900 shadow-lg shadow-ss-blue-600/30">
                      <card.icon className="h-6 w-6" aria-hidden />
                    </div>
                    <h3 className="mt-2 font-display text-xl text-slate-900">{card.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                      {card.text}{" "}
                      <span className="font-medium text-slate-600">{card.highlight}</span>
                    </p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Stats + satisfaction headline */}
      <section className="page-section py-20 sm:py-28">
        <Container>
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold text-ss-blue-600">About us</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-slate-900 md:text-5xl">
              Get satisfied with the services we provide A to Z in cleaning
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-400">
              We&apos;re here to make your space spotless and your life easier. With fast bookings,
              flexible packages, and a team you can trust, {COMPANY.name} is your cleaning partner
              across London.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {highlightStats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.05} className="text-center">
                <p className="font-display text-4xl text-ss-blue-600 md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
