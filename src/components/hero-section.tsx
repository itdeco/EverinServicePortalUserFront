"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const slides = [
  {
    id: 1,
    badge: "통합 HR 솔루션",
    title: "HR 시스템이 혹시 5개 이상?",
    subtitle: "이제 하나로 통합하세요",
    description: "근태, 급여, 평가, 기업문화, ERP가 따로 노는 비효율은 그만!\n에버인 하나로 모든 HR 업무가 완벽하게 연결됩니다.",
    primaryCta: "지금 즉시 경험하기",
    secondaryCta: "무료체험 신청하기",
    tags: ["온보딩", "인사관리", "근태관리", "PC-OFF", "급여", "아웃소싱", "평가", "복리후생", "ERP연동"],
    gradient: "from-primary/5 via-primary/10 to-secondary/20",
  },
  {
    id: 2,
    badge: "에버웰커밍",
    title: "귀사의 신입사원은 오늘 안녕하신가요?",
    subtitle: "AI 빌더로 혁신적인 온보딩",
    description: "신규 입사자 온보딩. AI 빌더를 활용하셔서 혁신적으로 운영해보세요!\n각종 전자서명, 서류취합, 업무 배정과 교육까지 자동화된 프로세스를 경험하세요.",
    primaryCta: "AI 빌더 맛보기",
    secondaryCta: "무료체험하기",
    tags: ["AI 빌더", "전자서명", "서류취합", "업무배정", "교육자동화"],
    gradient: "from-orange-50 via-amber-50 to-yellow-50",
  },
  {
    id: 3,
    badge: "간편 시작",
    title: "3분 포털 만들기",
    subtitle: "무료체험으로 시작하세요",
    description: "복잡한 설정 없이 3분 만에 HR 포털을 구축하세요.\n에버웰커밍 무료 + 에버타임 7개월 무료 혜택을 놓치지 마세요!",
    primaryCta: "무료체험 시작",
    secondaryCta: "도입문의",
    tags: ["3분 설정", "무료체험", "7개월 무료"],
    gradient: "from-blue-50 via-sky-50 to-cyan-50",
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
            <div className={cn("bg-gradient-to-br py-20 lg:py-28", slide.gradient)}>
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                  {/* 배지 */}
                  <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-sm border border-border/50">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm font-medium text-foreground">{slide.badge}</span>
                  </div>

                  {/* 타이틀 */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 leading-tight text-balance">
                    {slide.title}
                  </h1>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-6">
                    {slide.subtitle}
                  </p>

                  {/* 설명 */}
                  <p className="text-base md:text-lg text-muted-foreground mb-8 whitespace-pre-line max-w-2xl mx-auto leading-relaxed">
                    {slide.description}
                  </p>

                  {/* CTA 버튼 */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base font-semibold rounded-2xl shadow-lg shadow-primary/25">
                      {slide.primaryCta}
                    </Button>
                    <Button size="lg" variant="outline" className="px-8 h-14 text-base font-semibold rounded-2xl border-2">
                      {slide.secondaryCta}
                    </Button>
                  </div>

                  {/* 태그 */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {slide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-background/60 backdrop-blur-sm text-foreground/80 text-sm px-4 py-2 rounded-full border border-border/50 hover:bg-background/80 transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 네비게이션 화살표 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-background transition-colors border border-border/50 z-10"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-background transition-colors border border-border/50 z-10"
        aria-label="다음 슬라이드"
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentSlide ? "w-8 bg-primary" : "w-2 bg-foreground/20 hover:bg-foreground/40"
            )}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </section>
  )
}
