"use client"

import Image from "next/image"
import { useState } from "react"
import {
  BarChart3,
  ClipboardList,
  Gauge,
  Layers3,
  Target,
  UsersRound,
  type LucideIcon,
} from "lucide-react"
import ScrollReveal from "@/components/common/scroll-reveal"
import { cn } from "@/lib/utils"
import { COLORS } from "@/constants/brand-colors"

type EvaluationFeature = {
  id: string
  title: string
  kicker: string
  image: string
  Icon: LucideIcon
  steps: string[]
}

const tabs: EvaluationFeature[] = [
  {
    id: "criteria",
    title: "평가기준",
    kicker: "에버평가",
    image: "/images/people/evaluation/evaluation-feature-01.png",
    Icon: ClipboardList,
    steps: ["우리기업에 맞춘 평가 항목 등록", "우리기업에 맞춘 평가 등급 정의"]
  },
  {
    id: "performance",
    title: "업적평가",
    kicker: "에버평가",
    image: "/images/people/evaluation/evaluation-feature-02.png",
    Icon: Target,
    steps: ["성과목표 수립 및 확정 프로세스",
      "중간면담 및 상시 기록 지원",
      "자기신고 및 다단계(1~3차) 평가",
      "평가자 편차조정을 위한 평균평점 조정, 부서표준편자 조정",
      "모니터링 및 성향분석 조회"
    ]
  },
  {
    id: "competency",
    title: "역량평가",
    kicker: "에버평가",
    image: "/images/people/evaluation/evaluation-feature-03.png",
    Icon: Gauge,
    steps: ["직무별 세부 역량 항목을 정의",
      "기업 인사 제도에 맞춰  항목별, 역량종류별, 역량종류 항목별 가중치 공식 중 최적의 방식 적용",
      "본인 진단 및 평가자 점수 등록",
      "역량 점수 보정 알고리즘 지원하여 신뢰성 확보"]
  },
  {
    id: "multi",
    title: "다면평가",
    kicker: "에버평가",
    image: "/images/people/evaluation/evaluation-feature-04.png",
    Icon: UsersRound,
    steps: ["다차원 관계 및 직무 가중치 설정",
      "다면 평가자 점수 및 의견 등록",
      "통합 편차 제어 및 최종 점수 자동 생성",
      "개인 데이터와 그룹 평균 분포도 대조 가능"
    ]
  },
  {
    id: "total",
    title: "종합평가",
    kicker: "에버평가",
    image: "/images/people/evaluation/evaluation-feature-05.png",
    Icon: BarChart3,
    steps: ["개별적으로 수행된 역량, 업적, 다면 평가 데이터를 모아 연동 및 최종 종합 점수와 등급 산출",
      "조직 그룹별 차등 가중치 설계",
      "상세 평가 버전 및 차수 가중치 매핑",
      "자동 산출 및 인사위원회 수동 조정",
      "전사·부서별 등급 분포 현황 분석"]
  },
]

export default function EvaluationFeaturesSection() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const activeFeature = tabs.find((tab) => tab.id === activeTab) ?? tabs[0]
  const ActiveIcon = activeFeature.Icon

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
            const TabIcon = tab.Icon

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold transition-all md:min-h-0 md:shrink-0 md:rounded-full md:px-6 md:py-3 md:text-base",
                  isActive
                    ? "text-white shadow-[0_14px_30px_rgba(0,116,255,0.28)]"
                    : "border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-blue-50 hover:text-slate-900"
                )}
                style={{
                  backgroundColor: isActive ? COLORS.evaluation : undefined,
                  borderColor: isActive ? COLORS.evaluation : `${COLORS.evaluation}22`,
                }}
              >
                <TabIcon className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">{tab.title}</span>
              </button>
            )
          })}
        </div>

        <ScrollReveal className="overflow-hidden rounded-[28px] border border-slate-100 bg-[#f7faff] shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div key={activeTab} className="content-fade-in grid grid-cols-1 lg:grid-cols-[420px_1fr]">
            <div className="flex flex-col border-b border-slate-100 bg-white px-6 py-8 md:px-9 md:py-10 lg:border-b-0 lg:border-r">
              <div className="mb-7 flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_12px_24px_rgba(0,116,255,0.24)]"
                  style={{ backgroundColor: COLORS.evaluation }}
                >
                  <ActiveIcon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-bold" style={{ color: COLORS.evaluation }}>
                    {activeFeature.kicker}
                  </p>
                  <h3 className="text-2xl font-bold leading-tight text-slate-950 md:text-3xl">
                    {activeFeature.title}
                  </h3>
                </div>
              </div>

              <div className="mt-8">
                <ol className="space-y-5">
                  {activeFeature.steps.map((step, index) => (
                    <li key={step} className="flex items-center gap-3">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold leading-none text-white"
                        style={{ backgroundColor: COLORS.evaluation }}
                      >
                        {index + 1}
                      </span>
                      <div className="min-w-0 break-keep text-[15px] font-semibold leading-snug text-slate-800">
                        {step}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-5 px-4 py-6 sm:px-6 md:px-8 md:py-8">
              <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                <div>
                  <p className="mt-1 text-lg font-bold text-slate-950">{activeFeature.title} 업무 화면 미리보기</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_24px_45px_rgba(15,23,42,0.12)]">
                <div className="flex h-8 items-center justify-between border-b border-slate-200 bg-slate-900 px-4">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                </div>
                <div className="bg-white p-2 sm:p-3">
                  <Image
                    src={activeFeature.image}
                    alt={`${activeFeature.title} 화면`}
                    width={1120}
                    height={620}
                    sizes="(max-width: 1024px) 92vw, 780px"
                    className="h-auto w-full rounded-xl object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 px-1 text-sm font-semibold text-slate-500">
                <Layers3 className="h-4 w-4 text-cyan-500" />
                <span>기준 설정, 평가 입력, 점수 조정, 결과 분석까지 한 화면 흐름으로 이어집니다.</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
