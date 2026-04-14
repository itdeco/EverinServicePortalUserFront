"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"

export function CtaBanner() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* 배지 */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">지금 바로 경험하세요</span>
          </div>

          {/* 메인 카피 */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight text-balance">
            33년 ERP 명가 영림원이 만든
            <br />
            HR 솔루션 에버인
          </h2>

          {/* 혜택 강조 */}
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            <span className="font-semibold">에버웰커밍 무료</span> + <span className="font-semibold">에버타임 7개월 무료</span>
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 h-14 text-base font-semibold rounded-2xl shadow-lg">
              무료체험 시작하기
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 h-14 text-base font-semibold rounded-2xl">
              도입 문의하기
            </Button>
          </div>

          {/* 부가 정보 */}
          <p className="text-white/60 text-sm mt-8">
            가입 후 3분 만에 포털 생성 완료 · 신용카드 불필요 · 언제든 해지 가능
          </p>
        </div>
      </div>
    </section>
  )
}
