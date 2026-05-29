import { Check } from "lucide-react"

const problems = [
  "신규 입사자 이탈이 빈번하다.",
  "온보딩 프로세스가 일관되지 않고 매번 반복된다.",
  "회사 문화와 업무 프로세스를 배우는데 시간이 오래 걸린다.",
  "HR팀과 현업 부서가 신규 입사자 관리로 피로가 누적된다.",
]

export default function WelcomingProblemSection() {
  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
        <div className="rounded-3xl bg-white p-8 md:p-14 shadow-[0_24px_80px_rgba(15,23,42,0.06)] border border-gray-100">
          <h2 className="text-3xl md:text-[40px] font-black text-gray-900 leading-snug mb-5">
            잘못된 온보딩,<br />
            기회비용 발생으로 이어집니다.
          </h2>

          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10">
            매번 반복되는 입사자 교육이 시간과 비용을 소모하는 이유.<br />
            스마트한 온보딩 시스템으로 더 나은 미래를 준비하세요.
          </p>

          <ul className="space-y-4">
            {problems.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00cc99]/15">
                  <Check className="h-4 w-4 text-[#00cc99]" strokeWidth={3} />
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
