"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// 중앙의 "클라우드 HR 에버인"을 중심으로 균등하게 배치된 7개 모듈 (360 / 7 = 51.43도씩)
const radialModules = [
  { label: "그룹웨어", angle: -90, color: "#3d5a80" },      // 상단
  { label: "온보딩", angle: -38.57, color: "#3d5a80" },     // 우상단
  { label: "급여", angle: 12.86, color: "#3d5a80" },        // 우측
  { label: "평가", angle: 64.29, color: "#3d5a80" },        // 우하단
  { label: "근태", angle: 115.71, color: "#3d5a80" },       // 하단
  { label: "기업문화", angle: 167.14, color: "#3d5a80" },   // 좌하단
  { label: "PC OFF", angle: -141.43, color: "#3d5a80" },    // 좌상단 (= 218.57도)
]

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden min-h-screen lg:min-h-[650px] flex items-center"
      style={{
        backgroundImage: "url('/images/main/backgrounds/bg-hero-00.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-20">
          {/* 왼쪽: 텍스트 및 CTA */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
              HR 솔루션이 혹시 5개 이상?
              <br />
              이제 하나로 통합해보세요.
            </h2>

            <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
              온보딩, 근태, 급여, 평가, 기업문화, 그룹웨어가 따로 노는 비효율은 그만!
              <br />
              에버인 하나로 모든 HR 업무가 완벽하게 연결됩니다.
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/trial"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all px-10 h-14 text-base font-semibold rounded-lg text-white border-0"
                style={{
                  background: "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)",
                }}
              >
                에버인 맛보기
              </a>

              <a
                href="/support/inquiry"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all px-10 h-14 text-base font-semibold rounded-lg text-gray-700 bg-white border-2 border-[#00cc99] hover:bg-[#f0fdf9]"
              >
                도입 문의
              </a>
            </div>
          </div>

          {/* 오른쪽: 방사형 다이어그램 */}
          <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center w-full">
            <svg
              width="500"
              height="500"
              viewBox="0 0 500 500"
              className="absolute"
              style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
            >
              {/* 연결선들 - 중앙에서 각 모듈로 */}
              {radialModules.map((module, idx) => {
                const angle = (module.angle * Math.PI) / 180
                const radius = 140
                const x2 = 250 + radius * Math.cos(angle)
                const y2 = 250 + radius * Math.sin(angle)

                return (
                  <g key={`line-${idx}`}>
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
                    <circle cx={x2} cy={y2} r="4" fill="#00cc99" opacity="0.8" />
                  </g>
                )
              })}

              {/* 모듈 박스들 */}
              {radialModules.map((module, idx) => {
                const angle = (module.angle * Math.PI) / 180
                const radius = 140
                const x = 250 + radius * Math.cos(angle)
                const y = 250 + radius * Math.sin(angle)

                return (
                  <g key={`module-${idx}`}>
                    <rect
                      x={x - 50}
                      y={y - 18}
                      width="100"
                      height="36"
                      rx="8"
                      fill={module.color}
                    />
                    <text
                      x={x}
                      y={y + 5}
                      textAnchor="middle"
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      {module.label}
                    </text>
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
                fontSize="16"
                fontWeight="bold"
              >
                에버인
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
