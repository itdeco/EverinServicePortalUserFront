'use client'

import Image from 'next/image'
import { Building2, Users, DollarSign } from 'lucide-react'

const personas = [
  {
    profile: "/images/main/profiles/profile-pro-01.png",
    name: "박인사 과장, 34세",
    company: "중소기업 HR 1인 담당자",
    quote: "신규입사 = 나의 야근지옥",
    need: "나 대신 온보딩 해줄 자동화\n(온보딩만 전담해줄 인력필요)",
    solution: "해결책 : 에버웰커밍",
    accentColor: "#00dcaa",
    tag: "온보딩 자동화",
    icon: Building2,
    stat: "1000+",
    statLabel: "기업 도입",
  },
  {
    profile: "/images/main/profiles/profile-pro-02.png",
    name: "김피플 팀장, 38세",
    company: "스타트업 People & Culture",
    quote: "엑셀 + 주먹구구",
    need: "확장 가능한 체계적 시스템\n(온보딩+근태+평가까지 확장여지)",
    solution: "해결책 : 에버웰커밍 + 에버타임",
    accentColor: "#2bd67c",
    tag: "HR 통합 관리",
    icon: Users,
    stat: "50K+",
    statLabel: "사용자",
  },
  {
    profile: "/images/main/profiles/profile-pro-03.png",
    name: "박문화 이사, 48세",
    company: "중소기업 경영지원 / C-Level",
    quote: "급여일 = 이산가족",
    need: "급여아웃소싱을 통한 조직효율화\n(HR본연의 업무에 집중)",
    solution: "해결책 : 에버페이롤",
    accentColor: "#586ffa",
    tag: "급여 아웃소싱",
    icon: DollarSign,
    stat: "10B+",
    statLabel: "처리액",
  },
]

export function PersonaSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 break-keep">
            HR, 다시 중요한 곳으로
          </h2>
          <p className="text-sm sm:text-lg text-gray-500 break-keep max-w-xl mx-auto leading-relaxed">
            반복 업무를 줄이고, 진짜 가치 있는 일에 집중하는 HR을 만드세요.
          </p>
        </div>

        {/* Cards */}
        <div className="md:grid md:grid-cols-3 md:gap-6 flex md:flex-none gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 scroll-smooth">
          {personas.map((persona, idx) => {
            const IconComponent = persona.icon
            return (
              <div
                key={idx}
                data-persona-index={idx}
                className="min-w-[85%] sm:min-w-[70%] md:min-w-0 snap-center flex flex-col rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ 
                  border: `1px solid ${persona.accentColor}20`,
                  background: `linear-gradient(135deg, white 0%, ${persona.accentColor}08 100%)`
                }}
              >
                {/* Accent top bar */}
                <div className="h-1.5 w-full" style={{ background: persona.accentColor }} />

                <div className="p-7 flex flex-col flex-1">
                  {/* Icon */}
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 shrink-0"
                    style={{ background: persona.accentColor }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  {/* Stats */}
                  <div className="mb-7">
                    <div className="flex items-baseline gap-2">
                      <span 
                        className="text-4xl font-black"
                        style={{ color: persona.accentColor }}
                      >
                        {persona.stat}
                      </span>
                      <span className="text-gray-400 text-sm font-medium">
                        {persona.statLabel}
                      </span>
                    </div>
                  </div>

                  {/* Profile */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0" style={{ boxShadow: `0 0 0 2px ${persona.accentColor}` }}>
                      <Image
                        src={persona.profile}
                        alt={persona.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-gray-900">{persona.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{persona.company}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px mb-6 bg-gray-100" />

                  {/* Quote */}
                  <div className="mb-7 px-4 py-4 rounded-2xl" style={{ background: `${persona.accentColor}12` }}>
                    <p
                      className="text-lg sm:text-xl font-black leading-tight break-keep"
                      style={{ color: persona.accentColor }}
                    >
                      &ldquo;{persona.quote}&rdquo;
                    </p>
                  </div>

                  {/* Need */}
                  <div className="flex-1 mb-7">
                    <p className="text-xs font-bold tracking-widest uppercase mb-3 text-gray-500">
                      Need
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-gray-700 leading-relaxed break-keep whitespace-pre-line">
                      {persona.need}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="px-4 py-3 rounded-xl" style={{ background: `${persona.accentColor}12` }}>
                    <p
                      className="text-base sm:text-lg font-black leading-snug break-keep"
                      style={{ color: persona.accentColor }}
                    >
                      {persona.solution}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
