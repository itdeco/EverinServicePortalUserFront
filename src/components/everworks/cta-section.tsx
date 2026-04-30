
import SmartLink from "@/components/common/SmartLink"

export default function CtaSection() {
  return (
    <section className="relative w-full bg-gradient-to-r from-[#a8e6da] via-[#b8d4e6] to-[#d4b8ff] py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
              팀의 생산성을 높일 준비 되셨나요?
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              "에버웍스는 귀사의 팀 협업과 업무 효율을 혁신할 준비가 되어있습니다."
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <SmartLink
              href="/subscribe"
              className="px-8 py-4 bg-[#00dcaa] text-white rounded-full font-semibold hover:opacity-90 transition-opacity text-lg"
            >
              지금 시작하기
            </SmartLink>
            <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold border-2 border-white hover:bg-transparent hover:text-white transition-all text-lg">
              문의하기
            </button>
          </div>

          <p className="text-gray-600 text-sm">
            30일 무료 체험 기간으로 모든 프리미엄 기능을 경험해보세요
          </p>
        </div>
      </div>
    </section>
  );
}
