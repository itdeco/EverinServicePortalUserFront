"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [])

  return (
    <section className="relative w-full overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/main/backgrounds/bg-hero-00.jpg"
          alt="hero background"
          fill
          className="object-cover"
          priority
        />
        {/* 오버레이 그래디언트 - 텍스트 가독성을 위한 어두운 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* 슬라이드 컨테이너 */}
      <div className="relative z-10 w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
        <div
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* 슬라이드 1: HR 솔루션 통합 */}
          <div className="w-full flex-shrink-0 min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center">
            <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12 py-16 md:py-24">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* 왼쪽 텍스트 */}
                <div className="flex-1 text-center lg:text-left text-white">
                  <div className="inline-block bg-[#00cc99]/20 border border-[#00cc99]/50 rounded-full px-4 py-2 mb-6">
                    <p className="text-sm font-semibold text-[#00cc99]">HR 통합 솔루션</p>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    HR 솔루션이 혹시<br />
                    <span className="text-[#00cc99]">5개 이상?</span>
                  </h2>
                  <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed max-w-lg">
                    온보딩, 근태, 급여, 평가, 기업문화, 그룹웨어가 따로 노는 비효율은 그만! 에버인 하나로 모든 HR 업무가 완벽하게 연결됩니다.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                    <Button asChild className="bg-[#00cc99] hover:bg-[#00b386] text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                      <Link href="/people/smartWorkCare/hr">에버인 맛보기</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold">
                      <Link href="/contact">도입 문의</Link>
                    </Button>
                  </div>
                  <div className="inline-block bg-[#1a5fb4]/80 backdrop-blur-sm text-white px-5 py-3 rounded-lg text-sm font-medium">
                    <p className="font-semibold">에버웰커밍, 에버타임</p>
                    <p className="text-xs text-gray-200">스탠다드만 맛보기</p>
                  </div>
                </div>

                {/* 오른쪽 다이어그램 */}
                <div className="flex-1 flex justify-center hidden lg:flex">
                  <div className="relative bg-gradient-to-br from-[#1e3a5f] to-[#0f2334] rounded-2xl p-10 w-full max-w-[500px] shadow-2xl border border-[#00cc99]/20">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00cc99]/10 to-transparent opacity-50"></div>
                    <div className="relative flex flex-col items-center space-y-4">
                      <div className="bg-[#2d5a87] text-white px-6 py-3 rounded-lg text-center font-semibold">
                        그룹웨어
                      </div>
                      <div className="flex items-center justify-center gap-6">
                        <div className="bg-[#2d5a87] text-white px-5 py-3 rounded-lg font-medium">온보딩</div>
                        <div className="bg-gradient-to-br from-[#00cc99] to-[#00a876] text-white px-8 py-8 rounded-xl text-center font-bold shadow-lg">
                          <div>클라우드</div>
                          <div className="text-lg">HR</div>
                          <div>에버인</div>
                        </div>
                        <div className="bg-[#2d5a87] text-white px-5 py-3 rounded-lg font-medium">급여</div>
                      </div>
                      <div className="flex items-center justify-center gap-6">
                        <div className="bg-[#2d5a87] text-white px-5 py-3 rounded-lg font-medium">근태</div>
                        <div className="bg-[#2d5a87] text-white px-5 py-3 rounded-lg font-medium">평가</div>
                      </div>
                      <div className="flex items-center justify-center gap-6">
                        <div className="bg-white text-[#1e3a5f] px-6 py-3 rounded-lg font-semibold">PC OFF</div>
                        <div className="bg-white text-[#1e3a5f] px-6 py-3 rounded-lg font-semibold">기업문화</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 슬라이드 2: AI 온보딩 */}
          <div className="w-full flex-shrink-0 min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center">
            <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12 py-16 md:py-24">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* 왼쪽 텍스트 */}
                <div className="lg:w-1/3 text-center lg:text-left text-white">
                  <div className="inline-block bg-[#00cc99]/20 border border-[#00cc99]/50 rounded-full px-4 py-2 mb-6">
                    <p className="text-sm font-semibold text-[#00cc99]">AI 온보딩</p>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    귀사의 신입사원은<br />
                    <span className="text-[#00cc99]">오늘 안녕하신가요?</span>
                  </h2>
                  <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed">
                    신규 입사자 온보딩을 AI빌더로 혁신적으로 운영해보세요. 에버웰커밍이 대한민국 모든 HRer를 응원합니다!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button asChild className="bg-[#00cc99] hover:bg-[#00b386] text-white px-8 py-3 rounded-lg font-semibold shadow-lg">
                      <Link href="/people/smartWorkCare/hr">AI 온보딩 맛보기</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold">
                      <Link href="/contact">평생 무료 사용</Link>
                    </Button>
                  </div>
                </div>

                {/* 중앙 영역 */}
                <div className="lg:w-1/3 flex justify-center">
                  <div className="bg-gradient-to-br from-[#6b9bd1]/80 to-[#4a7aad]/80 backdrop-blur-sm rounded-2xl w-full max-w-[380px] h-[300px] flex flex-col items-center justify-center text-white p-8 shadow-xl border border-white/20">
                    <div className="text-center">
                      <p className="text-lg font-semibold mb-3">실제 AI 빌더 활용해서</p>
                      <p className="text-lg font-semibold mb-4">영림원 온보딩 콘텐츠가</p>
                      <p className="text-lg font-semibold">나오는 영상</p>
                      <p className="text-sm text-gray-100 mt-6">(예시, 영림원 제공)</p>
                    </div>
                  </div>
                </div>

                {/* 오른쪽 모바일 */}
                <div className="lg:w-1/3 flex justify-center hidden lg:flex">
                  <div className="relative w-[240px] h-[480px] bg-gradient-to-br from-gray-200 to-gray-100 rounded-[44px] border-8 border-gray-300 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-7 bg-gray-300 rounded-b-3xl z-10"></div>
                    <div className="p-4 pt-10 h-full overflow-hidden bg-white">
                      <div className="bg-gradient-to-r from-[#e8faf5] to-[#d0f0e8] rounded-xl p-4 mb-3 shadow-sm">
                        <p className="text-sm font-semibold text-gray-800">안녕하세요, 김영인님</p>
                        <p className="text-xs text-gray-600 mt-1">무엇을 도와드릴까요?</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 mb-3 shadow-sm">
                        <p className="text-xs font-semibold text-gray-800 mb-3">자주 찾는 기능</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-[#00cc99]/10 rounded-lg p-2 text-center border border-[#00cc99]/30">
                            <p className="text-xs font-medium text-gray-700">외근보고</p>
                          </div>
                          <div className="bg-[#00cc99]/10 rounded-lg p-2 text-center border border-[#00cc99]/30">
                            <p className="text-xs font-medium text-gray-700">현황</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                        <p className="text-xs font-semibold text-gray-800 mb-2">오늘의 일정</p>
                        <p className="text-xs text-gray-700">AI ERP 전략</p>
                        <p className="text-xs text-gray-500 mt-1">10:00 - 12:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 슬라이드 3: 근태관리 */}
          <div className="w-full flex-shrink-0 min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center">
            <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12 py-16 md:py-24">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* 왼쪽 텍스트 */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-block bg-[#00cc99]/20 border border-[#00cc99]/50 rounded-full px-4 py-2 mb-6">
                    <p className="text-sm font-semibold text-[#00cc99]">근태관리</p>
                  </div>
                  <div className="text-7xl md:text-8xl lg:text-9xl font-black text-white drop-shadow-lg mb-4 leading-none">
                    1 hr
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-[#00cc99] mb-6">
                    시간단위 연차도 완벽 대응
                  </p>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight">
                    복잡해지는 근태관리,<br />
                    <span className="text-[#00cc99]">에버타임이 답을 드립니다</span>
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button asChild className="bg-[#00cc99] hover:bg-[#00b386] text-white px-8 py-3 rounded-lg font-semibold shadow-lg">
                      <Link href="/people/smartWorkCare/evertime">에버타임 맛보기</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold">
                      <Link href="/contact">7개월 무료 사용</Link>
                    </Button>
                  </div>
                </div>

                {/* 오른쪽 정보 박스 */}
                <div className="flex-1 flex justify-center hidden lg:flex">
                  <div className="bg-gradient-to-br from-[#6b9bd1]/80 to-[#4a7aad]/80 backdrop-blur-sm rounded-2xl w-full max-w-[450px] h-[320px] flex flex-col items-center justify-center text-white p-10 shadow-2xl border border-white/20">
                    <div className="text-center">
                      <p className="text-lg font-semibold mb-3">동양여자 1시간 연차 써서</p>
                      <p className="text-lg font-semibold mb-8">상쾌하게 퇴근하는</p>
                      <p className="text-lg font-semibold">행복한 모습 이미지</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 좌측 화살표 */}
        <button
          onClick={goToPrev}
          className="absolute left-6 top-1/2 z-40 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
          aria-label="이전 슬라이드"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 우측 화살표 */}
        <button
          onClick={goToNext}
          className="absolute right-6 top-1/2 z-40 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
          aria-label="다음 슬라이드"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 하단 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2 flex gap-3">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`rounded-full transition-all ${
                idx === currentSlide
                  ? "w-10 h-2.5 bg-[#00cc99] shadow-lg"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`슬라이드 ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
