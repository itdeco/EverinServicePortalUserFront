"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function EvertimeHeroSection() {
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
        <div className="flex flex-col items-center justify-center pt-28 pb-20 lg:pt-36 lg:pb-28 text-center hero-fade-up">

          {/* 브랜드 태그 */}
          <p className="text-[#00cc99] text-xl font-semibold mb-3 tracking-wide">
            EverTime
          </p>

          {/* 서브 타이틀 */}
          <p className="text-gray-600 text-base md:text-lg mb-3 leading-relaxed">
            주 52시간 위반, 우리 회사는 안전한가요?
          </p>

          {/* 메인 타이틀 */}
          <h1 className="text-[36px] sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-5">
            근태관리
          </h1>

          {/* 설명 */}
          <p className="text-gray-500 text-base leading-relaxed mb-10">
            복잡한 근태업무 자동화,<br />
            최신 근로기준법 자동 업데이트, GPS 기반 스마트 워크
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button
              asChild
              size="lg"
              className="px-10 h-14 text-base font-semibold rounded-lg text-white border-0"
              style={{ background: "linear-gradient(135deg, #4B6BF5 0%, #00cc99 100%)" }}
            >
              <Link href="/trial">체험하기</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border border-[#00cc99] bg-white text-gray-700 px-10 h-14 text-base font-semibold rounded-lg hover:bg-[#f0fdf9]"
            >
              <Link href="/support/inquiry">도입문의</Link>
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
