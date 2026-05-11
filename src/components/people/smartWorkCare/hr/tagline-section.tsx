export default function HrTaglineSection() {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12 flex flex-col items-center text-center">
        {/* 아이콘 */}
        <div className="mb-8 w-16 h-16 rounded-2xl bg-[#e8faf5] flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M16 4C12.686 4 10 6.686 10 10C10 13.314 12.686 16 16 16C19.314 16 22 13.314 22 10C22 6.686 19.314 4 16 4Z" fill="#00cc99"/>
            <path d="M26 26C26 20.477 21.523 16 16 16C10.477 16 6 20.477 6 26" stroke="#00cc99" strokeWidth="2.5" strokeLinecap="round"/>
            <rect x="20" y="20" width="10" height="2" rx="1" fill="#00cc99"/>
            <rect x="20" y="24" width="8" height="2" rx="1" fill="#00cc99"/>
            <rect x="20" y="28" width="6" height="2" rx="1" fill="#00cc99"/>
          </svg>
        </div>

        {/* 헤드라인 */}
        <h2 className="text-xl md:text-2xl lg:text-[28px] font-black text-gray-900 leading-snug mb-4">
          &quot;흩어진 정보를 하나로, 인사는 더 체계적으로&quot;
        </h2>

        {/* 서브 텍스트 */}
        <p className="text-gray-500 text-base md:text-lg leading-relaxed">
          복잡한 조직 관리,<br />
          이제 중앙 집중식 인사관리로 스마트하게 해결하세요.
        </p>
      </div>
    </section>
  )
}
