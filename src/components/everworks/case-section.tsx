import Image from "next/image";

const caseData = [
  {
    id: 1,
    title: "Case 1. 데이터의 섬",
    description: "그룹웨어 결재 내역을 ERP에\n옮기느라 정산일마다 야근하시나요?",
  },
  {
    id: 2,
    title: "Case 2. 계정 관리의",
    description: "신규 입사자 한 명에 시스템 5개 계정 생성,\n퇴사자 보안 관리는 잘 되고 있나요?",
  },
  {
    id: 3,
    title: "Case 3. 핑퐁 게임",
    description: "장애 발생 시 업체끼리 서로 탓하며\n해결이 늦어지는 경험, 지겨우시죠?",
  },
];

export default function CaseSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            업체가 다르면, 관리자의 고통은 배가 됩니다.
          </h2>
        </div>

        {/* Illustration - bg-EverWorks-01.png 이미지 사용 */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] mb-12">
          <Image
            src="/images/contents/everWorks/bg-EverWorks-01.png"
            alt="업무 사례 일러스트"
            fill
            className="object-contain"
          />
        </div>

        {/* Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseData.map((caseItem) => (
            <div
              key={caseItem.id}
              className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-gray-900 text-lg mb-3">
                {caseItem.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {caseItem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
