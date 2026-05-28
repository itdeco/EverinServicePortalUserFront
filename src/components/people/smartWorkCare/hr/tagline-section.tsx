import Image from "next/image"

export default function HrTaglineSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* 상단 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            인사관리, 이제 엑셀 조직도와 작별하세요
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            직원 정보부터 인사이동까지, 모두 한번에
          </p>
        </div>

        {/* 3개 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: "/images/people/smartWorkCare/hr/Icon-total-01.svg", title: "중앙 집중식 관리로 흩어진 직원 정보 완벽 통합" },
            { icon: "/images/people/smartWorkCare/hr/Icon-total-03.svg", title: "사원의 인사이동 내역을 한눈에 이력 관리 완벽 지원" },
            { icon: "/images/people/smartWorkCare/hr/Icon-total-02.svg", title: "각종 증명서 즉시 신청·발금으로 처리속도와 편의성 향상" },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="relative flex flex-col items-start p-8 rounded-2xl bg-gray-50 border border-gray-200 h-64 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl cursor-pointer"
            >
              <p className="text-xl text-gray-900 font-semibold leading-relaxed pr-24">
                {item.title}
              </p>
              <div className="absolute bottom-6 right-6 w-20 h-20">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* HR 업무 효율 섹션 */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              HR 업무, 복잡함을 덜고 효율을 더하다
            </h3>
            <p className="text-gray-500 text-base md:text-lg">
              지금, 더 똑똑한 방법으로 바꿔보세요.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: "/images/people/smartWorkCare/hr/Icon-smart-01.svg", title: "직원정보의 통합 관리로", subtitle: "데이터 정확성 확보" },
              { icon: "/images/people/smartWorkCare/hr/Icon-smart-02.svg", title: "드래그 앤 드롭 방식의", subtitle: "직관적인 조직도 관리" },
              { icon: "/images/people/smartWorkCare/hr/Icon-smart-03.svg", title: "인사이동 이력 자동 기록", subtitle: "및 관리 기능 제공" },
              { icon: "/images/people/smartWorkCare/hr/Icon-smart-04.svg", title: "실시간 데이터 업데이트로", subtitle: "업무 누락 방지" },
              { icon: "/images/people/smartWorkCare/hr/Icon-smart-05.svg", title: "다양한 HR 시스템", subtitle: "(근태, 급여, 평가 등)과 연동" },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl cursor-pointer"
              >
                <div className="w-16 h-16 mb-4 relative">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-base text-gray-700 text-center font-medium leading-relaxed">
                  {item.title}<br />{item.subtitle}
                </p>
              </div>
            ))}
          </div>
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
