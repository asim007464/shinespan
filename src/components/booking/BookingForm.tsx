"use client";

import { BookingServicePanel } from "@/components/booking/BookingServicePanel";
import { getServiceSelectLabel } from "@/lib/serviceDisplay";
import { getServiceByTitle } from "@/lib/services";
import { Skeleton } from "@/components/ui/Skeleton";
import { ThemeSelect } from "@/components/ui/ThemeSelect";
import { submitBooking } from "@/services/bookingIntegration";
import type { BookingPayload } from "@/services/types";
import {
  BOOKING_ADDITIONAL_SERVICES,
  BOOKING_SERVICE_TYPES,
  buildBookingMessage,
} from "@/utils/bookingOptions";
import { SERVICES_LIST } from "@/utils/constants";
import {
  BOOKING_ARRIVAL_TIME_MAX,
  BOOKING_ARRIVAL_TIME_MIN,
  bookingFieldErrors,
  combinePreferredDateTime,
  formatUkAddress,
} from "@/utils/validation";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const inputClass = "ss-input";

const labelClass = "text-xs font-semibold uppercase tracking-wider text-slate-700";
const hintClass = "mt-1.5 text-xs leading-relaxed text-slate-500";
const formShellClass =
  "ss-card rounded-[2rem] p-6 sm:p-8";
const fieldGridClass = "grid gap-5 sm:grid-cols-2";

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className={labelClass}>
      {children}
      {required ? <span className="text-red-400"> *</span> : null}
    </span>
  );
}

const initial = {
  service: "",
  serviceType: "",
  roomCount: "",
  bathroomCount: "",
  additionalServicesNotes: "",
  additionalServices: [] as string[],
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  preferredDate: "",
  preferredTime: "",
  addressLine1: "",
  addressLine2: "",
  townCity: "",
  county: "",
  postcode: "",
  jobNotes: "",
};

