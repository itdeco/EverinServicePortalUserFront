"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const SLIDE_DURATION = 5000

const reviews = [
  {
    id: 1,
    question: "이런 고민, 당신만의 문제가 아닙니다",
    quote:
      "퇴근시간이 지나도 PC를 켜놓는 직원들이 많아서 근로시간 관리가 항상 애매했어요.\n매일 반복되는 퇴근 독려도 부담스럽습니다",
    name: "김 담당자님",
    info: "(34세, IT기업 인사 담당자)",
    image: "/images/people/smartWorkCare/pcoff/bg-review-04.png",
  },
  {
    id: 2,
    question: "이런 고민, 당신만의 문제가 아닙니다",
    quote:
      "퇴근 후 수동으로 PC를 끄는 업무 때문에 인사팀이 야근을 자주 합니다.\n단순 업무 때문에 매일 스트레스가 큽니다",
    name: "이 팀장님",
    info: "(39세, 제조업 HR팀장)",
    image: "/images/people/smartWorkCare/pcoff/bg-review-05.png",
  },
  {
    id: 3,
    question: "이런 고민, 당신만의 문제가 아닙니다",
    quote:
      "연장근무나 연차 등 PC-OFF 예외사항이 많아 자동화가 어렵고 관리가 복잡합니다.\n예외처리 때마다 혼선이 생겨 너무 힘들어요.",
    name: "박 매니저님",
    info: "(31세, 스타트업 운영 매니저)",
    image: "/images/people/smartWorkCare/pcoff/bg-review-06.png",
  },
]

export default function PcOffTestimonialSection() {
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
                  <div className="relative w-full md:w-[280px] h-[220px] md:h-[300px] flex-shrink-0">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  {/* 컨텐츠 */}
                  <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                    <span className="inline-block px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-full w-fit mb-6">
                      {review.question}
                    </span>
                    <p className="whitespace-pre-line text-gray-900 text-xl md:text-2xl leading-relaxed mb-8 font-semibold tracking-tight">
                      &quot;{review.quote}&quot;
                    </p>
                    <p className="text-gray-500 text-base text-right">
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
