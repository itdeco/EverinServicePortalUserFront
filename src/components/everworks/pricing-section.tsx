const pricingPlans = [
  {
    title: "팀장 패키지 (Download)",
    duration: "월 / 정기 구독",
    price: "99,000",
    currency: "원",
    features: [
      "최대 10명 팀원 관리",
      "기본 업무 관리",
      "간단한 보고서",
    ],
  },
  {
    title: "엔터프라이즈 (Download)",
    duration: "연 / 정기 구독",
    price: "990,000",
    currency: "원",
    features: [
      "무제한 팀원 관리",
      "고급 업무 관리",
      "상세 분석 보고서",
    ],
    popular: true,
  },
  {
    title: "커스텀 Pro+ (Open)",
    duration: "월 / 정기 구독",
    price: "299,000",
    currency: "원",
    features: [
      "최대 50명 팀원 관리",
      "고급 협업 기능",
      "API 연동",
    ],
  },
  {
    title: "사업용 엔터프라이즈(SaaS)",
    duration: "맞춤 요청",
    price: "문의",
    currency: "",
    features: [
      "완전 커스터마이징",
      "우선 지원",
      "전담 담당자",
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="w-full bg-[#f5f5f5] py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            워크 요금제 옵션
          </h2>
          <p className="text-gray-600">Everworks의 다양한 요금제를 선택하세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 ${
                plan.popular
                  ? "bg-[#00dcaa] text-white md:col-span-2 md:w-1/2 md:mx-auto"
                  : "bg-white border-2 border-[#e8e8e8]"
              }`}
            >
              <div className="mb-6">
                <h3
                  className={`text-lg font-bold mb-1 ${
                    plan.popular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.title}
                </h3>
                <p
                  className={`text-sm ${
                    plan.popular ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {plan.duration}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm">{plan.currency}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 text-sm ${
                      plan.popular ? "text-white" : "text-gray-600"
                    }`}
                  >
                    <span className="text-lg">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-full font-semibold transition-all ${
                  plan.popular
                    ? "bg-white text-[#00dcaa] hover:opacity-90"
                    : "bg-[#00dcaa] text-white hover:opacity-90"
                }`}
              >
                선택하기
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
