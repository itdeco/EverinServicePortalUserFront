import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import { ClientLogos } from "@/components/client-logos"
import { MissionSection } from "@/components/mission-section"
import { PersonaSection } from "@/components/persona-section"
import { SolutionsSection } from "@/components/solutions-section"
import { TrustBanner } from "@/components/trust-banner"
import { FaqSection } from "@/components/faq-section"
import { CtaBanner } from "@/components/cta-banner"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ClientLogos />
      <MissionSection />
      <PersonaSection />
      <SolutionsSection />
      <TrustBanner />
      <FaqSection />
      <CtaBanner />
      <Footer />
    </main>
  )
}
