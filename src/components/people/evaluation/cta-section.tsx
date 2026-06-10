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
        <h2 className="mb-4 text-[20px] font-medium leading-relaxed text-black md:text-[26px]">
          &quot;평가가 끝나는 순간이 아니라, 성장 대화가 시작되는 순간으로&quot;
        </h2>

        <p className="mb-3 text-base leading-relaxed text-black md:text-lg">
          공정한 평가 프로세스와 구성원의 성장 데이터를<br />
          에버평가가 함께 만들어드립니다.
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
