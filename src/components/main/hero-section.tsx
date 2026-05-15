"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

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
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/main/backgrounds/bg-hero-00.jpg"
          alt="배경"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 w-full min-h-[600px] md:min-h-[700px]">
        {/* 슬라이드 컨테이너 */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* 슬라이드 1: HR 솔루션 통합 */}
          <div className="w-full flex-shrink-0 min-h-[600px] md:min-h-[700px]">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-16 md:py-24">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* 왼쪽 텍스트 */}
                <div className="flex-1 text-center lg:text-left">
                  {/* 큰 따옴표 */}
                  <span className="text-[#e53935] text-6xl md:text-7xl font-serif leading-none">{`"`}</span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#e53935] mb-6 leading-tight">
                    HR 솔루션이 혹시 5개 이상?<br />
                    이제 하나로 통합해보세요.
                  </h2>
                  <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                    온보딩, 근태, 급여, 평가, 기업문화, 그룹웨어가 따로 노는 비효율은 그만!<br />
                    <span className="text-[#00cc99] underline">에버인</span> 하나로 모든 HR 업무가 완벽하게 연결됩니다.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
                    <Button asChild className="bg-[#00cc99] hover:bg-[#00b386] text-white px-8 py-3 rounded-full text-base font-medium">
                      <Link href="/people/smartWorkCare/hr">에버인 맛보기</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-2 border-[#00cc99] text-[#00cc99] hover:bg-[#00cc99]/10 px-8 py-3 rounded-full text-base font-medium bg-white">
                      <Link href="/contact">도입 문의</Link>
                    </Button>
                  </div>
                  <div className="inline-block bg-[#2d5a87] text-white px-5 py-3 rounded-lg text-sm leading-relaxed">
                    에버웰커밍, 에버타임<br />
                    스탠다드만 맛보기
                  </div>
                </div>

                {/* 오른쪽 다이어그램 - 흰색 둥근 박스 */}
                <div className="flex-1 flex justify-center">
                  <div className="relative bg-white rounded-[32px] shadow-xl p-6 md:p-8 w-full max-w-[480px]">
                    {/* 상단 - 그룹웨어 */}
                    <div className="flex justify-center mb-3">
                      <div className="bg-[#3d5a80] text-white px-10 py-2.5 rounded-lg text-sm font-medium">
                        그룹웨어
                      </div>
                    </div>

                    {/* 중간 섹션 - 온보딩, 중앙, 급여 */}
                    <div className="flex items-center justify-center gap-2 mb-3">
                      {/* 온보딩 */}
                      <div className="bg-[#3d5a80] text-white px-6 py-2.5 rounded-lg text-sm font-medium">
                        온보딩
                      </div>

                      {/* 화살표 */}
                      <svg className="w-5 h-5 text-[#00cc99] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>

                      {/* 중앙 클라우드 HR 에버인 */}
                      <div className="relative mx-1">
                        <div className="bg-white border-2 border-[#00cc99] px-5 py-4 rounded-xl text-center shadow-sm">
                          <span className="text-xs text-gray-700 block">클라우드 HR</span>
                          <span className="text-base font-bold text-[#00cc99]">에버인</span>
                        </div>
                        {/* 글로우 효과 */}
                        <div className="absolute inset-0 bg-[#00cc99]/10 rounded-xl blur-lg -z-10 scale-110"></div>
                      </div>

                      {/* 화살표 */}
                      <svg className="w-5 h-5 text-[#00cc99] flex-shrink-0 rotate-180" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>

                      {/* 급여 */}
                      <div className="bg-[#3d5a80] text-white px-6 py-2.5 rounded-lg text-sm font-medium">
                        급여
                      </div>
                    </div>

                    {/* 하단 행 - 근태, 평가 */}
                    <div className="flex items-center justify-center gap-12 mb-4">
                      <div className="bg-[#3d5a80] text-white px-6 py-2.5 rounded-lg text-sm font-medium">
                        근태
                      </div>
                      <div className="bg-[#3d5a80] text-white px-6 py-2.5 rounded-lg text-sm font-medium">
                        평가
                      </div>
                    </div>

                    {/* 최하단 - PC OFF, 기업문화 */}
                    <div className="flex items-center justify-center gap-3">
                      <div className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium">
                        PC OFF
                      </div>
                      <div className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium">
                        기업문화
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 슬라이드 2: AI 온보딩 */}
          <div className="w-full flex-shrink-0 min-h-[600px] md:min-h-[700px]">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-16 md:py-24">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* 왼쪽 텍스트 */}
                <div className="lg:w-[30%] text-center lg:text-left">
                  <span className="text-[#e53935] text-6xl md:text-7xl font-serif leading-none">{`"`}</span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#e53935] mb-4 leading-tight">
                    귀사의 신입사원은<br />오늘 안녕하신가요?
                  </h2>
                  <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                    신규 입사자 온보딩. AI빌더를 활용하여 혁신적으로 운영해보세요!<br />
                    에버웰커밍이 대한민국 모든 HRer 를 존경하고 응원합니다!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <Button asChild className="bg-[#00cc99] hover:bg-[#00b386] text-white px-6 py-3 rounded-full">
                      <Link href="/people/smartWorkCare/hr">AI 온보딩 맛보기</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-2 border-[#00cc99] text-[#00cc99] hover:bg-[#00cc99]/10 px-6 py-3 rounded-full bg-white">
                      <Link href="/contact">평생 무료 사용</Link>
                    </Button>
                  </div>
                </div>
                {/* 중앙 비디오 영역 */}
                <div className="lg:w-[40%] flex justify-center">
                  <div className="bg-[#6b9bd1] rounded-xl w-full max-w-[420px] h-[260px] flex flex-col items-center justify-center text-white shadow-xl">
                    <p className="text-center text-lg font-medium mb-2">실제 AI 빌더 활용해서</p>
                    <p className="text-center text-lg font-medium mb-2">영림원 온보딩 콘텐츠 나오는 영상</p>
                    <p className="text-center text-sm mt-4 opacity-80">(예시, 영림원 제공)</p>
                  </div>
                </div>
                {/* 오른쪽 모바일 화면 */}
                <div className="lg:w-[30%] flex justify-center">
                  <div className="relative w-[220px] h-[450px] bg-gray-100 rounded-[40px] border-4 border-gray-800 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-gray-800 rounded-b-xl"></div>
                    <div className="p-4 pt-10 h-full overflow-hidden bg-white">
                      <div className="bg-[#f8f9fa] rounded-xl p-3 mb-3">
                        <p className="text-sm text-gray-800 font-medium">안녕하세요, 김영인님</p>
                        <p className="text-xs text-gray-500 mt-1">무엇을 도와드릴까요?</p>
                      </div>
                      <div className="bg-[#f8f9fa] rounded-xl p-3 mb-3">
                        <p className="text-xs font-bold text-gray-800 mb-2">자주 찾는 기능</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                            <p className="text-xs text-gray-700">외근보고</p>
                          </div>
                          <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                            <p className="text-xs text-gray-700">외근보고현황</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#f8f9fa] rounded-xl p-3">
                        <p className="text-xs font-bold text-gray-800 mb-1">일정</p>
                        <p className="text-xs text-gray-600">AI ERP의 3대 혁신전략</p>
                        <p className="text-xs text-gray-400">10:00 - 12:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 슬라이드 3: 근태관리 1 hr */}
          <div className="w-full flex-shrink-0 min-h-[600px] md:min-h-[700px]">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-16 md:py-24">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* 왼쪽 텍스트 */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="text-[100px] md:text-[150px] lg:text-[180px] font-bold text-[#0088cc] leading-none mb-2">
                    1 hr
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                    시간단위 연차도 완벽 대응
                  </p>
                  <span className="text-[#e53935] text-5xl md:text-6xl font-serif leading-none">{`"`}</span>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#00cc99] mb-6 leading-tight">
                    복잡해지는 근태관리,<br />
                    에버타임이 답을 드립니다
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <Button asChild className="bg-[#00cc99] hover:bg-[#00b386] text-white px-6 py-3 rounded-full">
                      <Link href="/people/smartWorkCare/evertime">에버타임 맛보기</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-2 border-[#00cc99] text-[#00cc99] hover:bg-[#00cc99]/10 px-6 py-3 rounded-full bg-white">
                      <Link href="/contact">에버타임 7개월 무료 사용</Link>
                    </Button>
                  </div>
                </div>
                {/* 오른쪽 정보 박스 */}
                <div className="flex-1 flex justify-center">
                  <div className="bg-[#6b9bd1] rounded-xl w-full max-w-[480px] h-[300px] flex flex-col items-center justify-center text-white p-8 shadow-xl">
                    <p className="text-center text-lg font-medium mb-2">동양여자 1시간 연차 써서 퇴근</p>
                    <p className="text-center text-lg font-medium">리프레쉬 되는 행복한 모습 이미지</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 왼쪽 화살표 */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 z-40 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all shadow-lg hover:scale-105"
          aria-label="이전 슬라이드"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 오른쪽 화살표 */}
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 z-40 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all shadow-lg hover:scale-105"
          aria-label="다음 슬라이드"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  ? "w-10 h-3 bg-[#00cc99]"
                  : "w-3 h-3 bg-gray-400 hover:bg-gray-500"
              }`}
              aria-label={`슬라이드 ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
