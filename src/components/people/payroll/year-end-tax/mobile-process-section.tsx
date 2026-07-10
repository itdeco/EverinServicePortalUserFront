"use client"

import Image from "next/image"
import { useState } from "react"
import { ClipboardCheck, FileUp, History, UserRoundPlus } from "lucide-react"

const BLUE = "#3344e6"

const mobileFeatures = [
  { title: "부양가족 입력", icon: UserRoundPlus },
  { title: "국세청 PDF 업로드", icon: FileUp },
  { title: "공제 증빙자료 업로드", icon: ClipboardCheck },
  { title: "이전 연말정산 모아보기", icon: History },
]

const steps = [
  {
    step: "01",
    title: "국세청 PDF 다운받아 시작",
    desc: "홈 화면 안내에 따라 홈택스 PDF를 내려받고 연말정산을 시작합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-home.jpg",
  },
  {
    step: "02",
    title: "연말정산 시작하기",
    desc: "정산 연도를 선택하고 이전 연말정산 내역도 함께 확인할 수 있습니다.",
    image: "/images/people/payroll/year-end-tax/mobile-pdf-upload.jpg",
  },
  {
    step: "03",
    title: "전 근무지 여부 확인",
    desc: "해당 연도에 다른 회사에서 근무한 이력이 있는지 확인합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-pdf-confirm.jpg",
  },
  {
    step: "04",
    title: "전 근무지 입력",
    desc: "전 근무지와 납세조합 정보, 소득·공제 내역을 직접 추가합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-previous-workplace.jpg",
  },
  {
    step: "05",
    title: "개인 인적정보 입력",
    desc: "거주자 여부, 세대주 여부 등 개인 인적정보를 입력합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-personal-info.jpg",
  },
  {
    step: "06",
    title: "부양가족 입력",
    desc: "전년도 정보를 불러오거나 부양가족을 추가해 공제 대상을 관리합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-dependent-list.jpg",
  },
  {
    step: "07",
    title: "국세청 PDF 업로드",
    desc: "국세청 자료를 업로드하면 내용을 확인하고 필요한 항목은 수기로 보완합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-deduction-summary.jpg",
  },
  {
    step: "08",
    title: "소득·공제 내역 확인",
    desc: "근무처별 소득명세와 공제 항목을 한눈에 확인하고 저장합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-submit-ready.jpg",
  },
  {
    step: "09",
    title: "연말정산 제출",
    desc: "확인이 끝나면 모바일에서 바로 제출하고 제출 내역을 확인합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-start.jpg",
  },
  {
    step: "10",
    title: "처리결과 확인",
    desc: "제출 후 연말정산 처리결과를 모바일에서 바로 확인합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-result.jpg",
  },
]

export default function YearEndTaxMobileProcessSection() {
  const [active, setActive] = useState(0)
  const current = steps[active]

  return (
    <section className="bg-[#f7f8ff] py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        {/* 헤더 */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base font-bold" style={{ color: BLUE }}>
            모바일 연말정산
          </p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 md:text-[32px]">
            입력부터 제출·결과 확인까지 모바일에서 이어집니다.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-500 md:text-lg">
            직원은 필요한 정보를 직접 입력하고, 담당자는 제출 현황과 처리 결과를 더 빠르게 확인할 수 있습니다.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {mobileFeatures.map(({ title, icon: Icon }) => (
              <div key={title} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(51,68,230,0.1)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: BLUE }} strokeWidth={1.7} />
                </span>
                <span className="text-left text-sm font-bold text-gray-800">{title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 인터랙티브 스텝 뷰어 */}
        <div className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-[420px_1fr] lg:items-center lg:gap-14">
          {/* 폰 화면 미리보기 */}
          <div className="order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-[300px]">
              <div className="absolute -inset-6 -z-10 rounded-[48px] bg-gradient-to-b from-[#e6e9ff] to-transparent blur-2xl" />
              <div className="rounded-[40px] border-[10px] border-gray-900 bg-gray-900 shadow-[0_30px_70px_rgba(31,45,77,0.28)]">
                <div className="overflow-hidden rounded-[30px] bg-white">
                  <Image
                    key={current.image}
                    src={current.image || "/placeholder.svg"}
                    alt={current.title}
                    width={360}
                    height={760}
                    className="phone-fade h-auto w-full"
                    priority
                  />
                </div>
              </div>
              <span
                className="absolute -left-3 -top-3 flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-black text-white shadow-lg"
                style={{ backgroundColor: BLUE }}
              >
                {current.step}
              </span>
            </div>

            {/* 진행 표시 점 */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {steps.map((s, i) => (
                <button
                  key={s.step}
                  type="button"
                  aria-label={`${s.step} ${s.title}`}
                  onClick={() => setActive(i)}
                  className="h-2.5 rounded-full transition-all"
                  style={{
                    width: i === active ? 28 : 10,
                    backgroundColor: i === active ? BLUE : "#cdd3f7",
                  }}
                />
              ))}
            </div>
          </div>

          {/* 단계 목록 */}
          <div className="order-1 lg:order-2">
            <ol className="grid gap-2.5 sm:grid-cols-2">
              {steps.map((s, i) => {
                const isActive = i === active
                return (
                  <li key={s.step}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                        isActive
                          ? "border-transparent bg-white shadow-[0_14px_36px_rgba(51,68,230,0.16)]"
                          : "border-gray-100 bg-white/60 hover:bg-white"
                      }`}
                    >
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors"
                        style={{
                          backgroundColor: isActive ? BLUE : "rgba(51,68,230,0.1)",
                          color: isActive ? "#fff" : BLUE,
                        }}
                      >
                        {s.step}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] font-bold text-gray-900">{s.title}</span>
                        <span
                          className={`mt-1 block text-sm leading-relaxed text-gray-500 transition-all ${
                            isActive ? "opacity-100" : "line-clamp-1 opacity-70 sm:opacity-0 sm:hidden"
                          }`}
                        >
                          {s.desc}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes phoneFade {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .phone-fade {
          animation: phoneFade 0.35s ease-out both;
        }
      `}</style>
    </section>
  )
}
