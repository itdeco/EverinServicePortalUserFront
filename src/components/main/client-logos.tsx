"use client"

import * as React from "react"

// 고객사 로고 목록 (실제 구현시 SVG나 이미지로 교체)
const clients = [
  "삼성전자", "LG전자", "현대자동차", "SK텔레콤", "네이버",
  "카카오", "쿠팡", "배달의민족", "토스", "당근마켓",
  "야놀자", "직방", "무신사", "마켓컬리", "오늘의집"
]

export function ClientLogos() {
  return (
      <section className="py-8 bg-muted/30 border-y border-border/50 overflow-hidden">
        <div className="relative">
          {/* 좌우 그라데이션 페이드 */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

          {/* 무한 스크롤 애니메이션 */}
          <div className="flex animate-scroll">
            {[...clients, ...clients].map((client, index) => (
                <div
                    key={`${client}-${index}`}
                    className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <div className="h-10 px-6 flex items-center justify-center bg-background/50 rounded-lg border border-border/30">
                <span className="text-muted-foreground font-medium text-sm whitespace-nowrap">
                  {client}
                </span>
                  </div>
                </div>
            ))}
          </div>
        </div>

        <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      </section>
  )
}
