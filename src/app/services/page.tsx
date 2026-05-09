import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SERVICES_LIST } from "@/utils/constants";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cleaning Services",
  description:
    "House, deep, office, Airbnb, end of tenancy, carpet, windows, and move cleans across the UK.",
};

export default function ServicesPage() {
  return (
    <section className="pb-24 pt-16 sm:pt-20">
      <Container>
        <ScrollReveal className="mb-14 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-400">Services</p>
          <h1 className="mt-3 font-display text-4xl text-white md:text-6xl">
            Crafted cleans for every brief
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Tap a service to book — each visit is scoped to your rooms, surfaces, and schedule.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2">
          {SERVICES_LIST.map((s, i) => (
            <ScrollReveal key={s.slug} delay={(i % 4) * 0.04}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-ss-blue-900/45 shadow-xl shadow-black/25 transition hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ss-blue-950/85 via-transparent to-transparent" />
                  <h2 className="absolute bottom-5 left-6 font-display text-2xl text-white md:text-3xl">
                    {s.title}
                  </h2>
                </div>
                <div className="flex flex-1 flex-col border-t border-white/10 bg-ss-blue-950/80 p-8">
                  <p className="flex-1 text-base leading-relaxed text-slate-400">{s.description}</p>
                  <Button
                    href={`/booking?service=${encodeURIComponent(s.title)}`}
                    className="mt-8 w-full justify-center sm:w-auto"
                  >
                    Book now
                  </Button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-16 text-center">
          <p className="text-slate-400">
            Need something bespoke?{" "}
            <Link href="/contact" className="font-semibold text-ss-blue-400 hover:text-ss-blue-300">
              Tell us your brief
            </Link>
            .
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
