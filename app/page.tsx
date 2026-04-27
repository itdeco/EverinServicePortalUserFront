import Header from "@/components/layout/header"
import HeroSection from "@/components/main/hero-section"
import { ClientLogos } from "@/components/main/client-logos"
import { MissionSection } from "@/components/main/mission-section"
import { PersonaSection } from "@/components/main/persona-section"
import { SolutionsSection } from "@/components/main/solutions-section"
import { TrustBanner } from "@/components/main/trust-banner"
import { FaqSection } from "@/components/main/faq-section"
import { CtaBanner } from "@/components/main/cta-banner"
import Footer from "@/components/layout/footer"

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
