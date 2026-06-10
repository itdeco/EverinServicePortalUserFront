"use client"

import { useEffect, useState } from "react"

const SLIDE_DURATION = 5000

const reviews = [
  {
    id: 1,
    badge: "이런 고민, 익숙하지 않으신가요?",
    title: "출근은 했는데, 정작 출근 기록이 없다?",
    quote:
      "시스템 오류? 지각 처리? 또다시 HR팀에 문의 폭탄. 매일 아침, 직원들도 HR도 불안한 근태 관리… 왜 이렇게 복잡해야 할까요?",
    name: "김 과장",
    dept: "인사팀",
  },
  {
    id: 2,
    badge: "근태 관리, 한 번쯤 겪는 문제",
    title: "퇴근 후에도 몰래 이어지는 야근… 괜찮은 걸까?",
    quote:
      "PC는 꺼졌지만, 스마트폰으로 계속되는 업무 메시지. 출퇴근은 기록되지만, 업무 시간은 관리되지 않는 현실. 이제는 '진짜' 근태 관리가 필요할 때입니다",
    name: "박 주임",
    dept: "개발팀",
  },
  {
    id: 3,
    badge: "아직도 이렇게 관리하고 계신가요?",
    title: "연차를 써도 될까? 또 누구한테 물어봐야 하지?",
    quote:
      "팀원들 눈치, 승인 절차, 엑셀 기록까지… 연차 한 번 쓰는 것도 일이 되어버린 현실. 쉽고 투명한 근태 관리, 가능할까요?",
    name: "이 대리",
    dept: "마케팅팀",
  },
  {
    id: 4,
    badge: "복잡해진 제도, 더 어려워진 급여",
    title: "근무 시간은 줄어들었는데, 급여가 왜 달라졌지?",
    quote:
      "주 52시간, 유연근무제, 연장·야간·휴일근로… 제도는 복잡해지고, 실수 없는 급여 처리는 더 어려워졌습니다. HR팀도, 직원들도 혼란 없는 근태 관리가 필요합니다",
    name: "홍 과장",
    dept: "영업팀",
  },
  {
    id: 5,
    badge: "기록되지 않는 노력",
    title: "야근을 한 사람만 알고, 회사는 모른다",
    quote:
      "초과 근무를 해도 제대로 기록되지 않고, 연장 근로 수당도 제때 반영되지 않는 현실. 우리의 노력은 어디에도 남지 않는다.",
    name: "최 과장",
    dept: "기획팀",
  },
  {
    id: 6,
    badge: "이런 시스템이 있다면",
    title: "근태 기록이 자동으로 연동되면 얼마나 편할까?",
    quote:
      "출퇴근 기록, 연차 사용, 초과 근무까지… 모든 데이터가 자동으로 연동된다면 HR팀도 직원도 훨씬 편해질 텐데요.",
    name: "박 팀장",
    dept: "총무팀",
  },
]

export default function EvertimeReviewSection() {
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
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 lg:p-16 flex flex-col items-center text-center min-h-[320px] justify-center">
                  <span className="inline-block px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-full w-fit mb-6">
                    {review.badge}
                  </span>
                  <h3 className="text-gray-900 text-xl md:text-3xl leading-snug mb-5 font-bold tracking-tight text-balance">
                    {review.title}
                  </h3>
                  <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-3xl mb-8">
                    &quot;{review.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00cc99]/10 text-[#00cc99] font-bold text-lg">
                      {review.name.charAt(0)}
                    </span>
                    <div className="text-left">
                      <div className="text-gray-900 font-semibold">{review.name}</div>
                      <div className="text-gray-400 text-sm">{review.dept}</div>
                    </div>
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
