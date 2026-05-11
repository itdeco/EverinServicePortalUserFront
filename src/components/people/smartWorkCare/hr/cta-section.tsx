import Image from "next/image"
import Link from "next/link"

export default function HrCtaSection() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Background Image - same as everworks */}
      <div className="absolute inset-0">
        <Image
          src="/images/people/bg/bg-People-foot.jpg"
          alt="CTA 배경"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12 text-center">
        <h2 className="text-[20px] md:text-[26px] font-medium text-black mb-4 leading-relaxed">
          채용부터 퇴직까지
        </h2>

        <p className="text-black text-base md:text-lg mb-3 leading-relaxed">
          인사의 전 과정을 하나의 플랫폼에서<br />
          법 개정 시 시스템자동 반영, 법적 리스트 0%
        </p>

        <div className="flex justify-center gap-4 flex-wrap mt-10">
          <Link
            href="/trial"
            className="px-10 py-3.5 bg-black text-white rounded-lg font-semibold hover:bg-black/80 transition-colors text-sm md:text-base"
          >
            체험하기
          </Link>

          <Link
            href="/support/inquiry"
            className="px-10 py-3.5 bg-white border border-black/50 text-black rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm md:text-base"
          >
            견적요청
          </Link>
        </div>
      </div>
    </section>
  )
}
