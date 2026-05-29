import Image from "next/image"
import { Check } from "lucide-react"

const problems = [
  "개인정보 보호 및 근로기준법, 소득세법 등 규정 준수의 어려움",
  "직원의 입사/퇴직/소급 등 빈번한 데이터 변경 관리 문제",
  "조직 구조가 복잡해짐에 따라 급여 예외처리 증가",
  "급여 변동사항 관련 실시간 피드백 및 파일 공유의 한계",
]

export default function OutsourcingProblemSection() {
  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* 좌측 이미지 */}
          <div className="relative flex items-center justify-center">
            <div className="relative h-[300px] w-full md:h-[380px]">
              <Image
                src="/images/people/payroll/outsourcing/collab-3d.png"
                alt="급여 아웃소싱 협업"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* 우측 텍스트 */}
          <div>
            <h2 className="text-3xl md:text-[40px] font-black text-gray-900 leading-snug mb-8">
              &ldquo;급여 아웃소싱 소통,<br />
              왜 이렇게 불편하나요?&rdquo;
            </h2>

            <ul className="space-y-4">
              {problems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(51,68,230,0.12)" }}>
                    <Check className="h-4 w-4" strokeWidth={3} style={{ color: "#3344e6" }} />
                  </span>
                  <span className="text-base md:text-lg text-gray-700 font-medium leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
