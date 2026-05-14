"use client"

import Image from "next/image"
import { useEffect, useRef, useState, useCallback } from "react"

const featureGroups = [
  {
    id: 1,
    title: "실시간 근태 모니터링",
    description: "연장, 휴일근무부터 휴가 잔여 일수까지,\n복잡한 내역을 앱에서 실시간으로 투명하게 확인하세요.",
    icon: "/images/main/icons/hero/icon-hero-04.svg",
    images: [
      { src: "/images/people/smartWorkCare/evertime/EverTime-1-1.png", alt: "실시간 근태 모니터링 화면 1" },
      { src: "/images/people/smartWorkCare/evertime/EverTime-1-2.png", alt: "실시간 근태 모니터링 화면 2" },
    ],
  },
  {
    id: 2,
    title: "모바일 출퇴근",
    description: "GPS, Wi-Fi는 물론 NFC 인증까지 지원하여,\n우리 회사의 보안 수준과 현장 상황에 최적화된\n인증 환경을 구축할 수 있습니다.",
    icon: "/images/main/icons/hero/icon-hero-04.svg",
    images: [
      { src: "/images/people/smartWorkCare/evertime/EverTime-2-1.png", alt: "모바일 출퇴근 화면 1" },
      { src: "/images/people/smartWorkCare/evertime/EverTime-2-2.png", alt: "모바일 출퇴근 화면 2" },
    ],
  },
  {
    id: 3,
    title: "유연근무 자동계산",
    description: "주 52시간 근무에 완벽한 가이드,\n복잡한 유연·고대근무도 법적 테두리 안에서\n안전하게 관리하세요.",
    icon: "/images/main/icons/hero/icon-hero-04.svg",
    images: [
      { src: "/images/people/smartWorkCare/evertime/EverTime-3-1.png", alt: "유연근무 자동계산 화면 1" },
      { src: "/images/people/smartWorkCare/evertime/EverTime-3-2.png", alt: "유연근무 자동계산 화면 2" },
      { src: "/images/people/smartWorkCare/evertime/EverTime-3-3.png", alt: "유연근무 자동계산 화면 3" },
    ],
  },
  {
    id: 4,
    title: "간편한 모바일 결재",
    description: "복잡한 서류나 해석 없이 앱에서 즉시 신청하고\n터치 한 번으로 승인까지!\n모든 근태 결재를 가장 빠르게 처리하세요.",
    icon: "/images/main/icons/hero/icon-hero-04.svg",
    images: [
      { src: "/images/people/smartWorkCare/evertime/EverTime-4-1.png", alt: "간편한 모바일 결재 화면 1" },
      { src: "/images/people/smartWorkCare/evertime/EverTime-4-2.png", alt: "간편한 모바일 결재 화면 2" },
      { src: "/images/people/smartWorkCare/evertime/EverTime-4-3.png", alt: "간편한 모바일 결재 화면 3" },
      { src: "/images/people/smartWorkCare/evertime/EverTime-4-4.png", alt: "간편한 모바일 결재 화면 4" },
      { src: "/images/people/smartWorkCare/evertime/EverTime-4-5.png", alt: "간편한 모바일 결재 화면 5" },
    ],
  },
]

const totalImages = featureGroups.reduce((sum, g) => sum + g.images.length, 0)
const SECTION_HEIGHT = 100

// 전체 이미지 플랫 리스트
const flatImages: { groupIdx: number; imgIdx: number }[] = []
featureGroups.forEach((group, gi) => {
  group.images.forEach((_, ii) => {
    flatImages.push({ groupIdx: gi, imgIdx: ii })
  })
})

