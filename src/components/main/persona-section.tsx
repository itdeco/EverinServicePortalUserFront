'use client'

import Image from 'next/image'

const personas = [
  {
    profile: "/images/main/profiles/profile-pro-01.png",
    bigQuoteMark: "/images/main/profiles/profile-01.jpg",
    name: "박은숙 과장, 34세",
    company: "(중소기업 HR 1인 담당자)",
    quote: "신입 오는 전날 야근해요.\n흩어진 자료 찾느라 하루가 다 가요...",
    need: "나 대신 | 온보딩 해줄 자동화\n(온보딩만 전담해줄 인력필요)",
    solution: "해결책 : 에버웰커밍\n(Track A)",
    borderColor: "border-[#00dcaa]",
    buttonColor: "bg-[#00dcaa]",
    quoteColor: "text-[#00dcaa]",
  },
  {
    profile: "/images/main/profiles/profile-pro-02.png",
    bigQuoteMark: "/images/main/profiles/profile-02.jpg",
    name: "김피플 팀장, 38세",
    company: "(스타트업 People & Culture)",
    quote: "회사의 빠른 성장과 수시 인력채용으로\n인해 온보딩과 근태관리가 못 따라가요.\n엑셀+주먹구구식!",
    need: "확장 가능한 체계적 시스템\n(온보딩+근태+평가까지 확장여지)",
    solution: "해결책 : 에버웰커밍 + 에버타임\n(Track B)",
    borderColor: "border-[#2bd67c]",
    buttonColor: "bg-[#2bd67c]",
    quoteColor: "text-[#2bd67c]",
  },
  {
    profile: "/images/main/profiles/profile-pro-03.png",
    bigQuoteMark: "/images/main/profiles/profile-03.jpg",
    name: "박문화 이사, 48세",
    company: "(중소기업 경영지원 / C-Level)",
    quote: "연말정산이나 급여처리 등 특정시기에\n급여/세무 신고 등으로 바빠서\n다른 HR 주요업무를 추진할 수가 없음",
    need: "급여아웃소싱을 통한 조직효율화\n(HR본연의 업무에 집중)",
    solution: "해결책 : 에버페이롤\n(Track C)",
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
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">HR, 다시 중요한 곳으로</h2>
          <p className="text-lg text-gray-600">
            반복 업무를 줄이고, 진짜 가치 있는 일에 집중하는 HR을 만드세요.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((persona, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-2xl overflow-hidden shadow-sm border-t-4 ${persona.borderColor} flex flex-col`}
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
                    <h3 className="text-base font-bold text-gray-900">{persona.name}</h3>
                    <p className="text-sm text-gray-500">{persona.company}</p>
                  </div>
                </div>

                {/* Big Quote Mark */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={persona.bigQuoteMark}
                      alt="quote"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Quote Text - 컬러 */}
                <p className={`text-base leading-relaxed whitespace-pre-line mb-6 font-medium ${persona.quoteColor}`}>
                  {persona.quote}
                </p>

                {/* Need Section */}
                <div className="mb-6 flex-1">
                  <p className="text-sm text-gray-500 mb-2">Need:</p>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {persona.need}
                  </p>
                </div>

                {/* Solution Button - 하단 고정 */}
                <button className={`${persona.buttonColor} text-white font-bold py-4 px-6 rounded-xl w-full hover:opacity-90 transition-opacity text-sm whitespace-pre-line leading-tight`}>
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
