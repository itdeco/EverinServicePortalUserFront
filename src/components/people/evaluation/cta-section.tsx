import Image from "next/image"
import Link from "next/link"
import ScrollReveal from "@/components/common/scroll-reveal"
import { COLORS } from "@/constants/brand-colors"

export default function EvaluationCtaSection() {
  return (
    <section className="relative w-full overflow-hidden py-24">
      <div className="absolute inset-0">
        <Image
          src="/images/people/bg/bg-People-foot.jpg"
          alt="CTA 배경"
          fill
          className="object-cover object-center"
        />
      </div>

      <ScrollReveal className="relative mx-auto max-w-[1280px] px-6 text-center lg:px-12">
        <h2 className="mb-4 text-3xl md:text-4xl lg:text-4xl font-medium leading-relaxed text-black">
          &quot;데이터 기반의 공정한 인사평가&quot;
        </h2>

        <p className="mb-3 text-3xl md:text-4xl lg:text-4xl leading-relaxed text-black">
          투명한 평가 에버평가로 시작하세요.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/trial"
            className="rounded-lg px-10 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:text-base"
            style={{ background: `linear-gradient(135deg, ${COLORS.evaluation} 0%, ${COLORS.culture} 100%)` }}
          >
            체험하기
          </Link>

          <Link
            href="/inquiry"
            className="inline-flex h-14 items-center rounded-lg border bg-white px-10 text-base font-semibold text-gray-700 hover:bg-blue-50"
            style={{ borderColor: COLORS.evaluation }}
          >
            도입문의
          </Link>
        </div>
      </ScrollReveal>
    </section>
  )
}
