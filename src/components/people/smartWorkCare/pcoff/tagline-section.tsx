import Image from "next/image"
import ScrollReveal from "@/components/common/scroll-reveal"

const cards = [
  {
    icon: "/images/people/smartWorkCare/pcoff/icon/Icon-pcoff-01.svg",
    text: "에버타임 근태정보 기반으로\n정확한 PC-OFF 자동화 구현",
  },
  {
    icon: "/images/people/smartWorkCare/pcoff/icon/Icon-pcoff-02.svg",
    text: "마우스·키보드 이석감지로\n근태의 정확성 확보",
  },
  {
    icon: "/images/people/smartWorkCare/pcoff/icon/Icon-pcoff-03.svg",
    text: "연장근무, 연차승인 등 다양한\n상황에 따른 예외처리 완벽 지원",
  },
  {
    icon: "/images/people/smartWorkCare/pcoff/icon/Icon-pcoff-04.svg",
    text: "근무 외 개인적 용도로\nPC 사용 가능, 직원 만족도 향상",
  },
  {
    icon: "/images/people/smartWorkCare/pcoff/icon/Icon-pcoff-05.svg",
    text: "인사담당자의 별도 작업 불필요,\n100% 자동화",
  },
]

export default function PcOffTaglineSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* 헤더 */}
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            지켜지지 않는 퇴근 시간,
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            수작업 관리의 피로, 스마트한 <span className="text-[#00cc99] font-bold">PC-OFF</span>가 답입니다.
          </p>
        </ScrollReveal>

        {/* 5개 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {cards.map((card, idx) => (
            <ScrollReveal key={idx} delay={idx * 100}>
              <div className="@container flex h-full flex-col items-center justify-start gap-5 rounded-2xl bg-gray-50 border border-gray-200 px-6 py-10 text-center transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00cc99]/10">
                  <Image src={card.icon} alt="" width={36} height={36} />
                </div>
                <p className="whitespace-pre text-[clamp(14px,5cqw,25px)] font-medium leading-relaxed text-gray-700">
                  {card.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
