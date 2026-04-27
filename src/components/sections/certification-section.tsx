import { Shield, Award, CheckCircle, Rocket } from "lucide-react"

const certifications = [
  {
    icon: Shield,
    title: "ISO 27001",
    description: "국제 정보보안 관리 인증",
  },
  {
    icon: CheckCircle,
    title: "GS 인증",
    description: "소프트웨어 품질 인증",
  },
  {
    icon: Award,
    title: "KS-QEI 1위",
    description: "3년 연속 품질만족지수 1위",
    highlight: true,
  },
  {
    icon: Rocket,
    title: "벤처기업확인",
    description: "기술혁신 인증 기업",
  },
]

export default function CertificationSection() {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-secondary/50 to-accent/10 py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            인증 & 수상
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            에버人은 국제 정보보안 인증과 3년 연속 품질 1위 수상으로 신뢰를 입증합니다.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 md:mt-16">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`group relative flex flex-col items-center rounded-2xl border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md ${
                cert.highlight
                  ? "border-primary/30 ring-2 ring-primary/10"
                  : "border-border/50"
              }`}
            >
              {cert.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  추천
                </div>
              )}
              <div
                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-all ${
                  cert.highlight
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                }`}
              >
                <cert.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-1 font-bold text-foreground">{cert.title}</h3>
              <p className="text-sm text-muted-foreground">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
