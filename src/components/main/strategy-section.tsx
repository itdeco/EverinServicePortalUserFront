"use client"

export function StrategySection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0f1419]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* 중앙 정렬 컨텐츠 */}
        <div className="flex flex-col items-center mb-12">
          {/* 제목 */}
          <h2 className="text-4xl lg:text-5xl font-black text-white text-center mb-3 leading-tight max-w-3xl">
            <span>HR 관리자에서 전략가로.</span>
            <br />
            <span className="bg-gradient-to-r from-[#00cc99] via-[#4b6bf5] to-[#00cc99] bg-clip-text text-transparent">
              이제, 기업의 미래를 설계하십시오.
            </span>
          </h2>

          {/* 설명 텍스트 */}
          <div className="text-center max-w-2xl">
            <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-2">
              에버인 도입을 통해 단순 운영관리에서 벗어나, 비즈니스 전략 중심의
            </p>
            <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
              HR Business Partner(HRBP)로 당신의 가치를 증명해 보세요.
            </p>
          </div>
        </div>

        {/* 대시보드 카드 */}
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
            <img
              src="/images/main/heroes/strategy-dashboard-ui.jpg"
              alt="Everin Strategy Dashboard"
              className="w-full h-auto object-cover"
            />
            {/* 다크 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
          </div>

          {/* 배경 장식: 네온 빛 */}
          <div className="absolute -inset-px bg-gradient-to-r from-[#00cc99]/20 via-[#4b6bf5]/10 to-[#00cc99]/20 rounded-2xl -z-10 blur-2xl opacity-50" />
        </div>
      </div>
    </section>
  )
}
