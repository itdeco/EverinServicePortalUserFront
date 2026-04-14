"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Clock, Shield, Calculator, Award, Heart, MessageSquare, Link2 } from "lucide-react"

const peopleSolutions = [
  {
    badge: "대한민국 People팀 무료",
    badgeColor: "bg-primary text-primary-foreground",
    title: "에버웰커밍",
    subtitle: "온보딩",
    description: "신규 입사자의 조직적응을 위한 따뜻한 온보딩\nAI Builder 탑재로 자동화된 프로세스",
    features: ["전자서명", "서류취합", "업무배정", "교육자동화"],
    icon: Sparkles,
    gradient: "from-primary/10 to-primary/5",
    featured: true,
  },
  {
    badge: "7개월 무료",
    badgeColor: "bg-blue-500 text-white",
    title: "에버타임 스탠다드",
    subtitle: "근태관리",
    description: "복잡한 근로기준법, 더 이상 걱정하지 마세요.\n실시간 모니터링으로 법적 리스크를 0%로",
    features: ["주52시간 관리", "유연근무", "휴가관리", "출퇴근"],
    icon: Clock,
    gradient: "from-blue-100/80 to-blue-50/50",
    featured: true,
  },
  {
    badge: "Law",
    badgeColor: "bg-slate-700 text-white",
    title: "PC-OFF",
    subtitle: "EVER PC-OFF",
    description: "퇴근 후에도 업무용 PC가 켜져 있다면?\n주52시간 법정근로시간 초과 리스크 원천 차단",
    features: ["자동 종료", "근무시간 관리", "알림 시스템"],
    icon: Shield,
    gradient: "from-slate-100/80 to-slate-50/50",
    featured: false,
  },
  {
    badge: "통합관리",
    badgeColor: "bg-emerald-500 text-white",
    title: "인사관리",
    subtitle: "인사·조직·발령",
    description: "인사정보, 전자근로계약서, 보안서약서 등 원스톱 관리\nKPI, OKR 평가와 연동하여 채용에서 퇴직까지",
    features: ["인사정보", "전자계약", "조직관리", "발령"],
    icon: Award,
    gradient: "from-emerald-100/80 to-emerald-50/50",
    featured: false,
  },
]

const cultureSolutions = [
  {
    badge: "BPO",
    badgeColor: "bg-violet-500 text-white",
    title: "에버페이롤",
    subtitle: "급여",
    description: "급여 오류가 반복된다면, 그건 담당자가 아니라 시스템 문제입니다!\n33년 영림원 노하우가 담긴 무결점 급여 엔진",
    features: ["급여계산", "4대보험", "연말정산", "세무신고"],
    icon: Calculator,
    gradient: "from-violet-100/80 to-violet-50/50",
    featured: true,
  },
  {
    badge: "성과/OKR",
    badgeColor: "bg-amber-500 text-white",
    title: "에버평가",
    subtitle: "평가",
    description: "상반기 인사평가 결과 직원들이 납득하나요?\n공정한 평가와 투명한 보상, 성과와 보상을 연결",
    features: ["다면평가", "OKR", "1:1 미팅", "보상연동"],
    icon: Award,
    gradient: "from-amber-100/80 to-amber-50/50",
    featured: true,
  },
  {
    badge: "복지",
    badgeColor: "bg-pink-500 text-white",
    title: "에버복리후생",
    subtitle: "복리후생",
    description: "나의 복리후생 더 이상 인사팀에 묻지 마세요!\n통합 포털에서 급여명세서, 계약서, 복지 내역을 한번에",
    features: ["복지몰 연동", "포인트 관리", "혜택 조회"],
    icon: Heart,
    gradient: "from-pink-100/80 to-pink-50/50",
    featured: false,
  },
  {
    badge: "Culture",
    badgeColor: "bg-cyan-500 text-white",
    title: "에버레스크",
    subtitle: "기업문화혁신",
    description: "오늘 회의는 어떠셨나요?\n질문을 통한 비효율적인 회의문화 혁신부터",
    features: ["회의예약", "아젠다 공유", "익명 소통"],
    icon: MessageSquare,
    gradient: "from-cyan-100/80 to-cyan-50/50",
    featured: false,
  },
  {
    badge: "연동",
    badgeColor: "bg-slate-600 text-white",
    title: "ERP 연동/개발",
    subtitle: "시스템 연동 및 개발",
    description: "HR 업무 관련 솔루션을 5개 이상 쓰고 계신가요?\n에버인 하나로 통합해보세요!",
    features: ["ERP 연동", "데이터 마이그레이션", "맞춤 개발"],
    icon: Link2,
    gradient: "from-slate-100/80 to-slate-50/50",
    featured: false,
  },
]

function SolutionCard({ solution, size = "normal" }: { solution: typeof peopleSolutions[0]; size?: "large" | "normal" }) {
  const Icon = solution.icon
  const isLarge = size === "large" || solution.featured
  
  return (
    <div className={`group relative rounded-3xl bg-gradient-to-br ${solution.gradient} border border-border/50 p-6 hover:shadow-xl transition-all duration-300 ${isLarge ? "md:col-span-2 md:row-span-1" : ""}`}>
      {/* 배지 */}
      <div className={`inline-flex items-center ${solution.badgeColor} text-xs font-semibold px-3 py-1 rounded-full mb-4`}>
        {solution.badge}
      </div>
      
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{solution.subtitle}</p>
          <h3 className="text-xl font-bold text-foreground">{solution.title}</h3>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-background/80 flex items-center justify-center shadow-sm">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed mb-4">
        {solution.description}
      </p>
      
      {/* 기능 태그 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {solution.features.map((feature) => (
          <span key={feature} className="text-xs bg-background/60 text-foreground/70 px-2.5 py-1 rounded-full">
            {feature}
          </span>
        ))}
      </div>
      
      <Button variant="ghost" size="sm" className="group/btn text-primary hover:text-primary p-0 h-auto font-medium">
        자세히 알아보기
        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
      </Button>
    </div>
  )
}

export function SolutionsSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            <span className="text-primary">대한민국 HR</span>을 응원합니다!
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            People 4종 + Culture 2종 + 부가서비스로 완벽한 HR 솔루션을 경험하세요
          </p>
        </div>

        {/* People 솔루션 */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-sm font-bold">P</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">People (인사관리)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {peopleSolutions.map((solution, index) => (
              <SolutionCard key={index} solution={solution} />
            ))}
          </div>
        </div>

        {/* Culture 솔루션 */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-orange-600 text-sm font-bold">C</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Culture (기업문화)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {cultureSolutions.slice(0, 2).map((solution, index) => (
              <SolutionCard key={index} solution={solution} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {cultureSolutions.slice(2).map((solution, index) => (
              <SolutionCard key={index} solution={solution} size="normal" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
