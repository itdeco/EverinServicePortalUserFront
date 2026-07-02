"use client"

import Image from "next/image"
import { RefreshCcw, ArrowRight, ArrowLeft, Database, Clock } from "lucide-react"
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
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            ERP 마스터 정보와 에버타임의 집계된 근태내역이 연동되어 ERP 급여처리가 더 쉬워집니다.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 items-center gap-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-10 lg:grid-cols-[minmax(0,220px)_1fr_minmax(0,300px)]">
            {/* 에버타임 */}
            <div className="flex flex-col items-center gap-3">
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <Image
                  src="/images/people/addOnServices/integration-evertime.png"
                  alt="에버타임 급여근태표 화면"
                  width={300}
                  height={640}
                  className="h-auto w-full max-w-[180px] object-contain"
                />
              </div>
              <span className="rounded-full px-3 py-1 text-sm font-bold text-white" style={{ backgroundColor: COLORS.people }}>
                에버타임
              </span>
            </div>

            {/* 연동 흐름 */}
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-emerald-100 bg-[#f5fdf8] p-5">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold" style={{ color: COLORS.people }}>
                  <Database className="h-4 w-4" />
                  ERP 정보 자동 동기화
                  <ArrowRight className="h-4 w-4" />
                </div>
                <p className="break-keep text-[15px] font-medium text-slate-700">
                  <span className="font-bold">[기본정보]</span> 부서 · 조직 · 사원 · 발령
                </p>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-[#f4f8ff] p-5">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold" style={{ color: COLORS.payroll }}>
                  <ArrowLeft className="h-4 w-4" />
                  근태결과 급여연동
                  <Clock className="h-4 w-4" />
                </div>
                <p className="break-keep text-[15px] font-medium text-slate-700">
                  <span className="font-bold">[근태정보]</span> 일자별 근태내역 (연장 · 야간 · 휴일근무)
                </p>
              </div>
            </div>

            {/* ERP 로고 - 1줄에 1개씩 */}
            <div className="flex flex-col gap-3">
              <div className="mb-1 flex items-center gap-2 text-sm font-bold" style={{ color: COLORS.people }}>
                <Database className="h-4 w-4" />
                연동 가능한 ERP
              </div>
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
