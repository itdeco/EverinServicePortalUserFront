'use client';

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HrHeroSection from "@/components/people/smartWorkCare/hr/hero-section";
import HrReviewSection from "@/components/people/smartWorkCare/hr/review-section";
import HrTaglineSection from "@/components/people/smartWorkCare/hr/tagline-section";
import HrFeaturesSection from "@/components/people/smartWorkCare/hr/features-section";
import HrCtaSection from "@/components/people/smartWorkCare/hr/cta-section";

export default function HrPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HrHeroSection />
      <HrReviewSection />
      <HrFeaturesSection />
      <HrTaglineSection />
      <HrCtaSection />
      <Footer />
    </main>
  );
}
