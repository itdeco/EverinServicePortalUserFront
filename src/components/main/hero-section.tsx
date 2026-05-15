"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3

  // 자동 슬라이드 전환 (2초마다)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 2000)
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
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative w-full min-h-[600px] md:min-h-[700px]">
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
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00cc99] mb-4 leading-tight">
                    {`"`}HR 솔루션이 혹시 5개 이상?<br />
                    이제 하나로 통합해보세요.
                  </h2>
                  <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                    온보딩, 근태, 급여, 평가, 기업문화, 그룹웨어가 따로 노는 비효율은 그만!<br />
                    에버인 하나로 모든 HR 업무가 완벽하게 연결됩니다.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
                    <Button asChild className="bg-[#00cc99] hover:bg-[#00b386] text-white px-6 py-3 rounded-full">
                      <Link href="/people/smartWorkCare/hr">에버인 맛보기</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-[#00cc99] text-[#00cc99] hover:bg-[#00cc99]/10 px-6 py-3 rounded-full">
                      <Link href="/contact">도입 문의</Link>
                    </Button>
                  </div>
                  <div className="inline-block bg-[#1a5fb4] text-white px-4 py-2 rounded text-sm">
                    에버웰커밍, 에버타임<br />
                    스탠다드만 맛보기
                  </div>
                </div>
                {/* 오른쪽 다이어그램 */}
                <div className="flex-1 flex justify-center">
                  <div className="relative bg-[#1e3a5f] rounded-2xl p-8 md:p-12 w-full max-w-[500px]">
                    {/* 중앙 클라우드 */}
                    <div className="relative flex flex-col items-center">
                      {/* 상단 */}
                      <div className="bg-[#2d5a87] text-white px-6 py-3 rounded text-center mb-4">
                        그룹웨어
                      </div>
                      {/* 중간 행 */}
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="bg-[#2d5a87] text-white px-4 py-3 rounded">온보딩</div>
                        <div className="bg-[#00cc99] text-white px-6 py-6 rounded-lg text-center font-bold">
                          클라우드 HR<br />에버인
                        </div>
                        <div className="bg-[#2d5a87] text-white px-4 py-3 rounded">급여</div>
                      </div>
                      {/* 하단 행 */}
                      <div className="flex items-center justify-center gap-8 mb-6">
                        <div className="bg-[#2d5a87] text-white px-4 py-3 rounded">근태</div>
                        <div className="bg-[#2d5a87] text-white px-4 py-3 rounded">평가</div>
                      </div>
                      {/* 최하단 */}
                      <div className="flex items-center justify-center gap-4">
                        <div className="bg-white text-gray-800 px-6 py-3 rounded">PC OFF</div>
                        <div className="bg-white text-gray-800 px-6 py-3 rounded">기업문화</div>
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
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00cc99] mb-4 leading-tight">
                    {`"`}귀사의 신입사원은<br />오늘 안녕하신가요?{`"`}
                  </h2>
                  <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                    신규 입사자 온보딩. AI빌더를 활용하여 혁신적으로 운영해보세요!<br />
                    에버웰커밍이 대한민국 모든 HRer 를 존경하고 응원합니다!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <Button asChild className="bg-[#00cc99] hover:bg-[#00b386] text-white px-6 py-3 rounded-full">
                      <Link href="/people/smartWorkCare/hr">AI 온보딩 맛보기</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-[#00cc99] text-[#00cc99] hover:bg-[#00cc99]/10 px-6 py-3 rounded-full">
                      <Link href="/contact">평생 무료 사용</Link>
                    </Button>
                  </div>
                </div>
                {/* 중앙 비디오 영역 */}
                <div className="lg:w-[40%] flex justify-center">
                  <div className="bg-[#6b9bd1] rounded-lg w-full max-w-[400px] h-[250px] flex flex-col items-center justify-center text-white">
                    <p className="text-center text-lg font-medium mb-2">실제 AI 빌더 활용해서</p>
                    <p className="text-center text-lg font-medium mb-2">영림원 온보딩 콘텐츠 나오는 영상</p>
                    <p className="text-center text-sm mt-4">(예시, 영림원 제공)</p>
                  </div>
                </div>
                {/* 오른쪽 모바일 화면 */}
                <div className="lg:w-[30%] flex justify-center">
                  <div className="relative w-[220px] h-[450px] bg-gray-100 rounded-[40px] border-4 border-gray-300 overflow-hidden shadow-xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-gray-300 rounded-b-xl"></div>
                    <div className="p-4 pt-8 h-full overflow-hidden">
                      <div className="bg-white rounded-lg p-3 mb-3 shadow">
                        <p className="text-xs text-gray-800 font-medium">안녕하세요, 김영인님</p>
                        <p className="text-xs text-gray-500 mt-1">무엇을 도와드릴까요?</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 mb-3 shadow">
                        <p className="text-xs font-medium text-gray-800 mb-2">자주 찾는 기능</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-gray-50 rounded p-2 text-center">
                            <p className="text-xs text-gray-700">외근보고</p>
                          </div>
                          <div className="bg-gray-50 rounded p-2 text-center">
                            <p className="text-xs text-gray-700">외근보고현황</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow">
                        <p className="text-xs font-medium text-gray-800 mb-1">일정</p>
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
                  <div className="text-[100px] md:text-[150px] lg:text-[200px] font-bold text-[#0088cc] leading-none mb-4">
                    1 hr
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                    시간단위 연차도 완벽 대응
                  </p>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#00cc99] mb-6 leading-tight">
                    {`"`}복잡해지는 근태관리,<br />
                    에버타임이 답을 드립니다{`"`}
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <Button asChild className="bg-[#00cc99] hover:bg-[#00b386] text-white px-6 py-3 rounded-full">
                      <Link href="/people/smartWorkCare/evertime">에버타임 맛보기</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-[#00cc99] text-[#00cc99] hover:bg-[#00cc99]/10 px-6 py-3 rounded-full">
                      <Link href="/contact">에버타임 7개월 무료 사용</Link>
                    </Button>
                  </div>
                </div>
                {/* 오른쪽 정보 박스 */}
                <div className="flex-1 flex justify-center">
                  <div className="bg-[#6b9bd1] rounded-lg w-full max-w-[450px] h-[280px] flex flex-col items-center justify-center text-white p-8">
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
          className="absolute left-4 top-1/2 z-40 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all shadow-lg"
          aria-label="이전 슬라이드"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 오른쪽 화살표 */}
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 z-40 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all shadow-lg"
          aria-label="다음 슬라이드"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 하단 인디케이터 */}
        <div className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`rounded-full transition-all ${
                idx === currentSlide
                  ? "w-8 h-2 bg-[#00cc99]"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`슬라이드 ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
