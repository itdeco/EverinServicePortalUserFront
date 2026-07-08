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
          <p className="hero-item text-[#00cc99] text-xl md:text-2xl font-semibold mb-3 tracking-wide" style={{ animationDelay: "0.05s" }}>
            EverTime
          </p>

          {/* 서브 타이틀 */}
          <p className="hero-item text-gray-600 text-xl md:text-2xl mb-3 leading-relaxed" style={{ animationDelay: "0.18s" }}>
            주 52시간 위반 우리 회사는 안전한가요?
          </p>

          {/* 메인 타이틀 */}
          <h1 className="hero-item text-[42px] sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-2" style={{ animationDelay: "0.3s" }}>
            근태관리
          </h1>

          {/* 설명 */}
          <p className="hero-item text-gray-500 text-lg md:text-xl leading-relaxed mb-6" style={{ animationDelay: "0.54s" }}>
            복잡한 근태업무 자동화,<br />
            최신 근로기준법 자동 업데이트, GPS 기반 스마트 워크
          </p>

          {/* 플랜 안내 */}
          <div className="hero-item mb-8 grid w-full max-w-[620px] grid-cols-1 gap-3 sm:grid-cols-2" style={{ animationDelay: "0.66s" }}>
            <div className="rounded-xl border border-indigo-200 bg-white/75 px-5 py-4 text-left shadow-[0_12px_30px_rgba(51,68,230,0.08)] backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#3344e6]" />
                <strong className="text-lg font-black text-[#3344e6]">Standard</strong>
              </div>
              <p className="mt-1.5 text-sm font-semibold text-gray-600 md:text-base">
                출퇴근·연차·근태신청 등 핵심 근태관리
              </p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-white/75 px-5 py-4 text-left shadow-[0_12px_30px_rgba(0,204,153,0.08)] backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#00cc99]" />
                <strong className="text-lg font-black text-[#009f79]">Enterprise</strong>
              </div>
              <p className="mt-1.5 text-sm font-semibold text-gray-600 md:text-base">
                복잡한 정책·외부 시스템 연동까지 확장
              </p>
            </div>
          </div>

          {/* CTA 버튼 */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button
              asChild
              size="lg"
              className="px-10 h-14 text-base font-semibold rounded-lg text-white border-0"
              style={{ background: "linear-gradient(135deg, #4B6BF5 0%, #00cc99 100%)" }}
            >
              <Link href="/trial">Standard 무료 체험</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border border-[#00cc99] bg-white text-gray-700 px-10 h-14 text-base font-semibold rounded-lg hover:bg-[#f0fdf9]"
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
      `}</style>
    </section>
  )
}
