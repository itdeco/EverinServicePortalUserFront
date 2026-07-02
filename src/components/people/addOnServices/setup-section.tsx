"use client"

import Image from "next/image"
import { Settings2, UserCheck, Wrench } from "lucide-react"
import ScrollReveal from "@/components/common/scroll-reveal"
import { COLORS } from "@/constants/brand-colors"

const cards = [
  {
    Icon: UserCheck,
    title: "전문 컨설턴트 셋업 지원",
    desc: "복잡한 근무유형도 전문 컨설턴트가 셋업을 지원합니다. 계약 시 담당 파트너사가 지정되어 밀착 고객서비스를 제공합니다.",
    note: "* 에버타임 스탠다드 제외",
  },
  {
    Icon: Wrench,
    title: "커스텀 및 추가개발",
    desc: "제공되는 기능에서 우리 회사만의 커스텀이 필요하다면? 커스텀 및 추가개발을 제공합니다. 자세한 내용은 상담을 통해 진행됩니다.",
    note: "* 상담 후 진행",
  },
]

export default function SetupSection() {
  return (
    <section id="setup" className="scroll-mt-32 bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-12">
        <ScrollReveal className="mb-12 text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold"
            style={{ backgroundColor: `${COLORS.people}14`, color: COLORS.people }}
          >
            <Settings2 className="h-4 w-4" />
            SetUp / 추가개발
          </div>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            우리 회사에 꼭 맞는 커스텀 서비스
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            셋업부터 추가개발까지, 전담 파트너와 함께 우리 회사만의 HR 환경을 완성하세요.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
          <ScrollReveal>
            <div className="overflow-hidden rounded-[28px] border border-slate-200 shadow-sm">
              <Image
                src="/images/people/addOnServices/setup-consulting.png"
                alt="셋업 컨설팅"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-6">
            {cards.map((card, index) => {
              const Icon = card.Icon
              return (
                <ScrollReveal key={card.title} delay={index * 100}>
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-2xl text-white"
                        style={{ backgroundColor: COLORS.people }}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-xl font-bold text-slate-950">{card.title}</h3>
                    </div>
                    <p className="break-keep text-base leading-relaxed text-slate-600">{card.desc}</p>
                    <p className="mt-3 text-sm font-medium text-slate-400">{card.note}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
