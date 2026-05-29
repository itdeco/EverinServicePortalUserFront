import Image from "next/image"
import Link from "next/link"
import ScrollReveal from "@/components/common/scroll-reveal"

export default function PcOffCtaSection() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/people/bg/bg-People-foot.jpg"
          alt="CTA 배경"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Content */}
      <ScrollReveal className="relative mx-auto max-w-[1280px] px-6 lg:px-12 text-center">
        <h2 className="text-[20px] md:text-[26px] font-bold text-black mb-4 leading-relaxed">
          불필요한 야근, 이제는 기업의 리스크입니다.
        </h2>

        <p className="text-black text-base md:text-lg mb-3 leading-relaxed">
          근태 연동형 자동 제어로<br />
          근로시간 법규도, 조직 건강도 지키세요.
        </p>

        <div className="flex justify-center gap-4 flex-wrap mt-10">
          <Link
            href="/support/inquiry"
            className="px-10 py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 text-sm md:text-base"
            style={{ background: "linear-gradient(135deg, #4B6BF5 0%, #00cc99 100%)" }}
          >
            도입문의
          </Link>

          <Link
            href="/trial"
            className="px-10 py-3.5 bg-white border border-black/40 text-black rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm md:text-base"
          >
            견적요청
          </Link>
        </div>
      </ScrollReveal>
    </section>
  )
}
