import { Gauge, ShieldCheck, LineChart } from "lucide-react"

const outcomes = [
  {
    no: "01",
    tag: "EFFICIENCY",
    label: "효율",
    title: "연간 교육 운영 공수\n대폭 감소",
    icon: Gauge,
  },
  {
    no: "02",
    tag: "ACCURACY",
    label: "정확성",
    title: "환급 누락 0,\n정산 신뢰도 확보",
    icon: ShieldCheck,
  },
  {
    no: "03",
    tag: "VISIBILITY",
    label: "가시성",
    title: "부서별·개인별\n학습 이력 자산화",
    icon: LineChart,
  },
]

export default function EducationOutcomeSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="mb-14 text-center">
          <span className="inline-block px-5 py-2 text-sm md:text-base font-bold text-[#03b565] bg-[#03b565]/10 rounded-full mb-4">
            The Outcome
          </span>
          <h2 className="text-3xl md:text-[40px] font-black text-gray-900 leading-snug text-balance">
            예측 가능한 HR,<br />
            데이터 자산이 되는 교육.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {outcomes.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.no}
                className="flex flex-col rounded-3xl border border-gray-100 bg-gray-50 p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#03b565]/15 to-[#03b565]/5">
                    <Icon className="h-7 w-7 text-[#03b565]" />
                  </span>
                  <span className="text-4xl font-black text-gray-100">{item.no}</span>
                </div>
                <p className="mb-1 text-xs font-bold tracking-[0.2em] text-[#03b565]">{item.tag}</p>
                <p className="mb-4 text-lg font-bold text-gray-900">{item.label}</p>
                <p className="whitespace-pre-line text-xl font-semibold leading-relaxed text-gray-800">
                  {item.title}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
