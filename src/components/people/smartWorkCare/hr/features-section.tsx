"use client"

import Image from "next/image"
import { useState } from "react"

const tabs = [
  {
    id: "info",
    title: "인사정보 통합관리",
    icon: "/images/people/smartWorkCare/hr/icon-hr-01.svg",
    image: "/images/people/smartWorkCare/hr/hr-features-section-01.png",
    description: [
      "모든 직원의 기본 정보, 인사 이력, 평가 등을 하나의 플랫폼에서 체계적으로 관리",
      "중복된 데이터 입력이나 업무 혼선을 방지",
      "직원 개개인의 입사부터 퇴직까지의 모든 정보 관리",
    ],
  },
  {
    id: "org",
    title: "조직관리",
    detailTitle: "조직관리 (부서/사원/조직도)",
    icon: "/images/people/smartWorkCare/hr/icon-hr-02.svg",
    image: "/images/people/smartWorkCare/hr/hr-features-section-02.png",
    description: [
      "조직 현황을 실시간으로 파악하고 업데이트",
      "부서 개편, 조직 개편 등 복잡한 조직 변경을 클릭 몇 번으로 처리",
    ],
  },
  {
    id: "transfer",
    title: "인사 이동 관리",
    detailTitle: "인사 이동(발령)관리",
    icon: "/images/people/smartWorkCare/hr/icon-hr-03.svg",
    image: "/images/people/smartWorkCare/hr/hr-features-section-03.png",
    description: [
      "직원의 인사발령 및 이동내역을 실시간으로 관리",
      "승진, 이동, 부서 이동, 휴직 등의 이력을 한눈에 확인",
    ],
  },
  {
    id: "cert",
    title: "증명서관리",
    icon: "/images/people/smartWorkCare/hr/icon-hr-04.svg",
    image: "/images/people/smartWorkCare/hr/hr-features-section-04.png",
    description: [
      "재직증명서, 경력증명서, 휴직증명서 등 각종 증명서 발급 관리",
      "급여와 연동된 원천징수 확인서 및 근로소득원천징수부 제공",
    ],
  },
  {
    id: "status",
    title: "인사현황",
    icon: "/images/people/smartWorkCare/hr/icon-hr.svg",
    image: "/images/people/smartWorkCare/hr/hr-features-section-05.png",
    description: [
      "사원명부, 사원정보, 휴직자조회, 근무년수 등 다양한 인사현황 조회",
      "직위별, 직책별, 연령별, 성별 등 기준별 인원현황을 한눈에 파악",
    ],
  },
]

export default function HrFeaturesSection() {
  const [activeTab, setActiveTab] = useState("info")
  const activeFeature = tabs.find((tab) => tab.id === activeTab)!

  return (
      <section className="w-full bg-white py-12 md:py-16">
        <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
          {/* 상단 타이틀 */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              인사·조직 관리를 더 쉽고 정확하게
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-600">
              직원 정보부터 조직도, 인사이동, 증명서까지 하나의 흐름으로 관리합니다.
            </p>
          </div>

          {/* 탭 버튼 */}
          <div className="mb-8 grid grid-cols-2 gap-3 md:flex md:justify-center md:gap-2 md:overflow-x-auto md:pb-2 md:scrollbar-hide">
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
          <div className="overflow-hidden rounded-[36px] border border-slate-100 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <div className="grid grid-cols-1 lg:grid-cols-[48%_1fr]">
              {/* 좌측 이미지 */}
              <div className="relative flex min-h-[100px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#f3fbff] via-white to-[#eafff8] md:min-h-[420px]">
                <div className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00cc99]/10 blur-2xl md:h-[320px] md:w-[320px] md:blur-3xl" />
                <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-blue-100/60 blur-2xl" />
                <div className="absolute bottom-8 right-10 h-28 w-28 rounded-full bg-emerald-100/70 blur-2xl" />

                <div className="relative h-[140px] w-[68%] md:h-[320px] md:w-[82%] lg:h-[360px]">
                  <Image
                      src={activeFeature.image}
                      alt={activeFeature.detailTitle || activeFeature.title}
                      fill
                      className="object-contain drop-shadow-[0_24px_35px_rgba(15,23,42,0.12)]"
                      priority
                  />
                </div>
              </div>

              {/* 우측 텍스트 */}
              <div className="flex flex-col justify-center px-7 py-9 md:px-12 lg:px-14">

                <h3 className="mb-4 text-2xl font-bold leading-tight text-slate-950 md:text-3xl">
                  {activeFeature.detailTitle || activeFeature.title}
                </h3>

                <p className="mb-7 text-base leading-relaxed text-slate-500">
                  복잡한 인사 업무를 한 화면에서 확인하고, 필요한 정보를 빠르게 조회할 수 있도록 도와줍니다.
                </p>

                <ul className="space-y-3">
                  {activeFeature.description.map((desc, idx) => (
                      <li
                          key={idx}
                          className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3"
                      >
            <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00cc99]">
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

          {/* 하단 구조 이미지 */}
          <div className="mt-10 mx-auto max-w-[1280px] px-6 lg:px-12">
            {/* 타이틀 */}
            <div className="text-center mb-6">
              <span className="inline-block px-5 py-2 text-base md:text-lg font-bold text-gray-800 bg-[#00cc99]/10 rounded-full mb-4">
                서비스 도입 전후 비교
              </span>
            </div>
    
            {/* 3D 이미지 + 카드 */}
            <div className="mt-2">
              {/* 입체 이미지 */}
              <div className="relative mx-auto w-full max-w-[1200px]">
                <Image
                  src="/images/people/smartWorkCare/hr/hr-1.png"
                  alt="에버인 도입 효과"
                  width={1200}
                  height={700}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}