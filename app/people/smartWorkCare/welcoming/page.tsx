'use client';

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WelcomingHeroSection from "@/components/people/smartWorkCare/welcoming/hero-section";
import WelcomingProblemSection from "@/components/people/smartWorkCare/welcoming/problem-section";
import WelcomingBenefitsSection from "@/components/people/smartWorkCare/welcoming/benefits-section";
import WelcomingFeaturesSection from "@/components/people/smartWorkCare/welcoming/features-section";
import WelcomingEffectSection from "@/components/people/smartWorkCare/welcoming/effect-section";
import WelcomingCtaSection from "@/components/people/smartWorkCare/welcoming/cta-section";

export default function WelcomingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <WelcomingHeroSection />
      <WelcomingProblemSection />
      <WelcomingBenefitsSection />
      <WelcomingFeaturesSection />
      <WelcomingEffectSection />
      <WelcomingCtaSection />
      <Footer />
    </main>
  );
}
