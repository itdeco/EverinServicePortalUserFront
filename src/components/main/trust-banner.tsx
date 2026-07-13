"use client"

import * as React from "react"

function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = React.useState(0)
  const triggered = React.useRef(false)

  React.useEffect(() => {
    if (!inView || triggered.current) return
    triggered.current = true
    let start: number
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      // easeOut cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return count
}

function StatItem({
                    value,
                    suffix,
                    prefix,
                    label,
                    highlight,
                  }: {
  value: number
  suffix: string
  prefix?: string
  label: string
  highlight?: boolean
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const count = useCountUp(value, inView)

  return (
      <div ref={ref} className="flex flex-col items-center gap-2">
        <div className="flex items-end gap-0.5">
          {prefix && <span className="text-3xl md:text-4xl font-black text-gray-900 mb-1">{prefix}</span>}
          <span className="text-5xl md:text-6xl lg:text-7xl font-black tabular-nums" style={{ color: highlight ? "#03b565" : "#111827" }}>
          {count.toLocaleString()}
        </span>
          <span className="text-2xl md:text-3xl font-bold text-gray-500 mb-1">{suffix}</span>
        </div>
        <p className="text-sm md:text-base text-gray-500 font-medium">{label}</p>
      </div>
  )
}

const certifications = [
  {
    icon: "/images/main/trust/icon-security.png",
    label: "보안",
    sub: "ISO/IEC 27001 인증 획득\n국제표준기준\n정보보안경영시스템",
    color: "#586ffa",
  },
  {
    icon: "/images/main/trust/icon-quality.png",
    label: "품질",
    sub: "한국품질만족지수(KS-QEI)\n한국표준협회 주관\nERP부분 3년 연속 1위",
    color: "#03b565",
  },
  {
    icon: "/images/main/trust/icon-performance.png",
    label: "지속적 성능개선",
    sub: "법·제도 변화 대응, 안정적 운영\n통합 관리 기반의 검증된 품질",
    color: "#586ffa",
  }
]

export function TrustBanner() {
  return (
      <section className="py-20 lg:py-28 bg-[#f8f9fc]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          {/* Section label */}
          <div className="text-center mb-14">
          <span className="inline-block text-xl font-semibold tracking-widest text-[#03b565] uppercase mb-4">
            Why 에버人
          </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
              33년 ERP 업력의 신뢰,<br />
              <span className="text-[#03b565]">2,600+</span> 기업이 선택한 이유<br />
            </h2>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 md:gap-10 max-w-3xl mx-auto mb-16">
            <StatItem value={33} suffix="년" label="ERP 업력" />
            <StatItem value={2600} suffix="+" label="상장사 규모 이상 고객기업" highlight />
            <StatItem value={3} suffix="년 연속" label="품질경쟁력 1위" />
          </div>

          <div className="relative flex justify-center mb-16">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>

            <div className="relative bg-white px-10 py-6 rounded-full shadow-md border border-gray-100">
              <p className="text-center text-gray-600 text-base md:text-lg leading-loose font-medium max-w-md">

      <span className="block">
        영림인소프트랩은{" "}
        <span className="font-semibold text-gray-900">
          2,600여개의 ERP 구축 경험
        </span>
        을 통한
      </span>

                <span className="block mt-1">
        <span className="text-[#03b565] font-bold tracking-tight">
          보안·성능·패치 안정성
        </span>
        을 보장합니다.
      </span>

              </p>
            </div>
          </div>

          {/* Certification cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert, i) => (
                <div
                    key={i}
                    className="group bg-white border border-gray-100 rounded-2xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                      className="h-[112px] w-[112px] rounded-3xl flex items-center justify-center mb-7 transition-transform duration-300 group-hover:scale-105"
                  >
                    <img src={cert.icon} alt="" className="h-24 w-24 object-contain" />
                  </div>
                  <p className="text-gray-900 text-lg font-bold leading-snug mb-3">{cert.label}</p>
                  <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{cert.sub}</p>
                </div>
            ))}
          </div>

        </div>
      </section>
  )
}
