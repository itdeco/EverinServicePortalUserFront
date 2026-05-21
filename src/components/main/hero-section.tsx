"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

// 중앙의 "클라우드 HR 에버인"을 중심으로 균등하게 배치된 7개 모듈 (360 / 7 = 51.43도씩)
const radialModules = [
  { label: "그룹웨어", angle: -90, color: "#03b565" },
  { label: "온보딩", angle: -38.57, color: "#03b565" },
  { label: "급여", angle: 12.86, color: "#03b565" },
  { label: "평가", angle: 64.29, color: "#03b565" },
  { label: "근태", angle: 115.71, color: "#03b565" },
  { label: "기업문화", angle: 167.14, color: "#03b565" },
  { label: "PC OFF", angle: -141.43, color: "#03b565" },
]

const ComingSoonOverlay = ({ children }: { children: React.ReactNode }) => {
  return (
      <div className="relative">
        {children}

        <div className="absolute inset-0 z-30 flex items-center justify-center rounded-[2rem] bg-white/20 backdrop-blur-[3px] border border-white/20">
          <div className="px-8 py-4 rounded-full bg-gray-900/70 text-white text-2xl md:text-3xl font-black tracking-tight shadow-xl">
            변경예정
          </div>
        </div>
      </div>
  )
}

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
          className="relative overflow-hidden min-h-[640px] lg:min-h-[560px]"
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-2 lg:py-4">
              {/* 왼쪽: 텍스트 및 CTA */}
              <div className="flex flex-col justify-center max-w-[560px]">
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
              <div className="relative h-[320px] lg:h-[420px] flex items-center justify-center w-full overflow-hidden animate-[float_6s_ease-in-out_infinite]">
                <img
                  src="/images/main/heroes/main_everin_01.png"
                  alt="클라우드 HR 에버人"
                  className="w-[82%] h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 슬라이드 2: AI 온보딩 */}
        <div className="min-w-full flex items-center">
          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-2 lg:py-4">
              {/* 왼쪽: 텍스트 및 CTA */}
              <div className="flex flex-col justify-center max-w-[560px]">
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
              <ComingSoonOverlay>
              <div className="relative h-[320px] lg:h-[420px] flex items-center justify-center w-full">
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
              </ComingSoonOverlay>
            </div>
          </div>
        </div>
      {/* 슬라이드 3: 에버타임 근태관리 */}
        <div className="min-w-full flex items-center">
          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-2 lg:py-4">
              {/* 왼쪽: 텍스트 및 CTA */}
              <div className="flex flex-col justify-center max-w-[560px]">
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

              {/* 오른쪽: 행복한 퇴근 이미지 */}
              <div className="relative h-[320px] lg:h-[420px] flex items-center justify-center w-full">
                <div className="relative w-[82%] h-full overflow-hidden rounded-[32px] shadow-2xl">
                  <img
                      src="/images/main/heroes/evertime-happy-woman.jpg"
                      alt="1시간 연차로 행복하게 퇴근하는 여성"
                      className="w-full h-full object-cover"
                  />
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
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-white/70 pointer-events-none" />
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
      
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  )
}
