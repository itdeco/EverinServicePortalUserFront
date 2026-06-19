"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import EvertimeHeroSection from "@/components/people/smartWorkCare/evertime/hero-section"
import EvertimeReviewSection from "@/components/people/smartWorkCare/evertime/review-section"
import EvertimeTaglineSection from "@/components/people/smartWorkCare/evertime/tagline-section"
import EvertimePlanSection from "@/components/people/smartWorkCare/evertime/plan-section"
import EvertimeFeaturesSection from "@/components/people/smartWorkCare/evertime/features-section"
import EvertimeCtaSection from "@/components/people/smartWorkCare/evertime/cta-section"
import EvertimeCompareSection from "@/components/people/smartWorkCare/evertime/compare-section"

export default function EvertimePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <EvertimeHeroSection />
      <EvertimeReviewSection />
      <EvertimeTaglineSection />
      <EvertimePlanSection />
      <EvertimeFeaturesSection />
      <EvertimeCompareSection />
      <EvertimeCtaSection />
      <Footer />
    </main>
  )
}
