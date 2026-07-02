"use client"

import Image from "next/image"
import { FileSignature, Smartphone, MonitorCheck, CheckCircle2, ListChecks } from "lucide-react"
import ScrollReveal from "@/components/common/scroll-reveal"
import { COLORS } from "@/constants/brand-colors"

const phones = [
  { src: "/images/people/addOnServices/contract-mobile-list.jpg", label: "계약서 조회" },
  { src: "/images/people/addOnServices/contract-mobile-agree.jpg", label: "계약서 동의" },
  { src: "/images/people/addOnServices/contract-mobile-sign.jpg", label: "서명 등록" },
]

const points = [
  "전자근로계약을 모바일 앱으로 편리하게 서명받고 관리",
  "인사 정보와 근태 데이터가 자동 연동되어 계약서까지 한 곳에서 처리",
  "계약서 조회 화면에서 사원별 동의 여부를 실시간 확인",
  "전체 / 선택 출력으로 계약서 일괄 관리 가능",
]

export default function ElectronicContractSection() {
  return (
    <section id="electronic-contract" className="scroll-mt-32 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-12">
        <ScrollReveal className="mb-12 text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold"
            style={{ backgroundColor: `${COLORS.people}14`, color: COLORS.people }}
          >
            <FileSignature className="h-4 w-4" />
            전자계약
          </div>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            전자근로계약도 모바일로 간편하게
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            인사 정보와 근태 데이터가 자동 연동되어, 하나의 HR플랫폼 에버人에서 계약서까지 처리하세요.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* 왼쪽: 모바일 3종 */}
          <ScrollReveal>
            <div className="rounded-[28px] border border-emerald-100 bg-[#f5fdf8] p-6 md:p-8">
              <div className="mb-5 flex items-center gap-2 text-sm font-bold" style={{ color: COLORS.people }}>
                <Smartphone className="h-4 w-4" />
                모바일 앱 화면
              </div>
              <div className="grid grid-cols-3 gap-3">
                {phones.map((phone) => (
                  <div key={phone.label} className="flex flex-col items-center gap-2">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <Image
                        src={phone.src || "/placeholder.svg"}
                        alt={`${phone.label} 화면`}
                        width={300}
                        height={620}
                        className="h-auto w-full object-contain"
                      />
                    </div>
                    <span className="text-center text-xs font-semibold text-slate-600 md:text-sm">
                      {phone.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 오른쪽: 포인트 + 데스크톱 */}
          <div className="flex flex-col gap-6">
            <ScrollReveal delay={100}>
              <ul className="space-y-4">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0" style={{ color: COLORS.people }} />
                    <span className="break-keep text-base font-medium leading-relaxed text-slate-800 md:text-lg">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.1)]">
                <div className="flex h-8 items-center gap-1.5 border-b border-slate-200 bg-slate-900 px-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 flex items-center gap-1 text-[11px] font-semibold text-slate-300">
                    <MonitorCheck className="h-3.5 w-3.5" />
                    관리자 계약서 화면
                  </span>
                </div>
                <div className="bg-white p-3">
                  <Image
                    src="/images/people/addOnServices/contract-desktop.jpg"
                    alt="관리자 전자계약 화면"
                    width={1120}
                    height={620}
                    className="h-auto w-full rounded-lg object-contain"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* 두 번째: 계약서조회 화면 */}
        <ScrollReveal className="mt-16 md:mt-24">
          <div className="mb-8 text-center">
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold"
              style={{ backgroundColor: `${COLORS.people}14`, color: COLORS.people }}
            >
              <ListChecks className="h-4 w-4" />
              계약서 조회
            </div>
            <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">
              사원별 동의 여부를 실시간으로 확인하세요
            </h3>
            <p className="mx-auto mt-3 max-w-2xl break-keep text-base leading-relaxed text-gray-600">
              계약서 조회 화면에서 사원별 계약서 동의 여부를 실시간 확인할 수 있으며, 전체 / 선택 출력이 가능합니다.
            </p>
          </div>

          {/* 계약서조회 화면 스크린샷 */}
          <div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.14)]">
            <Image
              src="/images/people/addOnServices/contract-inquiry.png"
              alt="계약서 조회 화면 - 사원별 계약서 동의 여부 및 전체/선택 출력"
              width={1456}
              height={370}
              className="h-auto w-full"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
