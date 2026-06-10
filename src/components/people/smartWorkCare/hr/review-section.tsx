"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const SLIDE_DURATION = 5000

const reviews = [
  {
    id: 1,
    question: "이런 고민, 익숙하지 않으신가요?",
    quote: "직원정보가 엑셀, 이메일 등 곳곳에 흩어져 있어 관리가 어렵고 있던 누락이 자주 발생해요. 언제까지 이렇게 비효율적으로 일해야 할까요?",
    name: "인사팀 이주임",
    info: "(35세, IT기업 인사팀)",
    image: "/images/people/smartWorkCare/hr/bg-review-01.png",
  },
  {
    id: 2,
    question: "아직도 이렇게 관리하고 계신가요?",
    quote: "부서 간 인사이동이나 조직개편이 있을 때마다 조직도를 매번 새로 만들어야 합니다. 인사이동 관리가 복잡하고 시간 소모가 너무 큽니다",
    name: "HR팀 박팀장",
    info: "(41세, 제조기업 HR 관리자)",
    image: "/images/people/smartWorkCare/hr/bg-review-02.png",
  },
  {
    id: 3,
    question: "HR 담당자라면 한 번쯤 겪는 문제",
    quote: "직원 이력관리를 중앙에서 하지 않다 보니, 급여 승진 등 중요한 인사결정을 내릴 때 정확한 정보가 없어 곤란할 때가 있어요",
    name: "People팀 김 매니저",
    info: "(29세, 스타트업 인사 매니저)",
    image: "/images/people/smartWorkCare/hr/bg-review-03.png",
  },
]

export default function HrReviewSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length)
    }, SLIDE_DURATION)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="relative overflow-hidden">
          {/* 슬라이더 */}
          <div 
            className="flex transition-transform duration-1000 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <div key={review.id} className="w-full flex-shrink-0 px-2">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row items-stretch">
                  {/* 이미지 */}
                  <div className="relative w-full md:w-[200px] h-[200px] md:h-[280px] flex-shrink-0">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  
                  {/* 컨텐츠 */}
                  <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                    <span className="inline-block px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-full w-fit mb-6">
                      {review.question}
                    </span>
                    <p className="text-gray-900 text-xl md:text-2xl leading-relaxed mb-8 font-semibold tracking-tight">
                      &quot;{review.quote}&quot;
                    </p>
                    <p className="text-gray-500 text-base">
                      {review.name} {review.info}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 인디케이터 */}
          <div className="flex justify-center items-center gap-3 mt-6">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className="h-3 rounded-full overflow-hidden bg-gray-300 transition-all duration-300"
                style={{ width: idx === activeIndex ? "40px" : "12px" }}
                aria-label={`리뷰 ${idx + 1} 보기`}
              >
                {idx === activeIndex && (
                  <span
                    key={activeIndex}
                    className="indicator-progress-fill block h-full rounded-full bg-[#00cc99]"
                    style={{ animationDuration: `${SLIDE_DURATION}ms` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
