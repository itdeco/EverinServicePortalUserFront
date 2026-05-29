"use client"

import Image from "next/image"
import { useState } from "react"
import { ClipboardList, FileText, MessagesSquare, HelpCircle, Bell } from "lucide-react"

const tabs = [
  {
    id: "task-mgmt",
    title: "페이롤 업무관리",
    icon: ClipboardList,
    image: "/images/people/payroll/outsourcing/feature-task-mgmt.png",
    intro: "매월 급여업무, 진행상황을 한눈에!",
    heading: "페이롤 업무 관리",
    description: [
      "매월 급여업무 진행현황을 한눈에 파악",
      "업무 누락과 지연을 바로 확인하고 빠르게 조치",
      "업무 이력을 편리하게 기록하고 보고서를 간편히 생성",
    ],
  },
  {
    id: "post",
    title: "업무포스트",
    icon: FileText,
    image: "/images/people/payroll/outsourcing/feature-post.png",
    intro: "고객사와 BP사, 업무 공유가 쉬워집니다.",
    heading: "업무 포스트",
    description: [
      "고객사와 BP사 간 업무내용을 손쉽게 공유",
      "파일 버전이 자동으로 관리되어 업무 혼란을 방지",
      "이전에 공유된 내용을 쉽게 검색하고 활용",
    ],
  },
  {
    id: "messenger",
    title: "메신저",
    icon: MessagesSquare,
    image: "/images/people/payroll/outsourcing/feature-messenger.png",
    intro: "민감한 급여정보도 안심하고 빠르게!",
    heading: "메신저 (Teams 채팅)",
    description: [
      "Microsoft Teams 채팅으로 쉽고 안전하게 소통",
      "민감한 급여정보도 안심하고 빠르게 주고받음",
      "업무별 채팅방을 만들어 명확한 업무 처리가 가능",
    ],
  },
  {
    id: "qna",
    title: "Q&A",
    icon: HelpCircle,
    image: "/images/people/payroll/outsourcing/feature-qna.png",
    intro: "급여 업무 질문, 간편하게 묻고 신속하게 답변!",
    heading: "Q&A 게시판",
    description: [
      "급여 업무 질문을 간편하게 올리고 신속히 답변받음",
      "자주 묻는 질문에 대해서는 자동으로 답변을 추천받음",
      "질문과 답변이 기록되어 업무 처리 시간을 단축",
    ],
  },
  {
    id: "bot",
    title: "알림Bot",
    icon: Bell,
    image: "/images/people/payroll/outsourcing/feature-bot.png",
    intro: "중요한 마감일, 이제 놓치지 마세요!",
    heading: "업무 알림 Bot",
    description: [
      "주요 업무 마감일과 자료 제출일을 놓치지 않도록 미리 알림",
      "업무에 문제가 생기면 담당자에게 바로 알림을 전달",
      "Bot을 활용해 업무 상태를 실시간으로 체크",
    ],
  },
]

export default function OutsourcingFeaturesSection() {
  const [activeTab, setActiveTab] = useState("task-mgmt")
  const activeFeature = tabs.find((tab) => tab.id === activeTab)!

  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
        {/* 상단 타이틀 */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            &ldquo;커뮤니케이션이 바뀌면, 아웃소싱 업무의 질도 바뀝니다.&rdquo;
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600">
            급여 아웃소싱, 에버톡으로 더 빠르고 똑똑하게!
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
                    ? "border-transparent text-white shadow-[0_14px_30px_rgba(51,68,230,0.28)]"
                    : "border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-[#3344e6]/5 hover:text-slate-900"
                }`}
                style={isActive ? { backgroundColor: "#3344e6" } : undefined}
              >
                <Icon className="h-[18px] w-[18px]" />
                <span className="whitespace-nowrap">{tab.title}</span>
              </button>
            )
          })}
        </div>

        {/* 컨텐츠 영역 */}
        <div className="overflow-hidden rounded-[36px] border border-slate-100 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-[52%_1fr]">
            {/* 좌측 이미지 */}
            <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#eef1ff] via-white to-[#f3f5ff] md:min-h-[420px]">
              <div className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3344e6]/10 blur-2xl md:h-[320px] md:w-[320px] md:blur-3xl" />
              <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-blue-100/60 blur-2xl" />
              <div className="absolute bottom-8 right-10 h-28 w-28 rounded-full bg-indigo-100/70 blur-2xl" />

              <div className="relative h-[200px] w-[86%] md:h-[340px] md:w-[88%] lg:h-[380px]">
                <Image
                  src={activeFeature.image}
                  alt={activeFeature.title}
                  fill
                  className="object-contain rounded-xl drop-shadow-[0_24px_35px_rgba(15,23,42,0.12)]"
                  priority
                />
              </div>
            </div>

            {/* 우측 텍스트 */}
            <div className="flex flex-col justify-center px-7 py-9 md:px-12 lg:px-14">
              <p className="mb-3 text-sm font-bold md:text-base" style={{ color: "#3344e6" }}>
                {activeFeature.intro}
              </p>
              <h3 className="mb-5 text-xl font-bold leading-snug text-slate-950 md:text-2xl">
                {activeFeature.heading}
              </h3>

              <ul className="space-y-3">
                {activeFeature.description.map((desc, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3"
                  >
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#3344e6" }}>
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <span className="text-[15px] leading-relaxed text-slate-700 md:text-base">
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
