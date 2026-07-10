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
    step: "01",
    title: "국세청 PDF 다운받아 시작",
    desc: "홈 화면 안내에 따라 홈택스 PDF를 내려받고 연말정산을 시작합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-home.jpg",
  },
  {
    step: "02",
    title: "연말정산 시작하기",
    desc: "정산 연도를 선택하고 이전 연말정산 내역도 함께 확인할 수 있습니다.",
    image: "/images/people/payroll/year-end-tax/mobile-pdf-upload.jpg",
  },
  {
    step: "03",
    title: "전 근무지 여부 확인",
    desc: "해당 연도에 다른 회사에서 근무한 이력이 있는지 확인합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-pdf-confirm.jpg",
  },
  {
    step: "04",
    title: "전 근무지 입력",
    desc: "전 근무지와 납세조합 정보, 소득·공제 내역을 직접 추가합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-previous-workplace.jpg",
  },
  {
    step: "05",
    title: "개인 인적정보 입력",
    desc: "거주자 여부, 세대주 여부 등 개인 인적정보를 입력합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-personal-info.jpg",
  },
  {
    step: "06",
    title: "부양가족 입력",
    desc: "전년도 정보를 불러오거나 부양가족을 추가해 공제 대상을 관리합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-dependent-list.jpg",
  },
  {
    step: "07",
    title: "국세청 PDF 업로드",
    desc: "국세청 자료를 업로드하면 내용을 확인하고 필요한 항목은 수기로 보완합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-deduction-summary.jpg",
  },
  {
    step: "08",
    title: "소득·공제 내역 확인",
    desc: "근무처별 소득명세와 공제 항목을 한눈에 확인하고 저장합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-submit-ready.jpg",
  },
  {
    step: "09",
    title: "연말정산 제출",
    desc: "확인이 끝나면 모바일에서 바로 제출하고 제출 내역을 확인합니다.",
    image: "/images/people/payroll/year-end-tax/mobile-start.jpg",
  },
  {
    step: "10",
    title: "처리결과 확인",
    desc: "제출 후 연말정산 처리결과를 모바일에서 바로 확인합니다.",
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
            입력부터 제출·결과 확인까지 모바일에서 이어집니다.
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
          {processImages.map(({ step, title, desc, image }) => (
            <div key={step} className="rounded-3xl bg-white p-4 shadow-[0_12px_34px_rgba(31,45,77,0.08)]">
              <div className="mx-auto w-full max-w-[230px] overflow-hidden rounded-[24px] border border-gray-100 bg-gray-50">
                <Image src={image || "/placeholder.svg"} alt={title} width={360} height={760} className="h-auto w-full" />
              </div>
              <div className="mt-5">
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: BLUE }}
                  >
                    {step}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
