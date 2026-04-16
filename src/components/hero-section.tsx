"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const slides = [
  {
    id: 1,
    badge: "지금 바로 경험하세요",
    title: "33년 ERP 명가 영림원이 만든",
    subtitle: "HR 솔루션 에버人",
    description: "에버웰커밍 무료 + 에버타임 7개월 무료",
    primaryCta: "무료체험 시작하기",
    primaryLink: "/trial",
    secondaryCta: "도입문의하기",
    secondaryLink: "/inquiry",
    note: "가입 후 3분 만에 포털 생성 완료 · 신용카드 불필요 · 언제든 해지 가능",
  },
  {
    id: 2,
    badge: "에버웰커밍",
    title: "귀사의 신입사원은 오늘 안녕하신가요?",
    subtitle: "AI 빌더로 혁신적인 온보딩",
    description: "신규 입사자 온보딩을 AI 빌더로 혁신적으로 운영하세요",
    primaryCta: "AI 빌더 맛보기",
    primaryLink: "/trial",
    secondaryCta: "자세히 알아보기",
    secondaryLink: "/solutions",
    note: "전자서명, 서류취합, 업무배정, 교육까지 자동화",
  },
  {
    id: 3,
    badge: "통합 HR 솔루션",
    title: "HR 시스템이 혹시 5개 이상?",
    subtitle: "이제 하나로 통합하세요",
    description: "근태, 급여, 평가, 기업문화, ERP가 하나로",
    primaryCta: "지금 즉시 경험하기",
    primaryLink: "/trial",
    secondaryCta: "무료체험 신청하기",
    secondaryLink: "/signup",
    note: "에버人 하나로 모든 HR 업무가 완벽하게 연결됩니다",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length)
  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length)

  return (
    <section className="relative overflow-hidden">
      <div className="relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "transition-all duration-700 ease-in-out",
              index === currentSlide ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"
            )}
          >
            <div className="bg-primary py-20 lg:py-28">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                  {/* 배지 */}
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-sm font-medium text-white">{slide.badge}</span>
                  </div>

                  {/* 타이틀 */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight text-balance">
                    {slide.title}
                    <br />
                    {slide.subtitle}
                  </h1>

                  {/* 설명 */}
                  <p className="text-lg md:text-xl text-white/90 font-medium mb-8 max-w-2xl mx-auto">
                    {slide.description}
                  </p>

                  {/* CTA 버튼 */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                    <Button 
                      size="lg" 
                      className="bg-white hover:bg-white/90 text-primary px-8 h-14 text-base font-semibold rounded-xl shadow-lg"
                      asChild
                    >
                      <Link href={slide.primaryLink}>
                        {slide.primaryCta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="px-8 h-14 text-base font-semibold rounded-xl border-2 border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
                      asChild
                    >
                      <Link href={slide.secondaryLink}>
                        {slide.secondaryCta}
                      </Link>
                    </Button>
                  </div>

                  {/* 하단 안내문구 */}
                  <p className="text-sm text-white/70">
                    {slide.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 네비게이션 화살표 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors z-10"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors z-10"
        aria-label="다음 슬라이드"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
            )}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </section>
  )
}
