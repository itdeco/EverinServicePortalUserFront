import Image from "next/image"
import Link from "next/link"

export default function EvertimeCtaSection() {
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
          &quot;근태관리, 바뀌면 조직이 달라집니다.&quot;
        </h2>

        <p className="text-black text-base md:text-lg mb-3 leading-relaxed">
          수작업은 줄이고, 더 중요한 일에 몰입할 시간.<br />
          에버타임이 만들어드립니다.
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
            href="/inquiry"
            className="border border-[#00cc99] bg-white text-gray-700 px-10 h-14 inline-flex items-center text-base font-semibold rounded-lg hover:bg-[#f0fdf9]"
          >
            견적요청
          </Link>
        </div>
      </div>
    </section>
  )
}
