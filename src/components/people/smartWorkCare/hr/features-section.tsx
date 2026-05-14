"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    id: 1,
    title: "인사정보 통합관리",
    description: "마스터 데이터 중앙화, 부서, 직급, 직책 실시간 연동",
    icon: "/images/main/icons/hero/icon-hero-05.svg",
    image: "/images/people/smartWorkCare/hr/hr-1-1.png",
    imageAlt: "인사정보 통합관리 화면",
  },
  {
    id: 2,
    title: "조직도 자동화",
    description: "조직 개편 즉시 반영, 시각화 조직도 실시간 업데이트",
    icon: "/images/main/icons/hero/icon-hero-05.svg",
    image: "/images/people/smartWorkCare/hr/hr-2-1.png",
    imageAlt: "조직도 자동화 화면",
  },
  {
    id: 3,
    title: "발령 자동화",
    description: "인사발령 공문 원클릭생성, 전자결재 즉시 연계",
    icon: "/images/main/icons/hero/icon-hero-05.svg",
    image: "/images/people/smartWorkCare/hr/hr-3-1.png",
    imageAlt: "발령 자동화 화면",
  },
  {
    id: 4,
    title: "HR 데이터 분석",
    description: "복잡한 데이터를 직관적인 대시보드로 한눈에 파악하고 의사결정에 바로 활용하세요.",
    icon: "/images/main/icons/hero/icon-hero-05.svg",
    image: "/images/people/smartWorkCare/hr/hr-4-1.png",
    imageAlt: "HR 데이터 분석 화면",
  },
]

const SECTION_HEIGHT = 100 // vh per feature step

export default function HrFeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const el = wrapperRef.current
      if (!el) return
      const { top } = el.getBoundingClientRect()
      const scrolled = -top
      // 스크롤 가능 거리: (features.length * 100vh) 에서 sticky 패널 높이(100vh) 제외
      const scrollableHeight = features.length * window.innerHeight
      const stepHeight = scrollableHeight / features.length
      const idx = Math.min(
        features.length - 1,
        Math.max(0, Math.floor(scrolled / stepHeight))
      )
      setActiveIndex(idx)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative w-full bg-white"
      style={{ height: `${(features.length + 1) * SECTION_HEIGHT}vh` }}
    >
      {/* 고정 패널 - 데스크탑 */}
      <div className="hidden lg:flex sticky top-0 h-screen items-center bg-white">
        <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
          <div className="flex items-center gap-16">
            {/* 왼쪽 텍스트 */}
            <div className="w-[420px] shrink-0 relative h-[180px]">
              {features.map((feature, idx) => (
                <div
                  key={feature.id}
                  className="absolute inset-0"
                  style={{
                    opacity: activeIndex === idx ? 1 : 0,
                    transition: "opacity 0.6s ease-in-out",
                    pointerEvents: activeIndex === idx ? "auto" : "none",
                  }}
                >
                  {/* 인디케이터 점 */}
                  <div className="flex gap-2 mb-6">
                    {features.map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className="block h-1.5 rounded-full"
                        style={{
                          width: dotIdx === activeIndex ? "24px" : "6px",
                          backgroundColor: dotIdx === activeIndex ? "#00cc99" : "#e5e7eb",
                          transition: "width 0.4s ease-in-out, background-color 0.4s ease-in-out",
                        }}
                      />
                    ))}
                  </div>
                  {/* 아이콘 */}
                  <div className="mb-6 flex justify-center">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={56}
                      height={56}
                      className="w-14 h-14"
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* 오른쪽 이미지 - PC 스크린샷이므로 전체 너비 사용 */}
            <div className="flex-1 relative h-[480px]">
              {features.map((feature, idx) => (
                <div
                  key={feature.id}
                  className="absolute inset-0"
                  style={{
                    opacity: activeIndex === idx ? 1 : 0,
                    transition: "opacity 0.6s ease-in-out",
                  }}
                >
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    className="object-contain object-left-top"
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 고정 패널 - 모바일 */}
      <div className="flex lg:hidden sticky top-0 h-screen flex-col items-center justify-center bg-white px-6">
        <div className="w-full max-w-sm flex flex-col items-center text-center">
          {/* 인디케이터 점 */}
          <div className="flex gap-2 mb-8">
            {features.map((_, dotIdx) => (
              <span
                key={dotIdx}
                className="block h-1.5 rounded-full"
                style={{
                  width: dotIdx === activeIndex ? "24px" : "6px",
                  backgroundColor: dotIdx === activeIndex ? "#00cc99" : "#e5e7eb",
                  transition: "width 0.4s ease-in-out, background-color 0.4s ease-in-out",
                }}
              />
            ))}
          </div>

          {/* 텍스트 */}
          <div className="relative h-[110px] w-full mb-8">
            {features.map((feature, idx) => (
              <div
                key={feature.id}
                className="absolute inset-0 flex flex-col items-center text-center"
                style={{
                  opacity: activeIndex === idx ? 1 : 0,
                  transition: "opacity 0.6s ease-in-out",
                  pointerEvents: activeIndex === idx ? "auto" : "none",
                }}
              >
                {/* 아이콘 */}
                <div className="mb-4 flex justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* 이미지 - PC 스크린샷이므로 가로 전체 사용 */}
          <div className="relative w-full h-[260px]">
            {features.map((feature, idx) => (
              <div
                key={feature.id}
                className="absolute inset-0"
                style={{
                  opacity: activeIndex === idx ? 1 : 0,
                  transition: "opacity 0.6s ease-in-out",
                }}
              >
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  className="object-contain object-center"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
