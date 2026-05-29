'use client';

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import OutsourcingHeroSection from "@/components/people/payroll/outsourcing/hero-section";
import OutsourcingInterviewSection from "@/components/people/payroll/outsourcing/interview-section";
import OutsourcingProblemSection from "@/components/people/payroll/outsourcing/problem-section";
import OutsourcingEvertalkSection from "@/components/people/payroll/outsourcing/evertalk-section";
import OutsourcingFeaturesSection from "@/components/people/payroll/outsourcing/features-section";
import OutsourcingCtaSection from "@/components/people/payroll/outsourcing/cta-section";

export default function OutsourcingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <OutsourcingHeroSection />
      <OutsourcingInterviewSection />
      <OutsourcingProblemSection />
      <OutsourcingEvertalkSection />
      <OutsourcingFeaturesSection />
      <OutsourcingCtaSection />
      <Footer />
    </main>
  );
}
