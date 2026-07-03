import Image from "next/image"
import Link from "next/link"

export default function WelcomingCtaSection() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image
          src="/images/people/bg/bg-People-foot.jpg"
          alt="CTA 배경"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* 컨텐츠 */}
      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-black mb-4 leading-relaxed">
          &quot;첫날부터 성공적인 시작&quot;
        </h2>

        <p className="text-black text-base md:text-lg mb-3 leading-relaxed">
          우리 회사만의 온보딩 시스템으로 입사 첫 단추를 잘 끼워<br />
          신규 입사자의 성공적인 시작을 지원하세요.
        </p>

        <div className="flex justify-center gap-4 flex-wrap mt-10">
          <Link
            href="/trial"
            className="px-10 py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 text-sm md:text-base"
            style={{ background: "linear-gradient(135deg, #4B6BF5 0%, #00cc99 100%)" }}
          >
            AI 온보딩 맛보기
          </Link>

          <Link
            href="/inquiry"
            className="border border-[#00cc99] bg-white text-gray-700 px-10 h-14 inline-flex items-center text-base font-semibold rounded-lg hover:bg-[#f0fdf9]"
          >
            평생 무료 사용
          </Link>
        </div>
      </div>
    </section>
  )
}
