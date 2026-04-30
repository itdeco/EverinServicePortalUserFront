import Image from "next/image";

export default function IconGridSection() {
  return (
    <section className="w-full bg-[#e8f5f0] py-16">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-4">
          <p className="text-gray-700 font-medium mb-2">
            어떤 환경에서도 끊김 없는 &apos;올인원 커뮤니케이션&apos;
          </p>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            업무의 시작과 수용합니다. EverWorks 에서라면 임직원 메일을 넘어 모든 업무와 &apos;회의&apos; 채널을 수행합니다.
          </p>
        </div>

        {/* Icon Grid Image - bg-EverWorks-03.png 이미지 사용 */}
        <div className="relative w-full h-[200px] md:h-[280px] lg:h-[350px]">
          <Image
            src="/images/contents/everWorks/bg-EverWorks-03.png"
            alt="Teams Native Add-in, Hybrid OS 지원, 조직도 기반 메신저"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
