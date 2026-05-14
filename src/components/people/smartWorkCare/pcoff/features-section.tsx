"use client"

import Image from "next/image"
import { useEffect, useRef, useState, useCallback } from "react"

const featureGroups = [
  {
    id: 1,
    title: "PC-OFF 현황 모니터링",
    description: "관리자가 전 직원의 PC 사용 현황을\n실시간으로 한눈에 확인할 수 있습니다.\n초과 근무 발생 즉시 알림으로 선제 대응하세요.",
    icon: "/images/main/icons/hero/icon-hero-06.svg",
    isPC: true,
    images: [
      { src: "/images/people/smartWorkCare/pcoff/pcOff-1-1.png", alt: "PC-OFF 현황 모니터링 화면 1" },
      { src: "/images/people/smartWorkCare/pcoff/pcOff-1-2.png", alt: "PC-OFF 현황 모니터링 화면 2" },
    ],
  },
  {
    id: 2,
    title: "자동 PC 종료 설정",
    description: "부서별·직급별 근무 종료 시간을 설정하면\nPC가 자동으로 종료됩니다.\n불필요한 야근을 구조적으로 차단하세요.",
    icon: "/images/main/icons/hero/icon-hero-06.svg",
    isPC: true,
    images: [
      { src: "/images/people/smartWorkCare/pcoff/pcOff-2-1.png", alt: "자동 PC 종료 설정 화면 1" },
      { src: "/images/people/smartWorkCare/pcoff/pcOff-2-2.png", alt: "자동 PC 종료 설정 화면 2" },
    ],
  },
  {
    id: 3,
    title: "모바일 연동 알림",
    description: "PC 종료 전 모바일로 사전 알림을 발송하여\n직원이 마무리 작업을 준비할 수 있습니다.\n자연스러운 퇴근 문화를 만들어보세요.",
    icon: "/images/main/icons/hero/icon-hero-06.svg",
    isPC: false,
    images: [
      { src: "/images/people/smartWorkCare/pcoff/pcOff-3-1.png", alt: "모바일 연동 알림 화면 1" },
      { src: "/images/people/smartWorkCare/pcoff/pcOff-3-2.png", alt: "모바일 연동 알림 화면 2" },
      { src: "/images/people/smartWorkCare/pcoff/pcOff-3-3.png", alt: "모바일 연동 알림 화면 3" },
    ],
  },
]

const totalImages = featureGroups.reduce((sum, g) => sum + g.images.length, 0)
const SECTION_HEIGHT = 100

const flatImages: { groupIdx: number; imgIdx: number }[] = []
featureGroups.forEach((group, gi) => {
  group.images.forEach((_, ii) => {
    flatImages.push({ groupIdx: gi, imgIdx: ii })
  })
})

