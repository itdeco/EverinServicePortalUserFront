"use client";

import {
  MonitorCheck,
  HandCoins,
  MonitorCog,
  Users,
  ShieldCheck,
  Calculator,
  Activity,
} from "lucide-react";

const GREEN = "#3344e6";

const focusCards = [
  {
    title: "급여 셀프서비스",
    desc: "직원이 직접 급여조회 및 신청 가능",
    icon: MonitorCheck,
  },
  {
    title: "급여 아웃소싱",
    desc: "세법 전문 컨설턴트가 급여 업무 수행",
    icon: HandCoins,
  },
];

const benefits = [
  { icon: MonitorCog, text: "31년 ERP 전문기업이\n직접 만든 안정적인 솔루션" },
  { icon: Users, text: "공차, 윈윈스포츠 등\n다수의 고객사가 선택한 서비스" },
  { icon: ShieldCheck, text: "세법 전문가의\n즉각적인 대응과 지원" },
  { icon: Calculator, text: "복잡한 수당을 한 번에\n계산하는 완전 자동화 시스템" },
  { icon: Activity, text: "실시간으로 진행과정을\n확인하는 모니터링 시스템" },
];

export default function OutsourcingFocusSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        {/* 위 사례들에 공감하셨나요? */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-[32px] font-bold text-gray-900">위 사례들에 공감하셨나요?</h2>
          <p className="mt-2 text-base md:text-lg text-gray-500">본연의 업무에만 집중하세요!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20 md:mb-28">
          {focusCards.map(({ title, desc, icon: Icon }) => (
            <div
              key={title}
              className="relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 p-7 md:p-9 min-h-[200px] flex flex-col"
            >
              <h3 className="text-lg md:text-xl font-bold text-gray-900">{title}</h3>
              <p className="mt-3 text-sm md:text-base text-gray-500">{desc}</p>
              <Icon
                className="absolute bottom-5 right-6 h-16 w-16 md:h-20 md:w-20 opacity-90"
                style={{ color: GREEN }}
                strokeWidth={1.4}
              />
            </div>
          ))}
        </div>

        {/* HR 업무, 복잡함을 덜고 효율을 더하다 */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-[32px] font-bold text-gray-900">
            HR 업무, 복잡함을 덜고 효율을 더하다
          </h2>
          <p className="mt-2 text-base md:text-lg text-gray-500">지금, 더 똑똑한 방법으로 바꿔보세요.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {benefits.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white px-4 py-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(51,68,230,0.1)" }}
              >
                <Icon className="h-7 w-7" style={{ color: GREEN }} strokeWidth={1.6} />
              </div>
              <p className="mt-5 text-center text-sm md:text-base font-semibold text-gray-700 leading-relaxed whitespace-pre-line">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
