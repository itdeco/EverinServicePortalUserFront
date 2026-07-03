"use client"

import Image from "next/image"
import { RefreshCcw } from "lucide-react"
import ScrollReveal from "@/components/common/scroll-reveal"
import { COLORS } from "@/constants/brand-colors"

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
            style={{ backgroundColor: `${COLORS.people}14`, color: COLORS.people }}
          >
            <RefreshCcw className="h-4 w-4" />
            연동서비스
          </div>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            ERP와 에버타임, 데이터가 자동으로 연동됩니다
          </h2>
          <p className="mx-auto mt-4 max-w-2xl break-keep text-base leading-relaxed text-gray-600 md:text-lg">
            ERP 마스터 정보와 에버타임의 집계된 근태내역이 서로 연동되어 영림원소프트랩 ERP 급여처리가 더 쉬워집니다.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 items-center gap-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-10 lg:grid-cols-[minmax(0,200px)_1fr_minmax(0,260px)]">
            {/* 에버타임 앱 화면 */}
            <div className="flex flex-col items-center gap-3">
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <Image
                  src="/images/people/addOnServices/integration-evertime.png"
                  alt="에버타임 급여근태표 화면"
                  width={300}
                  height={640}
                  className="h-auto w-full max-w-[170px] object-contain"
                />
              </div>
              <span
                className="rounded-full px-3 py-1 text-sm font-bold text-white"
                style={{ backgroundColor: COLORS.people }}
              >
                에버타임
              </span>
            </div>

            {/* 양방향 연동 흐름 */}
            <div className="flex flex-col justify-center gap-8">
              {/* ERP → 에버타임 */}
              <div>
                <p className="mb-2 text-center text-base font-bold" style={{ color: COLORS.people }}>
                  ERP정보 <span className="text-slate-900">자동 동기화</span>
                </p>
                <div
                  className="relative flex items-center rounded-full border-2 px-5 py-2.5"
                  style={{ borderColor: `${COLORS.people}55`, backgroundColor: `${COLORS.people}0d` }}
                >
                  <span
                    className="absolute -left-1 text-lg font-black"
                    style={{ color: COLORS.people }}
                    aria-hidden
                  >
                    {"<"}
                  </span>
                  <p className="w-full break-keep text-center text-sm font-medium text-slate-700">
                    <span className="font-bold text-slate-900">[기본정보]</span> 부서 · 조직 · 사원 · 발령 · 부서장
                  </p>
                </div>
                <p className="mt-1.5 text-center text-xs text-slate-400">ERP 마스터 정보를 에버타임으로 전달</p>
              </div>

              {/* 에버타임 → ERP */}
              <div>
                <p className="mb-2 text-center text-base font-bold" style={{ color: COLORS.people }}>
                  근태결과 <span className="text-slate-900">급여연동</span>
                </p>
                <div
                  className="relative flex items-center rounded-full border-2 px-5 py-2.5"
                  style={{ borderColor: `${COLORS.payroll}55`, backgroundColor: `${COLORS.payroll}0d` }}
                >
                  <p className="w-full break-keep text-center text-sm font-medium text-slate-700">
                    <span className="font-bold text-slate-900">[근태정보]</span> 일자별 근태내역 (연장 · 야간 · 휴일근무)
                  </p>
                  <span
                    className="absolute -right-1 text-lg font-black"
                    style={{ color: COLORS.payroll }}
                    aria-hidden
                  >
                    {">"}
                  </span>
                </div>
                <p className="mt-1.5 text-center text-xs text-slate-400">집계된 근태 결과를 ERP 급여로 전달</p>
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
                영림원소프트랩 ERP는 물론, 타사 ERP와도 연동 가능합니다.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
