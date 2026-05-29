import Image from "next/image"
import ScrollReveal from "@/components/common/scroll-reveal"

const lawCards = [
  {
    icon: "/images/people/smartWorkCare/evertime/icon/Icon-law-01.svg",
    title: "모바일 지원",
    desc: "일반 사용자를 위한 모바일(App)과 PC를 제공",
    items: ["출/퇴근 기록", "휴가/부재/연장근무/근무 조정 신청", "출근부 조회", "팀 출근부 조회", "근태 결재"],
  },
  {
    icon: "/images/people/smartWorkCare/evertime/icon/Icon-law-02.svg",
    title: "주 52시간제도 및 유연근무 지원",
    desc: "근무일정을 일 단위부터 년 단위까지 한 번에 설정하고 관리",
    items: ["근무 일정 설정", "유연·시차·자유 근무제", "주 52시간 자동 계산", "근무 조정 신청", "초과근무 관리"],
  },
  {
    icon: "/images/people/smartWorkCare/evertime/icon/Icon-law-03.svg",
    title: "급여 정산에 기반한 근태관리",
    desc: "근로자가 등록한 출퇴근부터 휴가신청 등의 근태 정보를 급여와 연동",
    items: ["출/퇴근 기록 연동", "휴가·연차 정산", "연장·야간·휴일 수당", "급여 데이터 연동", "근태 통계 제공"],
  },
]

const smartCards = [
  { icon: "/images/people/smartWorkCare/evertime/icon/Icon-special-01.svg", title: "근태관리 특화 솔루션 개발", subtitle: "30년 이상 경험 보유" },
  { icon: "/images/people/smartWorkCare/evertime/icon/Icon-special-02.svg", title: "실시간 대시보드로 모든 직원의", subtitle: "근태현황 즉시 파악 가능" },
  { icon: "/images/people/smartWorkCare/evertime/icon/Icon-special-03.svg", title: "스마트폰·PC로", subtitle: "언제 어디서나 쉽게 출퇴근" },
  { icon: "/images/people/smartWorkCare/evertime/icon/Icon-special-04.svg", title: "근로기준법 업데이트 즉시 대응", subtitle: "법적 리스크 해소" },
  { icon: "/images/people/smartWorkCare/evertime/icon/Icon-special-05.svg", title: "API 연동으로 급여, ERP와의", subtitle: "완벽한 연동 지원" },
]

export default function EvertimeTaglineSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* 상단 헤더 */}
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            휴가 관리, 근로기준법 때문에 고민이신가요?
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            에버타임이 기준에 맞춰 자동으로 정리해드립니다.
          </p>
        </ScrollReveal>

        {/* 3개 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {lawCards.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 120}>
              <div className="relative flex flex-col items-start p-8 rounded-2xl bg-gray-50 border border-gray-200 h-full min-h-[340px] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                <h3 className="text-xl font-bold text-gray-900 mb-2 pr-16">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{item.desc}</p>
                <ul className="space-y-2">
                  {item.items.map((li, i) => (
                    <li key={i} className="flex items-start gap-2 text-[15px] text-gray-700">
                      <span className="mt-2 flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#00cc99]" />
                      {li}
                    </li>
                  ))}
                </ul>
                <div className="absolute top-6 right-6 w-14 h-14">
                  <Image src={item.icon} alt={item.title} fill className="object-contain" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* HR 업무 효율 섹션 */}
        <ScrollReveal className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-4">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              HR 업무, 복잡함을 덜고 효율을 더하다
            </h3>
            <p className="text-gray-500 text-base md:text-lg">
              지금, 더 똑똑한 방법으로 바꿔보세요.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {smartCards.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 100}>
                <div className="flex h-full flex-row md:flex-col items-center gap-4 md:gap-0 p-4 md:p-6 bg-white rounded-2xl shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <div className="w-12 h-12 md:w-16 md:h-16 md:mb-4 relative shrink-0">
                    <Image src={item.icon} alt={item.title} fill className="object-contain" />
                  </div>
                  <p className="text-sm md:text-base text-gray-700 text-left md:text-center font-medium leading-relaxed">
                    {item.title}
                    <br />
                    {item.subtitle}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
