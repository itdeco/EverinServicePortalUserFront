"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PcOffHeroSection() {
  return (
    <section
      className="relative overflow-hidden min-h-[640px] lg:min-h-[700px]"
      style={{
        backgroundImage: `url('/images/people/bg/bg-people-hero-00.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-4 lg:px-12">
        <div className="flex flex-col items-center justify-center pt-28 pb-20 lg:pt-36 lg:pb-28 text-center">

          {/* 브랜드 태그 */}
          <p className="hero-item text-[#00cc99] text-xl md:text-2xl font-semibold mb-3 tracking-wide" style={{ animationDelay: "0.05s" }}>
            에버 PC-OFF
          </p>

          {/* 서브 타이틀 */}
          <p className="hero-item text-gray-600 text-xl md:text-2xl mb-3 leading-relaxed" style={{ animationDelay: "0.18s" }}>
            퇴근시간이 지나도 켜져 있는 PC 아직도 일일이 관리하시나요?
          </p>

          {/* 메인 타이틀 */}
          <h1 className="hero-item text-[42px] sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-2" style={{ animationDelay: "0.3s" }}>
            PC-OFF
          </h1>

          {/* 설명 */}
          <p className="hero-item text-gray-500 text-lg md:text-xl leading-relaxed mb-10" style={{ animationDelay: "0.54s" }}>
            근태 연동형 자동 제어로,<br />
            근로시간 관리부터 조직 건강까지 한 번에
          </p>

          {/* CTA 버튼 */}
          <div className="hero-item flex flex-wrap gap-4 justify-center" style={{ animationDelay: "0.66s" }}>
            <Button
              asChild
              size="lg"
              className="px-10 h-14 text-base font-semibold rounded-lg text-white border-0"
              style={{ background: "linear-gradient(135deg, #4B6BF5 0%, #00cc99 100%)" }}
            >
              <Link href="/support/inquiry">도입문의</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border border-[#00cc99] bg-white text-gray-700 px-10 h-14 text-base font-semibold rounded-lg hover:bg-[#f0fdf9]"
            >
              <Link href="/trial">견적요청</Link>
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
        .hero-item {
          opacity: 0;
          animation: fadeUp 0.7s ease-out both;
        }
      `}</style>
    </section>
  )
}
