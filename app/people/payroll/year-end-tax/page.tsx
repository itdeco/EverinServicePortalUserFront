"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import YearEndTaxHeroSection from "@/components/people/payroll/year-end-tax/hero-section"
import YearEndTaxFeaturesSection from "@/components/people/payroll/year-end-tax/features-section"
import YearEndTaxMobileProcessSection from "@/components/people/payroll/year-end-tax/mobile-process-section"
import YearEndTaxCtaSection from "@/components/people/payroll/year-end-tax/cta-section"

export default function YearEndTaxPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <YearEndTaxHeroSection />
      <YearEndTaxFeaturesSection />
      <YearEndTaxMobileProcessSection />
      <YearEndTaxCtaSection />
      <Footer />
    </main>
  )
}
