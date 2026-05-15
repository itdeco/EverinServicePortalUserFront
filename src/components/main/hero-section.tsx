"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const heroSlides = [
  {
    id: 1,
    image: "/images/main/heroes/main-hero-01.png",
    alt: "HR 솔루션이 즉시 5개 이상?",
  },
  {
    id: 2,
    image: "/images/main/heroes/main-hero-02.png",
    alt: "귀사의 신입사원은 오늘 안녕하신가요?",
  },
  {
    id: 3,
    image: "/images/main/heroes/main-hero-03.png",
    alt: "1 hr 시간단위 연차도 완벽 대응",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // 자동 슬라이드 전환 (5초마다)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* 슬라이더 컨테이너 */}
      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]">
        {/* 슬라이드들 */}
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}

        {/* 왼쪽 화살표 */}
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
          }
          className="absolute left-4 top-1/2 z-40 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all shadow-lg"
          aria-label="이전 슬라이드"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 오른쪽 화살표 */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 z-40 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all shadow-lg"
          aria-label="다음 슬라이드"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 하단 인디케이터 */}
        <div className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all ${
                idx === currentSlide
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`슬라이드 ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
