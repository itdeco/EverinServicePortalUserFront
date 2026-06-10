import Image from "next/image";
import { COLORS } from "@/constants/brand-colors";

const features = [
  {
    title: "통합 계정 관리",
    description: "한 번의 입사 처리로 메일, ERP, 근태 계정까지 동시 생성"
  },
  {
    title: "실시간 데이터 연동",
    description: "연장근로 승인 즉시 PC-OFF 해제 및 급여 자동 가산"
  },
  {
    title: "단일 창구 지원",
    description: "모든 솔루션을 우리가 직접 만드니깐, 기술 지원도 단 한 곳에서 끝납니다"
  }
];

const functions = [
  { label: "메일", icon: "/images/people/addOnServices/everworks/icon/icon-EverWorks-01.svg" },
  { label: "전자결재", icon: "/images/people/addOnServices/everworks/icon/icon-EverWorks-02.svg" },
  { label: "게시판", icon: "/images/people/addOnServices/everworks/icon/icon-EverWorks-03.svg" },
  { label: "일정관리", icon: "/images/people/addOnServices/everworks/icon/icon-EverWorks-04.svg" },
  { label: "TO-DO", icon: "/images/people/addOnServices/everworks/icon/icon-EverWorks-05.svg" },
  { label: "예약", icon: "/images/people/addOnServices/everworks/icon/icon-EverWorks-06.svg" },
  { label: "설문조사", icon: "/images/people/addOnServices/everworks/icon/icon-EverWorks-07.svg" },
  { label: "AI Assistant", icon: "/images/people/addOnServices/everworks/icon/icon-EverWorks-08.svg" },
  { label: "대시보드", icon: "/images/people/addOnServices/everworks/icon/icon-EverWorks-09.svg" },
  { label: "조직관리", icon: "/images/people/addOnServices/everworks/icon/icon-EverWorks-10.svg" }
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-[#fff8f3] py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            &quot;우리는 <span style={{ color: COLORS.everworks }}>하나</span>로 흐릅니다
            <br />
            그룹웨어가 곧 모든 시스템의 관문입니다&quot;
          </h2>
        </div>

        {/* Features and Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left: Features List */}
          <div className="space-y-6">
            {features.map((feature, idx) => (
              <div key={idx} className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
                <h3 className="font-bold mb-2 text-lg" style={{ color: COLORS.everworks }}>{feature.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Right: Diagram Image */}
          <div className="relative h-[350px] md:h-[400px]">
            <Image
              src="/images/people/addOnServices/everworks/bg/bg-EverWorks-02.png"
              alt="에버웍스 다이어그램"
              fill
              className="object-contain"
              style={{ filter: "hue-rotate(-120deg) saturate(1.35) contrast(1.05)" }}
            />
          </div>
        </div>

        {/* Functions Grid */}
        <div className="mt-16 md:mt-20">
          <div className="grid grid-cols-5 gap-4 md:gap-6">
            {functions.map((func, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-3 bg-white shadow-sm ring-1 ring-orange-100">
                  <div className="relative w-8 h-8 md:w-14 md:h-14">
                    <Image
                        src={func.icon}
                        alt={func.label}
                        fill
                        className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-xs md:text-sm font-medium text-gray-700">{func.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
