"use client"

import Image from "next/image"
import { RefreshCcw } from "lucide-react"
import ScrollReveal from "@/components/common/scroll-reveal"
import { COLORS } from "@/constants/brand-colors"

const GREEN = COLORS.people
const BLUE = "#2f3aa8"

const logos = [
  { src: "/images/people/addOnServices/logo-ksystem-ace.png", alt: "K-System Ace" },
  { src: "/images/people/addOnServices/logo-ksystem-genuine.png", alt: "K-System Genuine" },
  { src: "/images/people/addOnServices/logo-systemever.jpg", alt: "SystemEver" },
  { src: "/images/people/addOnServices/logo-systemcloud.png", alt: "SystemCloud" },
]

export default function IntegrationSection() {
  return (
    <section id="integration" className="scroll-mt-32 bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-12">
        <ScrollReveal className="mb-12 text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold"
            style={{ backgroundColor: `${GREEN}14`, color: GREEN }}
          >
            <RefreshCcw className="h-4 w-4" />
            연동서비스
          </div>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            ERP와 에버타임, 데이터가 자동으로 연동됩니다
          </h2>
          <p className="mx-auto mt-4 max-w-2xl break-keep text-base leading-relaxed text-gray-600 md:text-lg">
            ERP와 에버타임 마스터 정보 연동, 에버타임의 집계된 근태내역이 연동되어 영림원소프트랩 ERP 급여처리가 더
            쉬워집니다.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 items-center gap-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-10 lg:grid-cols-[minmax(0,190px)_1fr_minmax(0,240px)]">
            {/* 에버타임 앱 화면 */}
            <div className="mx-auto overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <Image
                src="/images/people/addOnServices/integration-evertime.png"
                alt="에버타임 급여근태표 화면"
                width={300}
                height={640}
                className="h-auto w-full max-w-[180px] object-contain"
              />
            </div>

            {/* 중앙 흐름: 에버타임 원형 노드 + 양방향 화살표 */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* 에버타임 원형 노드 */}
              <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border border-slate-100 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
                <span className="mb-1 h-6 w-6 rounded-full" style={{ backgroundColor: GREEN }} />
                <span className="text-sm font-bold text-slate-800">에버타임</span>
              </div>

              {/* 두 개의 방향 화살표 */}
              <div className="flex flex-1 flex-col justify-center gap-10">
                {/* ERP → 에버타임 (왼쪽 방향) */}
                <div>
                  <p className="mb-1 text-center text-sm font-bold md:text-base" style={{ color: GREEN }}>
                    ERP정보 <span className="text-slate-900">자동 동기화</span>
                  </p>
                  <div className="relative flex items-center">
                    {/* 왼쪽 화살촉 */}
                    <span
                      className="h-0 w-0 border-y-[6px] border-r-[9px] border-y-transparent"
                      style={{ borderRightColor: BLUE }}
                    />
                    <span className="h-0.5 flex-1" style={{ backgroundColor: BLUE }} />
                  </div>
                  <p className="mt-1.5 break-keep text-center text-xs text-slate-600 md:text-sm">
                    <span className="font-bold text-slate-900">[기본정보]</span> 부서, 조직, 사원, 발령, 부서장
                  </p>
                </div>

                {/* 에버타임 → ERP (오른쪽 방향) */}
                <div>
                  <p className="mb-1 text-center text-sm font-bold md:text-base" style={{ color: GREEN }}>
                    근태결과 <span className="text-slate-900">급여연동</span>
                  </p>
                  <div className="relative flex items-center">
                    <span className="h-0.5 flex-1" style={{ backgroundColor: BLUE }} />
                    {/* 오른쪽 화살촉 */}
                    <span
                      className="h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent"
                      style={{ borderLeftColor: BLUE }}
                    />
                  </div>
                  <p className="mt-1.5 break-keep text-center text-xs text-slate-600 md:text-sm">
                    <span className="font-bold text-slate-900">[근태정보]</span> 일자별 근태내역 (연장, 야간, 휴일근무)
                  </p>
                </div>
              </div>
            </div>

            {/* 연동 가능한 ERP - 1줄에 1개씩 */}
            <div className="flex flex-col gap-3">
              {logos.map((logo) => (
                <div
                  key={logo.alt}
                  className="flex h-16 items-center justify-center rounded-xl border border-slate-200 bg-white px-6"
                >
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    width={200}
                    height={48}
                    className="h-auto max-h-9 w-auto max-w-full object-contain"
                  />
                </div>
              ))}
              <p className="mt-1 break-keep text-center text-sm font-semibold text-slate-500">
                타사 ERP와도 연동 가능합니다.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
