'use client';

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import OutsourcingHeroSection from "@/components/people/payroll/outsourcing/hero-section";
import OutsourcingInterviewSection from "@/components/people/payroll/outsourcing/interview-section";
import OutsourcingProcessSection from "@/components/people/payroll/outsourcing/process-section";
import OutsourcingFocusSection from "@/components/people/payroll/outsourcing/focus-section";
import OutsourcingServiceListSection from "@/components/people/payroll/outsourcing/service-list-section";
import OutsourcingServiceProcessSection from "@/components/people/payroll/outsourcing/service-process-section";
import OutsourcingCtaSection from "@/components/people/payroll/outsourcing/cta-section";

export default function OutsourcingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <OutsourcingHeroSection />
      <OutsourcingInterviewSection />
      <OutsourcingProcessSection />
      <OutsourcingFocusSection />
      <OutsourcingServiceListSection />
      <OutsourcingServiceProcessSection />
      <OutsourcingCtaSection />
      <Footer />
    </main>
  );
}
