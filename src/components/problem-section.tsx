import { AlertCircle, Layers, UserMinus, Target } from "lucide-react"

const problems = [
  {
    icon: Layers,
    title: "흩어진 HR 시스템 통합",
    description: "근태·급여·평가·ERP를 하나의 플랫폼으로 통합합니다.",
  },
  {
    icon: UserMinus,
    title: "신입사원 이탈 방지",
    description: "AI 기반 온보딩으로 첫 3개월을 집중 관리합니다.",
  },
  {
    icon: Target,
    title: "HR 본연 업무에 집중",
    description: "반복 업무를 아웃소싱하고, 전략적 HR에 집중하세요.",
  },
]

export default function ProblemSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          {/* Problem statement */}
          <div className="mb-16 flex flex-col items-center gap-8 md:flex-row md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive">
                <AlertCircle className="h-4 w-4" />
                문제 인식
              </div>
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
                왜 지금, 에버人인가?
              </h2>
              <p className="text-pretty text-lg text-muted-foreground">
                신입사원 이탈의 주된 원인은 체계 없는 온보딩과 부재한 조직 문화 적응 지원입니다.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full border-4 border-destructive/20 bg-destructive/5">
                <span className="text-4xl font-bold text-destructive">23%</span>
                <span className="text-sm text-destructive/80">이상</span>
                <div className="absolute -bottom-6 whitespace-nowrap rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
                  3개월 이내 퇴사율
                </div>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div className="rounded-3xl border border-border/50 bg-card p-8 shadow-sm md:p-12">
            <h3 className="mb-8 text-center text-xl font-semibold text-foreground">
              에버人이 해결하는 문제
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center rounded-2xl bg-secondary/30 p-6 text-center transition-all hover:bg-secondary/50"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all group-hover:bg-primary/20">
                    <problem.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h4 className="mb-2 font-semibold text-foreground">{problem.title}</h4>
                  <p className="text-sm text-muted-foreground">{problem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
