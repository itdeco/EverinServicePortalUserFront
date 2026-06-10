"use client"

import {useEffect, useRef, useState} from "react"
import {cn} from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { COLORS } from "@/constants/brand-colors"

const tabs = [
  {id: "hr", label: "People(인사관리)", color: COLORS.people},
  {id: "culture", label: "Culture(기업문화)", color: COLORS.culture},
  {id: "groupware", label: "에버웍스(그룹웨어)", color: COLORS.everworks},
]

const hrCards = [
  {
    title: "인사관리",
    subtitle: "모든 HR의 중심, 결국 탄탄한 인사정보부터",
    desc: "에버인에서 HR의 시작, 인사 정보부터 스마트하게 관리하세요.",
    img: "/images/main/solutions/hro/bg-solutions-02.png",
    href: "/people/smartWorkCare/hr",
  },
  {
    title: "온보딩(에버웰커밍)",
    subtitle: "신규입사자의 첫단추, 잘 끼워졌나요?",
    desc: "첫날의 혼란 대신 성장의 확신으로, 모바일 온보딩으로 채워주세요.",
    img: "/images/main/solutions/hro/bg-solutions-01.png",
    href: "/people/smartWorkCare/welcoming",
  },
  {
    title: "근태관리(에버타임)",
    subtitle: "갈수록 다양해지는 근무형태, 관리의 한계에 부딪혔다면?",
    desc: "그 모든 조건을 완벽하게 품은 근태관리 프로그램, 에버타임을 시작하세요.",
    img: "/images/main/solutions/hro/bg-solutions-03.png",
    href: "/people/smartWorkCare/evertime",
  },
  {
    title: "PC-OFF(에버PC-OFF)",
    subtitle: "근태 데이터와 실시간 연동되는 PC 자동 제어를 원하시나요?",
    desc: "에버타임 근태정보 기반으로 이중 관리 스트레스 없는 원스톱 PC-OFF를 경험하세요.",
    img: "/images/main/solutions/hro/bg-solutions-04.png",
    href: "/people/smartWorkCare/pcoff",
  },
  {
    title: "에버페이롤(급여아웃소싱)",
    subtitle: "매번 바뀌는 세법과 복잡한 수당 계산으로 오늘도 야근확정이라면?",
    desc: "급여 산정의 복잡함은 사라지고, 결과의 정확함만 남습니다.",
    img: "/images/main/solutions/hro/bg-solutions-07.png",
    href: "/people/payroll/outsourcing",
  },
  {
    title: "에버평가",
    subtitle: "조직의 성과와 성장을 위한 평가를 원한다면?",
    desc: "업적, 역량, 다면평가까지 다각도로 분석하고 공정하게 종합평가하세요.",
    img: "/images/main/solutions/hro/bg-solutions-05.png",
    href: "/",
  },
  {
    title: "시스템 연동 및 개발",
    subtitle: "System Integration & Customization",
    desc: "기업의 업무 환경을 하나로 연결하여 효율성을 극대화합니다.",
    img: "/images/main/solutions/hro/bg-solutions-08.png",
    href: "/",
  },
]

/* ─── 기업문화 탭 데이터 ─── */
const cultureCards = [
  {
    title: "에버레스크",
    subtitle: "AI시대, 질문하지 않고 과연 살아남을 수 있을까요?",
    desc: "누구나 자유롭게 질문하고 의견을 나눌 수 있는 공간",
    img: ["/images/main/solutions/culture/culture-solutions-01.png"
         ],
    href: "https://www.everin.co.kr/?section=EverAsk",
  },
  {
    title: "에버온사람",
    subtitle: "매일 반복되는 일상 속, 나는 어떤 사람으로 성장하고 있을까요?",
    desc: "매일의 기록과 성찰로 내면의 성장을 돋는 컨텐츠 서비스",
    img: ["/images/main/solutions/culture/culture-solutions-11.png"
    ],
    href: "https://www.everin.co.kr/?section=EverOnSaram",
  },
]

/* ─── 그룹웨어 탭 데이터 ─── */
const groupwareMainCard = {
  title: "급여관리",
  desc: "복잡한 급여 계산도 자동으로\n정확하고 빠른 급여 처리 솔루션",
  img: "/images/main/solutions/tab2/tab2-solutions-01.png",
  href: "/",
}

const groupwareSubCard = {
  title: "급여 관련 부가 서비스",
  desc: "다양한 급여 부가 서비스로 더욱 편리하게",
  img: "/images/main/solutions/tab2/tab2-solutions-02.png",
  href: "/",
}

