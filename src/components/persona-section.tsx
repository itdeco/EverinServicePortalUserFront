"use client"

import { Users, TrendingDown, Lightbulb } from "lucide-react"

const personas = [
  {
    name: "박으뜸 과장",
    age: "34세",
    role: "중소기업 HR 1인 담당자",
    pain: "\"신입 오는 전날 야근해요. 흩어진 자료 찾느라 하루가 다 가요.\"",
    need: "나 대신 온보딩해줄 자동화 (온보딩만 전담해줄 인력 필요)",
    solution: "에버웰커밍",
    solutionDesc: "AI 빌더 기반 온보딩 자동화",
    color: "bg-primary/10 border-primary/30",
    iconBg: "bg-primary/20",
  },
  {
    name: "김피플 팀장",
    age: "38세",
    role: "스타트업 People & Culture",
    pain: "\"회사의 빠른 성장과 수시 인력채용으로 인해 온보딩과 근태관리가 못 따라가요. 엑셀+주먹구구식.\"",
    need: "확장 가능한 체계적 시스템 (온보딩+근태+평가까지 확장 여지)",
    solution: "에버웰커밍 + 에버타임",
    solutionDesc: "온보딩부터 근태까지 통합 관리",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
  },
  {
    name: "박문화 이사",
    age: "48세",
    role: "중소기업 경영지원 임원 / C-Level",
    pain: "\"연말정산이나 급여처리 등 특정시기에 급여/세무신고 등으로 바빠서 다른 HR 주요 업무를 추진할 수가 없음.\"",
    need: "급여 아웃소싱을 통한 조직 효율화 (HR 본연의 업무에 집중)",
    solution: "에버페이롤",
    solutionDesc: "전문가 급여 아웃소싱 서비스",
    color: "bg-orange-50 border-orange-200",
    iconBg: "bg-orange-100",
  },
]

export function PersonaSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* 통계 헤드라인 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-6 py-4 mb-6">
            <TrendingDown className="w-8 h-8 text-red-500" />
            <div className="text-left">
              <p className="text-3xl md:text-4xl font-bold text-red-600">23%</p>
              <p className="text-sm text-red-600/80">3개월 이내 퇴사율</p>
            </div>
            <span className="text-xs text-red-500/60 ml-2">(출처: 사람인)</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            이런 고민, 혹시 공감되시나요?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            에버인은 각기 다른 HR 담당자의 고민을 해결합니다
          </p>
        </div>

        {/* 페르소나 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {personas.map((persona, index) => (
            <div
              key={index}
              className={`rounded-3xl border-2 p-6 ${persona.color} hover:shadow-xl transition-all duration-300`}
            >
              {/* 프로필 */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full ${persona.iconBg} flex items-center justify-center`}>
                  <Users className="w-6 h-6 text-foreground/70" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{persona.name}, {persona.age}</h3>
                  <p className="text-sm text-muted-foreground">{persona.role}</p>
                </div>
              </div>

              {/* 고민 */}
              <div className="bg-background/60 rounded-2xl p-4 mb-4">
                <p className="text-sm text-foreground/80 italic leading-relaxed">
                  {persona.pain}
                </p>
              </div>

              {/* 니즈 */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-1 font-medium">NEED</p>
                <p className="text-sm text-foreground">{persona.need}</p>
              </div>

              {/* 솔루션 */}
              <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                <Lightbulb className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-primary">{persona.solution}</p>
                  <p className="text-xs text-muted-foreground">{persona.solutionDesc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
