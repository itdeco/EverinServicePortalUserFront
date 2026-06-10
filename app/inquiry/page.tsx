import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import MarketoInquiryForm from "@/components/inquiry/marketo-inquiry-form"

export const metadata: Metadata = {
  title: "도입문의 - 에버人(EVERIN)",
  description: "에버人 도입을 위한 상담 문의를 남겨주시면 컨설턴트가 직접 안내해드립니다.",
}

export default function InquiryPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="border-0 bg-white pb-0 pt-20 md:pt-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-black tracking-normal text-slate-950 md:text-5xl">
              도입문의
            </h1>
            <p className="mb-10 text-base font-medium leading-7 text-slate-600 md:text-lg">
              효율적 근태관리부터 정확한 급여정산! 연락처를 남기시면 컨설턴트가 직접 안내해드립니다.
            </p>
          </div>
        </div>
      </section>
      <section className="border-0 bg-white pb-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="flex w-full flex-col">
            <MarketoInquiryForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
