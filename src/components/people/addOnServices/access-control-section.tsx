"use client"

import { DoorOpen, Fingerprint, Monitor, ArrowUp, ArrowRight, ArrowDown } from "lucide-react"
import ScrollReveal from "@/components/common/scroll-reveal"
import { COLORS } from "@/constants/brand-colors"

const GREEN = COLORS.people
const GREEN_DARK = "#3f9c35"
const BLUE = "#2f3aa8"
const ORANGE = "#f97316"
const RED = "#e11d48"

/** 데이터베이스 실린더 모양 노드 */
function Cylinder({ label }: { label: string }) {
  return (
    <div className="relative mx-auto flex h-14 w-44 items-center justify-center">
      <div
        className="absolute inset-0 rounded-[50%/22px] border-2 bg-white"
        style={{ borderColor: GREEN }}
      />
      <span className="relative z-10 break-keep px-2 text-center text-sm font-bold text-slate-800">
        {label}
      </span>
    </div>
  )
}

/** 중앙 연결 방향 화살표 (데스크탑: 오른쪽 / 모바일: 아래) */
function FlowArrow({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center" style={{ color }}>
      {/* 데스크탑: 가로 → */}
      <div className="hidden items-center lg:flex">
        <span className="h-0.5 w-10" style={{ backgroundColor: color }} />
        <ArrowRight className="-ml-1 h-5 w-5" strokeWidth={3} />
      </div>
      {/* 모바일: 세로 ↓ */}
      <div className="flex flex-col items-center lg:hidden">
        <span className="h-8 w-0.5" style={{ backgroundColor: color }} />
        <ArrowDown className="-mt-1 h-5 w-5" strokeWidth={3} />
      </div>
    </div>
  )
}

