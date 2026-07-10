"use client"

import Image from "next/image"
import { FileCheck2, ShieldCheck, Smartphone, UploadCloud } from "lucide-react"

const BLUE = "#3344e6"

const features = [
  {
    title: "국세청 PDF 반영",
    desc: "국세청 PDF를 업로드하면 공제 내역을 확인하고 필요한 항목만 수기로 보완할 수 있습니다.",
    icon: UploadCloud,
  },
  {
    title: "모바일 입력 지원",
    desc: "부양가족, 전 근무지, 개인 인적정보까지 직원이 모바일에서 직접 입력합니다.",
    icon: Smartphone,
  },
  {
    title: "아웃소싱 처리",
    desc: "연말정산 시즌에만 필요한 업무도 전문가에게 맡겨 운영 부담을 줄일 수 있습니다.",
    icon: ShieldCheck,
  },
]

export default function YearEndTaxFeaturesSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="mb-10 text-center md:mb-14">
          <p className="text-base font-bold" style={{ color: BLUE }}>
            간편한 연말정산 처리
          </p>
          <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-[32px]">
            국세청 PDF를 반영하여 간편하게 처리 가능합니다.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="grid gap-4">
            {features.map(({ title, desc, icon: Icon }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5 md:p-6"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: "rgba(51,68,230,0.1)" }}
                >
                  <Icon className="h-6 w-6" style={{ color: BLUE }} strokeWidth={1.7} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500 md:text-base">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-2 px-1 text-sm font-bold text-gray-600">
              <FileCheck2 className="h-5 w-5" style={{ color: BLUE }} />
              관리자 처리 화면
            </div>
            <Image
              src="/images/people/payroll/year-end-tax/desktop-admin.png"
              alt="국세청 PDF가 반영된 연말정산 관리자 화면"
              width={1200}
              height={646}
              className="h-auto w-full rounded-2xl border border-gray-100"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
