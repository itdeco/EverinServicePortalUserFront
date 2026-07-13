"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const SLIDE_DURATION = 8000
const TOTAL_SLIDES = 3

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % TOTAL_SLIDES)
    }, SLIDE_DURATION)

    return () => clearTimeout(timer)
  }, [currentSlide])

  const goToSlide = (index: number) => setCurrentSlide(index)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES)
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % TOTAL_SLIDES)

  return (
      <section className="relative h-[760px] overflow-hidden bg-slate-950 md:h-[700px] lg:h-[660px]">
        <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <div className="welcoming-crisis-slide relative flex min-w-full items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/88 to-slate-950/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 to-transparent" />

            <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col px-7 pb-24 pt-[72px] md:px-12 md:pt-[78px] lg:px-20 lg:pt-[96px]">
              <div className="max-w-[920px]">
                <div className="mb-4 inline-flex items-center rounded-full border border-red-300/35 bg-red-500/10 px-4 py-2 text-xs font-black tracking-[0.22em] text-red-200 md:text-sm">
                  <span className="mr-3 h-2.5 w-2.5 rounded-full bg-red-400" />
                  조용한 위기 · The Silent Crisis
                </div>

                <h2 className="text-[38px] font-black leading-[1.08] tracking-normal text-white sm:text-5xl md:text-[58px] lg:text-[58px] xl:text-[70px]">
                  신입 한 명이 떠날 때마다,
                  <br />
                  <span className="text-[#ff6767]">회사</span>가{" "}
                  <span className="text-[#ffc928]">조용히</span>
                  <br />
                  무너지고 있습니다.
                </h2>

                <p className="mt-6 max-w-[780px] text-base font-semibold leading-relaxed text-white/82 md:text-xl">
                  신입사원 61%가 3년 안에 이탈합니다.
                  <br />
                  한 명당 <span className="text-[#ffd45a]">4,000만원의 손실</span>,{" "}
                  <span className="text-[#ff8b8b]">패배감의 전염</span>
                </p>
              </div>

              <div className="mt-7 grid max-w-[920px] gap-4 lg:absolute lg:bottom-[58px] lg:right-20 lg:mt-0 lg:w-[680px] lg:max-w-[680px]">
                <p className="text-left text-base font-bold leading-relaxed text-white/86 md:text-xl lg:text-right">
                  체계적 온보딩은 유지율을 <span className="text-white">82%</span>까지 높이고,
                  <br />
                  <span className="text-[#00cc99]">관리자의 헌신도</span>까지 바꿉니다.
                  <br />
                  에버웰커밍이 그 첫 3일을 설계합니다.
                </p>

                <div className="flex flex-col gap-4 rounded-[24px] border border-[#f4c66a]/35 bg-[#c79a43]/95 px-5 py-4 shadow-[0_24px_80px_rgba(0,0,0,0.42)] md:flex-row md:items-center md:justify-between md:px-8 md:py-5">
                  <div className="min-w-0">
                    <p className="mb-2 text-[11px] font-black text-slate-900/65">
                      FREE · 진입장벽 0%
                    </p>
                    <p className="whitespace-nowrap text-[22px] font-black leading-tight text-slate-950 md:text-[30px]">
                      평생 무료로 시작하세요.
                    </p>
                    <p className="mt-2 text-[10px] font-black leading-snug text-slate-900/75 md:text-[11px]">
                      에버웰커밍 스탠다드는 평생 무료이며, 연동되는 외부 AI 모델 과금 정책에 따라 일정 사용초과분 LLM 사용료가 발생할 수 있습니다.
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
                    <Link
                        href="/people/smartWorkCare/welcoming"
                        className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-slate-950 px-6 text-base font-black text-white shadow-[0_12px_28px_rgba(15,23,42,0.24)] transition-transform hover:-translate-y-0.5 md:h-14 md:px-7 md:text-lg"
                    >
                      에버웰커밍 스탠다드 맛보기
                      <span className="text-[#00cc99]">→</span>
                    </Link>
                    <Link
                        href="/inquiry"
                        className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border-2 border-[#00cc99] bg-white px-6 text-base font-black text-slate-950 shadow-[0_12px_28px_rgba(255,255,255,0.16)] transition-transform hover:-translate-y-0.5 hover:bg-[#ecfff9] md:h-14 md:px-7 md:text-lg"
                    >
                      무료로 도입하기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="integration-slide relative flex min-w-full items-center overflow-hidden bg-cover bg-center">
            <div className="absolute inset-0 bg-slate-950/10" />
            <div className="relative z-10 mx-auto flex w-full max-w-[1280px] justify-center px-6 lg:px-12">
              <div className="flex max-w-[760px] flex-col items-center text-center">
                <h2 className="text-[32px] font-black leading-[1.18] text-white drop-shadow-[0_6px_22px_rgba(0,0,0,0.28)] sm:text-[36px] md:text-5xl lg:text-[58px]">
                  <span className="block md:inline">HR 솔루션이 혹시</span>{" "}
                  <span className="block md:inline">5개 이상?</span>
                  <br className="hidden md:block" />
                  <span className="mt-2 block md:mt-0 md:inline">이제 하나로</span>{" "}
                  <span className="block md:inline">통합해 보세요.</span>
                </h2>

                <p className="mx-auto mt-7 max-w-[340px] text-base font-semibold leading-relaxed text-white/92 drop-shadow-[0_4px_16px_rgba(0,0,0,0.22)] md:max-w-none md:text-xl">
                  온보딩, 근태, 급여, 평가,
                  <br className="md:hidden" />
                  기업문화, 그룹웨어가 따로 노는
                  <br className="md:hidden" />
                  비효율은 그만!
                  <br className="hidden md:block" />
                  에버인 하나로 모든 HR 업무가 완벽하게 연결됩니다.
                </p>

                <div className="mt-9 flex flex-wrap justify-center gap-4">
                  <Link
                      href="/trial"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-0 px-7 text-base font-semibold text-white transition-all md:h-14 md:px-10"
                      style={{
                        background:
                            "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)",
                      }}
                  >
                    에버인 맛보기
                  </Link>

                  <Link
                      href="/inquiry"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-[#00cc99] bg-white px-7 text-base font-semibold text-gray-700 transition-all hover:bg-[#f0fdf9] md:h-14 md:px-10"
                  >
                    도입 문의
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="evertime-slide relative flex min-w-full items-center overflow-hidden bg-cover bg-center">
            <div className="absolute inset-0 bg-emerald-950/28 md:hidden" />
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-transparent to-emerald-950/42 md:hidden" />
            <div className="absolute inset-0 hidden bg-gradient-to-r from-white/12 via-transparent to-emerald-950/18 md:block" />
            <div className="relative z-10 mx-auto flex w-full max-w-[1280px] justify-center px-6 lg:px-12">
              <div className="ml-auto flex w-full max-w-[560px] flex-col items-center text-center lg:-mr-8 xl:-mr-20 2xl:-mr-28">
                <p className="font-black leading-none text-white drop-shadow-[0_8px_12px_rgba(0,45,35,0.72)] md:drop-shadow-[0_10px_30px_rgba(0,70,35,0.28)] [font-size:clamp(72px,8vw,120px)]">
                  1시간
                </p>
                <h2 className="mt-3 text-[32px] font-black leading-tight text-white drop-shadow-[0_6px_10px_rgba(0,45,35,0.76)] md:text-5xl md:drop-shadow-[0_8px_24px_rgba(0,70,35,0.24)]">
                  시간단위 연차신청
                </h2>
                <p className="mt-7 text-lg font-bold leading-relaxed text-white drop-shadow-[0_4px_8px_rgba(0,45,35,0.76)] md:text-2xl md:font-semibold md:text-white/94 md:drop-shadow-[0_5px_18px_rgba(0,70,35,0.22)]">
                  복잡한 근태관리
                  <br />
                  에버타임이 쉽게 만듭니다.
                </p>

                <div className="mt-9 flex flex-wrap justify-center gap-4">
                  <Link
                      href="/people/smartWorkCare/evertime"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-0 px-7 text-base font-semibold text-white transition-all md:h-14 md:px-10"
                      style={{
                        background:
                            "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)",
                      }}
                  >
                    에버타임 맛보기
                  </Link>

                  <Link
                      href="/people/smartWorkCare/evertime"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-[#00cc99] bg-white px-7 text-base font-semibold text-gray-700 transition-all hover:bg-[#f0fdf9] md:h-14 md:px-10"
                  >
                    7개월 무료 사용
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
            onClick={prevSlide}
            aria-label="이전 슬라이드"
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg transition-all hover:bg-white md:left-4 md:h-12 md:w-12"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <button
            onClick={nextSlide}
            aria-label="다음 슬라이드"
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg transition-all hover:bg-white md:right-4 md:h-12 md:w-12"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
          {[0, 1, 2].map((idx) => (
              <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  aria-label={`슬라이드 ${idx + 1}로 이동`}
                  className={`h-3 overflow-hidden rounded-full transition-all duration-500 ease-out ${
                      currentSlide === idx ? "w-10 bg-gray-300" : "w-3 bg-gray-300 hover:bg-gray-400"
                  }`}
              >
                {currentSlide === idx && (
                    <span
                        key={currentSlide}
                        className="indicator-progress-fill block h-full rounded-full bg-[#00cc99]"
                        style={{ animationDuration: `${SLIDE_DURATION}ms` }}
                    />
                )}
              </button>
          ))}
        </div>

        <style jsx>{`
          .welcoming-crisis-slide {
            background-image: url("/images/main/backgrounds/main_welcoming_01.png");
            background-size: cover;
            background-position: center right;
          }

          .integration-slide {
            background-image: url("/images/main/backgrounds/bg-hero-01.jpg");
            background-position: center center;
          }

          .evertime-slide {
            background-image: url("/images/main/backgrounds/bg-hero-02.jpg");
            background-position: center center;
          }

          @media (max-width: 767px) {
            .welcoming-crisis-slide {
              background-position: 78% center;
            }

            .integration-slide {
              background-position: 58% center;
            }

            .evertime-slide {
              background-position: 34% center;
            }
          }

          @keyframes float {
            0%,
            100% {
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
