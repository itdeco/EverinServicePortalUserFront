"use client"

export function MissionSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
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
          <div className="bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col p-8 min-h-[340px]">
            {/* 아이콘 */}
            <div className="mb-4">
              <svg className="w-8 h-8 text-[#00cc99]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 14a2 2 0 012-2h6a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM16 14a2 2 0 012-2h.5a.5.5 0 000-1H18a2 2 0 00-2 2v4a2 2 0 002 2h.5a.5.5 0 000-1H18a1 1 0 01-1-1v-1h2a.5.5 0 000-1h-2v-1a1 1 0 011-1z"/>
              </svg>
            </div>
            {/* 숫자 강조 */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-6xl font-black text-[#00cc99] leading-none">33</span>
              <span className="text-2xl font-bold text-gray-400">Years</span>
            </div>
            {/* 제목 */}
            <p className="text-xl font-black text-[#1a1a2e] mb-6 leading-snug">
              영림원이 만들면<br />다릅니다!
            </p>
            {/* 뱃지 */}
            <div className="mt-auto">
              <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-full">
                <svg className="w-4 h-4 text-[#00cc99]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                3,000+ 구축 사례 (코스닥 상장사 규모 이상)
              </span>
            </div>
          </div>

          {/* 카드 2: No.1 Quality (다크 네이비 - 강조 카드) */}
          <div className="bg-[#1a2340] rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col p-8 min-h-[340px] relative overflow-hidden">
            {/* 배경 장식 */}
            <div className="absolute right-4 top-4 opacity-10">
              <svg className="w-28 h-28 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
              </svg>
            </div>
            {/* 아이콘 */}
            <div className="mb-4">
              <svg className="w-8 h-8 text-[#00cc99]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
            </div>
            {/* 숫자 강조 */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-6xl font-black text-white leading-none">No.1</span>
              <span className="text-2xl font-bold text-[#00cc99]">Quality</span>
            </div>
            {/* 제목 */}
            <p className="text-xl font-black text-white mb-6 leading-snug">
              보안과 품질 절대<br />타협하지 않습니다!
            </p>
            {/* 뱃지들 */}
            <div className="mt-auto flex flex-col gap-2">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full">
                <svg className="w-4 h-4 text-[#00cc99]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                ISO 27001 인증 획득
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                </svg>
                KS-QEI 1위 (3년 연속)
              </span>
            </div>
          </div>

          {/* 카드 3: 0 Error */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col p-8 min-h-[340px]">
            {/* 아이콘 */}
            <div className="mb-4">
              <svg className="w-8 h-8 text-[#4b6bf5]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm2 4v2h2V7H7zm0 4v2h2v-2H7zm0 4v2h2v-2H7zm4-8v2h6V7h-6zm0 4v2h6v-2h-6zm0 4v2h6v-2h-6z"/>
              </svg>
            </div>
            {/* 숫자 강조 */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-6xl font-black text-[#4b6bf5] leading-none">0</span>
              <span className="text-2xl font-bold text-gray-400">Error</span>
            </div>
            {/* 제목 */}
            <p className="text-xl font-black text-[#1a1a2e] mb-6 leading-snug">
              에버인으로 아웃소싱하시고<br />HR 본질에 집중하세요!
            </p>
            {/* 뱃지 */}
            <div className="mt-auto">
              <span className="inline-flex items-center gap-2 bg-[#4b6bf5] text-white text-sm font-medium px-4 py-2 rounded-full">
                <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
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
