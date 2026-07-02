"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { COLORS } from "@/constants/brand-colors"

export default function AddOnHeroSection() {
  return (
    <section
      className="relative min-h-[520px] overflow-hidden lg:min-h-[560px]"
      style={{
        backgroundImage: "url('/images/people/bg/bg-people-hero-00.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-4 lg:px-12">
        <div className="hero-fade-up flex flex-col items-center justify-center pb-20 pt-28 text-center lg:pb-24 lg:pt-32">
          <p
            className="hero-item mb-3 text-xl font-semibold tracking-wide md:text-2xl"
            style={{ color: COLORS.people, animationDelay: "0.05s" }}
          >
            부가서비스
          </p>

          <h1
            className="hero-item mb-4 text-[40px] font-black leading-tight text-gray-900 sm:text-5xl md:text-6xl"
            style={{ animationDelay: "0.2s" }}
          >
            더 편리한 HR을 위한 부가서비스
          </h1>

          <p
            className="hero-item mb-10 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl"
            style={{ animationDelay: "0.42s" }}
          >
            전자계약, ERP 연동, 출입관리 연동, 셋업·추가개발까지
            <br />
            하나의 HR플랫폼 에버人에서 모두 연결하세요.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-lg border-0 px-10 text-base font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${COLORS.people} 0%, ${COLORS.onboarding} 100%)` }}
            >
              <Link href="/trial">견적받기</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-lg bg-white px-10 text-base font-semibold text-gray-700 hover:bg-emerald-50"
              style={{ borderColor: `${COLORS.people}55` }}
            >
              <Link href="/inquiry">도입문의</Link>
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-fade-up {
          animation: fadeUp 0.8s ease-out both;
        }
        .hero-item {
          opacity: 0;
          animation: fadeUp 0.7s ease-out both;
        }
      `}</style>
    </section>
  )
}
