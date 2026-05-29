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
        <div className="text-center mb-12">
          <span className="inline-block px-5 py-2 text-base md:text-lg font-bold text-gray-800 bg-[#00cc99]/10 rounded-full mb-4">
            서비스 도입 전후 비교
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            도입 효과를 숫자와 경험으로 확인하세요
          </h2>
        </div>

        {/* 3D 이미지 + 카드 */}
        <div className="grid grid-cols-1 lg:grid-cols-[42%_1fr] gap-10 items-center">
          {/* 입체 이미지 */}
          <div className="relative mx-auto h-[280px] w-full max-w-[420px] md:h-[360px]">
            <Image
              src="/images/people/smartWorkCare/welcoming/onboarding-effect.png"
              alt="온보딩 도입 효과"
              fill
              className="object-contain"
            />
          </div>

          {/* before / after 카드 */}
          <div className="flex flex-col gap-5">
            {effects.map((item) => (
              <div
                key={item.no}
                className="flex items-center gap-5 rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4B6BF5] to-[#00cc99] text-base font-bold text-white">
                  {item.no}
                </span>
                <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:gap-4">
                  <p className="text-sm md:text-base text-gray-400 line-through md:w-1/2">
                    {item.before}
                  </p>
                  <ArrowRight className="hidden md:block h-5 w-5 shrink-0 text-[#00cc99]" />
                  <p className="text-base md:text-lg font-bold text-gray-900 md:w-1/2">
                    {item.after}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
