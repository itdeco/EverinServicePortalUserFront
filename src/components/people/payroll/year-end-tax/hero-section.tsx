"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const BLUE = "#3344e6"

export default function YearEndTaxHeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-white"
      style={{
        backgroundImage: "url('/images/people/bg/bg-people-hero-00.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="mx-auto grid min-h-[720px] max-w-[1280px] items-center gap-12 px-4 pb-16 pt-28 md:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-12 lg:pb-24 lg:pt-36">
        <div className="text-center lg:text-left">
          <p className="mb-3 text-xl font-semibold tracking-wide md:text-2xl" style={{ color: BLUE }}>
            연말정산 아웃소싱
          </p>
          <h1 className="text-[34px] font-black leading-tight text-gray-900 sm:text-5xl md:text-[52px]">
            연말정산도 이제
            <br />
            편리하게 처리하세요.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-500 md:text-xl">
            영림원 급여 프로그램을 사용 중이라면,
            <br />
            연말정산 아웃소싱만도 가능합니다.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-lg border-0 px-10 text-base font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #3344e6 0%, #6f7cf5 100%)" }}
            >
              <Link href="/inquiry">도입문의</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-lg bg-white px-10 text-base font-semibold text-gray-700 hover:bg-[#f3f4ff]"
              style={{ borderColor: BLUE }}
            >
              <Link href="/subscribe">견적요청</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[720px]">
          <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white p-3 shadow-[0_24px_80px_rgba(31,45,77,0.18)]">
            <Image
              src="/images/people/payroll/year-end-tax/desktop-admin.png"
              alt="연말정산 관리자 화면"
              width={1200}
              height={646}
              className="h-auto w-full rounded-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
