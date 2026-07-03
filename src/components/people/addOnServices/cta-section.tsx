import Image from "next/image"
import Link from "next/link"
import ScrollReveal from "@/components/common/scroll-reveal"
import { COLORS } from "@/constants/brand-colors"

export default function AddOnCtaSection() {
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
        <h2 className="text-3xl md:text-4xl lg:text-4xl font-medium text-black mb-4 leading-relaxed">
          &quot;하나의 HR플랫폼으로 모두 연결&quot;
        </h2>

        <p className="text-black text-base md:text-lg mb-3 leading-relaxed">
          부가서비스로 HR을 더 편리하게 시작하세요.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/subscribe"
            className="inline-flex h-14 items-center rounded-lg px-10 text-base font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${COLORS.people} 0%, ${COLORS.onboarding} 100%)` }}
          >
            견적받기
          </Link>

          <Link
            href="/inquiry"
            className="inline-flex h-14 items-center rounded-lg border bg-white px-10 text-base font-semibold text-gray-700 hover:bg-emerald-50"
            style={{ borderColor: COLORS.people }}
          >
            도입문의
          </Link>
        </div>
      </ScrollReveal>
    </section>
  )
}
