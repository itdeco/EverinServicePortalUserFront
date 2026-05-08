import Image from "next/image"

export default function CtaSection() {
  return (
      <section className="relative w-full py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
              src="/images/people/addOnServices/everworks/bg/bg-EverWorks-foot.jpg"
              alt="CTA 배경"
              fill
              className="object-cover object-center"
          />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12 text-center">
          <h2 className="text-[20px] md:text-[26px] font-medium text-black mb-9 leading-relaxed">
            혹시 지금 인사팀 업무의 70%가{" "}
            <span className="font-black">
            ‘서로 다른 시스템의 데이터를 맞추는 일’
          </span>
            에 쓰이고 있지는 않습니까?
          </h2>

          <p className="text-black text-base md:text-lg mb-8">
            업체별로 따로 노는 데이터, 이제 EverWorks가 하나로 묶어드립니다.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button className="px-9 py-3.5 bg-black text-white rounded-lg font-semibold hover:bg-black/80 transition-colors">
              브로셔 다운로드
            </button>

            <button className="px-12 py-3.5 bg-white border border-black/50 text-black rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              견적요청
            </button>
          </div>
        </div>
      </section>
  )
}