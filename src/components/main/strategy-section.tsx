"use client"

export function StrategySection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-white to-[#f8fafb]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* 왼쪽: 텍스트 */}
          <div className="flex flex-col justify-center">
            {/* 제목 */}
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-2 leading-tight">
              관리자에서
            </h2>
            <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-[#4b6bf5] to-[#00cc99] bg-clip-text text-transparent">
                HR 전략가로
              </span>
            </h2>

            {/* 본문 */}
            <div className="space-y-4 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                에버인 HR솔루션 도입을 통해 반복되는 관리작업에서 해방되어, 기업의 미래를 설계하는 인재 전략 수립에 집중할 수 있게 됩니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                운영관리팀에서 HR Business Partner로 가치를 증명해 보세요!
              </p>
            </div>

            {/* CTA 버튼 */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/trial"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all px-10 h-14 text-base font-semibold rounded-lg text-white border-0"
                style={{
                  background: "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)",
                }}
              >
                전략 수립 시작하기
              </a>

              <a
                href="/support/inquiry"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all px-10 h-14 text-base font-semibold rounded-lg text-gray-700 bg-white border-2 border-[#00cc99] hover:bg-[#f0fdf9]"
              >
                상담 신청
              </a>
            </div>
          </div>

          {/* 오른쪽: 이미지 */}
          <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center w-full">
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/main/heroes/hr-strategy-dashboard.jpg"
                alt="HR 전략 대시보드"
                className="w-full h-full object-cover"
              />
              {/* 라이트 오버레이 - 가독성 개선 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
