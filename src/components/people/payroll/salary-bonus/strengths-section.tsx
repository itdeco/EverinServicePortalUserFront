import { ShieldCheck, Users, Cpu, Activity } from "lucide-react"

const strengths = [
  { icon: ShieldCheck, text: "33년 ERP 전문기업이\n직접 만든 안정적인 솔루션" },
  { icon: Users, text: "다수의 고객사가\n선택한 검증된 서비스" },
  { icon: Cpu, text: "복잡한 수당을 한 번에\n계산하는 자동화 시스템" },
  { icon: Activity, text: "실시간으로 진행과정을\n확인하는 모니터링 시스템" },
]

export default function SalaryBonusStrengthsSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            HR 업무, 복잡함을 덜고 효율을 더하다
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            지금, 더 똑똑한 방법으로 급여·상여 업무를 바꿔보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-7 rounded-2xl bg-gray-50 border border-gray-100 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl"
              >
                <span
                  className="flex h-16 w-16 items-center justify-center rounded-2xl mb-5"
                  style={{ backgroundColor: "rgba(51,68,230,0.1)" }}
                >
                  <Icon className="h-8 w-8" style={{ color: "#3344e6" }} />
                </span>
                <p className="text-base text-gray-800 font-semibold leading-relaxed whitespace-pre-line">
                  {item.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
