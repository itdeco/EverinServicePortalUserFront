import EvertimeHeroSection from "@/components/people/smartWorkCare/evertime/hero-section"
import EvertimeTaglineSection from "@/components/people/smartWorkCare/evertime/tagline-section"
import EvertimeFeaturesSection from "@/components/people/smartWorkCare/evertime/features-section"
import EvertimeCtaSection from "@/components/people/smartWorkCare/evertime/cta-section"

export const metadata = {
  title: "근태관리 | EverTime",
  description: "복잡한 근태업무 자동화, 최신 근로기준법 자동 업데이트, GPS 기반 스마트 워크",
}

export default function EvertimePage() {
  return (
    <main>
      <EvertimeHeroSection />
      <EvertimeTaglineSection />
      <EvertimeFeaturesSection />
      <EvertimeCtaSection />
    </main>
  )
}
