"use client"

import Image from "next/image"
import { useState } from "react"
import ScrollReveal from "@/components/common/scroll-reveal"
import { cn } from "@/lib/utils"
import { COLORS } from "@/constants/brand-colors"

const tabs = [
  {
    id: "criteria",
    title: "평가기준",
    image: "/images/people/evaluation/evaluation-feature-01.png",
    description: [
      "우리 기업에 맞춘 평가 항목 등록",
      "우리 기업에 맞춘 평가 등급 정의",
    ],
  },
  {
    id: "performance",
    title: "업적평가",
    image: "/images/people/evaluation/evaluation-feature-02.png",
    description: [
      "성과목표 수립 및 확정 프로세스",
      "중간면담 및 상시 기록 지원",
      "자기신고 및 1~3차 평가",
      "평가자 인사조정을 위한 평가평점 조정, 부서표준편차 조정",
      "모니터링 및 성향분석 조회",
    ],
  },
  {
    id: "competency",
    title: "역량평가",
    image: "/images/people/evaluation/evaluation-feature-03.png",
    description: [
      "직무별 표준 역량 항목 정의",
      "기업 인사 제도에 맞춰 항목별, 역량종류별 가중치 공식 적용",
      "본인 진단 및 평가자 점수 등록",
      "역량 점수 보정 알고리즘을 지원하는 신뢰도 정보 제공",
    ],
  },
  {
    id: "multi",
    title: "다면평가",
    image: "/images/people/evaluation/evaluation-feature-04.png",
    description: [
      "차수별 관계 및 직무 가중치 설정",
      "다면 평가자 점수 및 의견 등록",
      "통합 인사 제어 및 최종 점수 자동 생성",
      "개인 데이터와 그룹 평균 분포를 대조 가능",
    ],
  },
  {
    id: "total",
    title: "종합평가",
    image: "/images/people/evaluation/evaluation-feature-05.png",
    description: [
      "개별적으로 수행한 역량, 업적, 다면 평가 데이터를 모아 최종 종합 점수와 등급 산출",
      "조직 그룹별 차등 가중치 설계",
      "상세 평가 버전 및 차수 가중치 매핑",
      "자동 산출 및 인사위원회 수동 조정",
      "인사결과별 등급 분포 현황 분석",
    ],
  },
]

export default function EvaluationFeaturesSection() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const activeFeature = tabs.find((tab) => tab.id === activeTab) ?? tabs[0]

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
        <ScrollReveal className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            제공하는 서비스를 확인하세요
          </h2>
          <p className="mt-4 text-base text-gray-600 md:text-lg">
            평가 기준부터 종합평가까지, 평가 업무 전체를 하나의 흐름으로 관리합니다.
          </p>
        </ScrollReveal>

        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:flex md:justify-center md:gap-2 md:pb-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex min-h-[56px] items-center justify-center rounded-2xl border px-4 py-3 text-sm font-bold transition-all md:min-h-0 md:shrink-0 md:rounded-full md:px-6 md:py-3 md:text-base",
                  isActive
                    ? "text-white shadow-[0_14px_30px_rgba(0,116,255,0.28)]"
                    : "border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-blue-50 hover:text-slate-900"
                )}
                style={{
                  backgroundColor: isActive ? COLORS.evaluation : undefined,
                  borderColor: isActive ? COLORS.evaluation : `${COLORS.evaluation}22`,
                }}
              >
                <span className="whitespace-nowrap">{tab.title}</span>
              </button>
            )
          })}
        </div>

        <ScrollReveal className="overflow-hidden rounded-[36px] border border-slate-100 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div key={activeTab} className="content-fade-in flex flex-col">
            <div className="grid grid-cols-1 gap-8 px-7 pb-8 pt-9 md:px-12 md:pt-12 lg:grid-cols-[360px_1fr] lg:items-start">
              <div>
                <p className="mb-2 text-sm font-bold" style={{ color: COLORS.evaluation }}>
                  Ever Evaluation
                </p>
                <h3 className="text-2xl font-bold leading-tight text-slate-950 md:text-3xl">
                  {activeFeature.title}
                </h3>
              </div>

              <ul className="grid gap-2.5 sm:grid-cols-2">
                {activeFeature.description.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-left"
                  >
                    <span
                      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${COLORS.evaluation}16` }}
                    >
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS.evaluation }} />
                    </span>
                    <span className="text-[15px] leading-relaxed text-slate-700 md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative w-full bg-gradient-to-br from-[#f3fbff] via-white to-[#eef6ff] px-3 pb-8 md:px-10 md:pb-12">
              <div className="relative mx-auto flex min-h-[260px] w-full max-w-[1120px] items-center justify-center md:min-h-[420px]">
                <Image
                  src={activeFeature.image}
                  alt={activeFeature.title}
                  width={1120}
                  height={720}
                  sizes="(max-width: 768px) 94vw, 1120px"
                  className="h-auto max-h-[620px] w-full object-contain drop-shadow-[0_24px_35px_rgba(15,23,42,0.12)]"
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
