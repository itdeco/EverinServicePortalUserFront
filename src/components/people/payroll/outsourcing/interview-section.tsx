"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Quote } from "lucide-react"

const SLIDE_DURATION = 5000

const interviews = [
  {
    quote:
      "급여 업무만 맡은 지 벌써 3년째인데, 매년 세법이 바뀔 때마다 공부해야 할 게 너무 많아요. 급여 시즌엔 직원들 질문까지 폭주해서 본업은 뒷전이고, 스트레스가 너무 심해요.",
    name: "김*지 님",
    role: "30세, 중소기업 HR 담당자",
    image: "/images/people/payroll/outsourcing/bg-review-07.png",
  },
  {
    quote:
      "최근 급여 담당자가 갑자기 퇴사해서 급여처리 업무가 한 달 넘게 꼬였어요. 급여 업무가 사람에 따라 좌우되니 늘 불안합니다.",
    name: "이*훈 님",
    role: "37세, 스타트업 HR 팀장",
    image: "/images/people/payroll/outsourcing/bg-review-08.png",
  },
  {
    quote:
      "매장마다 수당 계산 방식이 달라서 아직도 엑셀 수기 계산으로 야근을 반복해요. 한 달에 며칠씩 수당만 잡고 있는 상황, 이젠 정말 바꾸고 싶습니다.",
    name: "박*연 님",
    role: "34세, 프랜차이즈 본사 인사팀",
    image: "/images/people/payroll/outsourcing/bg-review-09.png",
  },
]

export default function OutsourcingInterviewSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % interviews.length)
    }, SLIDE_DURATION)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
        <div className="text-center mb-10">
          <span
            className="inline-block px-5 py-2 text-base md:text-lg font-bold rounded-full"
            style={{ backgroundColor: "rgba(51,68,230,0.1)", color: "#3344e6" }}
          >
            이런 고민, 혹시 낯설지 않으신가요?
          </span>
        </div>

        <div className="relative overflow-hidden">
          {/* 슬라이더 */}
          <div
            className="flex transition-transform duration-1000 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {interviews.map((review, idx) => (
              <div key={idx} className="w-full flex-shrink-0 px-2">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl shadow-[0_24px_80px_rgba(15,23,42,0.05)] overflow-hidden flex flex-col md:flex-row items-stretch">
                  {/* 이미지 */}
                  <div className="relative w-full md:w-[280px] h-[200px] md:h-auto flex-shrink-0">
                    <Image
                      src={review.image || "/placeholder.svg"}
                      alt={review.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  {/* 컨텐츠 */}
                  <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                    <Quote className="h-10 w-10 mb-6" style={{ color: "#3344e6" }} />
                    <p className="text-lg md:text-2xl text-gray-800 font-medium leading-relaxed mb-8">
                      &quot;{review.quote}&quot;
                    </p>
                    <div className="h-px w-full bg-gray-200 mb-5" />
                    <p className="text-right text-gray-600 font-semibold">
                      {review.name} <span className="text-gray-400 font-normal">· {review.role}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 인디케이터 */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {interviews.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`인터뷰 ${idx + 1} 보기`}
                onClick={() => setActiveIndex(idx)}
                className="h-3 rounded-full overflow-hidden bg-gray-300 transition-all duration-300"
                style={{ width: idx === activeIndex ? "40px" : "12px" }}
              >
                {idx === activeIndex && (
                  <span
                    key={activeIndex}
                    className="indicator-progress-fill block h-full rounded-full"
                    style={{ backgroundColor: "#3344e6", animationDuration: `${SLIDE_DURATION}ms` }}
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
