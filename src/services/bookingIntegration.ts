/**
 * Central integration layer for ProCleaner / external booking APIs.
 * Client: POST to `/api/booking` (default) or `NEXT_PUBLIC_BOOKING_API_URL`.
 * Server route can forward to `PROCLEANER_BOOKING_URL` with optional `PROCLEANER_API_KEY`.
 */

import axios from "axios";
import type { BookingPayload, BookingApiResponse } from "./types";

const DEFAULT_INTERNAL = "/api/booking";

export async function submitBooking(
  payload: BookingPayload,
  options?: { signal?: AbortSignal }
): Promise<BookingApiResponse> {
  const endpoint =
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_BOOKING_API_URL ?? DEFAULT_INTERNAL
      : DEFAULT_INTERNAL;

  try {
    const { data, status } = await axios.post<BookingApiResponse>(endpoint, payload, {
      signal: options?.signal,
      headers: { "Content-Type": "application/json" },
      validateStatus: () => true,
    });

    if (status >= 400) {
      return {
        ok: false,
        message: data?.message ?? `Booking failed (${status})`,
      };
    }

    return {
      ok: data?.ok !== false,
      reference: data?.reference,
      message: data?.message,
      forwarded: data?.forwarded,
    };
  } catch (e) {
    const message = axios.isAxiosError(e)
      ? e.response?.data?.message ?? e.message
      : e instanceof Error
        ? e.message
        : "Network error";
    return { ok: false, message: String(message) };
  }
}

/** Server-side: forward to external ProCleaner webhook if configured */
export async function forwardBookingToExternal(
  payload: BookingPayload
): Promise<{ ok: boolean; status?: number; body?: string }> {
  const url = process.env.PROCLEANER_BOOKING_URL ?? process.env.BOOKING_WEBHOOK_URL ?? "";
  if (!url) {
    return { ok: true };
  }

  const secret = process.env.PROCLEANER_API_KEY ?? process.env.BOOKING_API_SECRET;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (secret) headers.Authorization = `Bearer ${secret}`;

  try {
    const res = await axios.post(url, payload, { headers, validateStatus: () => true });
    const text =
      typeof res.data === "string" ? res.data : JSON.stringify(res.data ?? {});
    return { ok: res.status < 400, status: res.status, body: text };
  } catch (e) {
    const status = axios.isAxiosError(e) ? e.response?.status : undefined;
    const body = axios.isAxiosError(e) ? String(e.response?.data ?? e.message) : String(e);
    return { ok: false, status, body };
  }
}
