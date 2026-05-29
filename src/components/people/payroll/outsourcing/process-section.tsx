"use client";

import { Building2, Boxes, CircleDot, FileCheck2, ArrowDown, ArrowRight, ArrowLeftRight } from "lucide-react";

const GREEN = "#00b386";

const actors = [
  { icon: Building2, label: "고객사" },
  { icon: Boxes, label: "영림원소프트랩" },
  { icon: CircleDot, label: "에버페이롤" },
  { icon: FileCheck2, label: "세무법인" },
];

function StepBox({
  title,
  desc,
}: {
  title: string;
  desc?: string;
}) {
  return (
    <div className="rounded-xl bg-[#eaf7f1] border border-[#cdeadd] px-4 py-4 text-center shadow-sm">
      <p className="text-sm md:text-base font-bold text-gray-800 leading-snug">{title}</p>
      {desc && <p className="mt-1 text-xs text-gray-500 leading-snug">{desc}</p>}
    </div>
  );
}

export default function OutsourcingProcessSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <h2 className="text-center text-2xl md:text-[32px] font-bold text-gray-900 mb-10 md:mb-14">
          급여관리 시스템 프로세스
        </h2>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 md:p-10 shadow-sm">
          {/* Actor headers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {actors.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-2 rounded-xl bg-gray-100 py-3 px-2"
              >
                <Icon className="h-5 w-5" style={{ color: GREEN }} />
                <span className="text-sm md:text-base font-semibold text-gray-700">{label}</span>
              </div>
            ))}
          </div>

          {/* Flow (desktop swimlane) */}
          <div className="hidden md:block">
            <div className="mt-8 grid grid-cols-4 gap-x-6">
              {/* Row 1: 월 변동자료 요청 (col2) */}
              <div />
              <div>
                <StepBox title="월 변동자료 요청" />
              </div>
              <div />
              <div />

              {/* connector row */}
              <div className="flex items-end justify-center pt-2">
                <ArrowDown className="h-6 w-6 mb-1" style={{ color: GREEN }} />
              </div>
              <div />
              <div />
              <div />

              {/* Row 2: 자료 준비 <-> 자료 확인 */}
              <div className="pt-2">
                <StepBox title="자료 준비" desc="(입/퇴사자 급여변동자료 등)" />
              </div>
              <div className="flex items-center pt-2">
                <ArrowLeftRight className="h-6 w-6 mx-1 shrink-0" style={{ color: GREEN }} />
                <div className="flex-1">
                  <StepBox title="자료 확인" />
                </div>
                <div className="flex flex-col items-center px-1">
                  <span className="text-[11px] font-semibold whitespace-nowrap" style={{ color: GREEN }}>
                    Data gathering
                  </span>
                  <span className="text-[11px] font-semibold" style={{ color: GREEN }}>
                    (RPA)
                  </span>
                </div>
              </div>
              <div className="flex items-center pt-2">
                <ArrowRight className="h-6 w-6 shrink-0" style={{ color: GREEN }} />
              </div>
              <div />

              {/* Row 3: 페이롤 자료 등록 (col3) */}
              <div />
              <div />
              <div className="pt-4">
                <StepBox title="페이롤 자료 등록" />
              </div>
              <div />

              {/* connector to 결과 검수 */}
              <div />
              <div className="flex justify-center pt-2">
                <ArrowDown className="h-6 w-6" style={{ color: GREEN }} />
              </div>
              <div className="flex justify-center pt-2">
                <ArrowDown className="h-6 w-6" style={{ color: GREEN }} />
              </div>
              <div />

              {/* Row 4: 결과 검수 및 보고 (col2) */}
              <div />
              <div className="pt-2">
                <StepBox title="결과 검수 및 보고" />
              </div>
              <div />
              <div />

              {/* connectors: to 아웃소싱 결과확인 (col1) and 세무신고 (col4) */}
              <div className="flex flex-col items-center justify-start pt-2">
                <span className="text-[11px] font-semibold" style={{ color: GREEN }}>
                  Report
                </span>
                <span className="text-[11px] font-semibold whitespace-nowrap" style={{ color: GREEN }}>
                  (Email/Web)
                </span>
                <ArrowDown className="h-6 w-6 mt-1" style={{ color: GREEN }} />
              </div>
              <div />
              <div />
              <div className="flex justify-center pt-2">
                <ArrowDown className="h-6 w-6" style={{ color: GREEN }} />
              </div>

              {/* Row 5: 아웃소싱 결과 확인 (col1) + 세무신고/4대보험 (col4) */}
              <div className="pt-2">
                <StepBox title="아웃소싱 결과 확인" />
              </div>
              <div />
              <div />
              <div className="pt-2 space-y-3">
                <StepBox title="세무신고" desc="원천세, 지방소득세, 주민세(종업원분), 간이지급명세, 연말정산 등" />
                <StepBox title="4대보험신고" desc="취득/상실, 피부양자, 보수총액 등" />
              </div>
            </div>
          </div>

          {/* Flow (mobile stacked) */}
          <div className="md:hidden mt-8 flex flex-col items-center gap-3">
            {[
              { t: "월 변동자료 요청" },
              { t: "자료 준비", d: "(입/퇴사자 급여변동자료 등)" },
              { t: "자료 확인" },
              { t: "페이롤 자료 등록" },
              { t: "결과 검수 및 보고" },
              { t: "아웃소싱 결과 확인" },
              { t: "세무신고", d: "원천세, 지방소득세, 주민세(종업원분) 등" },
              { t: "4대보험신고", d: "취득/상실, 피부양자, 보수총액 등" },
            ].map((s, i) => (
              <div key={s.t} className="w-full max-w-sm flex flex-col items-center">
                <div className="w-full">
                  <StepBox title={s.t} desc={s.d} />
                </div>
                {i < 7 && <ArrowDown className="h-5 w-5 my-1" style={{ color: GREEN }} />}
              </div>
            ))}
          </div>

          {/* Footer label */}
          <div className="mt-10 rounded-xl bg-gray-100 py-4 text-center">
            <span className="text-sm md:text-base font-semibold text-gray-600">
              [에버페이롤 아웃소싱 업무 구성도]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
