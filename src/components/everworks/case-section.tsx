import Image from "next/image";

export default function CaseSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            업체가 다르면, <span className="text-[#00cc99]">관리자</span>의 고통은 배가 됩니다.
          </h2>
        </div>

        {/* Illustration - bg-EverWorks-01.png 이미지 사용 */}
        <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px]">
          <Image
            src="/images/contents/everWorks/bg-EverWorks-01.png"
            alt="업무 사례 일러스트"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
