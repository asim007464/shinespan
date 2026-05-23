import { BookingForm } from "@/components/booking/BookingForm";
import { Container } from "@/components/ui/Container";
import { buildPageMetadata } from "@/lib/seo";
import { COMPANY } from "@/utils/constants";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export const metadata = buildPageMetadata({
  title: "Book Cleaning Services",
  description: `Book Now with ${COMPANY.shortName} — home cleaning services, office cleaning, and deep cleaning services across the UK. Professional cleaners on your schedule.`,
  path: "/booking",
});

function BookingFallback() {
  return (
    <Container className="py-16">
      <Skeleton className="mx-auto mb-8 h-12 max-w-md rounded-2xl" />
      <Skeleton className="mx-auto h-[520px] max-w-3xl rounded-[2rem]" />
    </Container>
  );
}

export default function BookingPage() {
  return (
    <section className="page-section min-h-[70vh]">
      <Container>
        <Suspense fallback={<BookingFallback />}>
          <BookingForm />
        </Suspense>
      </Container>
    </section>
  );
}
