'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

const testimonials = [
  {
    quote:
      '퇴근 후 수동으로 PC를 끄는 업무 때문에 인사팀이 야근을 자주 합니다. 단순 업무 때문에 매일 스트레스가 큽니다.',
    name: '김희진 님',
    info: '34세, IT기업 인사 담당자',
  },
  {
    quote:
      '퇴근시간이 지나도 PC를 켜놓는 직원들이 많아서 근로시간 관리가 항상 애매했어요. 매일 반복되는 퇴근 독려도 부담스럽습니다.',
    name: '이혁 님',
    info: '39세, 제조업 HR팀장',
  },
  {
    quote:
      '연장근무나 연차 등 PC-OFF 예외사항이 많아 자동화가 어렵고 관리가 복잡합니다. 예외처리 때마다 혼선이 생겨 너무 힘들어요.',
    name: '박수민 님',
    info: '31세, 스타트업 운영 매니저',
  },
]

export default function PcOffTestimonialSection() {
  const [current, setCurrent] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const dragDelta = useRef(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  const total = testimonials.length

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const goTo = useCallback((idx: number) => {
    const newIdx = (idx + total) % total
    setCurrent(newIdx)
    
    // 모바일에서 스크롤 이동
    if (isMobile && scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = container.offsetWidth * 0.78
      const gap = container.offsetWidth * 0.04
      const offset = newIdx * (cardWidth + gap) - (container.offsetWidth - cardWidth) / 2
      container.scrollTo({ left: offset, behavior: 'smooth' })
    }
  }, [total, isMobile])

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, 4000)
  }, [total])

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
  }, [])

  useEffect(() => {
    startAutoplay()
    return () => stopAutoplay()
  }, [startAutoplay, stopAutoplay])

  // Touch / mouse drag handlers
  const onDragStart = (clientX: number) => {
    dragStartX.current = clientX
    dragDelta.current = 0
    setIsDragging(true)
    stopAutoplay()
  }

  const onDragMove = (clientX: number) => {
    if (!isDragging) return
    dragDelta.current = clientX - dragStartX.current
  }

  const onDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (dragDelta.current < -50) goTo(current + 1)
    else if (dragDelta.current > 50) goTo(current - 1)
    startAutoplay()
  }

  const translateX = (idx: number) => {
    const diff = idx - current
    if (diff === 0) return '0%'
    if (diff === 1 || diff === -(total - 1)) return '100%'
    if (diff === -1 || diff === total - 1) return '-100%'
    return diff > 0 ? '200%' : '-200%'
  }

  return (
    <section className="w-full bg-white py-16 overflow-hidden">
      <div className="mx-auto w-full max-w-none lg:max-w-[860px] px-0">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div
            ref={trackRef}
            className="relative w-full flex items-stretch select-none"
            style={{ 
              height: 240,
              perspective: '1000px'
            }}
            onMouseDown={(e) => onDragStart(e.clientX)}
            onMouseMove={(e) => onDragMove(e.clientX)}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
            onTouchEnd={onDragEnd}
          >
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="absolute inset-0 transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(${translateX(idx)})`,
                  paddingLeft: `max(20px, calc((100% - 300px) / 2))`,
                  paddingRight: `max(20px, calc((100% - 300px) / 2))`
                }}
              >
                <div
                  className="h-full rounded-2xl border border-gray-100 bg-white shadow-sm px-6 pt-6 pb-6 flex flex-col justify-between cursor-pointer"
                  onClick={() => {
                    if (idx !== current) goTo(idx)
                  }}
                  style={{
                    opacity: idx === current ? 1 : 0.45,
                    scale: idx === current ? '1' : '0.95',
                    transition: 'opacity 0.4s, scale 0.4s, transform 0.5s',
                    minWidth: '300px',
                    maxWidth: '300px'
                  }}
                >
                  {/* Badge */}
                  <div>
                    <div className="inline-block bg-[#e6f7f3] text-[#2daa88] text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg mb-3 sm:mb-4">
                      이런 고민, 당신만의 문제가 아닙니다.
                    </div>
                    {/* Quote */}
                    <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Divider + Author */}
                  <div>
                    <div className="border-t border-gray-100 mb-3 sm:mb-4 mt-3 sm:mt-4" />
                    <p className="text-right text-xs sm:text-sm text-gray-500">
                      {item.name}{' '}
                      <span className="text-gray-400">({item.info})</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout - Scroll Carousel */}
        <div className="md:hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-[4vw] overflow-x-hidden px-[11vw]"
            style={{ height: 240 }}
          >
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                onClick={() => goTo(idx)}
                className="flex-shrink-0 w-[78vw] flex rounded-2xl border border-gray-100 bg-white shadow-sm px-5 pt-5 pb-5 flex-col justify-between cursor-pointer transition-all duration-300"
                style={{
                  opacity: idx === current ? 1 : 0.5,
                  scale: idx === current ? '1' : '0.95',
                }}
              >
                {/* Badge */}
                <div>
                  <div className="inline-block bg-[#e6f7f3] text-[#2daa88] text-xs font-semibold px-3 py-1 rounded-lg mb-3">
                    이런 고민, 당신만의 문제가 아닙니다.
                  </div>
                  {/* Quote */}
                  <p className="text-gray-800 text-sm leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Divider + Author */}
                <div>
                  <div className="border-t border-gray-100 mb-3 mt-3" />
                  <p className="text-right text-xs text-gray-500">
                    {item.name}{' '}
                    <span className="text-gray-400">({item.info})</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { goTo(idx); startAutoplay() }}
              className="rounded-full transition-all duration-300"
              style={{
                width: idx === current ? '20px' : '8px',
                height: '8px',
                background: idx === current ? '#2daa88' : '#d1d5db',
              }}
              aria-label={`슬라이드 ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
