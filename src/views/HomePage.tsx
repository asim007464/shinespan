import { BeforeAfterSlider } from "@/components/home/BeforeAfterSlider";
import { BookingCta } from "@/components/home/BookingCta";
import { FaqSection } from "@/components/home/FaqSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { ServicesCards } from "@/components/home/ServicesCards";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustedBanner } from "@/components/home/TrustedBanner";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBanner />
      <ServicesCards />
      <WhyChooseUs />
      <BeforeAfterSlider />
      <Testimonials />
      <BookingCta />
      <ProcessSteps />
      <FaqSection />
    </>
  );
}
