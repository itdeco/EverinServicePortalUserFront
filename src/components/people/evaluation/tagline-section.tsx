"use client"

import { BarChart3, ClipboardCheck, MessageSquareText } from "lucide-react"
import ScrollReveal from "@/components/common/scroll-reveal"
import { COLORS } from "@/constants/brand-colors"

const cards = [
  {
    title: "Point 1",
    desc: "조직의 특성에 맞게 평가 기간, 대상자 그룹, 직무 역량을 자유롭게 커스터마이징 할 수 있습니다.",
  },
  {
    title: "Point 2",
    desc: "본부 및 부서별 관대화/엄격화 경향을 방지하기 위한 평균, 표준편차 자동 조정 기능을 제공합니다.",
  },
  {
    title: "Point 3",
    desc: "평가 진행 단계부터 최종 등급별 인원 분포까지 인사평가 데이터를 한눈에 확인할 수 있습니다.",
  },
]

export default function EvaluationTaglineSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <ScrollReveal className="mb-12 text-center">
          <h2 className="mb-5 text-3xl font-bold text-gray-900 md:text-4xl">
            업적별로, 역량별로, 다면평가<br/>
            그리고 종합평가까지 공정한 평가를 원하시나요?<br/><br/>
          </h2>
          <h1
              className="hero-item mb-2 text-[42px] font-black leading-tight text-gray-900 sm:text-5xl md:text-6xl"
              style={{ color: COLORS.evaluation,animationDelay: "0.3s" }}
          >
            에버평가로 정리하세요.
          </h1>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card, index) => {

            return (
              <ScrollReveal key={card.title} delay={index * 100}>
                <div className="flex h-full flex-col rounded-2xl border border-blue-100 bg-[#f6fbff] p-8 shadow-sm">
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
