"use client"

import { BarChart3, ClipboardCheck, MessageSquareText } from "lucide-react"
import ScrollReveal from "@/components/common/scroll-reveal"
import { COLORS } from "@/constants/brand-colors"

const cards = [
  {
    icon: ClipboardCheck,
    title: "목표와 평가 기준을\n한 화면에서 정리",
    desc: "개인·조직 목표와 평가 항목을 명확히 연결합니다.",
  },
  {
    icon: BarChart3,
    title: "업적·역량 결과를\n데이터로 비교",
    desc: "평가 결과를 누적 관리해 성장 흐름을 확인합니다.",
  },
  {
    icon: MessageSquareText,
    title: "다면 피드백으로\n공정성 강화",
    desc: "상사, 동료, 본인의 관점을 함께 반영합니다.",
  },
]

export default function EvaluationTaglineSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <ScrollReveal className="mb-12 text-center">
          <h2 className="mb-5 text-3xl font-bold text-gray-900 md:text-4xl">
            평가 운영, 엑셀과 메일로 흩어지지 않게
          </h2>
          <p className="text-lg text-gray-600 md:text-xl">
            평가 설계부터 결과 확인까지 담당자와 구성원 모두에게 선명한 경험을 제공합니다.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon

            return (
              <ScrollReveal key={card.title} delay={index * 100}>
                <div className="flex h-full flex-col rounded-2xl border border-blue-100 bg-[#f6fbff] p-8 shadow-sm">
                  <div
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
                    style={{ background: COLORS.evaluation }}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-4 whitespace-pre-line text-xl font-bold leading-snug text-gray-950">
                    {card.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-600">{card.desc}</p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
