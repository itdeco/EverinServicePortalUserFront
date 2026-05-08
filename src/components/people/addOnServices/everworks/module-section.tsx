import Image from "next/image";

export default function ModuleSection() {
    const modules = [
        {
            title: "결재 & 실행 연동 (Workflow)",
            top: "결재 완료 후 담당자가 근태/급여 시스템에 데이터 수동 재입력",
            bottom:
                "전자결재 승인 즉시 PC-OFF 해제 및 급여 정산 엔진 실시간 반영 (No-Touch 자동화)",
        },
        {
            title: "결재 & 실행 연동 (Workflow)",
            top: "별도 업체 연동, 데이터 파편화, 입사/퇴사 시 시스템마다 계정 개별 생성",
            bottom:
                "온보딩-인사-ERP 연동으로 원 클릭 계정 관리 및 데이터 정합성 100%",
        },
        {
            title: "글로벌 협업 툴 호환 (Sync)",
            top: "협업은 Teams에서, 결재는 그룹웨어에서 따로. 데이터 파편화 및 업무 흐름 단절",
            bottom:
                "MS Teams 내 웹 형태로 직접 구동 가능하며 Outlook, Google Workspace 연동 가능",
        },
        {
            title: "사용자 중심 환경 (UX/UI)",
            top: "웹 중심의 제한적 환경 및 코딩 지식이 필요한 복잡한 양식 제작",
            bottom:
                "Win/Mac/모바일 완벽 대응 및 드래그 앤 드롭 방식의 직관적 로우코드(Low-code) 편집기",
        },
    ];

    return (
        <section className="w-full bg-[#f8f9fb] py-20">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-12">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        핵심 모듈별 특장점
                    </h2>
                    <p className="text-gray-500">
                        EverWorks만의 차별화된 경쟁력을 확인하세요.
                    </p>
                </div>

                {/* Cards */}
                <div className="flex md:flex md:flex-wrap md:justify-center gap-5 md:gap-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-6 px-6 pb-4">
                    {modules.map((m, idx) => (
                        <div
                            key={idx}
                            className="min-w-[86%] sm:min-w-[70%] md:min-w-0 md:w-[480px] snap-center rounded-3xl border-2 border-[#00cc99] p-8 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-[#00cc99]/20">
                            {/* Title (pill) */}
                            <div className="text-center justify-center mb-6">
                                <div className="bg-[#2bb673] text-white text-xl font-bold px-6 py-3 rounded-full">
                                    {m.title}
                                </div>
                            </div>

                            {/* Top Box */}
                            <div className="bg-gray-100 text-gray-700 text-xm rounded-xl px-5 py-4 -mb-8 text-center shadow-sm">
                                <div className="font-semibold mb-1 text-xl">타사 그룹웨어</div>
                                {m.top}
                            </div>

                            {/* Arrow (이미지로 변경) */}
                            <div className="flex justify-center -mb-4 z-10 relative">
                                <div className="relative w-30 h-30 animate-arrow-down">
                                    <Image
                                        src="/images/people/addOnServices/everworks/bg/bg-EverWorks-05.png"
                                        alt="arrow"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Bottom Box */}
                            <div className="bg-[#e8f8f3] text-[#009e75] text-xm rounded-xl px-5 py-5 text-center font-medium">
                                <div className="font-bold mb-1 text-xl">EverWorks</div>
                                {m.bottom}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
              @keyframes arrowDown {
                0%, 100% {
                  transform: translateY(0);
                  opacity: 1;
                }
                50% {
                  transform: translateY(8px);
                  opacity: 0.75;
                }
              }
            
              .animate-arrow-down {
                animation: arrowDown 1.5s ease-in-out infinite;
              }
            `}</style>
        </section>
    );
}