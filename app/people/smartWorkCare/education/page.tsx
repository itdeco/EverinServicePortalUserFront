"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import EducationHeroSection from "@/components/people/smartWorkCare/education/hero-section"
import EducationProblemSection from "@/components/people/smartWorkCare/education/problem-section"
import EducationStepsSection from "@/components/people/smartWorkCare/education/steps-section"
import EducationFeaturesSection from "@/components/people/smartWorkCare/education/features-section"
import EducationOutcomeSection from "@/components/people/smartWorkCare/education/outcome-section"
import EducationCtaSection from "@/components/people/smartWorkCare/education/cta-section"

export default function EducationPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <EducationHeroSection />
      <EducationProblemSection />
      <EducationStepsSection />
      <EducationFeaturesSection />
      <EducationOutcomeSection />
      <EducationCtaSection />
      <Footer />
    </main>
  )
}
