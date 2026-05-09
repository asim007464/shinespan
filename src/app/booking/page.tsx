import { BookingWizard } from "@/components/booking/BookingWizard";
import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "Book a Clean",
  description: "Multi-step booking for Shine & Span Cleaning Services — UK-wide.",
};

function BookingFallback() {
  return (
    <Container className="py-16">
      <Skeleton className="mx-auto mb-8 h-12 max-w-md rounded-2xl" />
      <Skeleton className="mx-auto h-96 max-w-3xl rounded-[2rem]" />
    </Container>
  );
}

export default function BookingPage() {
  return (
    <section className="min-h-[70vh]">
      <Container>
        <Suspense fallback={<BookingFallback />}>
          <BookingWizard />
        </Suspense>
      </Container>
    </section>
  );
}
