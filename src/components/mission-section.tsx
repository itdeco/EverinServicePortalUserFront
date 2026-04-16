"use client"

import * as React from "react"

function useInView(options?: { threshold?: number }) {
  const [inView, setInView] = React.useState(false)
  const [hasTriggered, setHasTriggered] = React.useState(false)
  const ref = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    if (hasTriggered || !ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          setHasTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: options?.threshold ?? 0.3 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasTriggered, options?.threshold])

  return { ref, inView }
}

function AnimatedNumber({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = React.useState(0)
  const { ref, inView } = useInView({ threshold: 0.3 })

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

const strengths = [
  {
    number: 33,
    suffix: " Years",
    title: "영림원이 만들면 다릅니다!",
    description: "3,000+ 구축 사례\n(코스닥 상장사 규모 이상)",
    gradient: "from-primary/10 to-primary/5",
  },
  {
    number: 1,
    suffix: "위",
    prefix: "No.",
    title: "보안과 품질 절대 타협하지 않습니다!",
    description: "ISO 27001 인증 획득\nKS-QEI 1위 (3년 연속)",
    gradient: "from-blue-100/80 to-blue-50/50",
  },
  {
    number: 0,
    suffix: "",
    prefix: "Zero",
    title: "HR 본질에 집중하세요!",
    description: "              에버人으로 아웃소싱하시고\n무결점 클라우드형 HR 솔루션",
    gradient: "from-orange-100/80 to-orange-50/50",
  },
]

export function MissionSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* 미션 텍스트 */}
        <div className="text-center mb-16">
          <p className="text-muted-foreground text-lg mb-4">
            &ldquo;고객 기업이 인적자원관리를 더 잘하게&rdquo;
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            <span className="text-primary">33년</span> 영림원의 미션
          </h2>
          <p className="text-lg text-muted-foreground">
            이제 그 본질을 HR로부터 시작하겠습니다
          </p>
        </div>

        {/* 강점 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {strengths.map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${item.gradient} rounded-3xl p-8 text-center hover:shadow-xl transition-shadow duration-300 border border-border/30`}
            >
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                {item.prefix && <span className="text-primary">{item.prefix}</span>}
                {item.number > 0 ? (
                  <AnimatedNumber target={item.number} suffix={item.suffix} />
                ) : (
                  <span className="text-primary"> Error</span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
