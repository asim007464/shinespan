"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { ThemeSelect } from "@/components/ui/ThemeSelect";
import { submitBooking } from "@/services/bookingIntegration";
import type { BookingPayload } from "@/services/types";
import { SERVICES_LIST } from "@/utils/constants";
import { bookingFieldErrors } from "@/utils/validation";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";

type Step = 1 | 2 | 3 | 4;

const initial = {
  service: "",
  propertyType: "",
  rooms: "",
  datetime: "",
  address: "",
  instructions: "",
  name: "",
  email: "",
  phone: "",
};

const PROPERTY_TYPE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "Flat / Apartment", label: "Flat / Apartment" },
  { value: "House", label: "House" },
  { value: "Townhouse", label: "Townhouse" },
  { value: "Office / Commercial", label: "Office / Commercial" },
  { value: "Airbnb / Short let", label: "Airbnb / Short let" },
] as const;

export function BookingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preService = searchParams.get("service");

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState(() => ({
    ...initial,
    service: preService ?? "",
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message?: string; reference?: string } | null>(
    null
  );

  const serviceOptions = useMemo(() => SERVICES_LIST.map((s) => s.title), []);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validateSteps(until: Step): boolean {
    const e: Record<string, string> = {};
    if (until >= 1) {
      if (!form.service.trim()) e.service = "Select a service";
      if (!form.propertyType.trim()) e.propertyType = "Required";
      if (!form.rooms.trim()) e.rooms = "Required";
    }
    if (until >= 2) {
      if (!form.datetime.trim()) e.datetime = "Required";
      if (!form.address.trim()) e.address = "Required";
    }
    if (until >= 3) {
      if (!form.name.trim()) e.name = "Required";
      if (!form.email.trim()) e.email = "Valid email required";
      if (!form.phone.trim()) e.phone = "Valid UK phone required";
      const full = bookingFieldErrors({
        ...form,
        service: form.service,
        propertyType: form.propertyType,
        rooms: form.rooms,
        datetime: form.datetime,
        address: form.address,
        name: form.name,
        email: form.email,
        phone: form.phone,
      });
      Object.assign(e, full);
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (step === 1 && validateSteps(1)) setStep(2);
    else if (step === 2 && validateSteps(2)) setStep(3);
    else if (step === 3 && validateSteps(3)) setStep(4);
  }

  function back() {
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  }

  async function submit() {
    if (!validateSteps(3)) {
      setStep(3);
      return;
    }
    setLoading(true);
    setResult(null);

    const payload: BookingPayload = {
      service: form.service,
      propertyType: form.propertyType,
      rooms: form.rooms,
      scheduledAt: form.datetime,
      address: form.address,
      instructions: form.instructions,
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
      window.setTimeout(() => router.push("/"), 2800);
    }
  }

  return (
    <div className="relative mx-auto max-w-3xl pb-24 pt-10">
      <div className="mb-10 flex items-center justify-between gap-4">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold ${
                step >= n
                  ? "bg-gradient-to-br from-ss-blue-700 to-ss-blue-500 text-white shadow-lg"
                  : "border border-white/15 bg-ss-blue-950/80 text-slate-200 shadow-sm"
              }`}
            >
              {step > n ? <FiCheck /> : n}
            </div>
            <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:block">
              {n === 1 ? "Service" : n === 2 ? "Schedule" : n === 3 ? "Your details" : "Summary"}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.28 }}
          className="rounded-[2rem] border border-white/10 bg-ss-blue-900/60 p-8 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-10"
        >
          {step === 1 ? (
            <Step1
              form={form}
              update={update}
              errors={errors}
              options={serviceOptions}
            />
          ) : null}
          {step === 2 ? (
            <Step2 form={form} update={update} errors={errors} />
          ) : null}
          {step === 3 ? <Step3 form={form} update={update} errors={errors} /> : null}
          {step === 4 ? (
            <Step4 form={form} result={result} loading={loading} onSubmit={submit} />
          ) : null}

          {step < 4 ? (
            <div className="mt-10 flex flex-wrap justify-between gap-4">
              <button
                type="button"
                onClick={back}
                disabled={step === 1}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-slate-200 disabled:opacity-40 hover:bg-white/5"
              >
                <FiArrowLeft /> Back
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-ss-blue-700 to-ss-blue-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-ss-blue-600/25"
              >
                Continue <FiArrowRight />
              </button>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      {loading ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ss-blue-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md space-y-4 rounded-3xl border border-white/15 bg-ss-blue-950/95 p-8 shadow-2xl">
            <p className="text-center font-semibold text-white">
              Sending your booking…
            </p>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mx-auto" />
            <Skeleton className="h-4 w-4/6 mx-auto" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Step1({
  form,
  update,
  errors,
  options,
}: {
  form: typeof initial;
  update: <K extends keyof typeof initial>(key: K, value: (typeof initial)[K]) => void;
  errors: Record<string, string>;
  options: string[];
}) {
  const serviceSelectOptions = useMemo(
    () => [
      { value: "", label: "Select service" },
      ...options.map((o) => ({ value: o, label: o })),
    ],
    [options]
  );

  return (
    <div>
      <h1 className="font-display text-3xl text-white">Your clean</h1>
      <p className="mt-2 text-sm text-slate-400">
        Choose scope so we can allocate the right crew.
      </p>
      <div className="mt-8 space-y-6">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Service</span>
          <ThemeSelect
            id="booking-service"
            value={form.service}
            onChange={(v) => update("service", v)}
            options={serviceSelectOptions}
            placeholder="Select service"
          />
          {errors.service ? <p className="mt-1 text-xs text-red-600">{errors.service}</p> : null}
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Property type
          </span>
          <ThemeSelect
            id="booking-property-type"
            value={form.propertyType}
            onChange={(v) => update("propertyType", v)}
            options={[...PROPERTY_TYPE_OPTIONS]}
            placeholder="Select"
          />
          {errors.propertyType ? (
            <p className="mt-1 text-xs text-red-600">{errors.propertyType}</p>
          ) : null}
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Number of rooms
          </span>
          <input
            type="number"
            min={1}
            max={50}
            value={form.rooms}
            onChange={(e) => update("rooms", e.target.value)}
            placeholder="e.g. 4"
            className="mt-2 w-full rounded-2xl border border-white/15 bg-ss-blue-950/90 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-ss-blue-500/50"
          />
          {errors.rooms ? <p className="mt-1 text-xs text-red-600">{errors.rooms}</p> : null}
        </label>
      </div>
    </div>
  );
}

function Step2({
  form,
  update,
  errors,
}: {
  form: typeof initial;
  update: <K extends keyof typeof initial>(key: K, value: (typeof initial)[K]) => void;
  errors: Record<string, string>;
}) {
  return (
    <div>
      <h1 className="font-display text-3xl text-white">Schedule &amp; access</h1>
      <p className="mt-2 text-sm text-slate-400">
        We&apos;ll confirm parking, keysafe, or concierge notes before arrival.
      </p>
      <div className="mt-8 space-y-6">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Preferred date &amp; time
          </span>
          <input
            type="datetime-local"
            value={form.datetime}
            onChange={(e) => update("datetime", e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/15 bg-ss-blue-950/90 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-ss-blue-500/50"
          />
          {errors.datetime ? <p className="mt-1 text-xs text-red-600">{errors.datetime}</p> : null}
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Address</span>
          <textarea
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            rows={3}
            placeholder="Postcode & full address"
            className="mt-2 w-full rounded-2xl border border-white/15 bg-ss-blue-950/90 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-ss-blue-500/50"
          />
          {errors.address ? <p className="mt-1 text-xs text-red-600">{errors.address}</p> : null}
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Extra instructions
          </span>
          <textarea
            value={form.instructions}
            onChange={(e) => update("instructions", e.target.value)}
            rows={3}
            placeholder="Materials to avoid, pets, alarm codes (encrypted at rest when integrated)."
            className="mt-2 w-full rounded-2xl border border-white/15 bg-ss-blue-950/90 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-ss-blue-500/50"
          />
        </label>
      </div>
    </div>
  );
}

function Step3({
  form,
  update,
  errors,
}: {
  form: typeof initial;
  update: <K extends keyof typeof initial>(key: K, value: (typeof initial)[K]) => void;
  errors: Record<string, string>;
}) {
  return (
    <div>
      <h1 className="font-display text-3xl text-white">Contact details</h1>
      <p className="mt-2 text-sm text-slate-400">
        Used only for booking confirmations — GDPR-aligned handling.
      </p>
      <div className="mt-8 space-y-6">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Full name</span>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/15 bg-ss-blue-950/90 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-ss-blue-500/50"
          />
          {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/15 bg-ss-blue-950/90 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-ss-blue-500/50"
          />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Phone (UK)
          </span>
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="07384 647705"
            className="mt-2 w-full rounded-2xl border border-white/15 bg-ss-blue-950/90 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-ss-blue-500/50"
          />
          {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone}</p> : null}
        </label>
      </div>
    </div>
  );
}

function Step4({
  form,
  result,
  loading,
  onSubmit,
}: {
  form: typeof initial;
  result: { ok: boolean; message?: string; reference?: string } | null;
  loading: boolean;
  onSubmit: () => void;
}) {
  return (
    <div>
      <h1 className="font-display text-3xl text-white">Summary</h1>
      <p className="mt-2 text-sm text-slate-400">
        Review and submit — we&apos;ll confirm shortly.
      </p>

      <dl className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-ss-blue-950/70 p-6 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-slate-400">Service</dt>
          <dd className="font-medium text-white">{form.service}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-400">Property</dt>
          <dd className="font-medium text-white">{form.propertyType}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-400">Rooms</dt>
          <dd className="font-medium text-white">{form.rooms}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-400">When</dt>
          <dd className="font-medium text-white">{form.datetime}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-400">Contact</dt>
          <dd className="text-right font-medium text-white">
            {form.name}
            <br />
            {form.email}
            <br />
            {form.phone}
          </dd>
        </div>
      </dl>

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
              <p className="font-semibold">Booking received.</p>
              {result.reference ? (
                <p className="mt-1 text-xs opacity-90">Reference: {result.reference}</p>
              ) : null}
              <p className="mt-2 text-xs">{result.message}</p>
              <p className="mt-2 text-xs">Redirecting home…</p>
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
        type="button"
        disabled={loading}
        onClick={onSubmit}
        className="mt-8 w-full rounded-2xl bg-gradient-to-r from-ss-blue-700 to-ss-blue-500 py-4 text-sm font-semibold text-white shadow-xl shadow-ss-blue-600/25 disabled:opacity-60"
      >
        {loading ? "Submitting…" : "Confirm booking"}
      </button>
    </div>
  );
}
