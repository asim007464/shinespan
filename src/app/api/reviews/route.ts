import seedReviews from "@/data/reviews.json";
import type { Review } from "@/services/types";
import { NextResponse } from "next/server";

function isReviewArray(data: unknown): data is Review[] {
  return (
    Array.isArray(data) &&
    data.every(
      (r) =>
        r &&
        typeof r === "object" &&
        typeof (r as Review).id === "string" &&
        typeof (r as Review).customerName === "string" &&
        typeof (r as Review).comment === "string"
    )
  );
}

async function fetchAdminReviews(): Promise<Review[] | null> {
  const url = process.env.PROCLEANER_REVIEWS_URL ?? process.env.ADMIN_REVIEWS_API_URL;
  if (!url) return null;

  const headers: Record<string, string> = { Accept: "application/json" };
  const key = process.env.PROCLEANER_API_KEY ?? process.env.ADMIN_API_KEY;
  if (key) headers.Authorization = `Bearer ${key}`;

  try {
    const res = await fetch(url, { headers, next: { revalidate: 120 } });
    if (!res.ok) return null;
    const data: unknown = await res.json();
    const list = Array.isArray(data)
      ? data
      : data && typeof data === "object" && Array.isArray((data as { reviews: unknown }).reviews)
        ? (data as { reviews: unknown }).reviews
        : null;
    if (!isReviewArray(list)) return null;
    return list.filter((r) => r.published !== false);
  } catch {
    return null;
  }
}

export async function GET() {
  const remote = await fetchAdminReviews();
  const source = remote ?? (seedReviews as Review[]);
  const published = source
    .filter((r) => r.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return NextResponse.json({ ok: true, reviews: published });
}
