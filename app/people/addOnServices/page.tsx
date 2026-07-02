"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import AddOnHeroSection from "@/components/people/addOnServices/hero-section"
import AddOnAnchorNav from "@/components/people/addOnServices/anchor-nav"
import ElectronicContractSection from "@/components/people/addOnServices/electronic-contract-section"
import IntegrationSection from "@/components/people/addOnServices/integration-section"
import AccessControlSection from "@/components/people/addOnServices/access-control-section"
import SetupSection from "@/components/people/addOnServices/setup-section"
import AddOnCtaSection from "@/components/people/addOnServices/cta-section"

export default function AddOnServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AddOnHeroSection />
      <AddOnAnchorNav />
      <ElectronicContractSection />
      <IntegrationSection />
      <AccessControlSection />
      <SetupSection />
      <AddOnCtaSection />
      <Footer />
    </main>
  )
}
