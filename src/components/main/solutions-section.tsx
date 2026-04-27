"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

const tabs = [
  { id: "hr", label: "인사관리" },
  { id: "culture", label: "기업문화" },
  { id: "groupware", label: "그룹웨어" },
]

/* ─── 인사관리 탭 데이터 ─── */
const hrMainCard = {
  title: "에버타임 스탠다드",
  desc: "복잡한 근로기준법, 더 이상 걱정하지 마세요.\n실시간 모니터링으로 법적 리스크를 0%로",
  img: "/images/main/solutions/tab1/tab1-solutions-01.png",
  href: "/",
}

const hrSubCards = [
  {
    title: "에버웰커밍",
    desc: "신규 입사자의 조직 적응을 위한 따뜻한 온보딩\nAI 빌더 탑재로 자동화된 프로세스",
    img: "/images/main/solutions/tab1/tab1-solutions-02.png",
    href: "/",
  },
  {
    title: "인사관리",
    desc: "인사정보, 전자근로계약서, 보안",
    img: "/images/main/solutions/tab1/tab1-solutions-03.png",
    href: "/",
  },
  {
    title: "PC-OFF",
    desc: "퇴근 후에도 업무용 PC가 켜져 있다면?\n주52시간 초과 리스크 완전 차단",
    img: "/images/main/solutions/tab1/tab1-solutions-04.png",
    href: "/",
  },
]

/* ─── 기업문화 탭 데이터 ─── */
const cultureCards = [
  {
    title: "시스템 연동",
    desc: "ERP 연동, 출입관리시스템 연동, 커스터마이징 및 추가개발",
    img: "/images/main/solutions/tab2/tab2-solutions-03.png",
    href: "/",
  },
  {
    title: "다면 평가 시스템",
    desc: "역량·종합·업적·다면평가 통합 관리로 공정한 인사 결정",
    img: "/images/main/solutions/tab2/tab2-solutions-04.png",
    href: "/",
  },
]

/* ─── 그룹웨어 탭 데이터 ─── */
const groupwareMainCard = {
  title: "급여관리",
  desc: "복잡한 급여 계산도 자동으로\n정확하고 빠른 급여 처리 솔루션",
  img: "/images/main/solutions/tab2/tab2-solutions-01.png",
  href: "/",
}

const groupwareSubCard = {
  title: "급여 관련 부가 서비스",
  desc: "다양한 급여 부가 서비스로 더욱 편리하게",
  img: "/images/main/solutions/tab2/tab2-solutions-02.png",
  href: "/",
}

export function SolutionsSection() {
  const [activeTab, setActiveTab] = useState("hr")

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
        <div className="flex gap-3 mt-8 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border",
                activeTab === tab.id
                  ? "bg-[#00dcaa] text-white border-[#00dcaa] shadow-sm"
                  : "bg-white text-gray-600 border-gray-300 hover:border-[#00dcaa] hover:text-[#00dcaa]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── 인사관리 Tab ─── */}
        <div className={cn(activeTab === "hr" ? "block" : "hidden")}>

          {/* Main big card (full width) */}
          <div className="rounded-2xl bg-[#f7f8fa] border border-gray-100 overflow-hidden mb-5 flex flex-col md:flex-row items-stretch min-h-[260px]">
            <div className="flex flex-col justify-center px-8 py-8 md:py-10 md:w-[38%] shrink-0">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{hrMainCard.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line mb-6">{hrMainCard.desc}</p>
              <Link
                href={hrMainCard.href}
                className="inline-flex items-center justify-center w-fit px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:border-[#00dcaa] hover:text-[#00dcaa] transition-colors"
              >
                자세히 보기
              </Link>
            </div>
            <div className="relative flex-1 min-h-[220px]">
              <Image
                src={hrMainCard.img}
                alt={hrMainCard.title}
                fill
                className="object-cover object-left-top"
              />
            </div>
          </div>

          {/* Sub cards: 에버웰커밍 (left, large) + 인사관리 + PC-OFF (right, stacked) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 에버웰커밍 - left */}
            <div className="rounded-2xl bg-[#f7f8fa] border border-gray-100 overflow-hidden flex flex-col min-h-[300px]">
              <div className="px-7 pt-7 pb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{hrSubCards[0].title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line mb-5">{hrSubCards[0].desc}</p>
                <Link
                  href={hrSubCards[0].href}
                  className="inline-flex items-center justify-center w-fit px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:border-[#00dcaa] hover:text-[#00dcaa] transition-colors"
                >
                  자세히 보기
                </Link>
              </div>
              <div className="relative flex-1 min-h-[200px]">
                <Image
                  src={hrSubCards[0].img}
                  alt={hrSubCards[0].title}
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            {/* 인사관리 + PC-OFF - right stacked */}
            <div className="flex flex-col gap-5">
              {hrSubCards.slice(1).map((card, i) => (
                <div key={i} className="rounded-2xl bg-[#f7f8fa] border border-gray-100 overflow-hidden flex flex-row items-stretch min-h-[140px]">
                  <div className="flex flex-col justify-center px-6 py-6 flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-1.5">{card.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line mb-4">{card.desc}</p>
                    <Link
                      href={card.href}
                      className="inline-flex items-center justify-center w-fit px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 text-xs font-medium hover:border-[#00dcaa] hover:text-[#00dcaa] transition-colors"
                    >
                      자세히 보기
                    </Link>
                  </div>
                  <div className="relative w-[180px] shrink-0">
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      className="object-contain object-right"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── 기업문화 Tab ─── */}
        <div className={cn(activeTab === "culture" ? "block" : "hidden")}>
          <div className="py-20 text-center text-gray-400">
            준비 중입니다.
          </div>
        </div>

        {/* ─── 그룹웨어 Tab ─── */}
        <div className={cn(activeTab === "groupware" ? "block" : "hidden")}>
          <div className="py-20 text-center text-gray-400">
            준비 중입니다.
          </div>
        </div>

      </div>
    </section>
  )
}
