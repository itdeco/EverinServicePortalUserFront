"use client"

import { useState } from "react"

import { COLORS } from "@/constants/brand-colors"
import { cn } from "@/lib/utils"

export type PlanName = "에버타임 Standard" | "에버타임 Enterprise"

type PlanImageSource =
  | string
  | {
      src: string
      fallback: string
    }

type PlanStep = {
  plan: PlanName
  title: string
  description: string
  images: PlanImageSource[]
}

const planSteps: PlanStep[] = [
  {
    plan: "에버타임 Standard",
    title: "AI 어시스턴트를 통한 간편 설정",
    description:
      "근무시간 템플릿에서 근무유형 등록, 출퇴근 위치등록까지 AI 어시스턴트로 3단계 설정을 빠르게 끝냅니다.",
    images: ["/images/people/smartWorkCare/evertime/plans/standard-ai-assistant.jpg"],
  },
  {
    plan: "에버타임 Standard",
    title: "다양한 근무유형 지원",
    description: "일반근무, 시차출퇴근, 선택근로 등 회사마다 다른 근무유형을 기준에 맞게 관리합니다.",
    images: ["/images/people/smartWorkCare/evertime/plans/standard-work-types.png"],
  },
  {
    plan: "에버타임 Standard",
    title: "최신 근로기준법 적용",
    description: "최신 근로기준법을 빠르게 반영하고 시간 단위 연차 신청까지 지원합니다.",
    images: ["/images/people/smartWorkCare/evertime/plans/standard-labor-law.jpg"],
  },
  {
    plan: "에버타임 Standard",
    title: "초과근무 통제",
    description: "근무시간을 실시간으로 모니터링하여 주 52시간 초과 위험을 관리합니다.",
    images: ["/images/people/smartWorkCare/evertime/plans/standard-overtime-control.png"],
  },
  {
    plan: "에버타임 Enterprise",
    title: "연차촉진 기능",
    description: "직원은 모바일로 연차촉진 확인과 계획 신청을 진행하고, 노무수령거부까지 함께 관리합니다.",
    images: [
      "/images/people/smartWorkCare/evertime/plans/enterprise-vacation-promotion-01.png",
      "/images/people/smartWorkCare/evertime/plans/enterprise-vacation-promotion-02.jpeg",
      "/images/people/smartWorkCare/evertime/plans/enterprise-vacation-promotion-03.jpeg",
    ],
  },
  {
    plan: "에버타임 Enterprise",
    title: "급여용 근태데이터",
    description: "단순한 근태관리를 넘어 급여 계산에 바로 사용할 수 있는 근태 데이터로 가공합니다.",
    images: ["/images/people/smartWorkCare/evertime/plans/enterprise-payroll-data.png"],
  },
  {
    plan: "에버타임 Enterprise",
    title: "다양한 연동",
    description: "출입시스템, ERP 연동과 기업별 커스터마이징까지 확장성 있게 지원합니다.",
    images: ["/images/people/smartWorkCare/evertime/plans/enterprise-integrations.png"],
  },
]

function getImageSrc(image: PlanImageSource) {
  return typeof image === "string" ? image : image.src
}

function PlanImage({
  image,
  alt,
  className,
  maxHeight,
}: {
  image: PlanImageSource
  alt: string
  className: string
  maxHeight: number
}) {
  const [src, setSrc] = useState(getImageSrc(image))
  const fallback = typeof image === "string" ? null : image.fallback

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        width: "auto",
        height: "auto",
        maxWidth: "100%",
        maxHeight,
        objectFit: "contain",
      }}
      onError={() => {
        if (fallback && src !== fallback) setSrc(fallback)
      }}
    />
  )
}

function PlanCard({ step, index }: { step: PlanStep; index: number }) {
  const isMulti = step.images.length > 1

  return (
    <article className="grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.07)] md:grid-cols-2">
      <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
        <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#00cc99]/10 text-sm font-black text-[#00a87f]">
          {index + 1}
        </span>
        <h3 className="break-keep text-[24px] font-black leading-tight text-slate-950 md:text-[30px]">
          {step.title}
        </h3>
        <p className="mt-4 break-keep text-base font-semibold leading-relaxed text-slate-600 md:text-lg">
          {step.description}
        </p>
      </div>

      <div className="flex h-[380px] items-center justify-center overflow-hidden border-t border-slate-100 bg-slate-50/70 p-5 md:h-[500px] md:border-l md:border-t-0 md:p-8 lg:h-[560px]">
        {isMulti ? (
          <div className="flex h-full w-full items-center justify-center gap-3 md:gap-5">
            {step.images.map((image, imageIndex) => (
              <PlanImage
                key={getImageSrc(image)}
                image={image}
                alt={`${step.title} ${imageIndex + 1}`}
                maxHeight={500}
                className="min-w-0 max-w-[31%] drop-shadow-[0_18px_28px_rgba(15,23,42,0.12)]"
              />
            ))}
          </div>
        ) : (
          <PlanImage
            image={step.images[0]}
            alt={step.title}
            maxHeight={500}
            className="max-w-full drop-shadow-[0_18px_28px_rgba(15,23,42,0.12)]"
          />
        )}
      </div>
    </article>
  )
}

export default function EvertimePlanSection() {
  const [activePlan, setActivePlan] = useState<PlanName>("에버타임 Standard")
  const filteredSteps = planSteps.filter((step) => step.plan === activePlan)
  const plans: PlanName[] = ["에버타임 Standard", "에버타임 Enterprise"]

  return (
    <section className="relative overflow-clip bg-white py-14 md:py-20">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8 lg:px-12">
        <div
          className="sticky z-40 -mx-4 bg-white/95 px-4 pb-1 text-center backdrop-blur md:-mx-8 md:px-8 lg:-mx-12 lg:px-12"
          style={{ top: "var(--site-header-height, 104px)" }}
        >
          <h2 className="mt-3 break-keep text-[32px] font-black leading-tight text-slate-950 md:text-[46px]">
            우리회사에 맞는 근태관리를 선택하세요.
          </h2>

          <div className="mx-auto mt-10 grid max-w-[760px] grid-cols-2 gap-4">
            {plans.map((plan) => {
              const isActive = activePlan === plan

              return (
                <button
                  key={plan}
                  type="button"
                  onClick={() => setActivePlan(plan)}
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(90deg, ${COLORS.payroll} 0%, ${COLORS.culture} 28%, ${COLORS.onboarding} 58%, ${COLORS.people} 100%)`,
                        }
                      : undefined
                  }
                  className={cn(
                    "min-h-16 rounded-full border px-3 text-sm font-black transition-all md:min-h-[72px] md:text-xl",
                    isActive
                      ? "border-transparent text-white shadow-[0_16px_36px_rgba(13,153,255,0.24)]"
                      : "border-slate-200 bg-white text-slate-500 shadow-sm hover:border-[#00cc99]/40 hover:bg-slate-50 hover:text-slate-900",
                  )}
                >
                  {plan}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-10 space-y-6 md:mt-12 md:space-y-8">
          {filteredSteps.map((step, index) => (
            <PlanCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
