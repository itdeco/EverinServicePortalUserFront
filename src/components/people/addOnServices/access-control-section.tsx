"use client"

import { DoorOpen, Fingerprint, Monitor, Database, UploadCloud, ArrowDown, ClipboardList } from "lucide-react"
import ScrollReveal from "@/components/common/scroll-reveal"
import { COLORS } from "@/constants/brand-colors"

const ORANGE = "#f97316"

function SystemBox({
  title,
  caption,
  children,
}: {
  title: string
  caption?: string
  children: React.ReactNode
}) {
  return (
    <div
      className="flex flex-1 flex-col overflow-hidden rounded-2xl border-2 bg-white"
      style={{ borderColor: `${COLORS.people}55` }}
    >
      <div
        className="px-4 py-2.5 text-center text-base font-bold text-white"
        style={{ backgroundColor: COLORS.people }}
      >
        {title}
        {caption && <span className="ml-2 text-xs font-medium opacity-90">{caption}</span>}
      </div>
      <div className="flex flex-1 flex-col items-center gap-2 p-5">{children}</div>
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
  tone?: "slate" | "people" | "danger"
}) {
  const styles =
    tone === "people"
      ? { borderColor: `${COLORS.people}44`, backgroundColor: `${COLORS.people}0d`, iconColor: COLORS.people }
      : tone === "danger"
        ? { borderColor: "#fca5a5", backgroundColor: "#fef2f2", iconColor: "#dc2626" }
        : { borderColor: "#e2e8f0", backgroundColor: "#f8fafc", iconColor: "#475569" }
  return (
    <div
      className="flex w-full flex-col items-center gap-1 rounded-xl border p-3 text-center"
      style={{ borderColor: styles.borderColor, backgroundColor: styles.backgroundColor }}
    >
      <Icon className="h-6 w-6" style={{ color: styles.iconColor }} />
      <span className="text-sm font-bold text-slate-800">{label}</span>
      {sub && <span className="break-keep text-xs text-slate-500">{sub}</span>}
    </div>
  )
}

/** 세로 방향 화살표 + 단계 라벨 */
function FlowArrow({ label, tone = "slate" }: { label?: string; tone?: "slate" | "people" }) {
  const color = tone === "people" ? COLORS.people : "#94a3b8"
  return (
    <div className="flex flex-col items-center gap-1 py-0.5">
      {label && (
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
          {label}
        </span>
      )}
      <ArrowDown className="h-5 w-5" style={{ color }} />
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
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">출입 데이터로 근태를 통합 관리하세요</h2>
          <p className="mx-auto mt-4 max-w-2xl break-keep text-base leading-relaxed text-gray-600 md:text-lg">
            사용 중인 출입관리시스템(세콤 / 캡스)과 연동하면 출입 데이터가 에버타임으로 자동 전송되어 근태 내역을 통합
            관리할 수 있습니다.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm md:p-10">
            <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
              {/* 세콤 / 캡스 보안시스템 */}
              <SystemBox title="세콤 / 캡스 보안시스템">
                <Node icon={Fingerprint} label="리더기" sub="지문 · 카드로 출입 인식" />
                <FlowArrow label="출퇴근시간" />
                <Node icon={Monitor} label="관리용 PC" sub="시스템 매니저" />
                <FlowArrow label="4. 연동 설정" />
                <Node icon={Database} label="출입 데이터" sub="출입 기록 저장" />
              </SystemBox>

              {/* 중앙 연결 */}
              <div className="flex flex-row items-center justify-center gap-3 py-2 lg:flex-col lg:py-0">
                <div
                  className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-white shadow-sm"
                  style={{ backgroundColor: COLORS.people }}
                >
                  <UploadCloud className="h-4 w-4" />
                  5. 출입데이터 자동전송
                </div>
                <span
                  className="rounded-full border-2 border-dashed bg-white px-3 py-1 text-xs font-bold"
                  style={{ borderColor: ORANGE, color: ORANGE }}
                >
                  3. ODBC 설정
                </span>
              </div>

              {/* 에버타임 */}
              <SystemBox title="에버타임" caption="1. 접속 계정 생성 · 2. 연동 테이블 생성">
                <Node icon={Database} label="연동 테이블" tone="people" sub="전송된 출입 데이터 수신" />
                <FlowArrow tone="people" />
                <Node icon={UploadCloud} label="카드 출퇴근 데이터 업로드" tone="danger" />
                <FlowArrow tone="people" />
                <Node icon={ClipboardList} label="출 / 퇴근 테이블" tone="people" />
                <FlowArrow tone="people" />
                <Node icon={DoorOpen} label="출근부" tone="people" sub="근태 내역 통합 관리" />
              </SystemBox>
            </div>

            {/* 연동 절차 요약 */}
            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="mb-4 text-sm font-bold text-slate-700">연동 절차</p>
              <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  "접속 계정 생성",
                  "연동 테이블 생성",
                  "ODBC 설정",
                  "연동 설정",
                  "출입데이터 자동전송",
                ].map((step, index) => (
                  <li key={step} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: COLORS.people }}
                    >
                      {index + 1}
                    </span>
                    <span className="break-keep text-sm font-semibold text-slate-800">{step}</span>
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
