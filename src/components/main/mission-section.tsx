"use client"

export function MissionSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-[#f8fdfb]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Quote */}
        <div className="text-center mb-16">
          <h2 className="font-bold text-[#1a1a2e] mb-3 text-lg sm:text-2xl md:text-3xl lg:text-4xl">
            &ldquo;고객기업이 인적 자원 관리를 더 잘하게&rdquo;
          </h2>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg">33년 영림원의 미션</p>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg">이제 그 본질을 HR 로 부터 시작하겠습니다.</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          {/* 카드 1: 33 Years */}
          <div className="group relative bg-gradient-to-br from-white to-[#f0fdf9] border border-[#e0f5ef] rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col p-8 min-h-[360px] overflow-hidden">
            {/* 배경 그래디언트 장식 */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br from-[#00cc99]/20 to-[#00cc99]/5 rounded-full blur-2xl" />
            
            {/* 아이콘 */}
            <div className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00cc99] to-[#00a885] flex items-center justify-center mb-5 shadow-lg shadow-[#00cc99]/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>

            {/* 숫자 강조 */}
            <div className="relative z-10 flex items-baseline gap-3 mb-4">
              <span 
                className="text-7xl font-black leading-none"
                style={{
                  background: "linear-gradient(135deg, #00cc99 0%, #00a885 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                33
              </span>
              <span className="text-xl font-bold text-gray-400 tracking-wide">Years</span>
            </div>

            {/* 제목 */}
            <p className="relative z-10 text-xl font-black text-[#1a1a2e] mb-6 leading-snug">
              영림원이 만들면<br />다릅니다!
            </p>

            {/* 뱃지 */}
            <div className="relative z-10 mt-auto flex flex-col gap-2.5">
              <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#00cc99]/20 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm">
                <svg className="w-4 h-4 text-[#00cc99]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm0 8a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm0 8a2 2 0 012-2h12a2 2 0 012 2v.5a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5V21z"/>
                </svg>
                3,000+ 구축 사례<br />(코스닥 상장사 규모 이상)
              </span>
            </div>
          </div>

          {/* 카드 2: No.1 Quality (다크 - 강조 카드) */}
          <div className="group relative bg-gradient-to-br from-[#1a2340] to-[#0f1629] rounded-3xl shadow-2xl hover:shadow-[0_25px_60px_-15px_rgba(26,35,64,0.5)] hover:-translate-y-1 transition-all duration-300 flex flex-col p-8 min-h-[360px] overflow-hidden">
            {/* 배경 장식 */}
            <div className="absolute right-0 top-0 w-40 h-40 opacity-10">
              <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
              </svg>
            </div>
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-gradient-to-br from-[#00cc99]/30 to-transparent rounded-full blur-3xl" />

            {/* 아이콘 */}
            <div className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00cc99] to-[#00a885] flex items-center justify-center mb-5 shadow-lg shadow-[#00cc99]/30">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
            </div>

            {/* 숫자 강조 */}
            <div className="relative z-10 flex items-baseline gap-3 mb-4">
              <span className="text-7xl font-black text-white leading-none">No.1</span>
              <span 
                className="text-xl font-bold tracking-wide"
                style={{
                  background: "linear-gradient(135deg, #00cc99 0%, #4b6bf5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Quality
              </span>
            </div>

            {/* 제목 */}
            <p className="relative z-10 text-xl font-black text-white mb-6 leading-snug">
              보안과 품질 절대<br />타협하지 않습니다!
            </p>

            {/* 뱃지들 */}
            <div className="relative z-10 mt-auto flex flex-col gap-2.5">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white text-sm font-medium px-4 py-2.5 rounded-xl">
                <svg className="w-4 h-4 text-[#00cc99]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                ISO 27001 인증 획득
              </span>
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/10 backdrop-blur-sm border border-yellow-500/20 text-white text-sm font-medium px-4 py-2.5 rounded-xl">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
                </svg>
                KS-QEI 1위 (3년 연속)
              </span>
            </div>
          </div>

          {/* 카드 3: 0 Error */}
          <div className="group relative bg-gradient-to-br from-white to-[#f0f4ff] border border-[#e0e8ff] rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col p-8 min-h-[360px] overflow-hidden">
            {/* 배경 그래디언트 장식 */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br from-[#4b6bf5]/20 to-[#4b6bf5]/5 rounded-full blur-2xl" />

            {/* 아이콘 */}
            <div className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4b6bf5] to-[#3a5ae0] flex items-center justify-center mb-5 shadow-lg shadow-[#4b6bf5]/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            {/* 숫자 강조 */}
            <div className="relative z-10 flex items-baseline gap-3 mb-4">
              <span 
                className="text-7xl font-black leading-none"
                style={{
                  background: "linear-gradient(135deg, #4b6bf5 0%, #3a5ae0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                0
              </span>
              <span className="text-xl font-bold text-red-400 tracking-wide">Error</span>
            </div>

            {/* 제목 */}
            <p className="relative z-10 text-xl font-black text-[#1a1a2e] mb-6 leading-snug">
              에버인으로 아웃소싱하시고<br />HR 본질에 집중하세요!
            </p>

            {/* 뱃지 */}
            <div className="relative z-10 mt-auto">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4b6bf5] to-[#00cc99] text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-[#4b6bf5]/20">
                <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
                </svg>
                무결점 클라우드형 HR솔루션
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
