"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    id: 1,
    title: "인사정보 통합관리",
    description: "마스터 데이터 중앙화, 부서, 직급, 직책 실시간 연동",
    image: "/images/people/smartWorkCare/hr/hr-1-1.png",
    imageAlt: "인사정보 통합관리 화면",
  },
  {
    id: 2,
    title: "조직도 자동화",
    description: "조직 개편 즉시 반영, 시각화 조직도 실시간 업데이트",
    image: "/images/people/smartWorkCare/hr/hr-2-1.png",
    imageAlt: "조직도 자동화 화면",
  },
  {
    id: 3,
    title: "발령 자동화",
    description: "인사발령 공문 원클릭생성, 전자결재 즉시 연계",
    image: "/images/people/smartWorkCare/hr/hr-3-1.png",
    imageAlt: "발령 자동화 화면",
  },
  {
    id: 4,
    title: "HR 데이터 분석",
    description: "복잡한 데이터를 직관적인 대시보드로 한눈에 파악하고 의사결정에 바로 활용하세요.",
    image: "/images/people/smartWorkCare/hr/hr-4-1.png",
    imageAlt: "HR 데이터 분석 화면",
  },
]

export default function HrFeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    itemRefs.current.forEach((el, idx) => {
      if (!el) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(idx)
            }
          })
        },
        {
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* 데스크탑: Sticky Scroll 레이아웃 */}
        <div className="hidden lg:flex gap-16 items-start">
          {/* 왼쪽: 스크롤 텍스트 블록 */}
          <div className="w-[360px] shrink-0">
            {features.map((feature, idx) => (
              <div
                key={feature.id}
                ref={(el) => { itemRefs.current[idx] = el }}
                className="min-h-[40vh] flex flex-col justify-center py-16"
              >
                <h3
                  className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                    activeIndex === idx ? "text-gray-900" : "text-gray-300"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-base leading-relaxed transition-colors duration-300 ${
                    activeIndex === idx ? "text-gray-500" : "text-gray-200"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* 오른쪽: Sticky 이미지 패널 */}
          <div className="flex-1 sticky top-24 h-[480px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            {features.map((feature, idx) => (
              <div
                key={feature.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeIndex === idx ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  className="object-cover object-left-top"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 모바일: 일반 세로 스택 */}
        <div className="flex lg:hidden flex-col gap-12">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="relative w-full h-[220px] rounded-xl overflow-hidden shadow-md border border-gray-100">
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  className="object-cover object-left-top"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
