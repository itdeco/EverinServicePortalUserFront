import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, Building2, Shield, ArrowRight } from "lucide-react"

const solutions = [
  {
    icon: Building2,
    badge: "온보딩",
    title: "에버웰커밍",
    description: "AI Builder, 전자서명, 서류취합, 업무배정, 교육 자동화",
    color: "bg-primary",
  },
  {
    icon: Clock,
    badge: "근태관리",
    title: "에버타임 스탠다드",
    description: "출퇴근, 스케줄, 야근·휴가 관리와 컴플라이언스 대응",
    color: "bg-chart-2",
  },
  {
    icon: Users,
    badge: "인사·조직·발령",
    title: "인사관리",
    description: "인사이동, 조직도 관리, 발령 처리를 디지털로 통합",
    color: "bg-chart-3",
  },
  {
    icon: Shield,
    badge: "PC 보안",
    title: "EVER PC-OFF",
    description: "퇴근 후 자동 잠금과 업무 시간 외 접근 차단 지원",
    color: "bg-chart-5",
  },
]

export default function PeopleSolutions() {
  return (
    <section className="bg-secondary/30 py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 rounded-full px-4 py-1.5">
            People 솔루션
          </Badge>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            인사관리의 모든 것
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            에버인의 People 영역 4가지 핵심 솔루션으로 온보딩부터 인사·근태·보안까지 HR 운영의 전
            과정을 지원합니다.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg md:p-8"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${solution.color}`}
                >
                  <solution.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {solution.badge}
                  </Badge>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{solution.title}</h3>
                  <p className="text-sm text-muted-foreground">{solution.description}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary opacity-0 transition-all group-hover:opacity-100"
                >
                  자세히 보기
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
