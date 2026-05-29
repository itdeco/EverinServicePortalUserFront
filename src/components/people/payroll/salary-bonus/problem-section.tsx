import { Check } from "lucide-react"

const problems = [
  "급여를 아직도 엑셀로 수기 계산하고 있다.",
  "발령일자에 따른 일할 계산이 매번 번거롭다.",
  "직급별·항목별 산식이 복잡해 계산 실수가 잦다.",
  "급여 담당자에 따라 업무가 좌우되어 늘 불안하다.",
]

export default function SalaryBonusProblemSection() {
  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
        <div className="rounded-3xl bg-white p-8 md:p-14 shadow-[0_24px_80px_rgba(15,23,42,0.06)] border border-gray-100">
          <h2 className="text-3xl md:text-[40px] font-black text-gray-900 leading-snug mb-5">
            현재 자체 운용 중이신<br />
            급여시스템, 불편하시나요?
          </h2>

          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10">
            발령일자에 따라 금액이 일할 계산되고, 직급별 산식 설정으로<br />
            자동 계산되는 에버페이롤로 급여·상여 업무를 처리해보세요.
          </p>

          <ul className="space-y-4">
            {problems.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(51,68,230,0.12)" }}>
                  <Check className="h-4 w-4" strokeWidth={3} style={{ color: "#3344e6" }} />
                </span>
                <span className="text-base md:text-lg text-gray-700 font-medium">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
