"use client"

import Image from "next/image"
import { useState } from "react"
import { Users, Calculator, Receipt, Smartphone, BarChart3, PieChart } from "lucide-react"

const tabs = [
  {
    id: "hr-info",
    title: "인사관리",
    icon: Users,
    image: "/images/people/payroll/salary-bonus/feature-hr-info.png",
    intro: "개인정보부터 통계까지, 클릭 한 번이면 끝!",
    heading: "개인인사정보 · 발령관리 · 증명서신청 · 인사통계",
    description: [
      "개인인사정보 관리부터 발령 업무, 증명서 신청까지 한 번에 처리",
      "인사통계까지 인사 업무의 모든 순간을 빠르고 스마트하게 해결",
    ],
  },
  {
    id: "salary-mgmt",
    title: "급여관리",
    icon: Calculator,
    image: "/images/people/payroll/salary-bonus/feature-salary-mgmt.png",
    intro: "급여산식은 자유롭게, 개인관리는 정확하게!",
    heading: "급여항목별 산식 설정 · 개인별 금액 입력 및 관리",
    description: [
      "급여항목별 산식을 자유롭게 설정하여 자동 계산",
      "개인별 금액 입력부터 관리까지 쉽고 정확하게 처리",
    ],
  },
  {
    id: "payslip",
    title: "급상여처리",
    icon: Receipt,
    image: "/images/people/payroll/salary-bonus/feature-payslip.png",
    intro: "급여·상여 처리는 빠르게, 명세서 발송은 간편하게!",
    heading: "급상여처리 · 출력 · 급여명세서 발송 · 급상여데이터분석",
    description: [
      "급상여 처리부터 출력, 명세서 발송까지 전 과정을 효율적으로 지원",
      "급상여 데이터 분석으로 정확한 급여 운영 가능",
    ],
  },
  {
    id: "mobile",
    title: "모바일 급여명세서",
    icon: Smartphone,
    image: "/images/people/payroll/salary-bonus/feature-mobile-payslip.png",
    intro: "이제 급여명세서도 모바일 시대!",
    heading: "모바일 급여명세서",
    description: [
      "언제 어디서나 모바일로 편리하게 급여명세서를 확인",
      "직원이 직접 급여를 조회하는 셀프서비스 제공",
    ],
  },
  {
    id: "reportMst",
    title: "신고관리",
    icon: PieChart,
    image: "/images/people/payroll/salary-bonus/bg-service-spy-05.png",
    intro: "원천세부터 4대보험까지, 복잡한 급여업무는 이제 그만!",
    heading: "신고관리",
    description: [
      "원천세 · 지방소득세특별징수 · 간이지급명세 · 보험취득 · 상실신고 등",
      "원천세부터 지방소득세 특별징수, 간이지급명세 제출, 보험취득 및 상실신고까지 복잡한 급여 업무를 쉽고 정확하게 처리합니다.",
    ],
  },
  {
    id: "eContract",
    title: "전자계약",
    icon: BarChart3,
    image: "/images/people/payroll/salary-bonus/bg-service-spy-07.png",
    intro: "종이 없는 근로계약, 스마트한 시작! 모바일로 빠르고 간편하게, 계약의 혁신을 경험하세요.",
    heading: "전자계약",
    description: [
      "전자근로계약 모바일 앱",
      "전자근로계약을 모바일 앱으로 언제 어디서나 편리하게 체결할 수 있습니다.",
    ],
  },
  {
    id: "headcount",
    title: "인원현황",
    icon: PieChart,
    image: "/images/people/payroll/salary-bonus/bg-service-spy-08.png",
    intro: "복잡한 인원현황, 이젠 한눈에!",
    heading: "인원현황",
    description: [
      "인원현황",
      "우리 회사 인원현황을 빠르고 간편하게 한눈에 확인할 수 있습니다.",
    ],
  },
  {
    id: "insight",
    title: "급여 인사이트",
    icon: BarChart3,
    image: "/images/people/payroll/salary-bonus/feature-insight.png",
    intro: "급여부터 세금, 통계까지 한눈에 담았다! HR 담당자의 업무를 쉽고 빠르게,",
    heading: "급여 및 인사 Insight",
    description: [
      "급상여 처리결과, 근태, 원천징수, 세액 시뮬레이션 등 정보 제공",
      "HR 담당자의 업무를 쉽고 빠르게 지원",
    ],
  },
]

export default function SalaryBonusFeaturesSection() {
  const [activeTab, setActiveTab] = useState("hr-info")
  const activeFeature = tabs.find((tab) => tab.id === activeTab)!

  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
        {/* 상단 타이틀 */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            제공되는 서비스를 확인하세요
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600">
            급여·상여 업무의 전 과정을 에버페이롤 하나로 정확하고 빠르게 처리하세요.
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
