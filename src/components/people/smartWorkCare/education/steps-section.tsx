import { ArrowRight } from "lucide-react"

const steps = [
  {
    step: "STEP 01",
    title: "학습 계획 등록",
    desc: "학습의 분류·구분 체계화부터 환급과정·사내외 학습까지 한 화면에서 관리. 연간 교육 계획을 템플릿화해, 매년 반복되는 설계 부담을 제거합니다.",
    tags: ["환급과정 관리", "사내·사외 구분", "연간 템플릿"],
  },
  {
    step: "STEP 02",
    title: "대상자 지정 & 신청",
    desc: "부서·직위·직급·직책·직종 기준 벌크 대상자 검색. 개별 신청과 일괄 지정을 동시에 지원해, 부서 이동이 잦아도 대상자 데이터가 흩어지지 않습니다.",
    tags: ["벌크 검색", "개별·일괄 병행", "조직 변화 대응"],
  },
  {
    step: "STEP 03",
    title: "결과 등록 & 자동 정산",
    desc: "결과 등록만으로 환급 대상·정산 금액이 자동 처리. 신청 절차 없이 결과부터 등록해도 정산 관리가 가능한 유연한 실무 대응 구조.",
    tags: ["자동 정산", "환급 처리", "유연한 실무 대응"],
  },
]

export default function EducationStepsSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="mb-14 text-center">
          <span className="inline-block px-5 py-2 text-sm md:text-base font-bold text-[#03b565] bg-[#03b565]/10 rounded-full mb-4">
            How It Works · 3-Step Cycle
          </span>
          <h2 className="text-3xl md:text-[40px] font-black text-gray-900 leading-snug text-balance">
            계획 → 대상자 → 결과,<br className="md:hidden" /> 하나의 흐름 · 하나의 시스템.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-5">
          {steps.map((item, idx) => (
            <div key={item.step} className="relative flex">
              <div className="flex w-full flex-col rounded-3xl border border-gray-100 bg-gradient-to-br from-[#f3fbff] via-white to-[#eafff8] p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
                <span className="mb-5 inline-flex w-fit items-center rounded-full bg-[#03b565] px-4 py-1.5 text-xs font-bold tracking-wider text-white">
                  {item.step}
                </span>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">{item.title}</h3>
                <p className="mb-6 flex-1 text-base leading-relaxed text-gray-600">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#03b565]/25 bg-white px-3 py-1 text-xs font-semibold text-[#03b565]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 연결 화살표 */}
              {idx < steps.length - 1 && (
                <span className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:flex">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-[#03b565]/20">
                    <ArrowRight className="h-4 w-4 text-[#03b565]" />
                  </span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
