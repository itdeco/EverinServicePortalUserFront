import Image from "next/image";

const caseData = [
  {
    id: 1,
    title: "Case 1: 일반적인 기업",
    description: "팀 협업, 업무 관리 시스템",
  },
  {
    id: 2,
    title: "Case 2: HR 업무",
    description: "인사 평가, 성과 관리",
  },
  {
    id: 3,
    title: "Case 3: 소규모 팀",
    description: "프로젝트 관리, 진행률 추적",
  },
];

export default function CaseSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gray-600 text-lg mb-2">임직기 다단계 관리과정 고도화 베이 있습니다.</p>
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