/** 위로 향하는 파란 화살표 */
function UpArrow() {
  return (
    <div className="flex flex-col items-center" style={{ color: BLUE }}>
      <div className="h-6 w-0.5" style={{ backgroundColor: BLUE }} />
      <ArrowUp className="-mt-2 h-4 w-4" strokeWidth={3} />
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
            style={{ backgroundColor: `${GREEN}14`, color: GREEN }}
          >
            <DoorOpen className="h-4 w-4" />
            출입관리시스템
          </div>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">출입 데이터로 근태를 통합 관리하세요</h2>
          <p className="mx-auto mt-4 max-w-2xl break-keep text-base leading-relaxed text-gray-600 md:text-lg">
            사용하고 계시는 출입관리시스템(세콤 / 캡스)과의 연동으로 출입데이터를 자동 전송하여 근태 내역을 통합
            관리하세요.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm md:p-8">
            <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
              {/* ============ 세콤 / 캡스 보안시스템 ============ */}
              <div className="overflow-hidden rounded-xl border-2 bg-white" style={{ borderColor: GREEN }}>
                <div
                  className="py-2.5 text-center text-base font-bold text-white"
                  style={{ backgroundColor: GREEN }}
                >
                  세콤 / 캡스 보안시스템
                </div>
                <div className="flex flex-col items-center p-6">
                  {/* 리더기 + 관리용 PC */}
                  <div className="flex w-full items-end justify-center gap-8">
                    {/* 리더기 */}
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-bold" style={{ color: GREEN_DARK }}>
                        리더기
                      </span>
                      <div className="flex h-24 w-16 flex-col items-center justify-between rounded-md border-2 border-slate-300 bg-slate-100 p-1.5">
                        <div className="h-6 w-full rounded-sm bg-slate-700" />
                        <Fingerprint className="h-8 w-8 text-slate-500" />
                      </div>
                    </div>
                    {/* 관리용 PC */}
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-bold" style={{ color: GREEN_DARK }}>
                        관리용 PC
                      </span>
                      <span className="text-[11px] font-semibold" style={{ color: GREEN_DARK }}>
                        시스템 매니저
                      </span>
                      <Monitor className="h-14 w-14 text-slate-600" strokeWidth={1.4} />
                    </div>
                  </div>

                  {/* 화살표: 출퇴근시간 / 4.연동 설정 */}
                  <div className="mt-2 flex w-full items-start justify-center gap-8">
                    <div className="flex flex-col items-center" style={{ color: BLUE }}>
                      <span className="mb-1 text-[11px] font-bold text-slate-600">출퇴근시간</span>
                      <div className="h-8 w-0.5" style={{ backgroundColor: BLUE }} />
                      <ArrowUp className="-mt-2 h-4 w-4 rotate-180" strokeWidth={3} />
                    </div>
                    <div className="flex flex-col items-center" style={{ color: BLUE }}>
                      <span className="mb-1 text-[11px] font-bold text-slate-600">4. 연동 설정</span>
                      <div className="h-8 w-0.5" style={{ backgroundColor: BLUE }} />
                      <ArrowUp className="-mt-2 h-4 w-4 rotate-180" strokeWidth={3} />
                    </div>
                  </div>

                  <div className="mt-3">
                    <Cylinder label="출입데이터" />
                  </div>
                </div>
              </div>

              {/* ============ 중앙 연결 (세콤/캡스 → 에버타임) ============ */}
              <div className="flex flex-row items-stretch justify-center gap-4 py-2 lg:flex-col lg:justify-center lg:gap-6 lg:py-8">
                {/* 공통 방향 안내 */}
                <span className="hidden text-center text-[11px] font-bold uppercase tracking-wide text-slate-400 lg:block">
                  세콤 / 캡스 → 에버타임
                </span>

                {/* 3. ODBC 설정 */}
                <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed bg-white px-3 py-4 lg:flex-none"
                  style={{ borderColor: ORANGE }}
                >
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold text-white"
                    style={{ backgroundColor: ORANGE }}
                  >
                    3. ODBC 설정
                  </span>
                  <FlowArrow color={ORANGE} />
                  <span className="break-keep text-center text-[11px] font-semibold text-slate-500">
                    관리용 PC → 연동 테이블
                  </span>
                </div>

                {/* 5. 출입데이터 자동전송 */}
                <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-4 lg:flex-none"
                  style={{ borderColor: GREEN_DARK, backgroundColor: "#f2fbef" }}
                >
                  <span
                    className="rounded-full px-3 py-1 text-center text-xs font-black leading-tight text-white"
                    style={{ backgroundColor: GREEN_DARK }}
                  >
                    5. 출입데이터 자동전송
                  </span>
                  <FlowArrow color={GREEN_DARK} />
                  <span className="break-keep text-center text-[11px] font-semibold text-slate-500">
                    출입데이터 → 연동 테이블
                  </span>
                </div>
              </div>

              {/* ============ 에버타임 ============ */}
              <div className="overflow-hidden rounded-xl border-2 bg-white" style={{ borderColor: GREEN }}>
                <div className="flex items-center justify-center gap-2 py-2.5">
                  <span className="h-4 w-4 rounded-full" style={{ backgroundColor: GREEN }} />
                  <span className="text-base font-bold text-slate-800">에버타임</span>
                </div>
                <div className="flex flex-col items-center border-t border-slate-100 p-6">
                  {/* 출근부 */}
                  <div className="w-full max-w-[220px] rounded-md border border-slate-200 bg-slate-50 p-3 text-center">
                    <span className="text-base font-bold text-slate-800">출근부</span>
                  </div>
                  <UpArrow />
                  <Cylinder label="출 / 퇴근 테이블" />
                  <UpArrow />
                  {/* 카드 출퇴근 데이터 업로드 (빨강) */}
                  <div
                    className="rounded-lg border-2 px-5 py-2.5"
                    style={{ borderColor: RED, backgroundColor: "#fff1f2" }}
                  >
                    <span className="text-sm font-bold" style={{ color: RED }}>
                      카드 출퇴근 데이터 업로드
                    </span>
                  </div>
                  <UpArrow />
                  <Cylinder label="연동 테이블" />
                  <p className="mt-4 break-keep text-center text-xs font-semibold text-slate-500">
                    1. 접속 계정 생성 · 2. 연동 테이블 생성
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
