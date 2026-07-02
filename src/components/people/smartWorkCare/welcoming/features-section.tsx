"use client"

import Image from "next/image"
import { useState } from "react"
import { Sparkles, Building2, FileCheck, Headphones, ListTodo } from "lucide-react"

const tabs = [
  {
    id: "ai",
    title: "AI 컨텐츠 빌더",
    icon: Sparkles,
    image: "/images/people/smartWorkCare/welcoming/feature-ai-builder.png",
    intro: "흩어져 있던 사내 정보를 AI가 한 번에 정리해 누구나 쉽게 활용할 수 있도록 돕습니다.",
    description: [
      "AI 컨텐츠 빌더를 통해 흩어져 있는\n사내 정보를 한번에 분류 및 재정비",
      "신규 입사자에게 필요한 콘텐츠를 빠르게 구성",
    ],
  },
  {
    id: "vision",
    title: "회사 비전 및 미션소개",
    icon: Building2,
    image: "/images/people/smartWorkCare/welcoming/feature-vision.jfif",
    intro: "입사 첫 순간부터 회사의 방향성과 문화를 자연스럽게 전달합니다.",
    description: [
      "모바일앱을 통해 정책, 조직문화,\n핵심가치를 효과적으로 제공",
      "신규 입사자가 회사를 빠르게 이해하도록 지원",
    ],
  },
  {
    id: "documents",
    title: "입사자 제출서류 통합관리",
    icon: FileCheck,
    image: "/images/people/smartWorkCare/welcoming/feature-documents.png",
    intro: "제출 요청부터 알림까지, 서류 관리를 자동화합니다.",
    description: [
      "제출 서류 요청, 제출 현황 관리,\n미제출 알림 자동화 기능 제공",
      "누락 없는 서류 관리로 HR 업무 부담 감소",
    ],
  },
  {
    id: "support",
    title: "신속한 지원시스템",
    icon: Headphones,
    image: [
      "/images/people/smartWorkCare/welcoming/feature-support_1.jfif",
      "/images/people/smartWorkCare/welcoming/feature-support_2.jfif",
    ],
    intro: "궁금한 점이 생기면 언제든 바로 물어보고 답을 받을 수 있습니다.",
    description: [
      "신규 직원이 쉽게 도움 요청 및\n질의응답이 가능한 실시간 Q&A 제공",
      "빠른 응답으로 입사 초기 적응을 지원",
    ],
  },
  {
    id: "todo",
    title: "To-Do 관리",
    icon: ListTodo,
    image: "/images/people/smartWorkCare/welcoming/feature-todo.jfif",
    intro: "입사자가 해야 할 일을 한눈에 확인하고 체계적으로 완료할 수 있습니다.",
    description: [
      "온보딩 단계별 할 일을 체크리스트로 제공\n(26년 하반기 예정)",
      "진행 현황을 실시간으로 확인",
    ],
  },
]

export default function WelcomingFeaturesSection() {
  const [activeTab, setActiveTab] = useState("ai")
  const activeFeature = tabs.find((tab) => tab.id === activeTab)!
  const activeImages = Array.isArray(activeFeature.image)
    ? activeFeature.image
    : [activeFeature.image]

  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
        {/* 상단 타이틀 */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            제공되는 서비스를 확인하세요
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600">
            신규 입사자의 첫 경험을 따뜻하고 체계적으로 만드는 핵심 기능들입니다.
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
                    ? "border-[#00cc99] bg-[#00cc99] text-white shadow-[0_14px_30px_rgba(0,204,153,0.28)]"
                    : "border-slate-200 bg-white text-slate-600 shadow-sm hover:border-[#00cc99]/40 hover:bg-[#00cc99]/5 hover:text-slate-900"
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
          <div className="grid grid-cols-1 lg:grid-cols-[48%_1fr]">
            {/* 좌측 이미지 */}
            <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#f3fbff] via-white to-[#eafff8] md:min-h-[420px]">
              <div className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00cc99]/10 blur-2xl md:h-[320px] md:w-[320px] md:blur-3xl" />
              <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-blue-100/60 blur-2xl" />
              <div className="absolute bottom-8 right-10 h-28 w-28 rounded-full bg-emerald-100/70 blur-2xl" />

              <div
                className={`relative grid h-[200px] w-[86%] gap-3 md:h-[340px] md:w-[88%] lg:h-[380px] ${
                  activeImages.length > 1 ? "grid-cols-2" : "grid-cols-1"
                }`}
              >
                {activeImages.map((image, index) => (
                  <div key={image} className="relative min-w-0 overflow-hidden rounded-2xl">
                    <Image
                      src={image}
                      alt={`${activeFeature.title}${activeImages.length > 1 ? ` ${index + 1}` : ""}`}
                      fill
                      className="rounded-2xl object-contain drop-shadow-[0_24px_35px_rgba(15,23,42,0.12)]"
                      priority
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 우측 텍스트 */}
            <div className="flex flex-col justify-center px-7 py-9 md:px-12 lg:px-10">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-bold leading-tight text-slate-950 md:text-3xl">
                  {activeFeature.title}
                </h3>
                {activeFeature.badge && (
                  <span className="inline-block px-2.5 py-1 text-xs font-medium text-orange-600 bg-orange-100 rounded-full">
                    {activeFeature.badge}
                  </span>
                )}
              </div>

              <p className="mb-7 text-base leading-relaxed text-slate-500">
                {activeFeature.intro}
              </p>

              <ul className="space-y-3">
                {activeFeature.description.map((desc, idx) => (
                  <li
                    key={idx}
                    className="@container flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3"
                  >
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00cc99]">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <span className="whitespace-pre text-[clamp(13px,2.6cqw,16px)] leading-relaxed text-slate-700">
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
