import Image from "next/image";

export default function CtaSection() {
  return (
    <section className="relative w-full py-16 overflow-hidden">
      {/* Background Image - bg-EverWorks-foot.jpg 이미지 사용 */}
      <div className="absolute inset-0">
        <Image
          src="/images/contents/everWorks/bg-EverWorks-foot.jpg"
          alt="CTA 배경"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 leading-relaxed">
          혹시 지금 인사팀 업무의 70%가 &apos;<span className="text-[#00cc99]">서로 다른 시스템의 데이터를 맞추는 일</span>&apos;에 쓰이고 있지는 않습니까?
        </h2>
        <p className="text-gray-300 mb-8">
          일원화된 마음 늘은 데이터, 이제 EverWorks가 하나로 맞아드립니다.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="px-8 py-3.5 bg-[#00cc99] text-white rounded-xl font-semibold hover:bg-[#00b386] transition-colors">
            무료로 시작하기
          </button>
          <button className="px-8 py-3.5 bg-white/10 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors">
            문의하기
          </button>
        </div>
      </div>
    </section>
  );
}
