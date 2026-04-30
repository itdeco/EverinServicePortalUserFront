import Image from "next/image";

const serviceTabs = [
  { id: "approval", label: "전자결재", active: false },
  { id: "mail", label: "메일", active: false },
  { id: "messenger", label: "메신저", active: false },
  { id: "ai", label: "AI Assistant", active: true },
];

export default function ServiceSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            제공되는 서비스를 확인하세요.
          </h2>
        </div>

        {/* Service Tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {serviceTabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                tab.active
                  ? "bg-[#00cc99] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* AI Assistant Content */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Text Content */}
            <div className="space-y-5">
              <div>
                <p className="text-[#00cc99] text-sm font-semibold mb-2">다시를 걱정마세요</p>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">04. AI Assistant</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#00cc99] font-bold mt-1">•</span>
                  <span><strong>시스템 연동</strong> 엔터프 데이터 양해 적용 앱 마지 선</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00cc99] font-bold mt-1">•</span>
                  <span><strong>마실 않</strong>더</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00cc99] font-bold mt-1">•</span>
                  <span><strong>시스템 시작</strong></span>
                </li>
              </ul>
            </div>

            {/* Right: Screenshot - bg-EverWorks-09.png 이미지 사용 */}
            <div className="relative h-[280px] md:h-[350px]">
              <Image
                src="/images/contents/everWorks/bg-EverWorks-09.png"
                alt="AI Assistant 화면"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
