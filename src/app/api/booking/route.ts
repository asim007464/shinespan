import { NextResponse } from "next/server";
import { forwardBookingToExternal } from "@/services/bookingIntegration";
import type { BookingPayload } from "@/services/types";

function isPayload(body: unknown): body is BookingPayload {
  if (!body || typeof body !== "object") return false;
  const o = body as Record<string, unknown>;
  return (
    typeof o.service === "string" &&
    typeof o.customerEmail === "string" &&
    typeof o.customerName === "string"
  );
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  if (!isPayload(json)) {
    return NextResponse.json({ ok: false, message: "Invalid booking payload" }, { status: 400 });
  }

  const reference = `SS-${Date.now().toString(36).toUpperCase()}`;

  const hasUpstream =
    !!process.env.PROCLEANER_BOOKING_URL || !!process.env.BOOKING_WEBHOOK_URL;
  let forwarded = false;

  if (hasUpstream) {
    const external = await forwardBookingToExternal(json);
    forwarded = external.ok;
    if (!external.ok) {
      return NextResponse.json({
        ok: true,
        reference,
        message:
          "Booking received. Our coordinators will confirm, external sync will retry automatically.",
        forwarded: false,
      });
    }
  }

  return NextResponse.json({
    ok: true,
    reference,
    message: "Booking received. We will confirm shortly.",
    forwarded,
  });
}
