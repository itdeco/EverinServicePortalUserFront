import Image from "next/image"
import Link from "next/link"

export default function OutsourcingCtaSection() {
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
          &quot;HR 담당자의 진짜 일은 숫자가 아니라 사람입니다.&quot;
        </h2>

        <p className="text-black text-base md:text-lg mb-3 leading-relaxed">
          급여·연말정산은 전문가에게 맡기고, 더 중요한 HR에 집중하세요.
        </p>

        <div className="flex justify-center gap-4 flex-wrap mt-10">
          <Link
            href="/inquiry"
            className="px-10 py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 text-sm md:text-base"
            style={{ background: "linear-gradient(135deg, #3344e6 0%, #6f7cf5 100%)" }}
          >
            도입문의
          </Link>

          <Link
            href="/subscribe"
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
