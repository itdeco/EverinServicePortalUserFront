'use client';

import { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/people/addOnServices/everworks/hero-section";
import CaseSection from "@/components/people/addOnServices/everworks/case-section";
import FeaturesSection from "@/components/people/addOnServices/everworks/features-section";
import CharacteristicsSection from "@/components/people/addOnServices/everworks/characteristics-section";
import ModuleSection from "@/components/people/addOnServices/everworks/module-section";
import ServiceSection from "@/components/people/addOnServices/everworks/service-section";
import CtaSection from "@/components/people/addOnServices/everworks/cta-section";

export default function EverWorksPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <CaseSection />
      <FeaturesSection />
      <CharacteristicsSection />
      <ModuleSection />
      <ServiceSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