// 가로 슬라이더 컴포넌트 - 드래그/스와이프 지원, 좌우 peek
function ImageCarousel({
  group,
  imgIdx,
  onIndexChange,
  height,
  itemWidth,
  peekAmount = 0,
  isMobile = false,
}: {
  group: (typeof featureGroups)[0]
  imgIdx: number
  onIndexChange?: (newIdx: number) => void
  height: string
  itemWidth: number
  peekAmount?: number
  isMobile?: boolean
}) {
  const total = group.images.length
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)
  const [prevTranslate, setPrevTranslate] = useState(0)

  // 현재 인덱스 기준 translateX 계산
  const getTranslateX = useCallback((index: number) => {
    return -(index * itemWidth) + peekAmount
  }, [itemWidth, peekAmount])

  useEffect(() => {
    const translateX = getTranslateX(imgIdx)
    setCurrentTranslate(translateX)
    setPrevTranslate(translateX)
  }, [imgIdx, getTranslateX])

  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return
    const diff = clientX - startX
    setCurrentTranslate(prevTranslate + diff)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    const diff = currentTranslate - prevTranslate
    const threshold = itemWidth * 0.2
    
    let newIndex = imgIdx
    if (diff < -threshold && imgIdx < total - 1) {
      newIndex = imgIdx + 1
    } else if (diff > threshold && imgIdx > 0) {
      newIndex = imgIdx - 1
    }
    
    if (onIndexChange && newIndex !== imgIdx) {
      onIndexChange(newIndex)
    } else {
      // 원래 위치로 복귀
      setCurrentTranslate(getTranslateX(imgIdx))
      setPrevTranslate(getTranslateX(imgIdx))
    }
  }

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleDragStart(e.clientX)
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX)
  }
  
  const handleMouseUp = () => {
    handleDragEnd()
  }
  
  const handleMouseLeave = () => {
    if (isDragging) handleDragEnd()
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    handleDragEnd()
  }

  // 이미지 클릭 시 해당 인덱스로 이동
  const handleImageClick = (index: number) => {
    if (onIndexChange && index !== imgIdx) {
      onIndexChange(index)
    }
  }

  const containerWidth = isMobile ? itemWidth + (peekAmount * 2) : itemWidth

  return (
    <div className="relative flex flex-col items-center gap-3">
      {/* 슬라이더 컨테이너 */}
      <div
        className="relative overflow-hidden"
        style={{ width: containerWidth, height }}
      >
        {/* 트랙 */}
        <div
          ref={trackRef}
          className="flex h-full cursor-grab active:cursor-grabbing select-none"
          style={{
            transform: `translateX(${currentTranslate}px)`,
            transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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
                className="object-contain object-center pointer-events-none"
                style={{ padding: "0 6px" }}
                priority={i === 0}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 카운터 - 이미지 아래 가운데 */}
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

export default function EvertimeFeaturesSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [manualOverride, setManualOverride] = useState<number | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const activeGroupIdx = flatImages[activeStep]?.groupIdx ?? 0
  const activeImgIdx = manualOverride ?? (flatImages[activeStep]?.imgIdx ?? 0)

  // 수동 오버라이드 핸들러
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
      const step = Math.min(
        totalImages - 1,
        Math.max(0, Math.floor(scrolled / stepHeight))
      )
      
      // 그룹이 바뀌면 수동 오버라이드 리셋
      const newGroupIdx = flatImages[step]?.groupIdx ?? 0
      if (newGroupIdx !== activeGroupIdx) {
        setManualOverride(null)
      }
      
      setActiveStep(step)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeGroupIdx])

  const groupDots = featureGroups.map((_, gi) => gi === activeGroupIdx)

  return (
    <div
      ref={wrapperRef}
      className="relative w-full bg-white"
      style={{ height: `${(totalImages + 1) * SECTION_HEIGHT}vh` }}
    >
      {/* 고정 패널 - 데스크탑 */}
      <div className="hidden lg:flex sticky top-20 h-[calc(100vh-5rem)] items-center bg-white">
        <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
          <div className="flex items-center justify-center gap-16">
            {/* 왼쪽 텍스트 - 그룹 단위로 전환 */}
            <div className="w-[320px] shrink-0 relative h-[200px]">
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
                  {/* 그룹 인디케이터 */}
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
                  {/* 아이콘 */}
                  <div className="mb-6 flex justify-center">
                    <Image
                      src={group.icon}
                      alt={group.title}
                      width={56}
                      height={56}
                      className="w-14 h-14"
                    />
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

            {/* 오른쪽 - 가로 슬라이더 */}
            <div className="flex items-center justify-center" style={{ width: 500 }}>
              <div className="relative">
                {featureGroups.map((group, gi) => (
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
                      height="480px"
                      itemWidth={320}
                      peekAmount={60}
                      isMobile={true}
                    />
                  </div>
                ))}
                {/* 크기 잡기용 */}
                <div style={{ visibility: "hidden" }}>
                  <ImageCarousel
                    group={featureGroups[0]}
                    imgIdx={0}
                    height="480px"
                    itemWidth={320}
                    peekAmount={60}
                    isMobile={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 고정 패널 - 모바일 */}
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

          {/* 텍스트 - 그룹 단위 전환 */}
          <div className="relative h-[100px] w-full mb-4">
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
                {/* 아이콘 */}
                <div className="mb-4 flex justify-center">
                  <Image
                    src={group.icon}
                    alt={group.title}
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {group.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {group.description}
                </p>
              </div>
            ))}
          </div>

          {/* 이미지 - 가로 슬라이더 (모바일: 좌우 peek + 더 큰 이미지) */}
          <div className="relative w-full flex justify-center">
            {featureGroups.map((group, gi) => (
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
                  height="420px"
                  itemWidth={240}
                  peekAmount={30}
                  isMobile={true}
                />
              </div>
            ))}
            {/* 크기 잡기용 */}
            <div style={{ visibility: "hidden" }}>
              <ImageCarousel
                group={featureGroups[0]}
                imgIdx={0}
                height="420px"
                itemWidth={240}
                peekAmount={30}
                isMobile={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
