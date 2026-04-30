import Image from "next/image";

export default function ServiceSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <div>
              <p className="text-[#00dcaa] font-semibold mb-4">서비스 소개</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                04. AI 어시스턴트
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">자동 작업 보고</h3>
                <p className="text-gray-600 text-sm">
                  사용자의 활동을 자동으로 추적하고 정리하여 보고서 작성 시간을 90% 단축
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">인사이트 제공</h3>
                <p className="text-gray-600 text-sm">
                  팀의 생산성 패턴을 분석하여 개선 방안을 자동으로 제시
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">실시간 알림</h3>
                <p className="text-gray-600 text-sm">
                  중요한 업무 변화를 즉시 감지하여 팀에 알림
                </p>
              </div>
            </div>
          </div>

          {/* Right: Screenshot */}
          <div className="relative h-80 md:h-96">
            <Image
              src="/images/contents/everWorks/bg-EverWorks-hero-00.png"
              alt="AI 어시스턴트"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
