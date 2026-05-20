'use client'

import { useState, useEffect, useCallback } from 'react'

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

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-[680px] px-6">
        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm px-8 pt-8 pb-10 min-h-[220px]">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="transition-all duration-500"
              style={{
                opacity: idx === current ? 1 : 0,
                position: idx === current ? 'relative' : 'absolute',
                inset: idx === current ? 'auto' : 0,
                pointerEvents: idx === current ? 'auto' : 'none',
              }}
            >
              {/* Badge */}
              <div className="inline-block bg-[#e6f7f3] text-[#2daa88] text-sm font-semibold px-4 py-1.5 rounded-lg mb-5">
                이런 고민, 당신만의 문제가 아닙니다.
              </div>

              {/* Quote */}
              <p className="text-gray-800 text-base leading-relaxed mb-8">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Divider */}
              <div className="border-t border-gray-100 mb-5" />

              {/* Author */}
              <p className="text-right text-sm text-gray-500">
                {item.name}{' '}
                <span className="text-gray-400">({item.info})</span>
              </p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: idx === current ? '#2daa88' : '#d1d5db',
                transform: idx === current ? 'scale(1.3)' : 'scale(1)',
              }}
              aria-label={`슬라이드 ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
