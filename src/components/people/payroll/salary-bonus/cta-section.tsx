import Image from "next/image"
import Link from "next/link"

export default function SalaryBonusCtaSection() {
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
          급여·상여, 이제는 더 똑똑하게
        </h2>

        <p className="text-black text-base md:text-lg mb-3 leading-relaxed">
          페이롤 전문가가 뒷단을 책임지고,<br />
          당신은 앞단의 전략을 설계하세요.
        </p>

        <div className="flex justify-center gap-4 flex-wrap mt-10">
          <Link
            href="/trial"
            className="px-10 py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 text-sm md:text-base"
            style={{ background: "linear-gradient(135deg, #3344e6 0%, #6f7cf5 100%)" }}
          >
            도입문의
          </Link>

          <Link
            href="/trial"
            className="bg-white text-gray-700 px-10 h-14 inline-flex items-center text-base font-semibold rounded-lg hover:bg-[#f3f4ff]"
            style={{ border: "1px solid #3344e6" }}
          >
            견적요청
          </Link>
        </div>
      </div>
    </section>
  )
}
