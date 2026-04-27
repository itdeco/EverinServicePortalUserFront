"use client"

import * as React from "react"

function useCountUp(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = React.useState(0)
  const triggered = React.useRef(false)

  React.useEffect(() => {
    if (!inView || triggered.current) return
    triggered.current = true
    let start: number
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return count
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const count = useCountUp(value, inView)

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tabular-nums mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-gray-400 text-sm md:text-base">{label}</p>
    </div>
  )
}

const certifications = [
  { label: "ISO 27001", sub: "정보보안 국제인증" },
  { label: "품질경쟁력우수 1위", sub: "한국생산성본부 선정" },
  { label: "GS인증", sub: "1등급 소프트웨어" },
  { label: "벤처기업 확인", sub: "기술보증기금 인증" },
]

export function TrustBanner() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Stats - light lavender bg area */}
        <div
          className="rounded-3xl py-14 px-8 mb-14"
          style={{ background: "linear-gradient(135deg, rgba(88,111,250,0.05) 0%, rgba(0,220,170,0.05) 100%)" }}
        >
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            <StatItem value={33} suffix="년" label="ERP 업력" />
            <StatItem value={3000} suffix="+" label="고객 기업" />
            <StatItem value={3} suffix="년 연속" label="품질경쟁력 1위" />
          </div>
        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            영림인소프트랩은 2,300여개의 중대형 ERP 구축 및<br />
            유지보수 경험을 통한{" "}
            <span className="text-[#00dcaa] font-semibold">성능·보안·패치 안정성</span>을 보장합니다.
          </p>
        </div>

        {/* Certification badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl p-5 text-center hover:shadow-md transition-shadow bg-white"
            >
              <div className="w-12 h-12 rounded-full bg-[#00dcaa]/10 mx-auto mb-3 flex items-center justify-center">
                <span className="text-[#00dcaa] text-xs font-bold">인증</span>
              </div>
              <p className="text-gray-900 text-sm font-bold mb-1">{cert.label}</p>
              <p className="text-gray-400 text-xs">{cert.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
