"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CtaBanner() {
  return (
    <section
      className="py-20 lg:py-24 relative overflow-hidden"
      style={{
        backgroundImage: `url('/images/main/backgrounds/bg-foot.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-sm text-[#00dcaa] font-semibold mb-3">에버人 솔루션</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-4">
            33년 ERP 명가 영림원이 만든<br />
            <span className="text-[#00dcaa]">HR 솔루션 에버인</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-8">
            에버웰커밍 무료 + 에버타임(7개월)
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="bg-[#00dcaa] hover:bg-[#00c9a1] text-white px-8 h-12 text-base font-semibold rounded-lg shadow-md"
              asChild
            >
              <Link href="/trial">무료체험 시작하기</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white px-8 h-12 text-base font-semibold rounded-lg"
              asChild
            >
              <Link href="/support/inquiry">도입문의하기</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
