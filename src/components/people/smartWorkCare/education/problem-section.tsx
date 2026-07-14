"use client"

import { useEffect, useRef, useState } from "react"
import { CalendarClock, Users2, AlertTriangle } from "lucide-react"

const problems = [
  {
    no: "01",
    icon: CalendarClock,
    title: "매년 반복되는 교육계획 수립",
    desc: "사내·사외, 환급·비환급, 부서별 커리큘럼\n같은 작업을 매년 다시 짜야 하는 부담.",
  },
  {
    no: "02",
    icon: Users2,
    title: "부서·직급별 대상자 관리 혼선",
    desc: "엑셀로 관리되는 대상자 리스트,\n부서 이동 한 번에 신청 데이터가 흩어짐.",
  },
  {
    no: "03",
    icon: AlertTriangle,
    title: "환급과정 누락으로 인한 비용 손실",
    desc: "고용보험 환급 대상인지 아닌지,\n정산 시점에서야 뒤늦게 파악되는 리스크.",
  },
]

export default function EducationProblemSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="mb-12 text-center">
          <span className="inline-block px-5 py-2 text-sm md:text-base font-bold text-[#03b565] bg-[#03b565]/10 rounded-full mb-4">
            Pain Points
          </span>
          <h2 className="text-3xl md:text-[40px] font-black text-gray-900 leading-snug text-balance">
            HR팀이 매년 마주하는 세 가지 반복 통증
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={item.no}
                className="relative flex flex-col rounded-3xl bg-white p-8 border border-gray-100 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none hover:-translate-y-2 hover:shadow-xl"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(28px)",
                  transitionDelay: `${idx * 150}ms`,
                }}
              >
                <span className="absolute right-7 top-7 text-4xl font-black text-gray-100">
                  {item.no}
                </span>
                <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#03b565]/15 to-[#03b565]/5">
                  <Icon className="h-7 w-7 text-[#03b565]" />
                </span>
                <h3 className="mb-3 text-xl font-bold text-gray-900 leading-snug">
                  {item.title}
                </h3>
                <p className="whitespace-pre-line text-base leading-relaxed text-gray-500">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
