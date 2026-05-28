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

        {/* 5개 아이콘 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-16">
          {[
            { icon: "/images/people/smartWorkCare/hr/icon-hr-01.svg", title: "직원정보의 통합 관리로", subtitle: "데이터 정확성 확보" },
            { icon: "/images/people/smartWorkCare/hr/icon-hr-02.svg", title: "드래그 앤 드롭 방식의", subtitle: "직관적인 조직도 관리" },
            { icon: "/images/people/smartWorkCare/hr/icon-hr-03.svg", title: "인사이동 이력 자동 기록", subtitle: "및 관리 기능 제공" },
            { icon: "/images/people/smartWorkCare/hr/icon-hr-04.svg", title: "실시간 데이터 업데이트로", subtitle: "업무 누락 방지" },
            { icon: "/images/people/smartWorkCare/hr/icon-hr.svg", title: "다양한 HR 시스템", subtitle: "(근태, 급여, 평가 등)과 연동" },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 mb-4 relative">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm text-gray-700 text-center font-medium leading-relaxed">
                {item.title}<br />{item.subtitle}
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
