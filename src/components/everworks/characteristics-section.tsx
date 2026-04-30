const characteristics = [
  {
    title: "Teams Oneis AI+ 로",
    description: "인공지능 기반의 지능형\n작업 할당 및 관리 시스템",
  },
  {
    title: "Hybrid한 협업",
    description: "온/오프라인 혼합형\n협업 환경 지원",
  },
  {
    title: "3-fold 메디션",
    description: "완벽한 데이터 보안\n및 백업 시스템",
  },
];

export default function CharacteristicsSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {characteristics.map((char, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              {/* Circle Border */}
              <div className="w-48 h-48 rounded-full border-4 border-[#00dcaa] flex items-center justify-center mb-6">
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 mb-3">{char.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
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
