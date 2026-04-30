import Image from "next/image";
import SmartLink from "@/components/common/SmartLink";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-r from-[#d4f5ed] via-[#e8f5f9] to-[#e8e8ff] py-16">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <div>
              <p className="text-[#00dcaa] font-semibold mb-2">에버웍스</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                모든 HR에 대한 조직원의 혼동을 덜어주는
                <br />
                <span className="text-[#00dcaa]">에버웍스</span>
              </h1>
              <p className="text-gray-600 text-base leading-relaxed">
                팀 협업, 업무 관리, 성과 분석을 한 곳에서!
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button className="px-7 py-3 bg-[#00dcaa] text-white rounded-full font-semibold hover:opacity-90 transition-opacity">
                무료체험 시작하기
              </button>
              <button className="px-7 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold hover:border-gray-400 transition-colors">
                요청 신청
              </button>
            </div>
          </div>

          {/* Right: Screenshot */}
          <div className="relative h-80 md:h-96">
            <Image
              src="/images/contents/everWorks/bg-EverWorks-hero-01.png"
              alt="에버웍스 스크린샷"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
