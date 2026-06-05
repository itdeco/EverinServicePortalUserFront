"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WelcomingHeroSection() {
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
          <p className="hero-item text-[#00cc99] text-xl md:text-2xl font-semibold mb-3 tracking-wide" style={{ animationDelay: "0.05s" }}>
            에버웰커밍
          </p>

          {/* 서브 타이틀 */}
          <p className="hero-item text-gray-600 text-xl md:text-2xl mb-3 leading-relaxed" style={{ animationDelay: "0.18s" }}>
            우리 회사 신규입사자의 첫 단추, 잘 끼워졌나요?
          </p>

          {/* 메인 타이틀 */}
          <h1 className="hero-item text-[42px] sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-2" style={{ animationDelay: "0.3s" }}>
            온보딩
          </h1>

          {/* 무료 배지 */}
          <span className="inline-block px-3 py-1 text-sm font-medium text-[#00a37a] bg-[#00cc99]/15 rounded-full mb-5">
            무료
          </span>

          {/* 설명 */}
          <p className="hero-item text-gray-500 text-lg md:text-xl leading-relaxed mb-10" style={{ animationDelay: "0.54s" }}>
            환영 인사를 넘어,<br />
            입사 첫 날의 경험, 따뜻하도록
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="px-10 h-14 text-base font-semibold rounded-lg text-white border-0"
              style={{ background: "linear-gradient(135deg, #4B6BF5 0%, #00cc99 100%)" }}
            >
              <Link href="/trial">AI 온보딩 맛보기</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border border-[#00cc99] bg-white text-gray-700 px-10 h-14 text-base font-semibold rounded-lg hover:bg-[#f0fdf9]"
            >
              <Link href="/trial">평생 무료 사용</Link>
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
