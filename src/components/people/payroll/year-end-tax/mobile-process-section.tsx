"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
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
    title: "연말정산 준비하기",
    desc: "홈 화면 안내에 따라 홈택스 PDF를 내려받고 연말정산을 준비합니다.",
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
    image: "/images/people/payroll/year-end-tax/mobile-submit-ready.jpg",
  },
  {
    step: "08",
    title: "소득·공제 내역 확인",
    desc: "근무처별 소득명세와 공제 항목을 한눈에 확인하고 저장합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-deduction-summary.jpg",
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

function PhoneFrame({
                      src,
                      alt,
                      badge,
                      className = "",
                    }: {
  src: string
  alt: string
  badge: string
  className?: string
}) {
  return (
      <div className={`relative ${className}`}>
        <div className="absolute -inset-6 -z-10 rounded-[48px] bg-gradient-to-b from-[#e6e9ff] to-transparent blur-2xl" />
        <div className="rounded-[40px] border-[10px] border-gray-900 bg-gray-900 shadow-[0_30px_70px_rgba(31,45,77,0.28)]">
          <div className="overflow-hidden rounded-[30px] bg-white">
            <Image
                key={src}
                src={src || "/placeholder.svg"}
                alt={alt}
                width={360}
                height={760}
                className="phone-fade h-auto w-full"
                priority
            />
          </div>
        </div>
        <span
            className="absolute -left-3 -top-3 flex h-12 w-12 items-center justify-center rounded-2xl text-base font-black text-white shadow-lg"
            style={{ backgroundColor: BLUE }}
        >
        {badge}
      </span>
      </div>
  )
}

export default function YearEndTaxMobileProcessSection() {
  const [active, setActive] = useState(0)
  const current = steps[active]

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches
      const selector = isDesktop ? "[data-yet-desktop-step]" : "[data-yet-mobile-step]"
      const els = Array.from(document.querySelectorAll<HTMLElement>(selector)).filter(
          (el) => el.offsetParent !== null,
      )
      if (els.length === 0) return

      if (isDesktop) {
        const target = 190
        let best = 0
        let bestDist = Number.POSITIVE_INFINITY

        els.forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.bottom <= 120 || rect.top >= window.innerHeight) return

          const dist = Math.abs(rect.top + rect.height / 2 - target)
          if (dist < bestDist) {
            bestDist = dist
            best = Number(el.dataset.yetDesktopStep)
          }
        })

        setActive((prev) => (prev === best ? prev : best))
        return
      }

      const center = window.innerHeight / 2
      let best = 0
      let bestDist = Number.POSITIVE_INFINITY

      els.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const dist = Math.abs(rect.top + rect.height / 2 - center)
        if (dist < bestDist) {
          bestDist = dist
          best = Number(el.dataset.yetMobileStep)
        }
      })

      setActive((prev) => (prev === best ? prev : best))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
      <section className="bg-[#f7f8ff] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          {/* 헤더 */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-2xl font-bold" style={{ color: BLUE }}>
              모바일 연말정산
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 md:text-[32px]">
              입력부터 제출·결과 확인까지 모바일에서 이어집니다.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-500 md:text-lg">
              직원은 필요한 정보를 직접 입력하고, 담당자는 제출 현황과 처리 결과를 더 빠르게 확인할 수 있습니다.
            </p>

            {/* 기능 칩 - 한 줄 정렬 */}
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {mobileFeatures.map(({ title, icon: Icon }) => (
                  <span
                      key={title}
                      className="inline-flex items-center gap-2 rounded-full border border-[#e0e4ff] bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm"
                  >
                <Icon className="h-4 w-4" style={{ color: BLUE }} strokeWidth={2} />
                    {title}
              </span>
              ))}
            </div>
          </div>

          {/* ===== 데스크톱: 텍스트(좌) + 고정 폰(우) ===== */}
          <div className="mt-16 hidden lg:grid lg:min-h-[calc(100vh+1800px)] lg:grid-cols-[1fr_380px] lg:items-start lg:gap-16">
            {/* 텍스트 목록 - 모든 부가 설명 표시 */}
            <ol className="flex flex-col gap-4">
              {steps.map((s, i) => {
                const isActive = i === active
                return (
                    <li key={s.step}>
                      <button
                          type="button"
                          data-yet-desktop-step={i}
                          onClick={() => setActive(i)}
                          className={`flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all ${
                              isActive
                                  ? "border-transparent bg-white shadow-[0_14px_36px_rgba(51,68,230,0.16)]"
                                  : "border-gray-100 bg-white/50 hover:bg-white"
                          }`}
                      >
                    <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors"
                        style={{
                          backgroundColor: isActive ? BLUE : "rgba(51,68,230,0.1)",
                          color: isActive ? "#fff" : BLUE,
                        }}
                    >
                      {s.step}
                    </span>
                        <span className="min-w-0">
                      <span className="block text-[15px] font-bold text-gray-900">{s.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-gray-500">{s.desc}</span>
                    </span>
                      </button>
                    </li>
                )
              })}
            </ol>

            {/* 고정 폰 */}
            <div className="relative self-stretch lg:min-h-full">
              <div className="sticky top-32">
                <PhoneFrame
                    src={current.image}
                    alt={current.title}
                    badge={current.step}
                    className="mx-auto w-full max-w-[300px]"
                />
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  {steps.map((s, i) => (
                      <span
                          key={s.step}
                          className="h-2.5 rounded-full transition-all"
                          style={{
                            width: i === active ? 28 : 10,
                            backgroundColor: i === active ? BLUE : "#cdd3f7",
                          }}
                      />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ===== 모바일: 스크롤 연동 스토리텔링 ===== */}
          <div className="mt-12 lg:hidden">
            <div className="relative">
              {/* 고정 스테이지 */}
              <div className="pointer-events-none sticky top-0 z-10 flex h-[100svh] translate-y-5 flex-col items-center justify-center gap-6">
                <PhoneFrame
                    src={current.image}
                    alt={current.title}
                    badge={current.step}
                    className="w-full max-w-[210px]"
                />
                <div className="max-w-xs text-center">
                  <h3 className="text-lg font-bold text-gray-900">{current.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{current.desc}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {steps.map((s, i) => (
                      <span
                          key={s.step}
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: i === active ? 22 : 8,
                            backgroundColor: i === active ? BLUE : "#cdd3f7",
                          }}
                      />
                  ))}
                </div>
              </div>

              {/* 스크롤 트리거 (스테이지 위에 겹쳐 위치) */}
              <div className="pointer-events-none relative -mt-[100svh]" aria-hidden="true">
                {steps.map((s, i) => (
                    <div key={s.step} data-yet-mobile-step={i} className="h-[80vh]" />
                ))}
              </div>
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
