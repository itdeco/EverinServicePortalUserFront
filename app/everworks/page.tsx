import { Metadata } from "next";
import HeroSection from "@/components/everworks/hero-section";
import CaseSection from "@/components/everworks/case-section";
import FeaturesSection from "@/components/everworks/features-section";
import IconGridSection from "@/components/everworks/icon-grid-section";
import CharacteristicsSection from "@/components/everworks/characteristics-section";
import PricingSection from "@/components/everworks/pricing-section";
import ServiceSection from "@/components/everworks/service-section";
import CtaSection from "@/components/everworks/cta-section";

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
