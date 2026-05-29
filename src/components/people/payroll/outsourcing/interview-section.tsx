"use client"

import { useState } from "react"
import { Quote } from "lucide-react"

const interviews = [
  {
    quote:
      "급여 업무만 맡은 지 벌써 3년째인데, 매년 세법이 바뀔 때마다 공부해야 할 게 너무 많아요. 급여 시즌엔 직원들 질문까지 폭주해서 본업은 뒷전이고, 스트레스가 너무 심해요.",
    name: "김*지 님",
    role: "30세, 중소기업 HR 담당자",
  },
  {
    quote:
      "최근 급여 담당자가 갑자기 퇴사해서 급여처리 업무가 한 달 넘게 꼬였어요. 급여 업무가 사람에 따라 좌우되니 늘 불안합니다.",
    name: "이*훈 님",
    role: "37세, 스타트업 HR 팀장",
  },
  {
    quote:
      "매장마다 수당 계산 방식이 달라서 아직도 엑셀 수기 계산으로 야근을 반복해요. 한 달에 며칠씩 수당만 잡고 있는 상황, 이젠 정말 바꾸고 싶습니다.",
    name: "박*연 님",
    role: "34세, 프랜차이즈 본사 인사팀",
  },
]

export default function OutsourcingInterviewSection() {
  const [active, setActive] = useState(0)
  const current = interviews[active]

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[960px] px-6 lg:px-12">
        <div className="text-center mb-10">
          <span
            className="inline-block px-5 py-2 text-base md:text-lg font-bold rounded-full"
            style={{ backgroundColor: "rgba(51,68,230,0.1)", color: "#3344e6" }}
          >
            이런 고민, 혹시 낯설지 않으신가요?
          </span>
        </div>

        <div className="rounded-3xl bg-gray-50 border border-gray-100 p-8 md:p-14 shadow-[0_24px_80px_rgba(15,23,42,0.05)]">
          <Quote className="h-10 w-10 mb-6" style={{ color: "#3344e6" }} />
          <p className="text-lg md:text-2xl text-gray-800 font-medium leading-relaxed mb-8">
            “{current.quote}”
          </p>
          <div className="h-px w-full bg-gray-200 mb-5" />
          <p className="text-right text-gray-600 font-semibold">
            {current.name} <span className="text-gray-400 font-normal">· {current.role}</span>
          </p>
        </div>

        {/* dots */}
        <div className="flex justify-center gap-3 mt-8">
          {interviews.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`인터뷰 ${idx + 1}`}
              onClick={() => setActive(idx)}
              className="h-3 rounded-full transition-all"
              style={{
                width: active === idx ? "32px" : "12px",
                backgroundColor: active === idx ? "#3344e6" : "#d1d5db",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
