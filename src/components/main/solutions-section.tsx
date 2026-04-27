"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const tabs = [
  { id: "attendance", label: "근태관리" },
  { id: "enterprise", label: "기업정보" },
  { id: "payroll", label: "급여관리" },
]

const tab1Features = [
  {
    title: "에버타임 스마트폰",
    desc: "GPS·WIFI·NFC로 어디서나\n간편하게 출퇴근 기록",
    img: "/images/main/solutions/tab1/tab1-solutions-02.png",
  },
  {
    title: "인사관리",
    desc: "전자계약·서명등록·연차촉진\n모바일에서 바로 처리",
    img: "/images/main/solutions/tab1/tab1-solutions-03.png",
  },
  {
    title: "PC-OFF",
    desc: "퇴근시간 자동 PC 종료\n업무강도 리포트 제공",
    img: "/images/main/solutions/tab1/tab1-solutions-04.png",
  },
]

export function SolutionsSection() {
  const [activeTab, setActiveTab] = useState("attendance")

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-3">
          <p className="text-sm text-emerald-500 font-semibold mb-2">에버인 솔루션</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
            반복 업무는 줄이고,<br />
            진짜 가치 있는 일에 집중하는 HR 솔루션을 경험하세요.
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-8 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                activeTab === tab.id
                  ? "bg-[#00dcaa] text-white border-[#00dcaa] shadow"
                  : "bg-white text-gray-600 border-gray-300 hover:border-[#00dcaa] hover:text-[#00dcaa]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* === 근태관리 Tab === */}
        <div className={cn(activeTab === "attendance" ? "block" : "hidden")}>
          {/* Big main screenshot */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-gray-100 shadow-lg bg-gray-50 mb-8">
            <Image
              src="/images/main/solutions/tab1/tab1-solutions-01.png"
              alt="근태관리 솔루션 메인 화면"
              width={1400}
              height={700}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* 3 feature boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tab1Features.map((f, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
                <div className="px-5 pt-5 pb-3">
                  <p className="font-bold text-gray-900 text-base">{f.title}</p>
                  <p className="text-gray-500 text-sm mt-1 whitespace-pre-line leading-relaxed">{f.desc}</p>
                </div>
                <div className="relative flex-1 min-h-[220px]">
                  <Image
                    src={f.img}
                    alt={f.title}
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === 기업정보 Tab === */}
        <div className={cn(activeTab === "enterprise" ? "block" : "hidden")}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white p-6">
              <p className="font-bold text-gray-900 text-base mb-2">시스템 연동</p>
              <p className="text-gray-500 text-sm mb-5">ERP 연동, 출입관리시스템 연동, 커스터마이징 및 추가개발</p>
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/main/solutions/tab2/tab2-solutions-03.png"
                  alt="시스템 연동"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white p-6">
              <p className="font-bold text-gray-900 text-base mb-2">다면 평가 시스템</p>
              <p className="text-gray-500 text-sm mb-5">역량·종합·업적·다면평가 통합 관리로 공정한 인사 결정</p>
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/main/solutions/tab2/tab2-solutions-04.png"
                  alt="평가 시스템"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* === 급여관리 Tab === */}
        <div className={cn(activeTab === "payroll" ? "block" : "hidden")}>
          {/* Main screenshot */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-gray-100 shadow-lg bg-gray-50 mb-8">
            <Image
              src="/images/main/solutions/tab2/tab2-solutions-01.png"
              alt="급여관리 솔루션"
              width={1400}
              height={700}
              className="w-full h-auto object-contain"
            />
          </div>
          {/* Feature icons */}
          <div className="border border-gray-100 rounded-2xl shadow-sm bg-white p-8">
            <p className="font-bold text-gray-900 text-base mb-5">급여 관련 부가 서비스</p>
            <div className="relative aspect-[16/5]">
              <Image
                src="/images/main/solutions/tab2/tab2-solutions-02.png"
                alt="급여 서비스 아이콘"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
