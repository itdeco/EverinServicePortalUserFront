"use client"

import { useEffect, useState, useRef } from "react"
import { Shield, Award, CheckCircle2 } from "lucide-react"

const stats = [
  { value: 33, suffix: "년", label: "HR 전문 경험", description: "영림원 33년 HR 노하우" },
  { value: 3000, suffix: "+", label: "구축 사례", description: "코스닥 이상 기업 도입" },
  { value: 3, suffix: "년", label: "품질 1위", description: "KS-QEI 연속 수상" },
]

const features = [
  {
    icon: Shield,
    title: "보안과 품질, 절대 타협하지 않습니다",
    description: "ISO 27001 국제 정보보안 인증 획득",
  },
  {
    icon: Award,
    title: "KS-QEI 품질만족지수 3년 연속 1위",
    description: "2023·2024·2025 고객 품질 평가 1위",
  },
  {
    icon: CheckCircle2,
    title: "HR 본질에 집중하세요",
    description: "에버인으로 아웃소싱하고 핵심 역량에 집중",
  },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <div ref={ref} className="text-4xl font-bold text-primary md:text-5xl">
      {count.toLocaleString()}
      <span className="text-3xl md:text-4xl">{suffix}</span>
    </div>
  )
}

export default function TrustSection() {
  return (
    <section className="bg-card py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            고객 신뢰 & 핵심 강점
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            33년 영림원의 HR 전문성과 3,000+ 도입 사례가 뒷받침하는 에버인의 핵심 강점입니다.
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3 md:mt-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative rounded-2xl border border-border/50 bg-background p-8 text-center shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <div className="mt-2 text-lg font-semibold text-foreground">{stat.label}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-2xl bg-secondary/50 p-6 text-center"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-balance font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
