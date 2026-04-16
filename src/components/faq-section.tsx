"use client"

import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle, ArrowRight } from "lucide-react"

const faqs = [
  {
    question: "에버人 무료체험은 어떻게 신청하나요?",
    answer: "에버웰커밍은 영구 무료로 사용 가능하며, 에버타임 스탠다드는 1개월 무료체험 신청 시 6개월 추가 무료(총 7개월)로 이용하실 수 있습니다. 홈페이지에서 '무료체험 시작' 버튼을 클릭하시면 3분 내에 포털 생성이 완료됩니다.",
  },
  {
    question: "기존 HR 시스템에서 데이터 마이그레이션이 가능한가요?",
    answer: "네, 가능합니다. 에버人은 기존 ERP, 그룹웨어, 인사시스템과의 연동 및 데이터 마이그레이션 서비스를 제공합니다. 전담 컨설턴트가 배정되어 안전하고 정확한 데이터 이관을 도와드립니다.",
  },
  {
    question: "급여 아웃소싱(에버페이롤) 서비스 범위는 어디까지인가요?",
    answer: "급여계산, 4대보험 신고, 연말정산, 원천세 신고, 퇴직금 정산 등 급여 관련 전 업무를 대행합니다. 공인회계사/세무사 파트너십을 통해 전문성과 정확성을 보장하며, 33년 영림원의 노하우가 담긴 무결점 급여 엔진으로 운영됩니다.",
  },
  {
    question: "도입 비용과 요금제는 어떻게 되나요?",
    answer: "에버人은 모듈별 과금 방식으로 필요한 기능만 선택하여 비용을 최적화할 수 있습니다. 요금제 페이지에서 실시간 견적을 확인하시거나, 도입 상담을 신청하시면 맞춤형 견적서를 받아보실 수 있습니다.",
  },
  {
    question: "보안 및 개인정보 보호는 어떻게 관리되나요?",
    answer: "에버人은 ISO 27001 국제정보보안 인증을 획득하였으며, 국내 클라우드 보안인증(CSAP)을 준수합니다. 모든 데이터는 암호화되어 저장되며, 접근권한 관리, 감사로그, 백업 체계를 통해 안전하게 보호됩니다.",
  },
]

export function FaqSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
              <HelpCircle className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">FAQ</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              더 궁금한 점이 있으신가요?
            </h2>
            <p className="text-muted-foreground">
              자주 묻는 질문들을 확인해보세요
            </p>
          </div>

          {/* FAQ 아코디언 */}
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-2xl border border-border/50 px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="text-center mt-10">
            <Button variant="outline" className="rounded-full px-6">
              고객센터 바로가기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
