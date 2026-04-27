import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Award, Heart, MessageCircle, Settings, ArrowRight } from "lucide-react"

const mainSolutions = [
  {
    icon: Wallet,
    title: "에버페이롤",
    subtitle: "급여 아웃소싱",
    description: "급여 계산·4대보험·연말정산을 전문가가 대행. HR 팀은 본연 업무에 집중하세요.",
    highlight: true,
  },
  {
    icon: Award,
    title: "에버평가",
    subtitle: "성과·OKR",
    description: "평가 관리와 OKR 목표 설정을 통합. 에버그로잉으로 목표-성과 연결을 지원합니다.",
    highlight: false,
  },
]

const additionalSolutions = [
  {
    icon: Heart,
    title: "에버복리후생",
    description: "맞춤형 복지 포인트, 사내 혜택, 경조사 관리까지",
  },
  {
    icon: MessageCircle,
    title: "에버레스크",
    description: "사내 소통 채널, 익명 신고, 피드백 수집",
  },
  {
    icon: Settings,
    title: "ERP 연동 / 추가개발",
    description: "기존 ERP 연동, 출입관리시스템, 맞춤 추가개발",
  },
]

export default function CultureSolutions() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 rounded-full px-4 py-1.5">
            Culture 솔루션
          </Badge>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            기업문화 혁신과 시스템 확장
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Culture 영역 솔루션과 부가서비스로 기업문화 혁신과 시스템 확장을 지원합니다.
          </p>
        </div>

        {/* Main solutions */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 md:mt-16">
          {mainSolutions.map((solution, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-3xl border p-8 transition-all hover:shadow-lg ${
                solution.highlight
                  ? "border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10"
                  : "border-border/50 bg-card"
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <solution.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="mt-4">
                <div className="text-sm font-medium text-primary">{solution.subtitle}</div>
                <h3 className="mt-1 text-xl font-bold text-foreground">{solution.title}</h3>
                <p className="mt-3 text-muted-foreground">{solution.description}</p>
              </div>
              <Button
                variant="ghost"
                className="mt-4 p-0 text-primary hover:bg-transparent"
              >
                자세히 알아보기
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>

        {/* Additional solutions */}
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {additionalSolutions.map((solution, index) => (
            <div
              key={index}
              className="group flex items-start gap-4 rounded-2xl border border-border/50 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-secondary">
                <solution.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{solution.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{solution.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