const blurDataURL =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzYwJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMDAnIGhlaWdodD0nNjAnIGZpbGw9JyNmM2Y0ZjYnLz48L3N2Zz4="

function handleCardMouseMove(e: React.MouseEvent<HTMLDivElement>) {
  if (window.innerWidth < 768) return
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()

  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const rotateX = ((y / rect.height) - 0.5) * -8
  const rotateY = ((x / rect.width) - 0.5) * 8

  card.style.setProperty("--mouse-x", `${x}px`)
  card.style.setProperty("--mouse-y", `${y}px`)
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.015)`
}

function handleCardMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget
  card.style.transform = ""
}

function CultureCardImages({
  images,
  title,
  active,
}: {
  images: string[]
  title: string
  active: boolean
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  useEffect(() => {
    if (!api || !active || images.length < 2) return

    api.reInit()

    const interval = window.setInterval(() => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        api.scrollNext()
      }
    }, 2800)

    return () => window.clearInterval(interval)
  }, [active, api, images.length])

  return (
      <div className="absolute bottom-0 right-0 top-0 h-full w-[42%] overflow-hidden md:w-[52%]">
      <div
        className="hidden h-full items-end gap-0 md:grid"
        style={{gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))`}}
      >
        {images.map((src, index) => (
          <div key={src} className="relative h-full min-w-0">
            <Image
              src={src}
              alt={`${title} 화면 ${index + 1}`}
              fill
              loading="lazy"
              placeholder="blur"
              blurDataURL={blurDataURL}
              className="object-contain object-bottom-right transition-transform duration-300 group-hover:scale-[1.03]"
              style={{ transform: "translateY(40%) scale(1.5)", transformOrigin: "right bottom" }}
            />
          </div>
        ))}
      </div>

      <Carousel
        setApi={setApi}
        opts={{loop: true, align: "center"}}
        className="h-full md:hidden [&_[data-slot=carousel-content]]:h-full [&_[data-slot=carousel-content]>div]:h-full"
      >
        <CarouselContent className="ml-0 h-full">
          {images.map((src, index) => (
            <CarouselItem key={src} className="h-full pl-0">
              <div className="relative h-full w-full">
                <Image
                  src={src}
                  alt={`${title} 화면 ${index + 1}`}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  className="object-contain object-right-bottom"
                  style={{ transform: "translateY(7%) scale(1.2)", transformOrigin: "right bottom" }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 flex gap-1.5">
            {images.map((_, index) => (
              <span
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  current === index ? "w-5 bg-[#0D99FF]" : "w-1.5 bg-[#0D99FF]/25"
                )}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  )
}

export function SolutionsSection() {
  const [activeTab, setActiveTab] = useState("hr")


  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        },
        {threshold: 0.2}
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">

          {/* Header */}
          <div className="mb-3">
            <p className="text-sm text-emerald-500 font-semibold mb-2">에버인 솔루션</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
              반복 업무는 줄이고,<br/>
              진짜 가치 있는 일에 집중하는 HR 솔루션을 경험하세요.
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mt-8 mb-10 px-1">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      borderColor: activeTab === tab.id ? tab.color : undefined,
                      backgroundColor: activeTab === tab.id ? tab.color : undefined,
                      color: activeTab === tab.id ? "#fff" : undefined,
                    }}
                    className={cn(
                        "px-3 sm:px-5 md:px-7 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs md:text-sm font-semibold whitespace-nowrap",
                        "transition-all duration-200 border cursor-pointer hover:shadow-md active:scale-95",
                        "focus:outline-none focus:ring-2",
                        activeTab === tab.id
                            ? "text-white shadow-sm"
                            : "bg-white text-gray-600 border-gray-300"
                    )}
                    onMouseEnter={(e) => {
                      if (activeTab !== tab.id) {
                        e.currentTarget.style.borderColor = tab.color
                        e.currentTarget.style.color = tab.color
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== tab.id) {
                        e.currentTarget.style.borderColor = ""
                        e.currentTarget.style.color = ""
                      }
                    }}
                >
                  {tab.label}
                </button>
            ))}
          </div>

          {/* ─── 인사관리 Tab ─── */}
          <div
              ref={sectionRef}
              className={cn(
                  activeTab === "hr" ? "block animate-tab-fade-slide" : "hidden"
              )}
          >
            <div
                className="pb-4"
              onClick={(e) => {
                const target = e.target as HTMLElement
                const card = target.closest('[data-card-index]') as HTMLElement
                if (card && window.innerWidth < 768) {
                  card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
                }
              }}
            >
            {/* cards */}
              <div className="grid grid-cols-1 gap-4">
              {hrCards.map((card, i) => (
                  <div
                      key={i}
                      data-card-index={i + 1}
                      onMouseMove={handleCardMouseMove}
                      onMouseLeave={handleCardMouseLeave}
                      className={cn(
                          "rounded-2xl group relative cursor-pointer will-change-transform bg-[#f5fbf8] border border-[#03b565]/10 overflow-hidden relative",
                          "h-[190px] md:h-[220px]",
                          "transition-[box-shadow,opacity,transform] duration-700 ease-out hover:shadow-xl",
                          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                          i === 0 && "delay-100",
                          i === 1 && "delay-200",
                          i === 2 && "delay-300",
                          i === 3 && "delay-[400ms]"
                      )}
                  >
                    {/* 텍스트 영역 */}
                    <div className="relative z-10 w-[60%] md:w-[60%] px-5 md:px-7 py-5 md:py-6 flex flex-col justify-center h-full min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                        {card.title}
                      </h3>
                      <p className="mb-2 text-base font-bold text-[#0D99FF] md:text-lg md:whitespace-nowrap">
                        {card.subtitle}
                      </p>
                      <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line mb-4 line-clamp-2">
                        {card.desc}
                      </p>
                      <Link
                          href={card.href}
                          className="relative z-10 inline-flex items-center justify-center w-fit px-4 py-1.5 rounded-full border border-gray-300 bg-white/80 text-gray-700 text-xs font-semibold shadow-sm transition-all duration-300 hover:border-[#03b565] hover:bg-[#03b565] hover:text-white hover:shadow-md hover:shadow-[#03b565]/25 active:scale-95 cursor-pointer"
                      >
                        자세히 보기
                      </Link>
                    </div>
                    {/* 이미지 영역 — 남은 공간 꽉 채우기 */}
                    <div className="absolute right-0 top-0 h-full w-[40%] md:w-[40%] overflow-hidden">
                      <Image
                          src={card.img}
                          alt={card.title}
                          fill
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={blurDataURL}
                          className="object-contain object-right p-1 md:p-2 transition-all duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
              ))}
            </div>
            </div>
          </div>

          {/* ─── 기업문화 Tab ─── */}
          <div className={cn(
              activeTab === "culture" ? "block animate-tab-fade-slide" : "hidden"
          )}>
            <div className="grid grid-cols-1 gap-5 pb-4">
              {cultureCards.map((card, i) => (
                <div
                  key={card.title}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className={cn(
                    "group relative h-[230px] cursor-pointer overflow-hidden rounded-2xl border border-[#0D99FF]/15 bg-[#f2f9ff] will-change-transform",
                    "transition-[box-shadow,opacity,transform] duration-700 ease-out md:h-[280px] hover:shadow-xl hover:shadow-[#0D99FF]/15",
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                    i === 0 ? "delay-100" : "delay-200"
                  )}
                >
                  <div className="relative z-10 flex h-full w-[70%] min-w-0 flex-col justify-center px-5 py-5 md:w-[58%] md:px-8 md:py-7">
                    <h3 className="mb-1 text-lg font-bold text-gray-900 md:text-2xl">
                      {card.title}
                    </h3>
                    <p className="mb-2 text-base font-bold text-[#0D99FF] md:text-lg">
                      {card.subtitle}
                    </p>
                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-500 md:text-base">
                      {card.desc}
                    </p>
                    <Link
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="relative z-10 inline-flex w-fit items-center justify-center rounded-full border border-[#0D99FF]/30 bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#0D99FF] shadow-sm transition-all duration-300 hover:border-[#0D99FF] hover:bg-[#0D99FF] hover:text-white hover:shadow-md hover:shadow-[#0D99FF]/20 active:scale-95 md:text-sm"
                    >
                      자세히 보기
                    </Link>
                  </div>

                  <CultureCardImages
                    images={card.img}
                    title={card.title}
                    active={activeTab === "culture"}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ─── 그룹웨어 Tab ─── */}
          <div className={cn(
              activeTab === "groupware" ? "block animate-tab-fade-slide" : "hidden"
          )}>
            <div className="py-20 text-center text-gray-400">
              준비 중입니다.
            </div>
          </div>

        </div>
        <style jsx>
          {`
                    @keyframes tabFadeSlide {
                        from {
                            opacity: 0;
                            transform: translateY(16px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .animate-tab-fade-slide {
                        animation: tabFadeSlide 0.35s ease-out both;
                    }
                `}
        </style>
      </section>
  )
}
