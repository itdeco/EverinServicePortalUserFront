"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const serviceTabs = [
  {
    id: "approval",
    label: "전자결재",
    image: "/images/people/addOnServices/everworks/bg/bg-EverWorks-06.png",
    eyebrow: "데이터 기반 승인 체계",
    title: "전자결재 (e-Approval)",
    number: "01",
    items: [
      { title: "양식 편집기", desc: "No-Code 기반의 초간편 편집기로 전문 인력 없이 현업 담당자가 직접 양식 제작." },
      { title: "데이터 연동", desc: "근태/급여/ERP 데이터와 실시간 연동되어 수기 입력 없는 무결점 결재 환경 구현." },
      { title: "모바일 승인", desc: "외부 이동 중에도 푸시 알림 확인 및 모바일 웹을 통한 즉각적인 의사결정 지원." },
    ],
  },
  {
    id: "mail",
    label: "메일",
    image: "/images/people/addOnServices/everworks/bg/bg-EverWorks-07.png",
    eyebrow: "표준 인프라 수용",
    title: "메일 (Business Mail)",
    number: "02",
    items: [
      { title: "하이브리드 환경", desc: "MS Exchange, Google Workspace 연동 및 자체 고성능 메일 엔진 선택 지원." },
      { title: "일정 양방향 동기화", desc: "메일 내 일정을 Apple/Google 캘린더 및 사내 공용 일정으로 즉시 등록 관리." },
      { title: "보안 강화", desc: "기업별 보안 정책에 따른 스팸 차단, 메일 아카이빙 및 데이터 소유권 보호 강화." },
    ],
  },
  {
    id: "messenger",
    label: "메신저",
    image: "/images/people/addOnServices/everworks/bg/bg-EverWorks-08.png",
    eyebrow: "업무 맥락의 통합",
    title: "메신저 (Messenger)",
    number: "03",
    items: [
      { title: "조직도 기반 소통", desc: "사내 전 구성원 정보를 실시간 반영하여 별도 친구 추가 없는 즉각적 협업 지원." },
      { title: "상태 동기화", desc: "에버타임 출근 정보와 연동되어 '업무 중/회의 중/휴가' 등 구성원 상태 자동 표기." },
      { title: "업무 연결성", desc: "대화 중 전자결재 상신, 일정 공유 등 연동으로 소통과 업무의 단절 방지." },
    ],
  },
  {
    id: "ai",
    label: "AI Assistant",
    image: "/images/people/addOnServices/everworks/bg/bg-EverWorks-09.png",
    eyebrow: "지능형 운영 지원",
    title: "AI Assistant",
    number: "04",
    items: [
      { title: "스마트 셋업", desc: "자연어 명령을 통한 복잡한 조직도 및 결재 권한 설정 자동 가이드 제공." },
      { title: "개인 업무 비서", desc: "연차 잔여량 조회, 회의실 추천, 개인별 To-Do 요약 및 리마인드 알림 수행." },
      { title: "운영 최적화", desc: "누적된 인사/근태 데이터를 분석하여 조직 문화 개선을 위한 인사이트 도출 지원." },
    ],
  },
]

export default function ServiceSection() {
  const [activeId, setActiveId] = useState("approval")
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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#d9fff2]/70 via-white to-white" />

        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
          <div
              className={`text-center mb-8 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="text-xl md:text-3xl font-bold text-gray-900">
              제공되는 서비스를 확인하세요.
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
                            ? "bg-[#00cc99] text-white shadow-lg shadow-[#00cc99]/25 scale-105"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm hover:scale-105"
                    }`}
                >
                  {tab.label}
                </button>
            ))}
          </div>

          <div
              className={`bg-gray-50 rounded-2xl p-6 md:p-10 shadow-sm transition-all duration-700 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div
                key={activeId}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-service-slide"
            >
              <div className="space-y-6 max-w-[540px] lg:pr-8">
                <div>
                  <p className="text-[#00cc99] text-sm font-semibold mb-2">
                    {activeService.eyebrow}
                  </p>

                  <p className="text-sm text-gray-400 font-bold mb-1">
                    {activeService.number}
                  </p>

                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                    {activeService.title}
                  </h3>
                </div>

                <ul className="space-y-4 text-gray-700 leading-relaxed">
                  {activeService.items.map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <span className="mt-2 w-2 h-2 bg-[#00cc99] rounded-full shrink-0" />
                        <span>
                      <strong>{item.title}</strong>: {item.desc}
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