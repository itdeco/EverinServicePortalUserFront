import Image from "next/image"

export default function PcOffTaglineSection() {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12 flex flex-col items-center text-center">
        {/* 아이콘 */}
        <div className="mb-8">
          <Image
            src="/images/main/icons/hero/icon-hero-06.svg"
            alt="PC-OFF 아이콘"
            width={64}
            height={64}
          />
        </div>

        {/* 헤드라인 */}
        <h2 className="text-xl md:text-2xl lg:text-[28px] font-black text-gray-900 leading-snug mb-4">
          &quot;PC-OFF로 근무시간 문화를 바꿉니다&quot;
        </h2>

        {/* 서브 텍스트 */}
        <p className="text-gray-500 text-base md:text-lg leading-relaxed">
          야근 강요 없는 건강한 조직문화,<br />
          에버인 PC-OFF가 만들어드립니다
        </p>
      </div>
    </section>
  )
}
