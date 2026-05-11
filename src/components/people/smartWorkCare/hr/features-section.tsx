import Image from "next/image"

const features = [
  {
    id: 1,
    title: "인사정보 통합관리",
    description: "마스터 데이터 중앙화, 부서, 직급, 직책 실시간 연동",
    image: "/images/people/smartWorkCare/hr/hr-1-1.png",
    imageAlt: "인사정보 통합관리 화면",
  },
  {
    id: 2,
    title: "조직도 자동화",
    description: "조직 개편 즉시 반영, 시각화 조직도 실시간 업데이트",
    image: "/images/people/smartWorkCare/hr/hr-2-1.png",
    imageAlt: "조직도 자동화 화면",
  },
  {
    id: 3,
    title: "발령 자동화",
    description: "인사발령 공문 원클릭생성, 전자결재 즉시 연계",
    image: "/images/people/smartWorkCare/hr/hr-3-1.png",
    imageAlt: "발령 자동화 화면",
  },
  {
    id: 4,
    title: "HR 데이터 분석",
    description: "복잡한 서류나 해석 없이 앱에서 즉시 신청하고 터치 한 번으로 승인까지! 모든 근태 결재를 가장 빠르게 처리하세요.",
    image: "/images/people/smartWorkCare/hr/hr-4-1.png",
    imageAlt: "HR 데이터 분석 화면",
  },
]

export default function HrFeaturesSection() {
  return (
    <section className="w-full bg-white">
      {features.map((feature, idx) => (
        <div
          key={feature.id}
          className="w-full py-12 md:py-16 border-t border-gray-100"
        >
          <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* 텍스트 - 항상 왼쪽 */}
              <div className="w-full lg:w-[320px] shrink-0 text-left">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* 이미지 - 오른쪽 */}
              <div className="relative w-full lg:flex-1 h-[220px] sm:h-[280px] lg:h-[360px] rounded-xl overflow-hidden shadow-md border border-gray-100">
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  className="object-cover object-left-top"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
