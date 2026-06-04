import { NextResponse } from "next/server";

/** Stub endpoint for chatbot / future CRM, persists-ready shape */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      ok: true,
      id: `inq_${Date.now().toString(36)}`,
      received: body,
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
