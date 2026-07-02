"use client"

import Image from "next/image"
import { DoorOpen, Fingerprint, ArrowRight, Zap } from "lucide-react"
import ScrollReveal from "@/components/common/scroll-reveal"
import { COLORS } from "@/constants/brand-colors"

const steps = [
  "접속 계정 생성",
  "연동 테이블 생성",
  "ODBC 설정",
  "연동 설정",
  "출입 데이터 자동 전송",
]

export default function AccessControlSection() {
  return (
    <section id="access-control" className="scroll-mt-32 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-12">
        <ScrollReveal className="mb-12 text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold"
            style={{ backgroundColor: `${COLORS.people}14`, color: COLORS.people }}
          >
            <DoorOpen className="h-4 w-4" />
            출입관리시스템
          </div>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            출입 데이터로 근태를 통합 관리하세요
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            사용 중인 출입관리시스템(세콤 / 캡스)과 연동하여 출입 데이터를 자동 전송하고 근태 내역을 통합 관리합니다.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <div className="overflow-hidden rounded-[28px] border border-slate-200 shadow-sm">
              <Image
                src="/images/people/addOnServices/access-reader.png"
                alt="출입관리 리더기"
                width={800}
                height={600}
                className="h-auto w-full object-cover"
              />
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-6">
            {/* 연동 흐름 */}
            <ScrollReveal>
              <div className="flex items-stretch gap-3">
                <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                  <Fingerprint className="h-8 w-8 text-slate-600" />
                  <span className="text-sm font-bold text-slate-800">세콤 / 캡스</span>
                  <span className="text-xs text-slate-500">보안 · 출입 시스템</span>
                </div>
                <div className="flex flex-col items-center justify-center px-1">
                  <div
                    className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold text-white"
                    style={{ backgroundColor: COLORS.people }}
                  >
                    <Zap className="h-3 w-3" />
                    자동전송
                  </div>
                  <ArrowRight className="mt-1 h-6 w-6" style={{ color: COLORS.people }} />
                </div>
                <div
                  className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border p-5 text-center"
                  style={{ borderColor: `${COLORS.people}33`, backgroundColor: `${COLORS.people}0d` }}
                >
                  <DoorOpen className="h-8 w-8" style={{ color: COLORS.people }} />
                  <span className="text-sm font-bold text-slate-800">에버타임</span>
                  <span className="text-xs text-slate-500">출근부 · 근태 통합</span>
                </div>
              </div>
            </ScrollReveal>

            {/* 연동 단계 */}
            <ScrollReveal delay={100}>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="mb-4 text-sm font-bold text-slate-700">연동 프로세스</p>
                <ol className="space-y-3">
                  {steps.map((step, index) => (
                    <li key={step} className="flex items-center gap-3">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: COLORS.people }}
                      >
                        {index + 1}
                      </span>
                      <span className="text-[15px] font-semibold text-slate-800">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
