"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { COLORS } from "@/constants/brand-colors"

export default function EvaluationHeroSection() {
  return (
    <section
      className="relative min-h-[640px] overflow-hidden lg:min-h-[700px]"
      style={{
        backgroundImage: "url('/images/people/bg/bg-people-hero-00.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-4 lg:px-12">
        <div className="hero-fade-up flex flex-col items-center justify-center pb-20 pt-28 text-center lg:pb-28 lg:pt-36">
          <p
            className="hero-item mb-3 text-xl font-semibold tracking-wide md:text-2xl"
            style={{ color: COLORS.evaluation, animationDelay: "0.05s" }}
          >
            Ever Evaluation
          </p>

          <p
            className="hero-item mb-3 text-xl leading-relaxed text-gray-600 md:text-2xl"
            style={{ animationDelay: "0.18s" }}
          >
            업적·역량·다면 평가를 하나의 기준으로
          </p>

          <h1
            className="hero-item mb-2 text-[42px] font-black leading-tight text-gray-900 sm:text-5xl md:text-6xl"
            style={{ animationDelay: "0.3s" }}
          >
            에버평가
          </h1>

          <p
            className="hero-item mb-10 text-lg leading-relaxed text-gray-500 md:text-xl"
            style={{ animationDelay: "0.54s" }}
          >
            목표 수립부터 평가 진행, 결과 분석까지<br />
            조직의 성장을 위한 평가 프로세스를 체계적으로 관리하세요.
          </p>

          <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-lg border-0 px-10 text-base font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${COLORS.evaluation} 0%, ${COLORS.culture} 100%)` }}
            >
              <Link href="/trial">견적받기</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-lg bg-white px-10 text-base font-semibold text-gray-700 hover:bg-blue-50"
              style={{ borderColor: `${COLORS.evaluation}55` }}
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
