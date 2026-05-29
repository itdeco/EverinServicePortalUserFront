"use client"

import Image from "next/image"
import { useState } from "react"
import ScrollReveal from "@/components/common/scroll-reveal"

const tabs = [
  {
    id: "checkin",
    title: "출/퇴근 기록",
    image: "/images/people/smartWorkCare/evertime/bg-selection-09.png",
    description: "모든 직원이 모바일로 출/퇴근 등록이 가능하며, 관리자는 출근부 조회를 통해 확인하실 수 있습니다.",
  },
  {
    id: "schedule",
    title: "근무일정 조회",
    image: "/images/people/smartWorkCare/evertime/bg-selection-10.png",
    description: "근무일정을 일 단위부터 년 단위까지 한번에 설정하고 손쉽게 변경관리가 가능합니다.",
  },
  {
    id: "leave",
    title: "휴가신청",
    image: "/images/people/smartWorkCare/evertime/bg-selection-11.png",
    description: "연차, 경조사, 기타 휴가 등 신청이 가능하며 손쉽게 결재(승인/반려)처리가 가능합니다.",
  },
  {
    id: "adjust",
    title: "근무 조정",
    image: "/images/people/smartWorkCare/evertime/bg-selection-12.png",
    description: "근무시간 템플릿을 통하여 모든 유연근무제, 시차출퇴근, 자유출퇴근 및 회사맞춤형 근무제를 지원합니다.",
  },
  {
    id: "stats",
    title: "근태통계",
    image: "/images/people/smartWorkCare/evertime/bg-selection-13.png",
    description: "전직원의 근태현황을 한눈에 확인할 수 있으며 지각, 휴가, 휴무 등의 정보 조회가 가능합니다.",
  },
]

export default function EvertimeFeaturesSection() {
  const [activeTab, setActiveTab] = useState("checkin")
  const activeFeature = tabs.find((tab) => tab.id === activeTab)!

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
        {/* 상단 타이틀 */}
        <ScrollReveal className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">제공되는 서비스를 확인하세요.</h2>
          <p className="mt-4 text-base md:text-lg text-gray-600">
            출퇴근 기록부터 근무일정, 휴가, 근태통계까지 하나의 흐름으로 관리합니다.
          </p>
        </ScrollReveal>

        {/* 탭 버튼 */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:flex md:justify-center md:gap-2 md:pb-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex min-h-[56px] items-center justify-center rounded-2xl border px-4 py-3 text-sm font-bold transition-all md:min-h-0 md:shrink-0 md:rounded-full md:px-6 md:py-3 md:text-base ${
                  isActive
                    ? "border-[#00cc99] bg-[#00cc99] text-white shadow-[0_14px_30px_rgba(0,204,153,0.28)]"
                    : "border-slate-200 bg-white text-slate-600 shadow-sm hover:border-[#00cc99]/40 hover:bg-[#00cc99]/5 hover:text-slate-900"
                }`}
              >
                <span className="whitespace-nowrap">{tab.title}</span>
              </button>
            )
          })}
        </div>

        {/* 컨텐츠 영역 */}
        <ScrollReveal className="overflow-hidden rounded-[36px] border border-slate-100 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div key={activeTab} className="content-fade-in flex flex-col">
            {/* 텍스트 헤더 */}
            <div className="px-7 pt-9 pb-6 text-center md:px-12 md:pt-12">
              <h3 className="mb-3 text-2xl font-bold leading-tight text-slate-950 md:text-3xl">
                {activeFeature.title}
              </h3>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-500">
                {activeFeature.description}
              </p>
            </div>

            {/* 이미지 */}
            <div className="relative w-full bg-gradient-to-br from-[#f3fbff] via-white to-[#eafff8] px-4 pb-10 md:px-12">
              <div className="relative mx-auto w-full max-w-[1000px]">
                <Image
                  src={activeFeature.image}
                  alt={activeFeature.title}
                  width={1000}
                  height={620}
                  className="h-auto w-full object-contain drop-shadow-[0_24px_35px_rgba(15,23,42,0.12)]"
                  priority
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
