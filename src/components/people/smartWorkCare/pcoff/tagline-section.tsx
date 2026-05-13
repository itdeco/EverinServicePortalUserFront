export default function PcOffTaglineSection() {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12 flex flex-col items-center text-center">
        {/* 아이콘 */}
        <div className="mb-8 w-16 h-16 rounded-2xl bg-[#e8faf5] flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="3" y="5" width="26" height="18" rx="2.5" stroke="#00cc99" strokeWidth="2.5"/>
            <path d="M10 27H22" stroke="#00cc99" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M16 23V27" stroke="#00cc99" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M11 14L15 18L21 11" stroke="#00cc99" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* 헤드라인 */}
        <h2 className="text-xl md:text-2xl lg:text-[28px] font-black text-gray-900 leading-snug mb-4">
          &quot;PC-OFF로 근무시간 문화를 바꿉니다&quot;
        </h2>

        {/* 서브 텍스트 */}
        <p className="text-gray-500 text-base md:text-lg leading-relaxed">
          야근 강요 없는 건강한 조직문화,<br />
          에버인 PC-OFF가 만들어드립니다
        </p>
      </div>
    </section>
  )
}
