'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

// Auto-scaling text component
function AutoScaleText({ 
  children, 
  color, 
  maxFontSize = 48,
  minFontSize = 18 
}: { 
  children: React.ReactNode
  color: string
  maxFontSize?: number
  minFontSize?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [fontSize, setFontSize] = useState(maxFontSize)

  useEffect(() => {
    const container = containerRef.current
    const text = textRef.current
    if (!container || !text) return

    const resize = () => {
      let currentSize = maxFontSize
      text.style.fontSize = `${currentSize}px`
      
      while (text.scrollWidth > container.clientWidth && currentSize > minFontSize) {
        currentSize -= 1
        text.style.fontSize = `${currentSize}px`
      }
      setFontSize(currentSize)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [children, maxFontSize, minFontSize])

  return (
    <div ref={containerRef} className="w-full overflow-hidden mb-6">
      <span
        ref={textRef}
        className="font-black text-center leading-tight whitespace-nowrap block"
        style={{ 
          color,
          fontSize: `${fontSize}px`,
          letterSpacing: '-0.02em'
        }}
      >
        {children}
      </span>
    </div>
  )
}

const personas = [
  {
    profile: "/images/main/profiles/profile-pro-01.png",
    name: "박인사 과장, 34세",
    company: "중소기업 HR 1인 담당자",
    quote: "신규입사 = 나의 야근지옥",
    need: "나 대신 온보딩 해줄 자동화",
    subNeed: "(온보딩만 전담해줄 인력필요)",
    solution: "에버웰커밍",
    accentColor: "#00dcaa",
    tag: "온보딩 자동화",
    gradientFrom: "#e6faf4",
    gradientTo: "#f0fdf9",
  },
  {
    profile: "/images/main/profiles/profile-pro-02.png",
    name: "김피플 팀장, 38세",
    company: "스타트업 People & Culture",
    quote: "엑셀 + 주먹구구",
    need: "확장 가능한 체계적 시스템",
    subNeed: "(온보딩+근태+평가까지 확장여지)",
    solution: "에버웰커밍 + 에버타임",
    accentColor: "#2bd67c",
    tag: "HR 통합 관리",
    gradientFrom: "#e6f9ed",
    gradientTo: "#f0fdf4",
  },
  {
    profile: "/images/main/profiles/profile-pro-03.png",
    name: "박문화 이사, 48세",
    company: "중소기업 경영지원 / C-Level",
    quote: "급여일 = 이산가족",
    need: "급여아웃소싱을 통한 조직효율화",
    subNeed: "(HR본연의 업무에 집중)",
    solution: "에버페이롤",
    accentColor: "#586ffa",
    tag: "급여 아웃소싱",
    gradientFrom: "#e8edff",
    gradientTo: "#f0f4ff",
  },
]

export function PersonaSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + personas.length) % personas.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % personas.length)
  }

  const goToIndex = (idx: number) => {
    setCurrentIndex(idx)
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-5 break-keep">
            HR, 다시 중요한 곳으로
          </h2>
          <p className="text-base sm:text-lg text-gray-500 break-keep max-w-xl mx-auto leading-relaxed">
            반복 업무를 줄이고, 진짜 가치 있는 일에 집중하는 HR을 만드세요.
          </p>
        </div>

        {/* Cards Carousel */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-8">
          {personas.map((persona, idx) => (
            <div
              key={idx}
              data-persona-index={idx}
              onClick={() => goToIndex(idx)}
              className="flex flex-col rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              style={{ 
                background: `linear-gradient(180deg, ${persona.gradientFrom} 0%, ${persona.gradientTo} 100%)`,
              }}
            >
                <div className="p-8 flex flex-col flex-1">
                  {/* Quote - Main Highlight - Auto Scaling Single Line */}
                  <AutoScaleText color={persona.accentColor} maxFontSize={42} minFontSize={20}>
                    &ldquo;{persona.quote}&rdquo;
                  </AutoScaleText>

                  {/* Tag - With visual separation */}
                  <div className="flex justify-center mb-8">
                    <span
                      className="px-4 py-2 rounded-full text-base font-bold border-2"
                      style={{ 
                        color: persona.accentColor,
                        borderColor: persona.accentColor,
                        background: `${persona.accentColor}10`
                      }}
                    >
                      {persona.tag}
                    </span>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Bottom Info Box */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 space-y-4">
                    {/* Profile Row */}
                    <div className="flex items-center gap-3">
                      <div 
                        className="relative w-12 h-12 rounded-full overflow-hidden shrink-0"
                        style={{ boxShadow: `0 0 0 2px ${persona.accentColor}` }}
                      >
                        <Image
                          src={persona.profile}
                          alt={persona.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900">{persona.name}</h3>
                        <p className="text-sm text-gray-500">{persona.company}</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200" />

                    {/* Need */}
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0"
                        style={{ background: persona.accentColor }}
                      />
                      <div>
                        <p className="text-base font-semibold text-gray-800 break-keep">
                          {persona.need}
                        </p>
                        <p className="text-sm text-gray-500 break-keep">
                          {persona.subNeed}
                        </p>
                      </div>
                    </div>

                    {/* Solution */}
                    <div 
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{ background: `${persona.accentColor}15` }}
                    >
                      <span className="text-sm font-medium text-gray-600">해결책 :</span>
                      <span 
                        className="text-lg font-black"
                        style={{ color: persona.accentColor }}
                      >
                        {persona.solution}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {personas.map((persona, idx) => (
                <div
                  key={idx}
                  className="w-full flex-shrink-0"
                >
                  <div
                    className="flex flex-col rounded-3xl overflow-hidden shadow-lg"
                    style={{ 
                      background: `linear-gradient(180deg, ${persona.gradientFrom} 0%, ${persona.gradientTo} 100%)`,
                    }}
                  >
                    <div className="p-8 flex flex-col flex-1">
                      {/* Quote */}
                      <AutoScaleText color={persona.accentColor} maxFontSize={42} minFontSize={20}>
                        &ldquo;{persona.quote}&rdquo;
                      </AutoScaleText>

                      {/* Tag */}
                      <div className="flex justify-center mb-8">
                        <span
                          className="px-4 py-2 rounded-full text-base font-bold border-2"
                          style={{ 
                            color: persona.accentColor,
                            borderColor: persona.accentColor,
                            background: `${persona.accentColor}10`
                          }}
                        >
                          {persona.tag}
                        </span>
                      </div>

                      <div className="flex-1" />

                      {/* Bottom Info Box */}
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 space-y-4">
                        {/* Profile Row */}
                        <div className="flex items-center gap-3">
                          <div 
                            className="relative w-12 h-12 rounded-full overflow-hidden shrink-0"
                            style={{ boxShadow: `0 0 0 2px ${persona.accentColor}` }}
                          >
                            <Image
                              src={persona.profile}
                              alt={persona.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-gray-900">{persona.name}</h3>
                            <p className="text-sm text-gray-500">{persona.company}</p>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-200" />

                        {/* Need */}
                        <div className="flex items-start gap-3">
                          <div 
                            className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0"
                            style={{ background: persona.accentColor }}
                          />
                          <div>
                            <p className="text-base font-semibold text-gray-800 break-keep">
                              {persona.need}
                            </p>
                            <p className="text-sm text-gray-500 break-keep">
                              {persona.subNeed}
                            </p>
                          </div>
                        </div>

                        {/* Solution */}
                        <div 
                          className="flex items-center gap-3 px-4 py-3 rounded-xl"
                          style={{ background: `${persona.accentColor}15` }}
                        >
                          <span className="text-sm font-medium text-gray-600">해결책 :</span>
                          <span 
                            className="text-lg font-black"
                            style={{ color: persona.accentColor }}
                          >
                            {persona.solution}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
            aria-label="이전"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
            aria-label="다음"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {personas.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToIndex(idx)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: idx === currentIndex ? '24px' : '8px',
                  height: '8px',
                  background: idx === currentIndex ? '#00dcaa' : '#e5e7eb',
                }}
                aria-label={`카드 ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
