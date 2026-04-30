import Image from "next/image";

export default function FeaturesSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <div>
              <p className="text-[#00dcaa] font-semibold mb-4">기능 상세</p>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                "작업에 최신 도움주기"
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                "예상에서 완료 시간을 다시 정보하세요"
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#ffa726] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">작업현황</p>
                  <p className="text-gray-600 text-sm">리얼타임으로 각 팀원의 업무를 관리할 수</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#66bb6a] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">협업 기능</p>
                  <p className="text-gray-600 text-sm">팀 내 소통 및 공동작업을 효율적으로</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#ec407a] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">보고서</p>
                  <p className="text-gray-600 text-sm">자동 생성되는 진행 현황 보고서</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#5c6bc0] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">분석</p>
                  <p className="text-gray-600 text-sm">팀의 생산성을 한눈에 파악</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Chart Image */}
          <div className="relative h-96">
            <Image
              src="/images/contents/everWorks/features-chart.png"
              alt="기능 차트"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
