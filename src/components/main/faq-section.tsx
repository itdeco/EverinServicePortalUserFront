"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

const faqs = [
  {
    q: "서비스 무료체험은 어떻게 신청하나요?",
    a: "에버웰커밍은 영구 무료로 사용 가능하며, 에버타임 스탠다드는 1개월 무료체험 신청 시 6개월 추가 무료(총 7개월)로 이용하실 수 있습니다. 홈페이지에서 '무료체험 시작' 버튼을 클릭하시면 3분 내에 포털 생성이 완료됩니다.",
  },
  {
    q: "기존 HR 시스템에서 데이터 마이그레이션이 가능한가요?",
    a: "네, 가능합니다. 에버人은 기존 ERP, 그룹웨어, 인사시스템과의 연동 및 데이터 마이그레이션 서비스를 제공합니다. 전담 컨설턴트가 배정되어 안전하고 정확한 데이터 이관을 도와드립니다.",
  },
  {
    q: "급여 아웃소싱(에버페이롤) 서비스 범위는 어디까지인가요?",
    a: "급여계산, 4대보험 신고, 연말정산, 원천세 신고, 퇴직금 정산 등 급여 관련 전 업무를 대행합니다. 공인회계사/세무사 파트너십을 통해 전문성과 정확성을 보장합니다.",
  },
  {
    q: "도입 비용과 요금제는 어떻게 되나요?",
    a: "에버人은 모듈별 과금 방식으로 필요한 기능만 선택하여 비용을 최적화할 수 있습니다. 요금제 페이지에서 실시간 견적을 확인하시거나, 도입 상담을 신청하시면 맞춤형 견적서를 받아보실 수 있습니다.",
  },
  {
    q: "보안 및 개인정보 보호는 어떻게 관리되나요?",
    a: "에버人은 ISO 27001 국제정보보안 인증을 획득하였으며, 모든 데이터는 암호화되어 저장됩니다. 접근권한 관리, 감사로그, 백업 체계를 통해 안전하게 보호됩니다.",
  },
]

export function FaqSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-xs text-[#00dcaa] font-semibold tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              더 궁금한 점이 있으신가요?
            </h2>
            <p className="text-gray-400 text-sm">
              자주 묻는 질문을 확인해보세요.
            </p>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white rounded-xl border border-gray-200 px-6 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline py-4 text-sm md:text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 pb-5 text-sm leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Bottom link */}
          <div className="text-center mt-8">
            <Link
              href="/support/faq"
              className="text-sm text-[#00dcaa] hover:text-[#00c9a1] font-medium underline underline-offset-2"
            >
              더 많은 FAQ 보기 &rarr;
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
