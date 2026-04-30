import Image from "next/image";

const caseData = [
  {
    id: 1,
    title: "Case 1: 제조업 EI",
    description: "생산관리, 원자재 관리, 작업 현황 관리 등",
  },
  {
    id: 2,
    title: "Case 2: HR 임무",
    description: "인사, 급여, 교육, 성과 관리 등",
  },
  {
    id: 3,
    title: "Case 3: 소매 업",
    description: "재고관리, POS, 고객관리 등",
  },
];

export default function CaseSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gray-600 text-lg mb-2">임직기 다양한, 관리자의 고도화 벅기 봅니다.</p>
        </div>

        {/* Illustration */}
        <div className="relative w-full h-64 md:h-80 mb-16">
          <Image
            src="/images/contents/everWorks/case-illustration.png"
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
