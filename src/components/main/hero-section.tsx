"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

// 중앙의 "클라우드 HR 에버인"을 중심으로 균등하게 배치된 7개 모듈 (360 / 7 = 51.43도씩)
const radialModules = [
  { label: "그룹웨어", angle: -90, color: "#3d5a80" },
  { label: "온보딩", angle: -38.57, color: "#3d5a80" },
  { label: "급여", angle: 12.86, color: "#3d5a80" },
  { label: "평가", angle: 64.29, color: "#3d5a80" },
  { label: "근태", angle: 115.71, color: "#3d5a80" },
  { label: "기업문화", angle: 167.14, color: "#3d5a80" },
  { label: "PC OFF", angle: -141.43, color: "#3d5a80" },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3

  // 자동 슬라이드 전환 (5초마다)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => setCurrentSlide(index)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides)

  return (
    <section
      className="relative overflow-hidden min-h-screen lg:min-h-[650px]"
      style={{
        backgroundImage: "url('/images/main/backgrounds/bg-hero-00.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 슬라이드 컨테이너 */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {/* 슬라이드 1: HR 솔루션 통합 */}
        <div className="min-w-full flex items-center">
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
                  {/* 연결선들 */}
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
                        <rect x={x - 50} y={y - 18} width="100" height="36" rx="8" fill={module.color} />
                        <text x={x} y={y + 5} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                          {module.label}
                        </text>
                      </g>
                    )
                  })}

                  {/* 중앙 원 */}
                  <circle cx="250" cy="250" r="50" fill="white" stroke="#00cc99" strokeWidth="3" />
                  <text x="250" y="245" textAnchor="middle" fill="#3d5a80" fontSize="14" fontWeight="bold">
                    클라우드 HR
                  </text>
                  <text x="250" y="265" textAnchor="middle" fill="#00cc99" fontSize="16" fontWeight="bold">
                    에버인
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 슬라이드 2: AI 온보딩 */}
        <div className="min-w-full flex items-center">
          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-20">
              {/* 왼쪽: 텍스트 및 CTA */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                  귀사의 신입사원은
                  <br />
                  오늘 안녕하신가요?
                </h2>

                <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
                  신규 입사자 온보딩. AI빌더를 활용하여 혁신적으로 운영해보세요!
                  <br />
                  에버웰커밍이 대한민국 모든 HRer 를 존경하고 응원합니다!
                </p>

                {/* CTA 버튼 */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/people/everwelcoming"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all px-10 h-14 text-base font-semibold rounded-lg text-white border-0"
                    style={{
                      background: "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)",
                    }}
                  >
                    AI 온보딩 맛보기
                  </a>

                  <a
                    href="/people/everwelcoming"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all px-10 h-14 text-base font-semibold rounded-lg text-gray-700 bg-white border-2 border-[#00cc99] hover:bg-[#f0fdf9]"
                  >
                    평생 무료 사용
                  </a>
                </div>
              </div>

              {/* 오른쪽: AI 온보딩 일러스트 */}
              <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center w-full">
                <div className="relative w-full max-w-[480px] h-full flex items-center justify-center">
                  {/* AI 온보딩 시각적 요소 */}
                  <div className="relative">
                    {/* 메인 카드 */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-[380px]">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4b6bf5] to-[#00cc99] flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">신규 입사자</p>
                          <p className="text-xl font-bold text-gray-900">환영합니다!</p>
                        </div>
                      </div>
                      
                      {/* 진행 상태 */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#00cc99] flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700">입사 서류 제출 완료</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#00cc99] flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700">팀 소개 영상 시청</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#4b6bf5] flex items-center justify-center animate-pulse">
                            <span className="text-white text-sm font-bold">3</span>
                          </div>
                          <span className="text-gray-700 font-medium">멘토 매칭 진행 중...</span>
                        </div>
                      </div>
                    </div>

                    {/* AI 뱃지 */}
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#4b6bf5] to-[#00cc99] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      AI 자동화
                    </div>

                    {/* 플로팅 요소들 */}
                    <div className="absolute -left-8 top-1/4 bg-white rounded-xl shadow-lg p-3 animate-bounce" style={{ animationDuration: "3s" }}>
                      <span className="text-2xl">👋</span>
                    </div>
                    <div className="absolute -right-6 bottom-1/4 bg-white rounded-xl shadow-lg p-3 animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}>
                      <span className="text-2xl">🎉</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* 슬라이드 3: 에버타임 근태관리 */}
        <div className="min-w-full flex items-center">
          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-20">
              {/* 왼쪽: 텍스트 및 CTA */}
              <div className="flex flex-col justify-center">
                <p
                  className="font-black leading-none mb-2"
                  style={{
                    fontSize: "clamp(72px, 10vw, 120px)",
                    background: "linear-gradient(135deg, #4b6bf5 0%, #00cc99 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  1 hr
                </p>
                <p className="text-xl md:text-2xl font-bold text-gray-700 mb-4">
                  시간단위 연차도 완벽 대응
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-8 leading-tight">
                  &ldquo;복잡해지는 근태관리,<br />에버타임이 답을 드립니다&rdquo;
                </h2>

                {/* CTA 버튼 */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/people/evertime"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all px-10 h-14 text-base font-semibold rounded-lg text-white border-0"
                    style={{
                      background: "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)",
                    }}
                  >
                    에버타임 맛보기
                  </a>

                  <a
                    href="/people/evertime"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all px-10 h-14 text-base font-semibold rounded-lg text-gray-700 bg-white border-2 border-[#00cc99] hover:bg-[#f0fdf9]"
                  >
                    에버타임 7개월 무료 사용
                  </a>
                </div>
              </div>

              {/* 오른쪽: 근태관리 일러스트 */}
              <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center w-full">
                <div className="relative w-full max-w-[480px] h-full flex items-center justify-center">
                  {/* 메인 카드 */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-[380px]">
                    {/* 헤더 */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">이번 달 연차 현황</p>
                        <p className="text-2xl font-black text-gray-900">15일 중 <span className="text-[#00cc99]">8일</span> 사용</p>
                      </div>
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                        style={{ background: "linear-gradient(135deg, #4b6bf5 0%, #00cc99 100%)" }}
                      >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>

                    {/* 진행 바 */}
                    <div className="w-full bg-gray-100 rounded-full h-3 mb-6">
                      <div
                        className="h-3 rounded-full"
                        style={{
                          width: "53%",
                          background: "linear-gradient(135deg, #4b6bf5 0%, #00cc99 100%)",
                        }}
                      />
                    </div>

                    {/* 연차 유형 목록 */}
                    <div className="space-y-3">
                      {[
                        { type: "연차", days: "15일", used: "8일", color: "#4b6bf5" },
                        { type: "시간 연차", days: "무제한", used: "3시간", color: "#00cc99" },
                        { type: "반차", days: "무제한", used: "2회", color: "#3d5a80" },
                      ].map((item) => (
                        <div key={item.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-gray-700 font-medium">{item.type}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-400">{item.days} /</span>
                            <span className="text-sm font-bold ml-1" style={{ color: item.color }}>{item.used} 사용</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 플로팅 요소: 1시간 연차 승인 알림 */}
                  <div
                    className="absolute -right-4 -top-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 animate-bounce"
                    style={{ animationDuration: "3s" }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#00cc99] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">연차 신청</p>
                      <p className="text-sm font-bold text-gray-900">1시간 승인됨</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 네비게이션 화살표 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-3 rounded-full transition-all ${
              currentSlide === idx ? "w-8 bg-[#00cc99]" : "w-3 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
