import Image from "next/image";

export default function FeaturesSection() {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            &quot;우리는 <span className="text-[#00cc99]">하나</span>로 흐릅니다.
            <br />
            그룹웨어가 곧 모든 시스템의 관문입니다.&quot;
          </h2>
        </div>

        {/* Diagram Image - bg-EverWorks-02.png 이미지 사용 */}
        <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px]">
          <Image
            src="/images/contents/everWorks/bg-EverWorks-02.png"
            alt="기능 다이어그램"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