export function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preService = searchParams.get("service");

  const serviceFromUrl = useMemo(() => {
    if (!preService?.trim()) return undefined;
    return getServiceByTitle(decodeURIComponent(preService.trim()));
  }, [preService]);

  const showServicePanel = !!serviceFromUrl;

  const [form, setForm] = useState(() => ({
    ...initial,
    service: serviceFromUrl?.title ?? "",
  }));
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message?: string; reference?: string } | null>(
    null
  );

  useEffect(() => {
    if (serviceFromUrl) {
      setForm((f) => ({ ...f, service: serviceFromUrl.title }));
    }
  }, [serviceFromUrl]);

  const serviceSelectOptions = useMemo(
    () => [
      { value: "", label: "Select a service" },
      ...SERVICES_LIST.map((s) => ({
        value: s.title,
        label: getServiceSelectLabel(s),
      })),
    ],
    []
  );

  const serviceTypeOptions = useMemo(
    () => [
      { value: "", label: "Select type of service" },
      ...BOOKING_SERVICE_TYPES.map((t) => ({ value: t, label: t })),
    ],
    []
  );

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function toggleAdditionalService(name: string) {
    setForm((f) => {
      const has = f.additionalServices.includes(name);
      return {
        ...f,
        additionalServices: has
          ? f.additionalServices.filter((s) => s !== name)
          : [...f.additionalServices, name],
      };
    });
  }

  function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    setFiles(picked.slice(0, 6));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = bookingFieldErrors({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      addressLine1: form.addressLine1,
      addressLine2: form.addressLine2,
      townCity: form.townCity,
      county: form.county,
      postcode: form.postcode,
      service: form.service,
      serviceType: form.serviceType,
      roomCount: form.roomCount,
      preferredDate: form.preferredDate,
      preferredTime: form.preferredTime,
    });
    if (showServicePanel && !form.bathroomCount.trim()) {
      fieldErrors.bathroomCount = "Number of bathrooms is required";
    }
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setLoading(true);
    setResult(null);

    const scheduledAt = combinePreferredDateTime(form.preferredDate, form.preferredTime);
    const attachmentNames = files.map((f) => f.name);
    const message = buildBookingMessage({
      serviceType: form.serviceType,
      roomCount: form.roomCount,
      bathroomCount: form.bathroomCount,
      additionalServices: form.additionalServices,
      additionalServicesNotes: form.additionalServicesNotes,
      jobNotes: form.jobNotes,
      attachmentNames,
    });

    const payload: BookingPayload = {
      service: form.service,
      serviceType: form.serviceType,
      roomCount: form.roomCount,
      bathroomCount: form.bathroomCount || undefined,
      additionalServices: form.additionalServices,
      additionalServicesNotes: form.additionalServicesNotes || undefined,
      scheduledAt,
      preferredDate: form.preferredDate,
      preferredTime: form.preferredTime,
      address: formatUkAddress({
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        townCity: form.townCity,
        county: form.county,
        postcode: form.postcode,
      }),
      message,
      jobNotes: form.jobNotes || undefined,
      attachmentNames: attachmentNames.length > 0 ? attachmentNames : undefined,
      customerName: `${form.firstName.trim()} ${form.lastName.trim()}`,
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
      setForm({ ...initial, service: serviceFromUrl?.title ?? "" });
      setFiles([]);
      window.setTimeout(() => router.push("/"), 3200);
    }
  }

  const resultBanner = result ? (
    <div
      className={`mt-6 rounded-2xl px-4 py-3 text-sm ${
        result.ok
          ? "border border-emerald-500/40 bg-emerald-950/50 text-emerald-100"
          : "border border-red-500/40 bg-red-950/50 text-red-100"
      }`}
    >
      {result.ok ? (
        <>
          <p className="font-semibold">Booking received, thank you.</p>
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
  ) : null;

  const firstNameField = (
    <label className="block">
      <Label required>First name</Label>
      <input
        value={form.firstName}
        onChange={(e) => update("firstName", e.target.value)}
        autoComplete="given-name"
        className={inputClass}
      />
      {errors.firstName ? <p className="mt-1 text-xs text-red-400">{errors.firstName}</p> : null}
    </label>
  );

  const lastNameField = (
    <label className="block">
      <Label required>Last name</Label>
      <input
        value={form.lastName}
        onChange={(e) => update("lastName", e.target.value)}
        autoComplete="family-name"
        className={inputClass}
      />
      {errors.lastName ? <p className="mt-1 text-xs text-red-400">{errors.lastName}</p> : null}
    </label>
  );

  const emailField = (
    <label className="block">
      <Label required>Email</Label>
      <input
        type="email"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        autoComplete="email"
        className={inputClass}
      />
      {errors.email ? <p className="mt-1 text-xs text-red-400">{errors.email}</p> : null}
    </label>
  );

  const phoneField = (
    <label className="block">
      <Label required>Phone number</Label>
      <input
        value={form.phone}
        onChange={(e) => update("phone", e.target.value)}
        autoComplete="tel"
        className={inputClass}
      />
      {errors.phone ? <p className="mt-1 text-xs text-red-400">{errors.phone}</p> : null}
    </label>
  );

  const dateField = (
    <label className="block">
      <Label required>Preferred date</Label>
      <input
        type="date"
        value={form.preferredDate}
        onChange={(e) => update("preferredDate", e.target.value)}
        className={inputClass}
      />
      {errors.preferredDate ? (
        <p className="mt-1 text-xs text-red-400">{errors.preferredDate}</p>
      ) : null}
    </label>
  );

  const timeField = (
    <label className="block">
      <Label required>Preferred arrival time</Label>
      <input
        type="time"
        value={form.preferredTime}
        onChange={(e) => update("preferredTime", e.target.value)}
        min={BOOKING_ARRIVAL_TIME_MIN}
        max={BOOKING_ARRIVAL_TIME_MAX}
        className={inputClass}
      />
      <p className={hintClass}>8am to 8pm only</p>
      {errors.preferredTime ? (
        <p className="mt-1 text-xs text-red-400">{errors.preferredTime}</p>
      ) : null}
    </label>
  );

  const addressFields = (
    <fieldset className="block min-w-0 sm:col-span-2">
      <legend className={labelClass}>
        {showServicePanel ? "Property address" : "Address"}
        <span className="text-red-400"> *</span>
      </legend>
      <div className="mt-3 grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <Label required>Address line 1</Label>
          <input
            value={form.addressLine1}
            onChange={(e) => update("addressLine1", e.target.value)}
            placeholder="House number and street name"
            autoComplete="address-line1"
            className={inputClass}
          />
          {errors.addressLine1 ? (
            <p className="mt-1 text-xs text-red-400">{errors.addressLine1}</p>
          ) : null}
        </label>

        <label className="block sm:col-span-2">
          <Label>Address line 2 (optional)</Label>
          <input
            value={form.addressLine2}
            onChange={(e) => update("addressLine2", e.target.value)}
            placeholder="Flat, building, or locality"
            autoComplete="address-line2"
            className={inputClass}
          />
        </label>

        <label className="block">
          <Label required>Town / city</Label>
          <input
            value={form.townCity}
            onChange={(e) => update("townCity", e.target.value)}
            autoComplete="address-level2"
            className={inputClass}
          />
          {errors.townCity ? (
            <p className="mt-1 text-xs text-red-400">{errors.townCity}</p>
          ) : null}
        </label>

        <label className="block">
          <Label>County (optional)</Label>
          <input
            value={form.county}
            onChange={(e) => update("county", e.target.value)}
            autoComplete="address-level1"
            className={inputClass}
          />
        </label>

        <label className="block">
          <Label required>Postcode</Label>
          <input
            value={form.postcode}
            onChange={(e) => update("postcode", e.target.value)}
            placeholder="e.g. SW1A 1AA"
            autoComplete="postal-code"
            className={inputClass}
          />
          {errors.postcode ? (
            <p className="mt-1 text-xs text-red-400">{errors.postcode}</p>
          ) : null}
        </label>
      </div>
    </fieldset>
  );

  const notesAndUpload = (
    <>
      <label className="block sm:col-span-2">
        <Label>Key information &amp; job notes (optional)</Label>
        <textarea
          value={form.jobNotes}
          onChange={(e) => update("jobNotes", e.target.value)}
          rows={showServicePanel ? 4 : 5}
          placeholder="Access codes, parking, pets, priorities for the visit…"
          className={inputClass}
        />
      </label>

      <label className="block sm:col-span-2">
        <Label>Upload images (optional)</Label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesChange}
          className="mt-2 block w-full cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-400 file:mr-4 file:rounded-xl file:border-0 file:bg-ss-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-ss-blue-500"
        />
        <p className={hintClass}>
          Share photos to help us understand your cleaning service needs.
        </p>
        {files.length > 0 ? (
          <ul className="mt-2 text-xs text-slate-400">
            {files.map((f) => (
              <li key={f.name}>
                {f.name} ({Math.round(f.size / 1024)} KB)
              </li>
            ))}
          </ul>
        ) : null}
      </label>
    </>
  );

  const serviceFocusedForm = (
    <form onSubmit={handleSubmit} className={formShellClass}>
      <input type="hidden" name="service" value={form.service} />

      <p className="mb-6 text-sm text-slate-400">
        Booking:{" "}
        <span className="font-semibold text-slate-900">{serviceFromUrl?.title}</span>
      </p>

      <div className={fieldGridClass}>
        {firstNameField}
        {lastNameField}
        {emailField}
        {phoneField}
        <label className="block">
          <Label required>Type of service</Label>
          <ThemeSelect
            id="booking-service-type-focused"
            value={form.serviceType}
            onChange={(v) => update("serviceType", v)}
            options={serviceTypeOptions}
            placeholder="Select type of service"
          />
          {errors.serviceType ? (
            <p className="mt-1 text-xs text-red-400">{errors.serviceType}</p>
          ) : null}
        </label>
        <label className="block">
          <Label required>No. of rooms</Label>
          <input
            value={form.roomCount}
            onChange={(e) => update("roomCount", e.target.value)}
            className={inputClass}
          />
          <p className={hintClass}>Please add total number of rooms.</p>
          {errors.roomCount ? (
            <p className="mt-1 text-xs text-red-400">{errors.roomCount}</p>
          ) : null}
        </label>
        <label className="block">
          <Label required>No. of bathrooms</Label>
          <input
            value={form.bathroomCount}
            onChange={(e) => update("bathroomCount", e.target.value)}
            placeholder="e.g. 2"
            className={inputClass}
          />
          {errors.bathroomCount ? (
            <p className="mt-1 text-xs text-red-400">{errors.bathroomCount}</p>
          ) : null}
        </label>
        {dateField}
        {timeField}
        {addressFields}
        {notesAndUpload}
      </div>

      {resultBanner}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-ss-blue-700 to-ss-blue-500 py-4 text-sm font-semibold text-white shadow-xl shadow-ss-blue-600/25 transition hover:brightness-105 disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {loading ? "Submitting…" : "Submit"}
      </button>
    </form>
  );

  const fullBookingForm = (
    <form onSubmit={handleSubmit} className={formShellClass}>
      <div className={fieldGridClass}>
        <label className="block">
          <Label required>Service interested in</Label>
          <ThemeSelect
            id="booking-service"
            value={form.service}
            onChange={(v) => update("service", v)}
            options={serviceSelectOptions}
            placeholder="Select a service"
          />
          {errors.service ? <p className="mt-1 text-xs text-red-400">{errors.service}</p> : null}
        </label>

        <label className="block">
          <Label required>Type of service</Label>
          <ThemeSelect
            id="booking-service-type"
            value={form.serviceType}
            onChange={(v) => update("serviceType", v)}
            options={serviceTypeOptions}
            placeholder="Select type of service"
          />
          {errors.serviceType ? (
            <p className="mt-1 text-xs text-red-400">{errors.serviceType}</p>
          ) : null}
        </label>

        <label className="block">
          <Label required>No. of rooms</Label>
          <input
            value={form.roomCount}
            onChange={(e) => update("roomCount", e.target.value)}
            className={inputClass}
          />
          <p className={hintClass}>Please add total number of rooms.</p>
          {errors.roomCount ? (
            <p className="mt-1 text-xs text-red-400">{errors.roomCount}</p>
          ) : null}
        </label>

        <label className="block">
          <Label required>No. of bathrooms</Label>
          <input
            value={form.bathroomCount}
            onChange={(e) => update("bathroomCount", e.target.value)}
            placeholder="e.g. 2"
            className={inputClass}
          />
        </label>

        <label className="block sm:col-span-2">
          <Label>Add more info about additional services (optional)</Label>
          <textarea
            value={form.additionalServicesNotes}
            onChange={(e) => update("additionalServicesNotes", e.target.value)}
            rows={3}
            placeholder="Any extra detail about add-ons or access"
            className={inputClass}
          />
        </label>
      </div>

      <fieldset className="mt-8 min-w-0">
        <legend className={labelClass}>Additional services (optional)</legend>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {BOOKING_ADDITIONAL_SERVICES.map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 transition hover:border-ss-blue-300 hover:bg-ss-blue-50"
            >
              <input
                type="checkbox"
                checked={form.additionalServices.includes(item)}
                onChange={() => toggleAdditionalService(item)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-transparent text-ss-blue-600 focus:ring-ss-blue-500/50"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={`mt-10 ${fieldGridClass}`}>
        {firstNameField}
        {lastNameField}
        {emailField}
        {phoneField}
        {dateField}
        {timeField}
        {addressFields}
        {notesAndUpload}
      </div>

      {resultBanner}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 rounded-2xl bg-gradient-to-r from-ss-blue-700 to-ss-blue-500 px-10 py-4 text-sm font-semibold text-white shadow-xl shadow-ss-blue-600/25 transition hover:brightness-105 disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Submitting…" : "Submit"}
      </button>
    </form>
  );

  return (
    <div className="relative mx-auto max-w-7xl pb-24 pt-10">
      {!showServicePanel ? (
        <div className="mb-8 max-w-2xl">
          <h1 className="font-display text-3xl text-slate-900 sm:text-4xl">Book Now</h1>
          <p className="mt-3 text-base leading-relaxed text-slate-400">
            Tell us about your property and preferred visit, our London coordinators confirm by phone
            or email.
          </p>
        </div>
      ) : null}

      {showServicePanel && serviceFromUrl ? (
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <BookingServicePanel service={serviceFromUrl} />
          <div className="min-w-0">{serviceFocusedForm}</div>
        </div>
      ) : (
        fullBookingForm
      )}

      {loading ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/20 backdrop-blur-sm">
          <div className="ss-card w-full max-w-md space-y-4 rounded-3xl p-8">
            <p className="text-center font-semibold text-slate-900">Sending your booking…</p>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mx-auto" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
