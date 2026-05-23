import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ContactCta } from "@/components/home/ContactCta";
import { Container } from "@/components/ui/Container";
import { COMPANY, IMAGES, SERVICES_LIST } from "@/utils/constants";
import { buildPageMetadata } from "@/lib/seo";
import Image from "next/image";
import { FiBookmark, FiClipboard, FiSmile } from "react-icons/fi";

export const metadata = buildPageMetadata({
  title: "About Us — Trusted Cleaning Services UK",
  description: `About ${COMPANY.name} — professional cleaners for homes, offices, rentals and commercial spaces across the UK.`,
  path: "/about",
});

const processCards = [
  {
    icon: FiClipboard,
    title: "Get a price",
    text: "Looking for affordable, professional cleaning in the UK?",
    highlight: "Request a quick quote today — no hidden fees.",
  },
  {
    icon: FiBookmark,
    title: "Book it",
    text: "Simple booking. Fast scheduling.",
    highlight: "Choose your service and date — we'll handle the rest.",
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
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              Trusted cleaning services across the UK
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Image + story */}
      <section className="page-section pb-16 sm:pb-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/30">
                <Image
                  src={IMAGES.trusted}
                  alt="Professional cleaner at work in the UK"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -left-2 top-6 rounded-2xl border border-slate-200/90 bg-white px-7 py-5 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.45)] sm:left-4">
                <p className="font-display text-4xl font-bold leading-none text-ss-blue-600">
                  {serviceCount}+
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-700">Services we provide</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.06}>
              <div className="space-y-5 text-base leading-relaxed text-slate-400">
                <p>
                  At <strong className="text-white">{COMPANY.name}</strong>, we&apos;re on a mission to
                  make homes, rentals, and workspaces across the UK shine. Whether you&apos;re a
                  homeowner, landlord, tenant, or business owner — we offer flexible, high-quality
                  cleaning tailored to your schedule and space.
                </p>
                <p>
                  We believe a clean environment leads to better living and working. That&apos;s why
                  every clean we deliver is handled with care, attention to detail, and a commitment to
                  your satisfaction. From regular housekeeping and end-of-tenancy cleaning to Airbnb
                  turnovers and commercial maintenance — {COMPANY.shortName} is the name people trust for
                  dependable service.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Smarter way — 3 steps */}
      <section className="page-section border-y border-white/[0.06] bg-white/[0.02] py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            <ScrollReveal>
              <p className="text-sm font-semibold text-ss-blue-400">Get a quote fast</p>
              <h2 className="mt-2 font-display text-3xl text-white md:text-4xl">
                The smarter way to find reliable cleaning services
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <p className="text-base leading-relaxed text-slate-400">
                We provide flexible, high-quality cleaning services across homes, offices, rentals,
                and short-let properties. From one-time deep cleans to ongoing service plans, our
                team handles it all — so you can focus on what matters.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {processCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.06}>
                <article className="relative h-full rounded-3xl border border-white/10 bg-ss-blue-900/40 p-8 pt-10 shadow-lg shadow-black/20">
                  <div className="absolute -top-5 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-ss-blue-600 text-white shadow-lg shadow-ss-blue-600/30">
                    <card.icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-display text-xl text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {card.text}{" "}
                    <span className="font-medium text-slate-200">{card.highlight}</span>
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats + satisfaction headline */}
      <section className="page-section py-20 sm:py-28">
        <Container>
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold text-ss-blue-400">About us</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-white md:text-5xl">
              Get satisfied with the services we provide A to Z in cleaning
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-400">
              We&apos;re here to make your space spotless and your life easier. With fast bookings,
              flexible packages, and a team you can trust — {COMPANY.name} is your cleaning partner
              across the UK.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {highlightStats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.05} className="text-center">
                <p className="font-display text-4xl text-ss-blue-400 md:text-5xl">{stat.value}</p>
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
