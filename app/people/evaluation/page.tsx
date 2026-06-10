"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import EvaluationHeroSection from "@/components/people/evaluation/hero-section"
import EvaluationTaglineSection from "@/components/people/evaluation/tagline-section"
import EvaluationFeaturesSection from "@/components/people/evaluation/features-section"
import EvaluationCtaSection from "@/components/people/evaluation/cta-section"

export default function EvaluationPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <EvaluationHeroSection />
      <EvaluationTaglineSection />
      <EvaluationFeaturesSection />
      <EvaluationCtaSection />
      <Footer />
    </main>
  )
}
