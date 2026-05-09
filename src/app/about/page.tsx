import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { COMPANY, IMAGES } from "@/utils/constants";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiCheck, FiHeart, FiShield } from "react-icons/fi";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${COMPANY.name} — mission, team, and why UK clients trust our premium cleaning.`,
};

const stats = [
  { label: "Years polished", value: "12+" },
  { label: "Happy homes & desks", value: "4.8k+" },
  { label: "Cities covered", value: "UK-wide" },
];

const trust = [
  "Transparent pricing with written scopes",
  "Named supervisors for commercial contracts",
  "Eco-forward products available on request",
];

export default function AboutPage() {
  return (
    <>
      <section className="relative min-h-[420px] overflow-hidden">
        <Image
          src={IMAGES.aboutHero}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ss-blue-950/95 via-ss-blue-900/75 to-ss-blue-700/35" />
        <Container className="relative flex min-h-[420px] flex-col justify-center py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ss-blue-200">About</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl text-white md:text-6xl">
            Elevating everyday spaces into calm, curated environments.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">{COMPANY.tagline}</p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <ScrollReveal>
              <h2 className="font-display text-3xl text-white md:text-5xl">Who we are</h2>
              <p className="mt-6 text-slate-400">
                {COMPANY.name} pairs meticulous technique with hospitality-minded service. Our crews
                arrive uniformed, equipped, and briefed — whether refreshing a Chelsea pied-à-terre or
                maintaining a Birmingham HQ.
              </p>
              <p className="mt-4 text-slate-400">
                We scale thoughtfully: same leadership team from quote to completion, so nothing gets
                lost between departments.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-[2rem] border border-white/10 bg-ss-blue-900/50 p-10 shadow-2xl shadow-black/30 backdrop-blur-sm">
                <h3 className="font-display text-2xl text-white">Mission &amp; vision</h3>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-400">
                  <p>
                    <strong className="text-white">Mission:</strong> Deliver dependable, premium cleaning
                    that respects your time, privacy, and surfaces.
                  </p>
                  <p>
                    <strong className="text-white">Vision:</strong> Become the UK&apos;s most trusted name
                    for calm, photo-ready spaces — residential and commercial.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-white/10 bg-ss-blue-950/50 py-20 backdrop-blur">
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <h2 className="font-display text-3xl text-white md:text-5xl">The team behind the shine</h2>
            <p className="mt-4 text-slate-400">
              Operations leaders, trainers, and field supervisors — aligned on one standard.
            </p>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: "Harriet Cole", role: "Founder & Lead Operations", img: IMAGES.team1 },
              { name: "Marcus Adeyemi", role: "Commercial Accounts Director", img: IMAGES.team2 },
              { name: "Daniel Hughes", role: "Training & Quality Lead", img: IMAGES.team3 },
            ].map((person, i) => (
              <ScrollReveal key={person.name} delay={i * 0.06}>
                <article className="overflow-hidden rounded-3xl border border-white/10 bg-ss-blue-900/45 shadow-xl shadow-black/25">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={person.img}
                      alt={person.name}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl text-white">{person.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{person.role}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <h2 className="font-display text-3xl text-white md:text-5xl">Why clients trust us</h2>
              <ul className="mt-8 space-y-4">
                {trust.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-ss-blue-900/45 px-5 py-4 backdrop-blur-sm"
                  >
                    <FiCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />
                    <span className="text-slate-200">{t}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-3xl bg-gradient-to-br from-ss-blue-800 to-ss-blue-600 p-8 text-center text-white shadow-xl"
                  >
                    <p className="font-display text-4xl">{s.value}</p>
                    <p className="mt-2 text-xs uppercase tracking-widest text-ss-blue-100">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-200">
                  <FiShield className="text-ss-blue-400" /> Fully insured
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-200">
                  <FiHeart className="text-rose-400" /> People-first culture
                </span>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <ScrollReveal className="relative min-h-[280px] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/40 sm:min-h-[320px]">
            <Image
              src={IMAGES.ctaBanner}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="relative z-10 flex min-h-[280px] flex-col justify-center bg-gradient-to-r from-ss-blue-950/95 to-ss-blue-800/70 px-8 py-14 sm:min-h-[320px] sm:px-14">
              <h2 className="font-display text-3xl text-white md:text-4xl">
                Experience the Shine &amp; Span standard
              </h2>
              <p className="mt-3 max-w-xl text-white/85">
                Book online or speak with our coordinators — same-day callbacks during office hours.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/booking" variant="primary" className="!bg-white !text-ss-blue-900">
                  Book now
                </Button>
                <Link
                  href={`mailto:${COMPANY.email}`}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/35 px-8 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10"
                >
                  Email us
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
