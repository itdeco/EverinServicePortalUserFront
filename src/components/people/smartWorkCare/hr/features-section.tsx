"use client"

import Image from "next/image"
import { useState } from "react"

const tabs = [
  {
    id: "info",
    title: "인사정보 통합관리",
    subtitle: "중앙 집중식 직원 정보 관리",
    icon: "/images/people/smartWorkCare/hr/icon-hr-01.svg",
    image: "/images/people/smartWorkCare/hr/hr-1-1.png",
    description: [
      "모든 직원의 기본 정보, 인사 이력, 평가 등을 하나의 플랫폼에서 체계적으로 관리",
      "중복된 데이터 입력이나 업무 혼선을 방지",
      "직원 개개인의 입사부터 퇴직까지의 모든 정보 관리",
    ],
  },
  {
    id: "org",
    title: "조직관리\n(부서/사원/조직도)",
    subtitle: "실시간 조직도 관리",
    icon: "/images/people/smartWorkCare/hr/icon-hr-02.svg",
    image: "/images/people/smartWorkCare/hr/hr-2-1.png",
    description: [
      "조직 현황을 실시간으로 파악하고 업데이트",
      "부서 개편, 조직 개편 등 복잡한 조직 변경을 클릭 몇 번으로 처리",
    ],
  },
  {
    id: "transfer",
    title: "인사 이동(발령)관리",
    subtitle: "인사이동 이력관리",
    icon: "/images/people/smartWorkCare/hr/icon-hr-03.svg",
    image: "/images/people/smartWorkCare/hr/hr-3-1.png",
    description: [
      "직원의 인사발령 및 이동내역을 실시간으로 관리하며, 승진, 이동, 부서 이동, 휴직 등을 한눈에 파악",
      "인사이동 내역의 이력을 기록하여, 언제든지 정확한 인사기록 확인",
    ],
  },
  {
    id: "cert",
    title: "증명서관리",
    subtitle: "인사 이동 이력관리",
    icon: "/images/people/smartWorkCare/hr/icon-hr-04.svg",
    image: "/images/people/smartWorkCare/hr/hr-4-1.png",
    description: [
      "증명서 발행, 승인과 출력제공",
      "재직증명서, 경력증명서, 휴직증명서, 소득세원천징수확인서(급여연동), 근로소득원천징수부(급여연동) 등 각종 증명서 제공",
    ],
  },
  {
    id: "status",
    title: "인사현황",
    subtitle: "근태, 급여, 평가 등 자동 연계",
    icon: "/images/people/smartWorkCare/hr/icon-hr.svg",
    image: "/images/people/smartWorkCare/hr/hr-1-1.png",
    description: [
      "임직원을 조회할 수 있으며 다중검색, 사원명부, 사원정보, 장애인현황조회, 휴직자조회, 사원근무년수 등 조회 제공",
      "직위별, 직책별, 연령별, 그룹별, 성별 등 다양한 기준별 인원현황을 한 눈에 파악",
    ],
  },
]

export default function HrFeaturesSection() {
  const [activeTab, setActiveTab] = useState("info")
  const activeFeature = tabs.find((tab) => tab.id === activeTab)!

  return (
    <section className="w-full bg-white py-8 md:py-12">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">

        {/* 탭 버튼 - 스크롤 가능 */}
        <div className="flex gap-2 md:gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 md:px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all whitespace-pre-line text-center leading-tight ${
                activeTab === tab.id
                  ? "bg-[#00cc99] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* 컨텐츠 영역 */}
        <div className="bg-gray-50 rounded-3xl overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* 좌측 이미지 */}
            <div className="relative w-full lg:w-[45%] h-[300px] lg:h-[450px] bg-gradient-to-br from-blue-50 to-teal-50">
              <Image
                src={activeFeature.image}
                alt={activeFeature.title}
                fill
                className="object-contain p-6"
              />
            </div>

            {/* 우측 텍스트 */}
            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
              {/* 서브 탭 인디케이터 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all ${
                      activeTab === tab.id
                        ? "bg-[#00cc99] text-white"
                        : "bg-white text-gray-600 border border-gray-200"
                    }`}
                  >
                    <Image
                      src={tab.icon}
                      alt=""
                      width={16}
                      height={16}
                      className={activeTab === tab.id ? "brightness-0 invert" : ""}
                    />
                    <span className="whitespace-nowrap">{tab.subtitle}</span>
                  </button>
                ))}
              </div>

              {/* 제목 */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 whitespace-pre-line">
                {activeFeature.title.replace("\n", " ")}
              </h3>

              {/* 설명 리스트 */}
              <ul className="space-y-4">
                {activeFeature.description.map((desc, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00cc99] mt-2 flex-shrink-0" />
                    <span className="text-gray-700 text-base leading-relaxed">{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* 입체적 이미지 섹션 */}
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-2">
          {/* 이미지 */}
          <div className="relative w-full lg:w aspect-square max-w-[1000px]">
            <Image
              src="/images/people/smartWorkCare/hr/hr-1.png"
              alt="에버인 클라우드 HR 서비스 구조"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
