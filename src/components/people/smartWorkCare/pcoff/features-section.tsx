"use client"

import Image from "next/image"
import { useState } from "react"
import ScrollReveal from "@/components/common/scroll-reveal"

const tabs = [
  {
    id: "agent",
    title: "PC-OFF Agent",
    eyebrow: "PC-OFF Agent auto",
    detailTitle: "PC-OFF Agent 자동 관리",
    icon: "/images/people/smartWorkCare/pcoff/icon/Icon-pcoff-01.svg",
    image: "/images/people/smartWorkCare/pcoff/bg-service-carsoul-20.png",
    description:
      "직원 PC에 설치된 Agent가 자동으로 PC를 제어하여,\n정해진 근태정보를 기준으로 정확히 PC-OFF를 진행합니다",
  },
  {
    id: "mouse",
    title: "마우스·키보드 이석 관리",
    eyebrow: "Mouse & keyboard management",
    detailTitle: "마우스·키보드 이석 관리",
    icon: "/images/people/smartWorkCare/pcoff/icon/Icon-pcoff-02.svg",
    image: "/images/people/smartWorkCare/pcoff/bg-service-carsoul-21.png",
    description:
      "마우스·키보드의 움직임을 통해 실시간으로 이석 여부를 감지하여,\n정확한 근무시간을 체크합니다",
  },
  {
    id: "personal",
    title: "개인 사용모드 적용",
    eyebrow: "Personal PC usage mode",
    detailTitle: "개인 PC 사용모드 제공",
    icon: "/images/people/smartWorkCare/pcoff/icon/Icon-pcoff-03.svg",
    image: "/images/people/smartWorkCare/pcoff/bg-service-carsoul-22.png",
    description:
      "업무 종료 및 근무시간 외, 직원이 개인적 용도로 PC를 사용할 수\n있도록 별도의 개인 사용 모드를 지원하여 직원 만족도를 높입니다.",
  },
  {
    id: "notify",
    title: "다양한 알림",
    eyebrow: "Various PC-OFF notifications",
    detailTitle: "다양한 PC-OFF 알림 지원",
    icon: "/images/people/smartWorkCare/pcoff/icon/Icon-pcoff-04.svg",
    image: "/images/people/smartWorkCare/pcoff/bg-service-carsoul-23.png",
    description:
      "퇴근 전 사전 알림, 퇴근 시간 도달 알림, 연장근무 알림 등\n다양한 알림 기능을 제공하여 직원들의 혼란을 최소화합니다.",
  },
  {
    id: "evertime",
    title: "에버타임 PC-OFF 연동",
    eyebrow: "Evertime attendance link",
    detailTitle: "에버타임 근태정보 연동",
    icon: "/images/people/smartWorkCare/pcoff/icon/Icon-pcoff-05.svg",
    image: "/images/people/smartWorkCare/pcoff/bg-service-carsoul-24.png",
    description:
      "별도의 데이터 관리 없이 에버타임의 실시간 근태정보만 연동하여\n정확하고 투명한 PC-OFF 관리가 가능합니다.",
  },
]

export default function PcOffFeaturesSection() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const activeFeature = tabs.find((tab) => tab.id === activeTab)!

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
        {/* 상단 타이틀 */}
        <ScrollReveal className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            제공되는 서비스를 확인하세요.
          </h2>
        </ScrollReveal>

        {/* 탭 버튼 */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:flex md:justify-center md:gap-2 md:overflow-x-auto md:pb-2 md:scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex min-h-[64px] items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold transition-all md:min-h-0 md:shrink-0 md:rounded-full md:px-6 md:py-3 md:text-base ${
                  isActive
                    ? "border-[#00cc99] bg-[#00cc99] text-white shadow-[0_14px_30px_rgba(0,204,153,0.28)]"
                    : "border-slate-200 bg-white text-slate-600 shadow-sm hover:border-[#00cc99]/40 hover:bg-[#00cc99]/5 hover:text-slate-900"
                }`}
              >
                <Image
                  src={tab.icon}
                  alt=""
                  width={18}
                  height={18}
                  className={isActive ? "brightness-0 invert" : ""}
                />
                <span className="whitespace-nowrap">{tab.title}</span>
              </button>
            )
          })}
        </div>

        {/* 컨텐츠 영역 */}
        <ScrollReveal className="overflow-hidden rounded-[36px] border border-slate-100 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div key={activeTab} className="content-fade-in grid grid-cols-1 lg:grid-cols-[52%_1fr]">
            {/* 좌측 이미지 */}
            <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#f3fbff] via-white to-[#eafff8] md:min-h-[420px]">
              <div className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00cc99]/10 blur-2xl md:h-[320px] md:w-[320px] md:blur-3xl" />
              <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-blue-100/60 blur-2xl" />
              <div className="absolute bottom-8 right-10 h-28 w-28 rounded-full bg-emerald-100/70 blur-2xl" />

              <div className="relative h-[200px] w-[78%] md:h-[340px] md:w-[82%]">
                <Image
                  src={activeFeature.image}
                  alt={activeFeature.detailTitle}
                  fill
                  className="object-contain drop-shadow-[0_24px_35px_rgba(15,23,42,0.12)]"
                  priority
                />
              </div>
            </div>

            {/* 우측 텍스트 */}
            <div className="flex flex-col justify-center px-7 py-9 md:px-12 lg:px-14">
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#00cc99]">
                {activeFeature.eyebrow}
              </h4>
              <h3 className="mb-5 text-2xl font-bold leading-tight text-slate-950 md:text-3xl">
                {activeFeature.detailTitle}
              </h3>
              <p className="whitespace-pre text-[clamp(13px,2.6cqw,20px)] text-base leading-relaxed text-slate-600 md:text-lg">
                {activeFeature.description}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
