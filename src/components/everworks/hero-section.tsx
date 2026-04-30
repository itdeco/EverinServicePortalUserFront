import Image from "next/image";
import SmartLink from "@/components/common/SmartLink";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-32">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#c8dfe6] via-[#d9eee8] to-[#a8e6d9]"></div>
      
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8 z-10">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                업무의 시작부터 소통이
                <br />
                완성까지지, 하나로 흐르는
                <br />
                그룹웨어
                <br />
                <span className="text-[#1a1a1a] font-black">에버웍스</span>
              </h1>
              <p className="text-gray-700 text-base leading-relaxed max-w-md">
                근태, 금여, ERP가 하나로 흐르는 경험.
                <br />
                데이터 파편화 없는 HR-Native 그룹웨어, EverWorks
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <button className="px-8 py-3.5 bg-[#00cc99] text-white rounded-2xl font-semibold hover:bg-[#00b386] transition-colors shadow-md">
                체험하기
              </button>
              <button className="px-8 py-3.5 border-2 border-gray-400 text-gray-700 rounded-2xl font-semibold hover:border-gray-500 hover:bg-white/50 transition-colors">
                신세보기
              </button>
            </div>
          </div>

          {/* Right: Screenshot with Monitor Frame */}
          <div className="relative h-96 lg:h-[500px] flex items-center justify-end z-10">
            {/* Monitor Frame Effect */}
            <div className="relative w-full max-w-md lg:max-w-2xl">
              {/* Monitor bezel */}
              <div className="bg-black rounded-2xl p-1 shadow-2xl">
                {/* Monitor top bar */}
                <div className="bg-yellow-400 rounded-t-lg px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <span className="text-xs font-semibold text-gray-800">C2Ware | Calendar</span>
                  </div>
                  <div className="text-xs text-gray-800">⚙ ⬜ ⬛</div>
                </div>
                {/* Screen content */}
                <div className="bg-white rounded-b-lg overflow-hidden">
                  <Image
                    src="/images/contents/everWorks/bg-EverWorks-hero-00.png"
                    alt="에버웍스 캘린더 스크린샷"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              {/* Shadow under monitor */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 w-3/4 h-2 bg-black/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
