'use client'

import Image from 'next/image'

const personas = [
  {
    profile: "/images/main/profiles/profile-pro-01.png",
    bigQuoteMark: "/images/main/profiles/profile-01.jpg",
    name: "박은숙 과장, 34세",
    company: "(중소기업 HR 1인 담당자)",
    quote: "신규입사 = 나의 야근지옥",
    need: "나 대신 온보딩 해줄 자동화\n(온보딩만 전담해줄 인력필요)",
    solution: "해결책 : 에버웰커밍",
    borderColor: "border-[#00dcaa]",
    buttonColor: "bg-[#00dcaa]",
    quoteColor: "text-[#00dcaa]",
  },
  {
    profile: "/images/main/profiles/profile-pro-02.png",
    bigQuoteMark: "/images/main/profiles/profile-02.jpg",
    name: "김피플 팀장, 38세",
    company: "(스타트업 People & Culture)",
    quote: "엑셀 + 주먹구구",
    need: "확장 가능한 체계적 시스템\n(온보딩+근태+평가까지 확장여지)",
    solution: "해결책 : 에버웰커밍 + 에버타임",
    borderColor: "border-[#2bd67c]",
    buttonColor: "bg-[#2bd67c]",
    quoteColor: "text-[#2bd67c]",
  },
  {
    profile: "/images/main/profiles/profile-pro-03.png",
    bigQuoteMark: "/images/main/profiles/profile-03.jpg",
    name: "박문화 이사, 48세",
    company: "(중소기업 경영지원 / C-Level)",
    quote: "급여일 = 이산가족",
    need: "급여아웃소싱을 통한 조직효율화\n(HR본연의 업무에 집중)",
    solution: "해결책 : 에버페이롤",
    borderColor: "border-[#586ffa]",
    buttonColor: "bg-[#586ffa]",
    quoteColor: "text-[#586ffa]",
  },
]

export function PersonaSection() {
  return (
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header - 좌측 정렬 */}
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 whitespace-pre-line break-keep overflow-hidden text-ellipsis">
              HR, <br />다시 중요한 곳으로
            </h2>
            <p className="text-sm sm:text-lg text-gray-600 whitespace-pre-line break-keep overflow-hidden text-ellipsis">
              반복 업무를 줄이고, <br />진짜 가치 있는 일에 집중하는 HR을 만드세요.
            </p>
          </div>

          {/* Cards Grid */}
          <div 
            className="md:grid md:grid-cols-3 md:gap-6 flex md:flex-none gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 scroll-smooth"
            onClick={(e) => {
              const target = e.target as HTMLElement
              const card = target.closest('[data-persona-index]') as HTMLElement
              if (card && window.innerWidth < 768) {
                card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
              }
            }}
          >
            {personas.map((persona, idx) => (
                <div
                    key={idx}
                    data-persona-index={idx}
                    className={`min-w-[85%] sm:min-w-[70%] md:min-w-0 snap-center bg-white rounded-2xl overflow-hidden shadow-sm border-t-4 ${persona.borderColor} flex flex-col`}
                >
                  {/* Content Area */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Profile Row: Image LEFT, Name/Company RIGHT */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
                        <Image
                            src={persona.profile}
                            alt={persona.name}
                            fill
                            className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 whitespace-pre-line break-keep overflow-hidden text-ellipsis">
                          {persona.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 whitespace-pre-line break-keep overflow-hidden text-ellipsis">
                          {persona.company}
                        </p>
                      </div>
                    </div>

                    {/* Big Quote Mark */}
                    <div className="flex justify-center mb-3">
                      <div className="relative w-6 h-6">
                        <Image
                            src={persona.bigQuoteMark}
                            alt="quote"
                            fill
                            className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Quote Text - 컬러 */}
                    <p className={`text-xs sm:text-base leading-relaxed whitespace-pre-line break-keep overflow-hidden text-ellipsis mb-6 font-medium text-center ${persona.quoteColor}`}>
                      {persona.quote}
                    </p>

                    {/* Need Section */}
                    <div className="mb-6 flex-1">
                      <p className="text-sl text-gray-500 mb-2">Need:</p>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed whitespace-pre-line break-keep overflow-hidden text-ellipsis">
                        {persona.need}
                      </p>
                    </div>

                    {/* Solution Button - 하단 고정 */}
                    <button className={`${persona.buttonColor} text-white font-bold py-4 px-4 rounded-xl w-full hover:opacity-80 transition-opacity text-sm sm:text-xl whitespace-pre-line break-keep overflow-hidden text-ellipsis leading-tight`}>
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
