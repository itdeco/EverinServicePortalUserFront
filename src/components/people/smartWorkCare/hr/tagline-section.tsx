import Image from "next/image"

export default function HrTaglineSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* 상단 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            인사관리, 이제 엑셀 조직도와 작별하세요
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            직원 정보부터 인사이동까지, 모두 한번에
          </p>
        </div>

        {/* 3개 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: "/images/people/smartWorkCare/hr/icon-total-01.svg", title: "중앙 집중식 관리로", subtitle: "흩어진 직원 정보 완벽 통합", highlight: false },
            { icon: "/images/people/smartWorkCare/hr/icon-total-02.svg", title: "사원의 인사이동 내역을 한눈에,", subtitle: "이력 관리 완벽 지원", highlight: false },
            { icon: "/images/people/smartWorkCare/hr/icon-total.svg", title: "각종 증명서 즉시 신청·발금으로", subtitle: "처리속도와 편의성 향상", highlight: true },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center p-8 rounded-2xl transition-shadow ${
                item.highlight 
                  ? "bg-white border-4 border-red-600" 
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <div className="w-20 h-20 mb-6 relative">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-base text-gray-900 text-center font-semibold leading-relaxed">
                {item.title}<br /><span className="text-gray-700">{item.subtitle}</span>
              </p>
            </div>
          ))}
        </div>

        {/* 입체적 이미지 섹션 */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* 좌측 이미지 */}
          <div className="relative w-full lg:w-1/2 aspect-square max-w-[500px]">
            <Image
              src="/images/people/smartWorkCare/hr/hr-1.png"
              alt="에버인 클라우드 HR 서비스 구조"
              fill
              className="object-contain"
            />
          </div>

          {/* 우측 텍스트 */}
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-xl md:text-2xl lg:text-[28px] font-black text-gray-900 leading-snug mb-4">
              &quot;흩어진 정보를 하나로, 인사는 더 체계적으로&quot;
            </h3>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              복잡한 조직 관리,<br />
              이제 중앙 집중식 인사관리로 스마트하게 해결하세요.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
