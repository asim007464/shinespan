"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import type { Review } from "@/services/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";

function formatReviewDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, j) => (
        <FiStar
          key={j}
          className={`h-5 w-5 ${j < rating ? "fill-current" : "text-slate-600"}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const rating = Math.min(5, Math.max(1, review.rating));

  return (
    <figure className="flex h-full min-h-[280px] flex-col rounded-3xl border border-white/10 bg-ss-blue-900/50 p-6 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-8">
      <Stars rating={rating} />
      <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-slate-200 sm:text-base">
        &ldquo;{review.comment}&rdquo;
      </blockquote>
      <figcaption className="mt-6 border-t border-white/10 pt-5">
        <p className="font-semibold text-white">{review.customerName}</p>
        <p className="mt-1 text-sm text-slate-500">{formatReviewDate(review.date)}</p>
      </figcaption>
    </figure>
  );
}

function chunkReviews<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages.length ? pages : [[]];
}

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const pageCountRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/reviews");
        const data = (await res.json()) as { reviews?: Review[] };
        if (!cancelled && data.reviews?.length) {
          setReviews(data.reviews);
        }
      } catch {
        /* section hides if empty */
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function updatePerPage() {
      if (window.innerWidth >= 1024) setPerPage(3);
      else if (window.innerWidth >= 640) setPerPage(2);
      else setPerPage(1);
    }
    updatePerPage();
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  const pages = useMemo(() => chunkReviews(reviews, perPage), [reviews, perPage]);
  const pageCount = pages.length;
  pageCountRef.current = pageCount;

  const activePage = pageCount === 0 ? 0 : Math.min(page, pageCount - 1);

  useEffect(() => {
    setPage((p) => (pageCount > 0 ? Math.min(p, pageCount - 1) : 0));
  }, [pageCount]);

  useEffect(() => {
    if (pageCount <= 1) return;

    const timer = window.setInterval(() => {
      const count = pageCountRef.current;
      if (count <= 1) return;
      setPage((p) => (p + 1) % count);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [pageCount]);

  function goToSlide(next: number) {
    if (pageCount <= 0) return;
    setPage((next + pageCount) % pageCount);
  }

  if (!loading && reviews.length === 0) return null;

  return (
    <section className="page-section py-20 sm:py-28" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-400">
            Client reviews
          </p>
          <h2 id="reviews-heading" className="mt-3 font-display text-3xl text-white md:text-5xl">
            Trusted by UK homeowners &amp; businesses
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Real feedback from customers who use our cleaning services UK-wide.
          </p>
        </ScrollReveal>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-3xl border border-white/10 bg-ss-blue-900/40"
              />
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden" aria-live="polite">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activePage * 100}%)` }}
              >
                {pages.map((pageReviews, pageIndex) => (
                  <div
                    key={pageIndex}
                    className="w-full shrink-0"
                    aria-roledescription="slide"
                    aria-label={`Reviews ${pageIndex + 1} of ${pageCount}`}
                  >
                    <div
                      className={`grid gap-6 ${
                        perPage === 3
                          ? "grid-cols-1 lg:grid-cols-3"
                          : perPage === 2
                            ? "grid-cols-1 sm:grid-cols-2"
                            : "grid-cols-1"
                      }`}
                    >
                      {pageReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {pageCount > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => goToSlide(activePage - 1)}
                  aria-label="Previous reviews"
                  className="absolute -left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-white/15 bg-ss-blue-950/90 text-white shadow-lg transition hover:bg-ss-blue-900 sm:-left-4 lg:-left-12"
                >
                  <FiChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goToSlide(activePage + 1)}
                  aria-label="Next reviews"
                  className="absolute -right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-white/15 bg-ss-blue-950/90 text-white shadow-lg transition hover:bg-ss-blue-900 sm:-right-4 lg:-right-12"
                >
                  <FiChevronRight className="h-5 w-5" />
                </button>

                <div className="mt-8 flex items-center justify-center gap-2">
                  {pages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPage(i)}
                      aria-label={`Go to review slide ${i + 1}`}
                      aria-current={i === activePage ? "true" : undefined}
                      className={`h-2 rounded-full transition-all ${
                        i === activePage ? "w-8 bg-ss-blue-500" : "w-2 bg-white/25 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
