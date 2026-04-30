import Image from "next/image";

export default function CharacteristicsSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            핵심 모듈별 특장점
          </h2>
          <p className="text-gray-600">
            EverWorks만의 차별화된 경쟁력을 확인하세요.
          </p>
        </div>

        {/* 4 Cards Grid - 이미지들만 사용 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-[#e8f8f3] rounded-2xl p-6 border border-[#c8f0e8]">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#00cc99] text-white text-xs font-semibold rounded-full">
                정책 &amp; 실행 연동 (Workflow)
              </span>
            </div>
            <div className="relative h-[200px]">
              <Image
                src="/images/contents/everWorks/bg-EverWorks-05.png"
                alt="정책 실행 연동"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#e8f8f3] rounded-2xl p-6 border border-[#c8f0e8]">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#00cc99] text-white text-xs font-semibold rounded-full">
                관리 &amp; 통합 연동 (Workflow)
              </span>
            </div>
            <div className="relative h-[200px]">
              <Image
                src="/images/contents/everWorks/bg-EverWorks-06.png"
                alt="관리 툴 통합"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#e8f8f3] rounded-2xl p-6 border border-[#c8f0e8]">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#00cc99] text-white text-xs font-semibold rounded-full">
                글로벌 협업 툴 호환 (Sync)
              </span>
            </div>
            <div className="relative h-[200px]">
              <Image
                src="/images/contents/everWorks/bg-EverWorks-07.png"
                alt="글로벌 협업 툴"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#e8f8f3] rounded-2xl p-6 border border-[#c8f0e8]">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#00cc99] text-white text-xs font-semibold rounded-full">
                사용자 중심 화면 (UI/UX)
              </span>
            </div>
            <div className="relative h-[200px]">
              <Image
                src="/images/contents/everWorks/bg-EverWorks-08.png"
                alt="사용자 중심 화면"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
