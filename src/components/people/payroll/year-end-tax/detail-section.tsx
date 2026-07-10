"use client"

import Image from "next/image"

const details = [
  {
    label: "전 근무지 입력",
    image: "/images/people/payroll/year-end-tax/mobile-previous-workplace.jpg",
  },
  {
    label: "부양가족 입력",
    image: "/images/people/payroll/year-end-tax/mobile-dependent-list.jpg",
  },
  {
    label: "공제내역 확인",
    image: "/images/people/payroll/year-end-tax/mobile-deduction-summary.jpg",
  },
  {
    label: "연말정산 제출",
    image: "/images/people/payroll/year-end-tax/mobile-submit-ready.jpg",
  },
]

export default function YearEndTaxDetailSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="text-2xl font-bold text-gray-900 md:text-[32px]">
            입력부터 제출까지 모바일에서 이어집니다.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-500 md:text-lg">
            업로드된 내용 확인은 물론, 필요한 정보는 수기 입력까지 지원합니다.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {details.map(({ label, image }) => (
            <div key={label} className="rounded-3xl border border-gray-100 bg-gray-50 p-4">
              <div className="mx-auto max-w-[230px] overflow-hidden rounded-[24px] border border-gray-100 bg-white">
                <Image
                  src={image}
                  alt={label}
                  width={360}
                  height={760}
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-5 text-center text-base font-bold text-gray-900">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
