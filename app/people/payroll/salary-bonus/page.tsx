'use client';

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SalaryBonusHeroSection from "@/components/people/payroll/salary-bonus/hero-section";
import SalaryBonusProblemSection from "@/components/people/payroll/salary-bonus/problem-section";
import SalaryBonusInterviewSection from "@/components/people/payroll/salary-bonus/interview-section";
import SalaryBonusStrengthsSection from "@/components/people/payroll/salary-bonus/strengths-section";
import SalaryBonusFeaturesSection from "@/components/people/payroll/salary-bonus/features-section";
import SalaryBonusCtaSection from "@/components/people/payroll/salary-bonus/cta-section";

export default function SalaryBonusPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <SalaryBonusHeroSection />
      <SalaryBonusProblemSection />
      <SalaryBonusInterviewSection />
      <SalaryBonusStrengthsSection />
      <SalaryBonusFeaturesSection />
      <SalaryBonusCtaSection />
      <Footer />
    </main>
  );
}
