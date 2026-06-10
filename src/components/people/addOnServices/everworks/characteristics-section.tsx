import Image from "next/image";
import { COLORS } from "@/constants/brand-colors";

export default function CharacteristicsSection() {
  const characteristics = [
    {
      id: 1,
      title: "Teams Native Add-in",
      description:
        "이미 Teams를 사용 중이라면, 화면 전환 없이 Teams 안에서 EverWorks의 전자결재와 인사 기능을 그대로 사용하세요",
    },
    {
      id: 2,
      title: "Hybrid OS 지원",
      description:
        "Windows와 Mac 모두에서 최적화된 전용 앱을 제공합니다. 웹 브라우저보다 빠르고 안정적인 데스크톱 환경을 경험하십시오.",
    },
    {
      id: 3,
      title: "조직도 기반 메신저",
      description:
        "전사 조직도가 실시간 반영되는 보안 메신저로 업무의 속도를 높이고, 개인 사생활과 업무를 완벽히 분리합니다.",
    },
  ];

  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            어떤 환경에서도 끊김 없는 '올인원 커뮤니케이션'
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            업무의 시작은 소통입니다. EverWorks 메신저는 단순한 채팅을 넘어
            <br />
            모든 업무의 '허브' 역할을 수행합니다.
          </p>
        </div>

        {/* 3 Circular Cards */}
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-6 px-6">
          {characteristics.map((char) => (
              <div key={char.id} className=" min-w-[80%] sm:min-w-[60%] md:min-w-0 snap-center flex flex-col items-center text-center ">
              {/* Circular Border Container */}
              <div className="relative w-64 h-64 rounded-full border-4 bg-white shadow-sm flex items-center justify-center mb-8" style={{ borderColor: COLORS.everworks }}>
                {/* Content (점 포함) */}
                <div className="flex flex-col items-center justify-center text-center px-6">
                  {/* 점 */}
                  <div className="w-5 h-5 rounded-full mb-4" style={{ backgroundColor: COLORS.everworks }}></div>
                  {/* 제목 */}
                  <h3 className="text-lg md:text-lg font-bold text-gray-900 mb-3">
                    {char.title}
                  </h3>
                  {/* 설명 */}
                  <p className="text-gray-600 text-[11px] leading-[16px] leading-relaxed">
                    {char.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
