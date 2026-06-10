"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { COLORS } from "@/constants/brand-colors"

const serviceTabs = [
  {
    id: "ai",
    label: "대시보드 및 AI어시스트",
    image: "/images/people/addOnServices/everworks/bg/bg-EverWorks-09.png",
    eyebrow: "지능형 운영 지원",
    title: "대시보드 및 AI어시스트",
    items: [
      { title: "업무의 시작, 하나의 화면으로", desc: "결재함 · 일정 · 공지 · 메신저를 한 화면에서 확인하는 개인화된 업무 시작점" },
      { title: "내 업무에 맞게 커스터마이징", desc: "위젯 구성을 자유롭게 설정하여 나만의 업무 대시보드 구성" },
      { title: "개인 업무 비서", desc: "연차 잔여량 조회, 회의실 추천, 개인별 To-Do 요약 및 리마인드 알림 수행" },
    ],
  },
  {
    id: "approval",
    label: "전자결재",
    image: "/images/people/addOnServices/everworks/bg/bg-EverWorks-06.png",
    eyebrow: "데이터 기반 승인 체계",
    title: "전자결재",
    items: [
      { title: "직접 만드는 결재 양식", desc: "초간편 편집기로 전문 인력 없이 현업 담당자가 직접 양식 제작" },
      { title: "데이터 연동", desc: "근태 · ERP 데이터와 실시간 연동하여 결재 문서 내 자동 바인딩 지원" },
      { title: "모바일 승인", desc: "푸시 알림 확인 및 모바일 웹을 통한 즉각적인 의사결정 지원" },
    ],
  },
  {
    id: "docs",
    label: "문서관리",
    image: "/images/people/addOnServices/everworks/bg/bg-EverWorks-10.png",
    eyebrow: "기업 지식의 중앙 저장소",
    title: "문서관리",
    items: [
      { title: "결재부터 보관까지 일원화", desc: "결재 완료 문서 자동 보관 및 폴더형 문서함으로 체계적인 문서 흐름 관리" },
      { title: "협업을 위한 문서 공유", desc: "버전 관리 및 열람 권한 설정으로 안전하고 효율적인 문서 협업 지원" },
    ],
  },
  {
    id: "mail",
    label: "메일 및 일정",
    image: "/images/people/addOnServices/everworks/bg/bg-EverWorks-07.png",
    eyebrow: "표준 인프라 수용",
    title: "메일 및 일정",
    items: [
      { title: "메일 통합", desc: "MS Exchange · Google Workspace 연동은 물론, 보안에 강한 Crinity 메일 엔진 선택 지원" },
      { title: "기업 보안 적용", desc: "기업별 보안 정책에 따른 스팸 차단 및 데이터 소유권 보호 강화" },
      { title: "일정 관리", desc: "캘린더 등록·관리 및 Google·Apple 캘린더 연동" },
    ],
  },
  {
    id: "messenger",
    label: "메신저(PC/APP)",
    image: "/images/people/addOnServices/everworks/bg/bg-EverWorks-08.png",
    eyebrow: "업무 맥락의 통합",
    title: "메신저(PC/APP)",
    items: [
      { title: "채널구성", desc: "공개채널·비공개채널·DM·그룹DM으로 업무 목적과 대상에 맞는 소통 공간 구성" },
      { title: "메신저에서 바로 업무", desc: "대화 중 전자결재 상신, 일정 공유 등 연동으로 소통과 업무의 단절 방지" },
      { title: "업무 상태 자동 표시", desc: "온라인/ 자리비움/바쁨' 등 구성원 상태 자동 표기" },
    ],
  },
]

export default function ServiceSection() {
  const [activeId, setActiveId] = useState("ai")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  const activeService = serviceTabs.find((tab) => tab.id === activeId) ?? serviceTabs[0]

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        },
        { threshold: 0.25 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
      <section
          ref={sectionRef}
          className="relative w-full bg-white py-20 overflow-hidden"
      >
        {/* 히어로와 자연스럽게 이어지는 상단 그라데이션 */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-orange-100/80 via-white to-white" />

        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
          <div
              className={`text-center mb-8 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="text-xl md:text-3xl font-bold text-gray-900">
              제공되는 서비스를 확인하세요
            </h2>
          </div>

          <div
              className={`flex justify-center gap-3 mb-10 flex-wrap transition-all duration-700 delay-100 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            {serviceTabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveId(tab.id)}
                    className={`cursor-pointer px-7 py-3 rounded-full text-sm md:text-lg font-medium transition-all duration-200 whitespace-nowrap active:scale-95 ${
                        activeId === tab.id
                            ? "text-white shadow-lg shadow-orange-200 scale-105"
                            : "bg-orange-50 text-gray-700 hover:bg-orange-100 hover:shadow-sm hover:scale-105"
                    }`}
                    style={activeId === tab.id ? { backgroundColor: COLORS.everworks } : undefined}
                >
                  {tab.label}
                </button>
            ))}
          </div>

          <div
              className={`rounded-2xl border border-orange-100 bg-[#fffaf6] p-6 md:p-10 shadow-sm transition-all duration-700 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div
                key={activeId}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-service-slide"
            >
              <div className="space-y-6 max-w-[540px] lg:pr-8">
                <div>
                  <p className="text-sm font-semibold mb-2" style={{ color: COLORS.everworks }}>
                    {activeService.eyebrow}
                  </p>

                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                    {activeService.title}
                  </h3>
                </div>

                <ul className="space-y-4 text-gray-700 leading-relaxed">
                  {activeService.items.map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <span className="mt-2 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS.everworks }} />
                        <span>
                      <strong>{item.title}</strong> : {item.desc}
                    </span>
                      </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-[300px] md:h-[400px] lg:h-[420px]">
                <Image
                    src={activeService.image}
                    alt={`${activeService.label} 화면`}
                    fill
                    className="object-contain scale-110 translate-x-[3%] drop-shadow-2xl animate-image-slide"
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes serviceSlide {
            from {
              opacity: 0;
              transform: translateY(14px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes imageSlide {
            from {
              opacity: 0;
              transform: translateX(28px) scale(1.06);
            }
            to {
              opacity: 1;
              transform: translateX(3%) scale(1.1);
            }
          }

          .animate-service-slide {
            animation: serviceSlide 0.38s ease-out both;
          }

          .animate-image-slide {
            animation: imageSlide 0.42s ease-out both;
          }
        `}</style>
      </section>
  )
}
