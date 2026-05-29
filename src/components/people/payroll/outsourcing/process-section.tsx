"use client";

import Image from "next/image";

export default function OutsourcingProcessSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <h2 className="text-center text-2xl md:text-[32px] font-bold text-gray-900 mb-10 md:mb-14">
          급여관리 시스템 프로세스
        </h2>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 md:p-10 shadow-sm">
          <Image
            src="/images/people/payroll/outsourcing/paysystem.png"
            alt="에버페이롤 아웃소싱 업무 구성도"
            width={1200}
            height={900}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
