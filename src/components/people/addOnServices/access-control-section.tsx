"use client"

import { DoorOpen, Fingerprint, Monitor, Database, Zap, ArrowRight, ArrowDown, Clock } from "lucide-react"
import ScrollReveal from "@/components/common/scroll-reveal"
import { COLORS } from "@/constants/brand-colors"

const steps = [
  "접속 계정 생성",
  "연동 테이블 생성",
  "ODBC 설정",
  "연동 설정",
  "출입 데이터 자동 전송",
]

function SystemBox({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border-2" style={{ borderColor: `${COLORS.people}55` }}>
      <div className="px-4 py-2.5 text-center text-sm font-bold text-white" style={{ backgroundColor: COLORS.people }}>
        {title}
      </div>
      <div className="flex flex-1 flex-col items-center gap-3 bg-white p-5">{children}</div>
    </div>
  )
}

function Node({
  icon: Icon,
  label,
  sub,
  tone = "slate",
}: {
  icon: React.ElementType
  label: string
  sub?: string
  tone?: "slate" | "people"
}) {
  const isPeople = tone === "people"
  return (
    <div
      className="flex w-full flex-col items-center gap-1 rounded-xl border p-3 text-center"
      style={
        isPeople
          ? { borderColor: `${COLORS.people}33`, backgroundColor: `${COLORS.people}0d` }
          : { borderColor: "#e2e8f0", backgroundColor: "#f8fafc" }
      }
    >
      <Icon className="h-6 w-6" style={{ color: isPeople ? COLORS.people : "#475569" }} />
      <span className="text-sm font-bold text-slate-800">{label}</span>
      {sub && <span className="text-xs text-slate-500">{sub}</span>}
    </div>
  )
}

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

        <ScrollReveal>
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm md:p-10">
            {/* 연동 다이어그램 */}
            <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
              {/* 세콤/캡스 */}
              <SystemBox title="세콤 / 캡스 보안시스템">
                <Node icon={Fingerprint} label="리더기" sub="출퇴근 시간 수집" />
                <ArrowDown className="h-5 w-5 text-slate-400" />
                <Node icon={Monitor} label="관리용 PC" sub="시스템 매니저 · 연동 설정" />
                <ArrowDown className="h-5 w-5 text-slate-400" />
                <Node icon={Database} label="출입 데이터" />
              </SystemBox>

              {/* 중앙 전송 */}
              <div className="flex flex-row items-center justify-center gap-2 lg:flex-col">
                <div
                  className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-white"
                  style={{ backgroundColor: COLORS.people }}
                >
                  <Zap className="h-3.5 w-3.5" />
                  출입데이터 자동전송
                </div>
                <ArrowRight className="hidden h-7 w-7 lg:block" style={{ color: COLORS.people }} />
                <ArrowDown className="h-6 w-6 lg:hidden" style={{ color: COLORS.people }} />
                <span className="rounded-full border border-dashed border-slate-300 bg-white px-3 py-1 text-[11px] font-semibold text-slate-500">
                  ODBC 설정
                </span>
              </div>

              {/* 에버타임 */}
              <SystemBox title="에버타임">
                <Node icon={Database} label="연동 테이블" tone="people" />
                <ArrowDown className="h-5 w-5" style={{ color: COLORS.people }} />
                <Node icon={Clock} label="카드 출퇴근 데이터 업로드" tone="people" />
                <ArrowDown className="h-5 w-5" style={{ color: COLORS.people }} />
                <Node icon={DoorOpen} label="출근부" sub="근태 통합 관리" tone="people" />
              </SystemBox>
            </div>

            {/* 연동 프로세스 */}
            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="mb-4 text-sm font-bold text-slate-700">연동 프로세스</p>
              <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {steps.map((step, index) => (
                  <li
                    key={step}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3"
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: COLORS.people }}
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-slate-800">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
