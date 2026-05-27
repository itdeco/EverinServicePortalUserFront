"use client"

import {useEffect, useRef, useState} from "react"
import {cn} from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

const tabs = [
  {id: "hr", label: "People(인사관리)", color: "#03b565"},
  {id: "culture", label: "Culture(기업문화)", color: "#3344e6"},
  {id: "groupware", label: "에버웍스(그룹웨어)", color: "#0FA6EC"},
]

const hrCards = [
  {
    title: "인사관리",
    subtitle: "Human Resource Management",
    desc: "인사정보와 전자근로계약서를 한번에 관리하세요.",
    img: "/images/main/solutions/hro/bg-solutions-02.png",
    href: "/people/hr-management",
  },
  {
    title: "에버웰커밍(온보딩)",
    subtitle: "EverWelcoming",
    desc: "신규입사자의 첫단추를 완벽하게 채워주세요",
    img: "/images/main/solutions/hro/bg-solutions-01.png",
    href: "/people/everwelcoming",
  },
  {
    title: "근태관리(에버타임)",
    subtitle: "EverTime",
    desc: "모바일 앱으로 언제 어디서나 스마트하게 관리하세요.",
    img: "/images/main/solutions/hro/bg-solutions-03.png",
    href: "/people/evertime",
  },
  {
    title: "PC-OFF(에버PC-OFF)",
    subtitle: "EverPC-OFF",
    desc: "실시간 근태 데이터와 연동하여 PC 사용 권한을 관리하세요",
    img: "/images/main/solutions/hro/bg-solutions-04.png",
    href: "/people/pc-off",
  },
  {
    title: "에버페이롤(급여아웃소싱)",
    subtitle: "Payroll Outsourcing",
    desc: "급여 산정의 복잡함은 사라지고 결과의 정확함만 남습니다.",
    img: "/images/main/solutions/hro/bg-solutions-07.png",
    href: "/people/payroll-outsourcing",
  },
  {
    title: "에버평가",
    subtitle: "Talent Assessment",
    desc: "조직의 성과와 성장을 위한 체계적인 평가관리 솔루션입니다.",
    img: "/images/main/solutions/hro/bg-solutions-05.png",
    href: "/people/assessment",
  },
  {
    title: "시스템 연동 및 개발",
    subtitle: "System Integration & Customization",
    desc: "기업의 업무 환경을 하나로 연결하여 효율성을 극대화합니다.",
    img: "/images/main/solutions/hro/bg-solutions-08.png",
    href: "/people/system-integration",
  },
]

/* ─── 기업문화 탭 데이터 ─── */
const cultureCards = [
  {
    title: "시스템 연동",
    desc: "ERP 연동, 출입관리시스템 연동, 커스터마이징 및 추가개발",
    img: "/images/main/solutions/tab2/tab2-solutions-03.png",
    href: "/",
  },
  {
    title: "다면 평가 시스템",
    desc: "역량·종합·업적·다면평가 통합 관리로 공정한 인사 결정",
    img: "/images/main/solutions/tab2/tab2-solutions-04.png",
    href: "/",
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
                          "rounded-2xl group relative cursor-pointer will-change-transform bg-[#f7f8fa] border border-gray-100 overflow-hidden relative",
                          "after:absolute after:inset-0 after:pointer-events-none after:opacity-0 after:transition-opacity after:duration-300",
                          "after:bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(79,124,255,0.35),transparent_40%)]",
                          "md:hover:after:opacity-100",
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
                    <div className="relative z-10 w-[50%] md:w-[52%] px-5 md:px-7 py-5 md:py-6 flex flex-col justify-center h-full min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                        {card.title}
                      </h3>
                      <p className="text-sm md:text-base font-semibold text-emerald-600 mb-2">
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
                    <div className="absolute right-0 top-0 h-full w-[50%] md:w-[42%] overflow-hidden">
                      <Image
                          src={card.img}
                          alt={card.title}
                          fill
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={blurDataURL}
                          className="object-contain object-right p-2 md:p-4 transition-all duration-300 group-hover:scale-105"
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
            <div className="py-20 text-center text-gray-400">
              준비 중입니다.
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
