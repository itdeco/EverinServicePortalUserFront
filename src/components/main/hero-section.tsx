"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// 중앙의 "클라우드 HR 에버인"을 중심으로 방사형으로 배치된 모듈들
const radialModules = [
  { label: "그룹웨어", angle: -90, color: "#3d5a80" },
  { label: "온보딩", angle: -45, color: "#3d5a80" },
  { label: "급여", angle: 0, color: "#3d5a80" },
  { label: "평가", angle: 45, color: "#3d5a80" },
  { label: "근태", angle: 90, color: "#3d5a80" },
  { label: "기업문화", angle: 135, color: "#3d5a80" },
  { label: "PC OFF", angle: 180, color: "#3d5a80" },
  { label: "온보딩", angle: 225, color: "#3d5a80" },
]

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden min-h-screen lg:min-h-[650px] flex items-center"
      style={{
        backgroundImage: `url('/images/main/backgrounds/bg-hero-00.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 오버레이 그래디언트 - 더 짙게 */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/70 to-[#f0f9f7]/60" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-20">
          {/* 왼쪽: 텍스트 및 CTA */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
              HR 솔루션이 혹시 <span className="text-red-600">5개 이상</span>?
              <br />
              <span className="text-red-600">이제 하나로 통합해보세요.</span>
            </h2>

            <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
              운보딩, 근태, 급여, 평가, 기업문화까지 모든 비즈니스는 그맞<br />
              에버인 하나로 모든 HR 업무가 완벽하게 연결됩니다.
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="px-8 h-12 text-base font-semibold rounded-full text-white border-0 bg-gradient-to-r from-[#00cc99] to-[#00a885] hover:from-[#00b386] hover:to-[#008f6f]"
              >
                <Link href="/trial">에버인 맛보기</Link>
              </Button>

              <Button
                asChild
                size="lg"
                className="px-8 h-12 text-base font-semibold rounded-full text-black bg-white border-2 border-[#00cc99] hover:bg-[#f0fffe]"
              >
                <Link href="/support/inquiry">도입 문의</Link>
              </Button>
            </div>
          </div>

          {/* 오른쪽: 방사형 다이어그램 */}
          <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 500 500"
              className="absolute inset-0"
              style={{ maxWidth: "480px", maxHeight: "480px" }}
            >
              {/* 연결선들 - 중앙에서 각 모듈로 */}
              {radialModules.map((module, idx) => {
                const angle = (module.angle * Math.PI) / 180
                const radius = 140
                const x2 = 250 + radius * Math.cos(angle)
                const y2 = 250 + radius * Math.sin(angle)

                return (
                  <g key={`line-${idx}`}>
                    {/* 선 */}
                    <line
                      x1="250"
                      y1="250"
                      x2={x2}
                      y2={y2}
                      stroke="#00cc99"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      opacity="0.6"
                    />
                    {/* 화살표 */}
                    <circle cx={x2} cy={y2} r="4" fill="#00cc99" opacity="0.8" />
                  </g>
                )
              })}

              {/* 중앙 원 */}
              <circle cx="250" cy="250" r="50" fill="white" stroke="#00cc99" strokeWidth="3" />
              <text
                x="250"
                y="245"
                textAnchor="middle"
                fill="#3d5a80"
                fontSize="14"
                fontWeight="bold"
              >
                클라우드 HR
              </text>
              <text
                x="250"
                y="265"
                textAnchor="middle"
                fill="#00cc99"
                fontSize="18"
                fontWeight="900"
              >
                에버인
              </text>
            </svg>

            {/* 각 모듈 박스 */}
            <div className="absolute inset-0 flex items-center justify-center">
              {radialModules.map((module, idx) => {
                const angle = (module.angle * Math.PI) / 180
                const radius = 140
                const x = 250 + radius * Math.cos(angle)
                const y = 250 + radius * Math.sin(angle)
                const offsetX = x - 250
                const offsetY = y - 250

                return (
                  <div
                    key={idx}
                    className="absolute"
                    style={{
                      width: "480px",
                      height: "480px",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      className="absolute w-28 h-12 flex items-center justify-center rounded-lg text-white font-semibold text-sm shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                      style={{
                        backgroundColor: module.color,
                        left: `calc(50% + ${offsetX}px - 56px)`,
                        top: `calc(50% + ${offsetY}px - 24px)`,
                        pointerEvents: "auto",
                      }}
                    >
                      {module.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
