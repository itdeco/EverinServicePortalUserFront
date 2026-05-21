"use client"

const ComingSoonOverlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      {children}

      <div className="absolute inset-0 z-30 flex items-center justify-center rounded-[2rem] bg-white/55 backdrop-blur-[3px] border border-white/60">
        <div className="px-8 py-4 rounded-full bg-gray-900/70 text-white text-2xl md:text-3xl font-black tracking-tight shadow-xl">
          변경예정
        </div>
      </div>
    </div>
  )
}

export function StrategySection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-[#f8fbff] to-white">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 왼쪽: 텍스트 컨텐츠 */}
          <div className="flex flex-col justify-center">
            {/* 제목 */}
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
              <span>관리자에서</span>
              <br />
              <span className="bg-gradient-to-r from-[#4b6bf5] via-[#00cc99] to-[#4b6bf5] bg-clip-text text-transparent">
                HR 전략가로
              </span>
            </h2>

            {/* 설명 텍스트 */}
            <div>
              <p className="text-gray-700 text-base lg:text-lg leading-relaxed font-medium mb-3">
                에버인 HR솔루션 도입을 통해 반복되는 관리작업에서 해방되어,
              </p>
              <p className="text-gray-700 text-base lg:text-lg leading-relaxed font-medium mb-3">
                기업의 미래를 설계하는 인재 전략 수립에 집중할 수 있게 됩니다.
              </p>
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                운영관리팀에서 HR Business Partner로 가치를 증명해 보세요!
              </p>
            </div>
          </div>

          {/* 오른쪽: 대시보드 이미지 */}
          <img
            src="/images/main/strategy/main_section_01.jpg"
            alt="Everin Strategy Dashboard"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  )
}
