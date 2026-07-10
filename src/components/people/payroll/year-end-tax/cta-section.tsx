import Image from "next/image"
import Link from "next/link"

export default function YearEndTaxCtaSection() {
  return (
    <section className="relative w-full overflow-hidden py-24">
      <div className="absolute inset-0">
        <Image
          src="/images/people/bg/bg-People-foot.jpg"
          alt="연말정산 상담 배경"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 text-center lg:px-12">
        <h2 className="mb-4 text-3xl font-bold leading-relaxed text-black md:text-4xl">
          연말정산, 이제 모바일로 간편하게 처리하세요.
        </h2>
        <p className="text-base leading-relaxed text-black md:text-lg">
          시즌 업무는 전문가에게 맡기고, 담당자는 더 중요한 HR 업무에 집중하세요.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/inquiry"
            className="rounded-lg px-10 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:text-base"
            style={{ background: "linear-gradient(135deg, #3344e6 0%, #6f7cf5 100%)" }}
          >
            도입문의
          </Link>
          <Link
            href="/subscribe"
            className="inline-flex h-14 items-center rounded-lg bg-white px-10 text-base font-semibold text-gray-700 hover:bg-[#f3f4ff]"
            style={{ border: "1px solid #3344e6" }}
          >
            견적요청
          </Link>
        </div>
      </div>
    </section>
  )
}
