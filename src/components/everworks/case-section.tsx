import Image from "next/image";

const caseData = [
  {
    id: 1,
    title: "Case 1: 데이터의 섬",
    description: "그룹웨어 결재 내역을 ERP에 옮기느라 정산일마다 야근하시나요?",
  },
  {
    id: 2,
    title: "Case 2: 계정 관리",
    description: "신규 입사자 한 명에 시스템 5개 계정 생성 퇴사자 보안 관리는 잘 되고 있나요?",
  },
  {
    id: 3,
    title: "Case 3: 핑퐁 게임",
    description: "장애 발생 시 업체끼리 서로 탓하며, 해결이 늦어지는 경험. 지겨우시죠?",
  },
];

export default function CaseSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gray-600 text-lg mb-2">업체가 다르면, 관리자의 고통은 배가 됩니다.</p>
        </div>

        {/* Illustration */}
        <div className="relative w-full h-64 md:h-80 mb-16">
          <Image
            src="/images/contents/everWorks/bg-EverWorks-01.png"
            alt="업무 사례"
            fill
            className="object-contain"
          />
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseData.map((caseItem) => (
            <div key={caseItem.id} className="text-center">
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700">{caseItem.title}</div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{caseItem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
