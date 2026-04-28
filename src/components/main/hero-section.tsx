"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// 원형 배치 아이콘 데이터 - 시계 방향으로 12시부터 시작
const circleIcons = [
  { label: "평가", icon: "/images/main/icons/hero/icon-hero-01.svg", angle: -72 },
  { label: "신고", icon: "/images/main/icons/hero/icon-hero-02.svg", angle: -36 },
  { label: "연말정산", icon: "/images/main/icons/hero/icon-hero-04.svg", angle: 0 },
  { label: "급여관리", icon: "/images/main/icons/hero/icon-hero-06.svg", angle: 36 },
  { label: "근태관리", icon: "/images/main/icons/hero/icon-hero-10.svg", angle: 72 },
  { label: "인사관리", icon: "/images/main/icons/hero/icon-hero-02.svg", angle: 108 },
  { label: "PC-OFF", icon: "/images/main/icons/hero/icon-hero-09.svg", angle: 144 },
  { label: "온보딩", icon: "/images/main/icons/hero/icon-hero-03.svg", angle: 180 },
  { label: "복리후생", icon: "/images/main/icons/hero/icon-hero-05.svg", angle: -144 },
  { label: "연동", icon: "/images/main/icons/hero/icon-hero-03.svg", angle: -108 },
]

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden min-h-175"
      style={{
        backgroundImage: `url('/images/main/backgrounds/bg-hero-00.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between pt-24 pb-16 lg:pt-32 lg:pb-24 gap-8 lg:gap-4">

          {/* Left: Text Content */}
          <div className="flex-1 max-w-xl z-10">
            <p className="text-gray-600 text-base md:text-lg mb-4">
              근태나 급여관리 엑셀로 수기 관리하시나요?
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-gray-900 leading-tight mb-6-20">
              HR 솔루션×AI=
              <span className="inline-block relative" style={{ width: "3.5em", height: "1.5em", verticalAlign: "middle" }}>
                <Image src="/images/main/icons/hero/everein-wordmark.png" alt="에버인" fill className="object-contain object-left" />
              </span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              에버인의 AI 기반 통합 HR 솔루션으로 인사.근태.급여를 한 번에 OK<br />
              야근지옥에서 이제 탈출시켜드립니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#586ffa] to-[#00dcaa] hover:from-[#4a5fd9] hover:to-[#00c9a1] text-white px-8 h-14 text-base font-semibold rounded-lg shadow-lg"
              >
                <Link href="/trial">무료체험 시작하기</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gray-300 bg-white text-gray-700 px-8 h-14 text-base font-semibold rounded-lg hover:bg-gray-50"
              >
                <Link href="/support/inquiry">도입 문의하기</Link>
              </Button>
            </div>
          </div>

          {/* Right: 에버人 Circular Diagram */}
          <div className="flex-shrink-0 relative w-[420px] h-[420px] lg:w-[560px] lg:h-[560px]">

            {/* 가장 바깥: bg-hero-03 점선 원 (녹색 점들 포함) */}
            <div className="absolute inset-0 z-10">
              <Image
                src="/images/main/backgrounds/bg-hero-03.png"
                alt=""
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* 안쪽: bg-hero-01 그라데이션 원형 */}
            <div className="absolute inset-[6%] z-20">
              <Image
                src="/images/main/backgrounds/bg-hero-01.png"
                alt=""
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* bg-hero-02: 아이콘 링과 중앙 원 사이 - 흰색 glow 분리 효과 */}
            <div className="absolute inset-[22%] z-25">
              <Image
                src="/images/main/backgrounds/bg-hero-02.png"
                alt=""
                fill
                className="object-contain opacity-60"
                priority
              />
            </div>

            {/* 중앙: 흰색 원 + 에버人 워드마크 이미지 */}
            <div className="absolute inset-[27%] bg-white rounded-full shadow-2xl flex items-center justify-center z-30">
              <div className="relative w-[60%] h-[40%]">
                <Image
                  src="/images/main/icons/hero/everein-wordmark.png"
                  alt="에버인"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* 아이콘들: bg-hero-01 위에 배치 (radius 35%) */}
            {circleIcons.map((item, idx) => {
              const radius = 35 // bg-hero-01 링 위에 배치
              const angleRad = (item.angle * Math.PI) / 180
              const x = 50 + radius * Math.cos(angleRad)
              const y = 50 + radius * Math.sin(angleRad)

              return (
                <div
                  key={idx}
                  className="absolute flex flex-col items-center gap-1 z-40"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* 아이콘 - 흰색 drop-shadow glow 효과 */}
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={28}
                    height={28}
                    className="z-10 w-7 h-7 lg:w-8 lg:h-8"
                    style={{
                      filter: "drop-shadow(0 0 12px rgba(255,255,255,0.8)) drop-shadow(0 0 20px rgba(255,255,255,0.4))"
                    }}
                  />
                  <span className="text-[10px] lg:text-xs text-white font-medium whitespace-nowrap mt-1">{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
