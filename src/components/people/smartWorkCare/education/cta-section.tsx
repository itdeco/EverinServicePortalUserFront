import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function EducationCtaSection() {
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
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-relaxed text-balance">
          에버인 교육/경력, 지금 확인해 보세요.
        </h2>

        <p className="text-black text-base md:text-lg mb-3 leading-relaxed text-pretty">
          계획 수립부터 대상자 지정, 결과 등록과 자동 정산까지<br />
          한 흐름으로 이어지는 교육 운영을 경험하세요.
        </p>

        <div className="flex justify-center gap-4 flex-wrap mt-10">
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-2 px-10 py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 text-sm md:text-base"
            style={{ background: "linear-gradient(135deg, #4B6BF5 0%, #03b565 100%)" }}
          >
            데모 신청하기
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/subscribe"
            className="border border-[#03b565] bg-white text-gray-700 px-10 h-[52px] inline-flex items-center text-base font-semibold rounded-lg hover:bg-[#f0fdf9]"
          >
            요금제 보기
          </Link>
        </div>
      </div>
    </section>
  )
}
