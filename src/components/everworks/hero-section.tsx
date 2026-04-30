import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/contents/everWorks/bg-EverWorks-hero-00.png"
          alt="에버웍스 배경"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6 z-10">
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight">
              업무의 시작부터 소통의 완성까지,
              <br />
              하나로 흐르는 그룹웨어
              <br />
              <span className="text-[#1a1a1a] font-black text-4xl md:text-5xl">에버웍스</span>
            </h1>
            <p className="text-gray-700 text-base leading-relaxed max-w-md">
              근태 . 급여 . ERP가 하나로 흐르는 경험.
              <br />
              데이터 파편화 없는 HR-Native 그룹웨어, EverWorks
            </p>
            <div className="flex gap-4 pt-2">
              <button className="px-8 py-3.5 bg-[#00cc99] text-white rounded-xl font-semibold hover:bg-[#00b386] transition-colors">
                체험하기
              </button>
              <button className="px-8 py-3.5 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                상세보기
              </button>
            </div>
          </div>

          {/* Right: Screenshot - 이미지만 사용 */}
          <div className="relative h-[300px] md:h-[400px] lg:h-[450px] z-10">
            <Image
              src="/images/contents/everWorks/bg-EverWorks-hero-01.png"
              alt="에버웍스 캘린더 스크린샷"
              fill
              className="object-contain object-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
