"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OutsourcingHeroSection() {
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
            급여 아웃소싱
          </p>

          {/* 메인 타이틀 */}
          <h1 className="text-[34px] sm:text-5xl md:text-[52px] font-black text-gray-900 leading-tight mb-5">
            급여 업무, 이제 전문가에게 맡기고<br />
            본질에만 집중하세요.
          </h1>

          {/* 설명 */}
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10">
            세법 전문 컨설턴트가 급여 업무를 직접 수행하고,<br />
            에버톡으로 소통까지 빠르고 안전하게 처리합니다.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="px-10 h-14 text-base font-semibold rounded-lg text-white border-0"
              style={{ background: "linear-gradient(135deg, #3344e6 0%, #6f7cf5 100%)" }}
            >
              <Link href="/trial">도입문의</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white text-gray-700 px-10 h-14 text-base font-semibold rounded-lg hover:bg-[#f3f4ff]"
              style={{ borderColor: "#3344e6" }}
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
        .hero-fade-up {
          animation: fadeUp 0.8s ease-out both;
        }
      `}</style>
    </section>
  )
}
