'use client'

import Image from 'next/image'

const personas = [
  {
    profile: "/images/main/profiles/profile-pro-01.png",
    name: "박인사 과장, 34세",
    company: "중소기업 HR 1인 담당자",
    quote: "신규입사 = 나의 야근지옥",
    need: "나 대신 온보딩 해줄 자동화\n(온보딩만 전담해줄 인력필요)",
    solution: "해결책 : 에버웰커밍",
    accentColor: "#00dcaa",
    gradientFrom: "#f0fdf9",
    gradientTo: "#e6faf4",
    borderColor: "#00dcaa",
  },
  {
    profile: "/images/main/profiles/profile-pro-02.png",
    name: "김피플 팀장, 38세",
    company: "스타트업 People & Culture",
    quote: "엑셀 + 주먹구구",
    need: "확장 가능한 체계적 시스템\n(온보딩+근태+평가까지 확장여지)",
    solution: "해결책 : 에버웰커밍 + 에버타임",
    accentColor: "#2bd67c",
    gradientFrom: "#f0fdf4",
    gradientTo: "#e6f9ed",
    borderColor: "#2bd67c",
  },
  {
    profile: "/images/main/profiles/profile-pro-03.png",
    name: "박문화 이사, 48세",
    company: "중소기업 경영지원 / C-Level",
    quote: "급여일 = 이산가족",
    need: "급여아웃소싱을 통한 조직효율화\n(HR본연의 업무에 집중)",
    solution: "해결책 : 에버페이롤",
    accentColor: "#586ffa",
    gradientFrom: "#f0f4ff",
    gradientTo: "#e8edff",
    borderColor: "#586ffa",
  },
]

export function PersonaSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-[#f8fbff] to-white">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug mb-4">
            HR, 다시 중요한 곳으로
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            반복 업무를 줄이고, 진짜 가치 있는 일에 집중하는 HR을 만드세요.
          </p>
        </div>

        {/* Cards */}
        <div className="md:grid md:grid-cols-3 md:gap-6 flex md:flex-none gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6 scroll-smooth">
          {personas.map((persona, idx) => (
            <div
              key={idx}
              data-persona-index={idx}
              className="group min-w-[85%] sm:min-w-[70%] md:min-w-0 snap-center flex flex-col rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              style={{ 
                background: `linear-gradient(to bottom right, ${persona.gradientFrom}, ${persona.gradientTo})`,
                border: `1px solid ${persona.borderColor}30`
              }}
            >
              {/* Accent top bar */}
              <div className="h-1.5 w-full" style={{ background: persona.accentColor }} />

              <div className="p-6 md:p-7 flex flex-col flex-1">
                {/* Profile Row */}
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 shadow-lg"
                    style={{ 
                      boxShadow: `0 4px 14px ${persona.accentColor}40`,
                      border: `3px solid ${persona.accentColor}`
                    }}
                  >
                    <Image
                      src={persona.profile}
                      alt={persona.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 truncate">{persona.name}</h3>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{persona.company}</p>
                  </div>
                </div>

                {/* Quote Section */}
                <div className="mb-6 rounded-2xl px-5 py-5" style={{ background: `${persona.accentColor}12` }}>
                  <div className="flex items-start gap-2">
                    <span
                      className="text-3xl font-black leading-none select-none mt-0.5 shrink-0"
                      style={{ color: persona.accentColor }}
                      aria-hidden="true"
                    >
                      &ldquo;
                    </span>
                    <p
                      className="text-xl md:text-2xl font-black leading-snug break-keep flex-1"
                      style={{ color: persona.accentColor }}
                    >
                      {persona.quote}
                    </p>
                    <span
                      className="text-3xl font-black leading-none select-none self-end shrink-0"
                      style={{ color: persona.accentColor }}
                      aria-hidden="true"
                    >
                      &rdquo;
                    </span>
                  </div>
                </div>

                {/* Need Section */}
                <div className="flex-1 mb-6 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Need:
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed break-keep whitespace-pre-line">
                    {persona.need}
                  </p>
                </div>

                {/* Solution Button */}
                <button
                  className="w-full py-4 rounded-xl font-bold text-sm md:text-base text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] break-keep shadow-lg"
                  style={{ 
                    background: persona.accentColor,
                    boxShadow: `0 4px 14px ${persona.accentColor}40`
                  }}
                >
                  {persona.solution}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
