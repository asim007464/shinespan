import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Container className="py-24">
      <Skeleton className="mx-auto mb-8 h-14 max-w-xl rounded-3xl" />
      <Skeleton className="mx-auto mb-6 h-6 max-w-2xl rounded-full" />
      <Skeleton className="mx-auto mb-12 h-6 max-w-lg rounded-full" />
      <div className="grid gap-6 md:grid-cols-3">
        <Skeleton className="h-72 rounded-[2rem]" />
        <Skeleton className="h-72 rounded-[2rem]" />
        <Skeleton className="h-72 rounded-[2rem]" />
      </div>
    </Container>
  );
}
