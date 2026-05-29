import { MessageSquare, Share2, Eye, ShieldCheck } from "lucide-react"

const cards = [
  { icon: MessageSquare, text: "Microsoft Teams 기반의\n급여 아웃소싱 업무 전용 채널" },
  { icon: Share2, text: "신속한 파일 공유 및\n실시간 피드백 가능" },
  { icon: Eye, text: "급여 아웃소싱 업무\n진행상황을 한눈에 확인 가능" },
  { icon: ShieldCheck, text: "장소와 시간 제약 없는\n안전한 협업 환경 제공 (PC/Mobile)" },
]

export default function OutsourcingEvertalkSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            급여 아웃소싱, 에버톡 하나면 소통이 쉬워집니다.
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            파일 전송부터 승인까지, 업무를 흐름처럼 만들어 드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-gray-50 border border-gray-100 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl"
              >
                <span
                  className="flex h-16 w-16 items-center justify-center rounded-2xl mb-6"
                  style={{ backgroundColor: "rgba(51,68,230,0.1)" }}
                >
                  <Icon className="h-8 w-8" style={{ color: "#3344e6" }} />
                </span>
                <p className="text-base text-gray-800 font-semibold leading-relaxed whitespace-pre-line">
                  {item.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
