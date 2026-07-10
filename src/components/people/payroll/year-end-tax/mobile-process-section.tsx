"use client"

import Image from "next/image"
import { ClipboardCheck, FileUp, History, UserRoundPlus } from "lucide-react"

const BLUE = "#3344e6"

const mobileFeatures = [
  { title: "부양가족 입력", icon: UserRoundPlus },
  { title: "국세청 PDF 업로드", icon: FileUp },
  { title: "공제 증빙자료 업로드", icon: ClipboardCheck },
  { title: "이전 연말정산 모아보기", icon: History },
]

const processImages = [
  {
    title: "모바일 시작",
    desc: "직원이 연말정산을 모바일에서 바로 시작합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-start-action.jpg",
  },
  {
    title: "국세청 PDF 업로드",
    desc: "국세청 PDF와 공제 증빙자료를 업로드합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-pdf-upload.jpg",
  },
  {
    title: "전 근무지 입력",
    desc: "전 근무지 급여 내역을 직접 입력합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-previous-workplace.jpg",
  },
  {
    title: "개인 인적정보 입력",
    desc: "개인 인적정보와 부양가족 정보를 확인합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-personal-info.jpg",
  },
  {
    title: "부양가족 입력",
    desc: "부양가족 명단을 추가하고 관리합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-dependent-list.jpg",
  },
  {
    title: "공제내역 확인",
    desc: "반영된 공제 내역을 한눈에 확인합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-deduction-summary.jpg",
  },
  {
    title: "연말정산 제출",
    desc: "확인이 끝나면 모바일에서 바로 제출합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-submit-ready.jpg",
  },
  {
    title: "제출 결과 확인",
    desc: "제출 후 처리결과를 모바일에서 확인합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-result.jpg",
  },
]

export default function YearEndTaxMobileProcessSection() {
  return (
    <section className="bg-[#f7f8ff] py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="text-base font-bold" style={{ color: BLUE }}>
            모바일 연말정산
          </p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 md:text-[32px]">
            입력부터 제출까지 모바일에서 이어집니다.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-500 md:text-lg">
            직원은 필요한 정보를 직접 입력하고, 담당자는 제출 현황과 처리 결과를 더 빠르게 확인할 수 있습니다.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {mobileFeatures.map(({ title, icon: Icon }) => (
              <div key={title} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(51,68,230,0.1)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: BLUE }} strokeWidth={1.7} />
                </span>
                <span className="text-sm font-bold text-gray-800 md:text-[15px]">{title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processImages.map(({ title, desc, image }) => (
            <div key={title} className="rounded-3xl bg-white p-4 shadow-[0_12px_34px_rgba(31,45,77,0.08)]">
              <div className="mx-auto w-full max-w-[230px] overflow-hidden rounded-[24px] border border-gray-100 bg-gray-50">
                <Image src={image} alt={title} width={360} height={760} className="h-auto w-full" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
