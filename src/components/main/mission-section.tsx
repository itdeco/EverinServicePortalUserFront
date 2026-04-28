"use client"

import Image from "next/image"

const cards = [
  {
    bgGradient: "bg-gradient-to-br from-[#00dcaa]/20 via-[#00dcaa]/10 to-[#00dcaa]/5",
    icon: "/images/main/icons/cards/icon-card-01.png",
    title: "보안과 품질 절대",
    titleBold: "타협하지 않습니다!",
    sub1: "ISO 27001 인증 획득",
    sub2: "KS-QEI 1위 (3년 연속)",
    accentColor: "text-[#00dcaa]",
  },
  {
    bgGradient: "bg-gradient-to-br from-[#2bd67c]/20 via-[#2bd67c]/10 to-[#2bd67c]/5",
    icon: "/images/main/icons/cards/icon-card-02.png",
    title: "영림원이 만들면",
    titleBold: "다릅니다!",
    sub1: "3000+ 구축사례",
    sub2: "(코스닥 상장사 규모 이상)",
    accentColor: "text-[#2bd67c]",
  },
  {
    bgGradient: "bg-gradient-to-br from-[#586ffa]/20 via-[#586ffa]/10 to-[#586ffa]/5",
    icon: "/images/main/icons/cards/icon-card-03.png",
    title: "에버인으로 아웃소싱하고",
    titleBold: "HR 본질에 집중하세요!",
    sub1: "무결점 클라우드형",
    sub2: "HR 솔루션",
    accentColor: "text-[#586ffa]",
  },
]

export function MissionSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Quote */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a2e] mb-5">
            &ldquo;고객기업이 인적 자원 관리를 더 잘하게&rdquo;
          </h2>
          <p className="text-gray-500 text-base md:text-lg">33년 영림원의 미션</p>
          <p className="text-gray-500 text-base md:text-lg">이제 그 본질을 HR 로 부터 시작하겠습니다.</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <div 
              key={i} 
              className={`${card.bgGradient} rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col p-6 min-h-[340px]`}
            >
              {/* Icon area - centered and large */}
              <div className="flex-1 flex items-center justify-center py-6">
                <div className="relative w-32 h-32 drop-shadow-lg">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Card text - bottom aligned */}
              <div className="text-center mt-auto">
                <p className="text-[#1a1a2e] font-bold text-lg leading-snug">
                  {card.title}<br />
                  <span className="text-[#1a1a2e]">{card.titleBold}</span>
                </p>
                <div className="mt-3">
                  <p className="text-gray-600 text-sm">{card.sub1}</p>
                  <p className="text-gray-500 text-sm">{card.sub2}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
