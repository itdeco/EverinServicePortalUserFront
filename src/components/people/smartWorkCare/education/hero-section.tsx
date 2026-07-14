"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

const steps = [
  { no: "01", label: "학습 계획" },
  { no: "02", label: "대상자 지정" },
  { no: "03", label: "결과 · 정산" },
]

export default function EducationHeroSection() {
  return (
    <section
      className="relative overflow-hidden min-h-[640px] lg:min-h-[720px]"
      style={{
        backgroundImage: `url('/images/people/bg/bg-people-hero-00.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-4 lg:px-12">
        <div className="flex flex-col items-center justify-center pt-28 pb-20 lg:pt-36 lg:pb-24 text-center hero-fade-up">
          {/* 브랜드 태그 */}
          <p
            className="hero-item text-[#03b565] text-lg md:text-xl font-semibold mb-4 tracking-wide"
            style={{ animationDelay: "0.05s" }}
          >
            EVERIN · PEOPLE · 인사관리 · 교육 / 경력
          </p>

          {/* 메인 타이틀 */}
          <h1
            className="hero-item text-[38px] sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-5 text-balance"
            style={{ animationDelay: "0.18s" }}
          >
            반복되는 교육 운영,<br />
            예측 가능한 시스템으로.
          </h1>

          {/* 설명 */}
          <p
            className="hero-item text-gray-600 text-lg md:text-xl leading-relaxed mb-10 text-pretty"
            style={{ animationDelay: "0.32s" }}
          >
            계획 수립부터 환급 정산까지 — 흩어진 3단계 반복 업무를 하나의 흐름으로.<br className="hidden md:block" />
            에버인 교육/경력이 HR 팀의 연간 사이클을 자동화합니다.
          </p>

          {/* 3-스텝 배지 */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            {steps.map((step) => (
              <div
                key={step.no}
                className="flex items-center gap-2 rounded-full border border-[#03b565]/30 bg-white/80 px-5 py-2.5 backdrop-blur"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#03b565] text-xs font-bold text-white">
                  {step.no}
                </span>
                <span className="text-sm md:text-base font-semibold text-gray-800">{step.label}</span>
              </div>
            ))}
          </div>

          {/* CTA 버튼 */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="px-10 h-14 text-base font-semibold rounded-lg text-white border-0"
              style={{ background: "linear-gradient(135deg, #4B6BF5 0%, #03b565 100%)" }}
            >
              <Link href="/inquiry">데모 신청하기</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border border-[#03b565] bg-white text-gray-700 px-10 h-14 text-base font-semibold rounded-lg hover:bg-[#f0fdf9]"
            >
              <Link href="/subscribe">요금제 보기</Link>
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
      `}</style>
    </section>
  )
}
