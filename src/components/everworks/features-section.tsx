import Image from "next/image";

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
    description: "모든 솔루션을 우리가 직접 만드니깐, 기술 지원도 단 한 곳에서 끝납니다."
  }
];

const functions = [
  { label: "메일", icon: "📧" },
  { label: "전자결재", icon: "📋" },
  { label: "게시판", icon: "📰" },
  { label: "인장관리", icon: "🔐" },
  { label: "TO-DO", icon: "✓" },
  { label: "예약", icon: "📅" },
  { label: "설문조사", icon: "📊" },
  { label: "AI Assistant", icon: "🤖" },
  { label: "대시보드", icon: "📈" },
  { label: "조직관리", icon: "👥" },
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            &quot;우리는 <span className="text-[#00cc99]">하나</span>로 흐릅니다.
            <br />
            그룹웨어가 곧 모든 시스템의 관문입니다.&quot;
          </h2>
        </div>

        {/* Features and Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left: Features List */}
          <div className="space-y-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-[#00cc99] font-bold mb-2 text-lg">{feature.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Right: Diagram Image */}
          <div className="relative h-[350px] md:h-[400px]">
            <Image
              src="/images/contents/everWorks/bg-EverWorks-02.png"
              alt="에버웍스 다이어그램"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Functions Grid */}
        <div className="mt-16 md:mt-20">
          <div className="grid grid-cols-5 gap-4 md:gap-6">
            {functions.map((func, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="bg-[#00cc99] w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-3">
                  <span className="text-2xl md:text-3xl">{func.icon}</span>
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
