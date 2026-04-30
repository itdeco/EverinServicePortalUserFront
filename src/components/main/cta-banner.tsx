"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CtaBanner() {
  return (
      <section className="py-20 lg:py-24 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120] relative overflow-hidden">
        {/* 배경 포인트 라이트 */}
        <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-[#00dcaa]/20 blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-[#586ffa]/20 blur-[120px]" />

        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">

            <p className="text-sm text-[#00dcaa] font-semibold mb-3 tracking-widest">
              에버人 솔루션
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              33년 ERP 명가 영림원이 만든<br />
              <span className="text-[#00dcaa]">HR 솔루션 에버인</span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg mb-10">
              에버웰커밍 무료 + 에버타임 7개월 무료체험
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                  size="lg"
                  className="bg-[#00dcaa] hover:bg-[#00c9a1] text-white px-8 h-12 text-base font-semibold rounded-full shadow-lg"
                  asChild
              >
                <Link href="/trial">무료체험 시작하기</Link>
              </Button>

              <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white bg-white/10 hover:bg-white/20 px-8 h-12 text-base font-semibold rounded-full"
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