function ImageCarousel({
  group,
  imgIdx,
  onIndexChange,
  height,
  itemWidth,
  peekAmount = 0,
  isMobile = false,
  isPC = false,
}: {
  group: (typeof featureGroups)[0]
  imgIdx: number
  onIndexChange?: (newIdx: number) => void
  height: string
  itemWidth: number
  peekAmount?: number
  isMobile?: boolean
  isPC?: boolean
}) {
  const total = group.images.length
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)
  const [prevTranslate, setPrevTranslate] = useState(0)

  const getTranslateX = useCallback((index: number) => {
    return -(index * itemWidth) + peekAmount
  }, [itemWidth, peekAmount])

  useEffect(() => {
    const tx = getTranslateX(imgIdx)
    setCurrentTranslate(tx)
    setPrevTranslate(tx)
  }, [imgIdx, getTranslateX])

  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return
    setCurrentTranslate(prevTranslate + (clientX - startX))
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const diff = currentTranslate - prevTranslate
    const threshold = itemWidth * 0.2
    let newIndex = imgIdx
    if (diff < -threshold && imgIdx < total - 1) newIndex = imgIdx + 1
    else if (diff > threshold && imgIdx > 0) newIndex = imgIdx - 1

    if (onIndexChange && newIndex !== imgIdx) {
      onIndexChange(newIndex)
    } else {
      const tx = getTranslateX(imgIdx)
      setCurrentTranslate(tx)
      setPrevTranslate(tx)
    }
  }

  const handleImageClick = (index: number) => {
    if (onIndexChange && index !== imgIdx) onIndexChange(index)
  }

  const containerWidth = isMobile ? itemWidth + peekAmount * 2 : itemWidth

  return (
    <div className="relative flex flex-col items-center gap-3">
      <div
        className="relative overflow-hidden"
        style={{ width: containerWidth, height }}
      >
        <div
          ref={trackRef}
          className="flex h-full cursor-grab active:cursor-grabbing select-none"
          style={{
            transform: `translateX(${currentTranslate}px)`,
            transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseDown={(e) => { e.preventDefault(); handleDragStart(e.clientX) }}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => { if (isDragging) handleDragEnd() }}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          {group.images.map((img, i) => (
            <div
              key={i}
              className="relative h-full flex-shrink-0"
              style={{
                width: itemWidth,
                padding: "0 6px",
                opacity: i === imgIdx ? 1 : 0.5,
                transition: "opacity 0.3s ease",
              }}
              onClick={() => handleImageClick(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className={`object-contain object-center pointer-events-none ${isPC ? "object-top" : "object-center"}`}
                style={{ padding: "0 6px" }}
                priority={i === 0}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 카운터 */}
      {total > 1 && (
        <div className="text-sm font-semibold text-gray-400 tabular-nums text-center">
          <span className="text-gray-800">{imgIdx + 1}</span>
          <span className="mx-0.5">/</span>
          <span>{total}</span>
        </div>
      )}
    </div>
  )
}

export default function PcOffFeaturesSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [manualOverride, setManualOverride] = useState<number | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const activeGroupIdx = flatImages[activeStep]?.groupIdx ?? 0
  const activeImgIdx = manualOverride ?? (flatImages[activeStep]?.imgIdx ?? 0)
  const activeGroup = featureGroups[activeGroupIdx]

  const handleManualIndexChange = (newImgIdx: number) => {
    setManualOverride(newImgIdx)
  }

  useEffect(() => {
    const handleScroll = () => {
      const el = wrapperRef.current
      if (!el) return
      const { top } = el.getBoundingClientRect()
      const scrolled = -top
      const scrollableHeight = totalImages * window.innerHeight
      const stepHeight = scrollableHeight / totalImages
      const step = Math.min(totalImages - 1, Math.max(0, Math.floor(scrolled / stepHeight)))

      const newGroupIdx = flatImages[step]?.groupIdx ?? 0
      if (newGroupIdx !== activeGroupIdx) setManualOverride(null)

      setActiveStep(step)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeGroupIdx])

  const groupDots = featureGroups.map((_, gi) => gi === activeGroupIdx)

  // PC 이미지: 가로형이라 높이를 낮게, 모바일 이미지: 세로형이라 높이 높게
  const desktopHeight = activeGroup?.isPC ? "360px" : "480px"
  const desktopItemWidth = activeGroup?.isPC ? 580 : 320
  const desktopPeek = activeGroup?.isPC ? 60 : 60

  return (
    <div
      ref={wrapperRef}
      className="relative w-full bg-white"
      style={{ height: `${(totalImages + 1) * SECTION_HEIGHT}vh` }}
    >
      {/* 데스크탑 고정 패널 */}
      <div className="hidden lg:flex sticky top-20 h-[calc(100vh-5rem)] items-center bg-white">
        <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
          <div className="flex items-center justify-center gap-16">

            {/* 왼쪽 텍스트 */}
            <div className="w-[320px] shrink-0 relative h-[220px]">
              {featureGroups.map((group, gi) => (
                <div
                  key={group.id}
                  className="absolute inset-0"
                  style={{
                    opacity: activeGroupIdx === gi ? 1 : 0,
                    transition: "opacity 0.6s ease-in-out",
                    pointerEvents: activeGroupIdx === gi ? "auto" : "none",
                  }}
                >
                  <div className="flex gap-2 mb-6">
                    {groupDots.map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className="block h-1.5 rounded-full"
                        style={{
                          width: dotIdx === activeGroupIdx ? "24px" : "6px",
                          backgroundColor: dotIdx === activeGroupIdx ? "#00cc99" : "#e5e7eb",
                          transition: "width 0.4s ease-in-out, background-color 0.4s ease-in-out",
                        }}
                      />
                    ))}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {group.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed whitespace-pre-line">
                    {group.description}
                  </p>
                </div>
              ))}
            </div>

            {/* 오른쪽 이미지 슬라이더 */}
            <div
              className="flex items-center justify-center"
              style={{ width: 720 }}
            >
              <div className="relative">
                {featureGroups.map((group, gi) => {
                  const h = group.isPC ? "420px" : "480px"
                  const w = group.isPC ? 640 : 320
                  const pk = group.isPC ? 80 : 60
                  return (
                    <div
                      key={group.id}
                      className="absolute inset-0"
                      style={{
                        opacity: activeGroupIdx === gi ? 1 : 0,
                        transition: "opacity 0.5s ease-in-out",
                        pointerEvents: activeGroupIdx === gi ? "auto" : "none",
                      }}
                    >
                      <ImageCarousel
                        group={group}
                        imgIdx={activeGroupIdx === gi ? activeImgIdx : 0}
                        onIndexChange={activeGroupIdx === gi ? handleManualIndexChange : undefined}
                        height={h}
                        itemWidth={w}
                        peekAmount={pk}
                        isMobile={true}
                        isPC={group.isPC}
                      />
                    </div>
                  )
                })}
                {/* 크기 잡기용 (가장 큰 그룹 기준) */}
                <div style={{ visibility: "hidden" }}>
                  <ImageCarousel
                    group={featureGroups[0]}
                    imgIdx={0}
                    height="420px"
                    itemWidth={640}
                    peekAmount={80}
                    isMobile={true}
                    isPC={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 고정 패널 */}
      <div className="flex lg:hidden sticky top-16 h-[calc(100vh-4rem)] flex-col items-center justify-center bg-white px-4">
        <div className="w-full max-w-sm flex flex-col items-center text-center">
          {/* 그룹 인디케이터 */}
          <div className="flex gap-2 mb-5">
            {featureGroups.map((_, dotIdx) => (
              <span
                key={dotIdx}
                className="block h-1.5 rounded-full"
                style={{
                  width: dotIdx === activeGroupIdx ? "24px" : "6px",
                  backgroundColor: dotIdx === activeGroupIdx ? "#00cc99" : "#e5e7eb",
                  transition: "width 0.4s ease-in-out, background-color 0.4s ease-in-out",
                }}
              />
            ))}
          </div>

          {/* 텍스트 */}
          <div className="relative h-[110px] w-full mb-4">
            {featureGroups.map((group, gi) => (
              <div
                key={group.id}
                className="absolute inset-0 flex flex-col items-center text-center"
                style={{
                  opacity: activeGroupIdx === gi ? 1 : 0,
                  transition: "opacity 0.6s ease-in-out",
                  pointerEvents: activeGroupIdx === gi ? "auto" : "none",
                }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {group.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {group.description}
                </p>
              </div>
            ))}
          </div>

          {/* 이미지 슬라이더 */}
          <div className="relative w-full flex justify-center">
            {featureGroups.map((group, gi) => {
              const mobileH = group.isPC ? "220px" : "380px"
              const mobileW = group.isPC ? 280 : 220
              const mobilePk = 30
              return (
                <div
                  key={group.id}
                  className="absolute inset-0 flex justify-center"
                  style={{
                    opacity: activeGroupIdx === gi ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                    pointerEvents: activeGroupIdx === gi ? "auto" : "none",
                  }}
                >
                  <ImageCarousel
                    group={group}
                    imgIdx={activeGroupIdx === gi ? activeImgIdx : 0}
                    onIndexChange={activeGroupIdx === gi ? handleManualIndexChange : undefined}
                    height={mobileH}
                    itemWidth={mobileW}
                    peekAmount={mobilePk}
                    isMobile={true}
                    isPC={group.isPC}
                  />
                </div>
              )
            })}
            {/* 크기 잡기용 */}
            <div style={{ visibility: "hidden" }}>
              <ImageCarousel
                group={featureGroups[0]}
                imgIdx={0}
                height="380px"
                itemWidth={280}
                peekAmount={30}
                isMobile={true}
                isPC={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
