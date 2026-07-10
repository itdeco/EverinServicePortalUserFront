"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function YearEndTaxHeroSection() {
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
          <p className="text-xl md:text-2xl font-semibold mb-3 tracking-wide" style={{ color: "#3344e6" }}>
            연말정산
          </p>

          {/* 메인 타이틀 */}
          <h1 className="text-[34px] sm:text-5xl md:text-[52px] font-black text-gray-900 leading-tight mb-5">
            연말정산도 이제
            <br />
            편리하게 처리하세요.
          </h1>

          {/* 설명 */}
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10">
            영림원 급여 프로그램을 사용 중이라면,
            <br />
            연말정산 아웃소싱만도 가능합니다.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="px-10 h-14 text-base font-semibold rounded-lg text-white border-0"
              style={{ background: "linear-gradient(135deg, #3344e6 0%, #6f7cf5 100%)" }}
            >
              <Link href="/inquiry">도입문의</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white text-gray-700 px-10 h-14 text-base font-semibold rounded-lg hover:bg-[#f3f4ff]"
              style={{ borderColor: "#3344e6" }}
            >
              <Link href="/subscribe">견적요청</Link>
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
