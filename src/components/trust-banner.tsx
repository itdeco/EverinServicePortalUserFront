"use client"

import * as React from "react"
import { useInView } from "react-intersection-observer"

function AnimatedNumber({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = React.useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  React.useEffect(() => {
    if (!inView) return
    
    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [inView, target, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const stats = [
  { number: 33, suffix: "년", label: "ERP 구축 경험" },
  { number: 3000, suffix: "+", label: "도입 고객사" },
  { number: 3, suffix: "년 연속", label: "품질만족지수 1위" },
]

const certifications = [
  {
    title: "ISO 27001",
    description: "정보보안 국제인증",
    icon: "🛡️",
  },
  {
    title: "품질만족지수 1위",
    description: "2023·2024·2025 3년 연속 수상",
    icon: "🏆",
  },
  {
    title: "GS인증",
    description: "소프트웨어 품질인증",
    icon: "✓",
  },
  {
    title: "벤처기업 확인",
    description: "기술혁신 인증",
    icon: "🚀",
  },
]

export function TrustBanner() {
  return (
    <section className="py-16 lg:py-20">
      {/* 숫자 통계 배너 */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 py-12 mb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 인증 배지 */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-2">검증된 신뢰와 품질</h3>
          <p className="text-muted-foreground">국내외 공인기관이 인정한 에버인의 기술력</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border/50 p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{cert.icon}</div>
              <h4 className="font-semibold text-foreground mb-1">{cert.title}</h4>
              <p className="text-xs text-muted-foreground">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
