export default function EvertimeTaglineSection() {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12 flex flex-col items-center text-center">
        {/* 아이콘 */}
        <div className="mb-8 w-16 h-16 rounded-2xl bg-[#e8faf5] flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="4" y="6" width="24" height="22" rx="3" stroke="#00cc99" strokeWidth="2.5"/>
            <path d="M4 12H28" stroke="#00cc99" strokeWidth="2.5"/>
            <rect x="10" y="4" width="2.5" height="5" rx="1.25" fill="#00cc99"/>
            <rect x="19.5" y="4" width="2.5" height="5" rx="1.25" fill="#00cc99"/>
            <rect x="8" y="17" width="4" height="4" rx="1" fill="#00cc99"/>
            <rect x="14" y="17" width="4" height="4" rx="1" fill="#00cc99"/>
            <rect x="20" y="17" width="4" height="4" rx="1" fill="#00cc99"/>
          </svg>
        </div>

        {/* 헤드라인 */}
        <h2 className="text-xl md:text-2xl lg:text-[28px] font-black text-gray-900 leading-snug mb-4">
          &quot;근태관리, 바뀌면 조직이 달라집니다&quot;
        </h2>

        {/* 서브 텍스트 */}
        <p className="text-gray-500 text-base md:text-lg leading-relaxed">
          수작업은 줄이고, 더 중요한 일에 몰입할 시간.<br />
          에버타임이 만들어드립니다
        </p>
      </div>
    </section>
  )
}
