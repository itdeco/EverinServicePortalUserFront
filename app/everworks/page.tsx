import { Metadata } from "next";
import HeroSection from "@/src/components/everworks/hero-section";
import CaseSection from "@/src/components/everworks/case-section";
import FeaturesSection from "@/src/components/everworks/features-section";
import IconGridSection from "@/src/components/everworks/icon-grid-section";
import CharacteristicsSection from "@/src/components/everworks/characteristics-section";
import PricingSection from "@/src/components/everworks/pricing-section";
import ServiceSection from "@/src/components/everworks/service-section";
import CtaSection from "@/src/components/everworks/cta-section";

export const metadata: Metadata = {
  title: "에버웍스 | 에버인",
  description: "인팀 시뮬 시스템 관리, 임관지시 고도화된 에버웍스",
};

export default function EverWorksPage() {
  return (
    <main>
      <HeroSection />
      <CaseSection />
      <FeaturesSection />
      <IconGridSection />
      <CharacteristicsSection />
      <PricingSection />
      <ServiceSection />
      <CtaSection />
    </main>
  );
}
