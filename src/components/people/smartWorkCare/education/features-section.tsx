"use client"

import Image from "next/image"
import { useState } from "react"
import { ClipboardList, UsersRound, FilePen, Receipt } from "lucide-react"

const tabs = [
  {
    id: "plan",
    title: "회사 학습 계획 등록",
    icon: ClipboardList,
    image: "/images/people/smartWorkCare/education/edu-plan.png",
    intro: "회사 내 학습계획을 등록하는 화면입니다.",
    description: [
      "학습의 분류와 구분을 나눠\n학습과정별로 체계적으로 관리",
      "환급과정 여부, 사내·사외 학습을\n하나의 화면에서 통합 관리",
    ],
  },
  {
    id: "target",
    title: "대상자 등록 및 학습 신청",
    icon: UsersRound,
    image: "/images/people/smartWorkCare/education/edu-target.png",
    intro: "사내 학습계획의 대상자를 일괄 검색하여 등록하는 화면입니다.",
    description: [
      "부서별·직위·직급 등을 기준으로\n대상자를 일괄 등록",
      "학습 대상자는 개인별 신청과\n일괄 등록을 함께 지원",
    ],
  },
  {
    id: "apply",
    title: "학습 신청 등록",
    icon: FilePen,
    image: "/images/people/smartWorkCare/education/edu-apply.png",
    intro: "개인별·일괄 학습 신청을 등록하고 관리하는 화면입니다.",
    description: [
      "지정된 대상자가 손쉽게\n학습 과정을 신청",
      "신청 현황을 실시간으로 확인하고\n행정 프로세스 효율화",
    ],
  },
  {
    id: "result",
    title: "학습 결과 등록 & 정산",
    icon: Receipt,
    image: "/images/people/smartWorkCare/education/edu-result.png",
    intro: "학습 결과와 함께 환급 대상·정산금액을 등록해 정산 관리가 가능합니다.",
    description: [
      "학습비용의 환급 대상·정산금액을\n등록하여 정산 관리",
      "신청 절차 없이 결과 등록만으로도\n정산 관리가 가능",
    ],
  },
]

export default function EducationFeaturesSection() {
  const [activeTab, setActiveTab] = useState("plan")
  const activeFeature = tabs.find((tab) => tab.id === activeTab)!

  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
        {/* 상단 타이틀 */}
        <div className="mb-10 text-center">
          <span className="inline-block px-5 py-2 text-sm md:text-base font-bold text-[#03b565] bg-[#03b565]/10 rounded-full mb-4">
            역량 중심 내·외부 교육관리
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance">
            전사 교육계획을 통한 조직 경쟁력 강화
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 text-pretty">
            전사 교육계획 수립과 실행을 지원하는 체계적인 학습 관리 시스템입니다.
          </p>
        </div>

        {/* 탭 버튼 */}
        <div className="mb-8 grid grid-cols-2 gap-3 md:flex md:justify-center md:gap-2 md:flex-wrap">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex min-h-[64px] items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold transition-all md:min-h-0 md:shrink-0 md:rounded-full md:px-6 md:py-3 md:text-base ${
                  isActive
                    ? "border-[#03b565] bg-[#03b565] text-white shadow-[0_14px_30px_rgba(3,181,101,0.28)]"
                    : "border-slate-200 bg-white text-slate-600 shadow-sm hover:border-[#03b565]/40 hover:bg-[#03b565]/5 hover:text-slate-900"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
                <span className="whitespace-nowrap">{tab.title}</span>
              </button>
            )
          })}
        </div>

        {/* 컨텐츠 영역 */}
        <div className="overflow-hidden rounded-[36px] border border-slate-100 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-[56%_1fr]">
            {/* 좌측 이미지 */}
            <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#f3fbff] via-white to-[#eafff8] p-6 md:min-h-[460px] md:p-10">
              <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#03b565]/10 blur-3xl" />
              <div className="relative w-full overflow-hidden rounded-2xl border border-slate-100 shadow-[0_24px_50px_rgba(15,23,42,0.14)]">
                <Image
                  src={activeFeature.image}
                  alt={activeFeature.title}
                  width={1200}
                  height={800}
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>
            </div>

            {/* 우측 텍스트 */}
            <div className="flex flex-col justify-center px-7 py-9 md:px-12 lg:px-10">
              <h3 className="mb-4 text-2xl font-bold leading-tight text-slate-950 md:text-3xl">
                {activeFeature.title}
              </h3>

              <p className="mb-7 text-base leading-relaxed text-slate-500">
                {activeFeature.intro}
              </p>

              <ul className="space-y-3">
                {activeFeature.description.map((desc, idx) => (
                  <li
                    key={idx}
                    className="@container flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3"
                  >
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#03b565]">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <span className="whitespace-pre-line text-[clamp(13px,2.6cqw,16px)] leading-relaxed text-slate-700">
                      {desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
