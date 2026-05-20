"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PcOffHeroSection from "@/components/people/smartWorkCare/pcoff/hero-section"
import PcOffTaglineSection from "@/components/people/smartWorkCare/pcoff/tagline-section"
import PcOffFeaturesSection from "@/components/people/smartWorkCare/pcoff/features-section"
import PcOffCtaSection from "@/components/people/smartWorkCare/pcoff/cta-section"
import PcOffTestimonialSection from "@/components/people/smartWorkCare/pcoff/testimonial-section"

export default function PcOffPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <PcOffHeroSection />
      <PcOffTaglineSection />
      <PcOffFeaturesSection />
      <PcOffCtaSection />
      <PcOffTestimonialSection />
      <Footer />
    </main>
  )
}
