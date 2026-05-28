"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const reviews = [
  {
    id: 1,
    question: "혹시 이런 고민 없으신가요?",
    quote: "직원정보가 엑셀, 이메일 등 곳곳에 흩어져 있어 관리가 어렵고 있던 누락이 자주 발생해요. 언제까지 이렇게 비효율적으로 일해야 할까요?",
    name: "김현주 님",
    info: "(35세, IT기업 인사팀)",
    image: "/images/people/smartWorkCare/hr/bg-review-01.png",
  },
  {
    id: 2,
    question: "혹시 이런 고민 없으신가요?",
    quote: "부서 간 인사이동이나 조직개편이 있을 때마다 조직도를 매번 새로 만들어야 합니다. 인사이동 관리가 복잡하고 시간 소모가 너무 큽니다.",
    name: "박준혁 님",
    info: "(41세, 제조기업 HR 관리자)",
    image: "/images/people/smartWorkCare/hr/bg-review-02.png",
  },
  {
    id: 3,
    question: "혹시 이런 고민 없으신가요?",
    quote: "직원 이력사항을 종합해서 확인 않다 보니, 급여 승진 등 중요한 인사결정을 내릴 때 정확한 정보가 없어 곤란할 때가 있어요.",
    name: "김서윤 님",
    info: "(29세, 스타트업 인사 매니저)",
    image: "/images/people/smartWorkCare/hr/bg-review-03.png",
  },
]

export default function HrReviewSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)
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
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "bg-[#00cc99] w-6" : "bg-gray-300"
                }`}
                aria-label={`리뷰 ${idx + 1} 보기`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
