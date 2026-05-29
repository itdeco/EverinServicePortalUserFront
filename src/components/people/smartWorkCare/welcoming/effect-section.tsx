import Image from "next/image"
import { ArrowRight } from "lucide-react"

const effects = [
  {
    no: "01",
    before: "신규 직원 적응 기간 3개월 이상 소요",
    after: "평균 2주 이내로 단축",
  },
  {
    no: "02",
    before: "반복적 업무로 인해 HR팀 과부하",
    after: "온보딩 업무 부담 감소",
  },
  {
    no: "03",
    before: "일관되지 않은 온보딩 프로세스",
    after: "체계적이며 일관된 온보딩 경험",
  },
]

export default function WelcomingEffectSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* 타이틀 */}
        <div className="text-center mb-6">
          <span className="inline-block px-5 py-2 text-base md:text-lg font-bold text-gray-800 bg-[#00cc99]/10 rounded-full mb-4">
            서비스 도입 전후 비교
          </span>
        </div>

        {/* 3D 이미지 + 카드 */}
        <div className="mt-2">
          {/* 입체 이미지 */}
          <div className="relative mx-auto w-full max-w-[1200px]">
            <Image
              src="/images/people/smartWorkCare/welcoming/onboarding-effect.png"
              alt="온보딩 도입 효과"
              width={1200}
              height={700}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
