"use client";

import { getServiceByTitle } from "@/lib/services";
import { Skeleton } from "@/components/ui/Skeleton";
import { ThemeSelect } from "@/components/ui/ThemeSelect";
import { submitBooking } from "@/services/bookingIntegration";
import type { BookingPayload } from "@/services/types";
import { SERVICES_LIST } from "@/utils/constants";
import { bookingFieldErrors } from "@/utils/validation";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { FiCheck } from "react-icons/fi";

const inputClass =
  "mt-2 w-full rounded-2xl border border-white/15 bg-ss-blue-950/90 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-ss-blue-500/50";

const initial = {
  name: "",
  phone: "",
  email: "",
  address: "",
  service: "",
  datetime: "",
  message: "",
};

export function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preService = searchParams.get("service");

  const [form, setForm] = useState(() => ({
    ...initial,
    service: preService ?? "",
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message?: string; reference?: string } | null>(
    null
  );

  const serviceSelectOptions = useMemo(
    () => [
      { value: "", label: "Select a service" },
      ...SERVICES_LIST.map((s) => ({ value: s.title, label: s.title })),
    ],
    []
  );

  const selectedService = useMemo(
    () => (form.service ? getServiceByTitle(form.service) : undefined),
    [form.service]
  );

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = bookingFieldErrors({
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      service: form.service,
      datetime: form.datetime,
      message: form.message,
    });
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setLoading(true);
    setResult(null);

    const payload: BookingPayload = {
      service: form.service,
      scheduledAt: form.datetime,
      address: form.address,
      message: form.message,
      customerName: form.name,
      customerEmail: form.email,
      customerPhone: form.phone.replace(/\s/g, ""),
      source: "shine-span-web",
      createdAt: new Date().toISOString(),
    };

    const res = await submitBooking(payload);
    setLoading(false);
    setResult({
      ok: res.ok,
      message: res.message,
      reference: res.reference,
    });
    if (res.ok) {
      window.setTimeout(() => router.push("/"), 3200);
    }
  }

  return (
    <div className="relative mx-auto max-w-3xl pb-24 pt-10">
      <div className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl text-white sm:text-4xl">Book Now</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-400">
          One simple form for cleaning services UK-wide — professional cleaners confirmed by phone
          or email.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-white/10 bg-ss-blue-900/60 p-8 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-10"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Full name
            </span>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              autoComplete="name"
              className={inputClass}
            />
            {errors.name ? <p className="mt-1 text-xs text-red-400">{errors.name}</p> : null}
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Phone
            </span>
            <input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              autoComplete="tel"
              placeholder="07384 647705"
              className={inputClass}
            />
            {errors.phone ? <p className="mt-1 text-xs text-red-400">{errors.phone}</p> : null}
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Email
            </span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              autoComplete="email"
              className={inputClass}
            />
            {errors.email ? <p className="mt-1 text-xs text-red-400">{errors.email}</p> : null}
          </label>

          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Address
            </span>
            <textarea
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              rows={3}
              placeholder="Postcode and full address"
              autoComplete="street-address"
              className={inputClass}
            />
            {errors.address ? <p className="mt-1 text-xs text-red-400">{errors.address}</p> : null}
          </label>

          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Service
            </span>
            <ThemeSelect
              id="booking-service"
              value={form.service}
              onChange={(v) => update("service", v)}
              options={serviceSelectOptions}
              placeholder="Select a service"
            />
            {errors.service ? <p className="mt-1 text-xs text-red-400">{errors.service}</p> : null}
          </label>

          {selectedService ? (
            <div className="sm:col-span-2 overflow-hidden rounded-2xl border border-ss-blue-500/25 bg-ss-blue-950/70">
              <div className="grid sm:grid-cols-[140px_1fr]">
                <div className="relative hidden aspect-square sm:block">
                  <Image
                    src={selectedService.image}
                    alt={selectedService.title}
                    fill
                    className="object-cover"
                    sizes="140px"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h2 className="font-display text-xl text-white">{selectedService.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {selectedService.seoDescription}
                  </p>
                  <h3 className="mt-4 text-xs font-semibold uppercase tracking-wider text-ss-blue-300">
                    What&apos;s included
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
                    {selectedService.details.map((d) => (
                      <li key={d} className="flex gap-2">
                        <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-ss-blue-400" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}

          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Date &amp; time
            </span>
            <input
              type="datetime-local"
              value={form.datetime}
              onChange={(e) => update("datetime", e.target.value)}
              className={inputClass}
            />
            {errors.datetime ? (
              <p className="mt-1 text-xs text-red-400">{errors.datetime}</p>
            ) : null}
          </label>

          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Message
            </span>
            <textarea
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              rows={4}
              placeholder="Property size, access notes, pets, or special requests"
              className={inputClass}
            />
          </label>
        </div>

        {result ? (
          <div
            className={`mt-6 rounded-2xl px-4 py-3 text-sm ${
              result.ok
                ? "border border-emerald-500/40 bg-emerald-950/50 text-emerald-100"
                : "border border-red-500/40 bg-red-950/50 text-red-100"
            }`}
          >
            {result.ok ? (
              <>
                <p className="font-semibold">Booking received — thank you.</p>
                {result.reference ? (
                  <p className="mt-1 text-xs opacity-90">Reference: {result.reference}</p>
                ) : null}
                <p className="mt-2 text-xs">{result.message}</p>
              </>
            ) : (
              <>
                <p className="font-semibold">Something went wrong.</p>
                <p className="mt-1 text-xs">{result.message}</p>
                <Link href="/contact" className="mt-2 inline-block text-xs underline">
                  Contact us directly
                </Link>
              </>
            )}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full rounded-2xl bg-gradient-to-r from-ss-blue-700 to-ss-blue-500 py-4 text-sm font-semibold text-white shadow-xl shadow-ss-blue-600/25 transition hover:brightness-105 disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Book Now"}
        </button>
      </form>

      {loading ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ss-blue-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md space-y-4 rounded-3xl border border-white/15 bg-ss-blue-950/95 p-8 shadow-2xl">
            <p className="text-center font-semibold text-white">Sending your booking…</p>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mx-auto" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
