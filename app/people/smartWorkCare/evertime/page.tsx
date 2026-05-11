"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import EvertimeHeroSection from "@/components/people/smartWorkCare/evertime/hero-section"
import EvertimeTaglineSection from "@/components/people/smartWorkCare/evertime/tagline-section"
import EvertimeFeaturesSection from "@/components/people/smartWorkCare/evertime/features-section"
import EvertimeCtaSection from "@/components/people/smartWorkCare/evertime/cta-section"

export default function EvertimePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <EvertimeHeroSection />
      <EvertimeTaglineSection />
      <EvertimeFeaturesSection />
      <EvertimeCtaSection />
      <Footer />
    </main>
  )
}
