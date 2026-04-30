'use client';

import { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/everworks/hero-section";
import CaseSection from "@/components/everworks/case-section";
import FeaturesSection from "@/components/everworks/features-section";
import IconGridSection from "@/components/everworks/icon-grid-section";
import CharacteristicsSection from "@/components/everworks/characteristics-section";
import PricingSection from "@/components/everworks/pricing-section";
import ServiceSection from "@/components/everworks/service-section";
import CtaSection from "@/components/everworks/cta-section";

export default function EverWorksPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <CaseSection />
      <FeaturesSection />
      <IconGridSection />
      <CharacteristicsSection />
      <PricingSection />
      <ServiceSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
