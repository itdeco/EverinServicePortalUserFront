import Image from "next/image"
import Link from "next/link"

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
      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12 text-center">
        <h2 className="text-[20px] md:text-[26px] font-medium text-black mb-4 leading-relaxed">
          장시간 근로, 이제 자동으로 차단하세요
        </h2>

        <p className="text-black text-base md:text-lg mb-3 leading-relaxed">
          PC-OFF 설정 한 번으로 법적 리스크 0%
        </p>

        <div className="flex justify-center gap-4 flex-wrap mt-10">
          <Link
            href="/trial"
            className="px-10 py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 text-sm md:text-base"
            style={{ background: "linear-gradient(135deg, #4B6BF5 0%, #00cc99 100%)" }}
          >
            체험하기
          </Link>

          <Link
            href="/support/inquiry"
            className="px-10 py-3.5 bg-white border border-black/40 text-black rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm md:text-base"
          >
            견적요청
          </Link>
        </div>
      </div>
    </section>
  )
}
