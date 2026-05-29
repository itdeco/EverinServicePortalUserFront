"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";

const GREEN = "#00b386";

const tabs = [
  { id: "launch", label: "서비스 론칭 절차" },
  { id: "monthly", label: "월 급여 서비스" },
  { id: "retire", label: "퇴직자 서비스" },
  { id: "yearend", label: "연말정산 서비스" },
];

type Step = {
  stage: string;
  title: string;
  rows: { subject: string; features: string[] }[];
};

const launchSteps: Step[] = [
  {
    stage: "1단계",
    title: "고객 환경 조사 및\n데이터 수집",
    rows: [
      {
        subject: "준비자료 수집",
        features: ["초기설문지&업로드 양식", "계약년도급상여대장 및 퇴직자(중도 연말정산, 퇴직금)"],
      },
      { subject: "자료 분석", features: ["설문지 및 업로드 내용 분석"] },
      { subject: "방문", features: ["설문지 검토내역 질의응답"] },
    ],
  },
  {
    stage: "2단계",
    title: "실 데이터\n시뮬레이션",
    rows: [
      { subject: "시뮬레이션 준비", features: ["고객사 환경에 맞는 서비스 프로그램 설정"] },
      { subject: "데이터 업로드", features: ["부서, 조직정보", "사원정보", "급상여대장", "퇴직자(중도 연말정산, 퇴직금)"] },
      { subject: "데이터 검증", features: ["실 데이터와 서비스 데이터 비교(급상여, 퇴직금 등)"] },
      { subject: "교육", features: ["사용법 안내 및 매뉴얼 배포"] },
      { subject: "서비스 채널 생성", features: ["소통 채널 생성(에버톡, 서비스포털)"] },
    ],
  },
  {
    stage: "3단계",
    title: "서비스 론칭",
    rows: [
      { subject: "급여자료 접수", features: ["신규사원정보", "퇴직사원정보", "변동 급여", "월별 특이사항"] },
      { subject: "급여계산결과 통보", features: ["급여 작업 결과 고객사 검토 요청"] },
      { subject: "계산결과 확정", features: ["검토 후 이상 없는 경우 최종 확정처리"] },
      { subject: "고객", features: ["급상여 결과 조회 및 대상출력", "급상여 명세서 발송(E-mail/카카오톡)"] },
      { subject: "신고", features: ["원천징수이행상황, 지방소득세특별징수 등 신고 진행", "보험 취득·상실신고"] },
    ],
  },
];

const monthlySteps = ["직원 변동자료 전달", "변동자료 검토/입력", "급여계산 및 확인", "급여명세서 발송"];
const yearendSteps = ["연말정산 안내 공지", "개인별 소득공제 등록 및 시뮬레이션", "연말정산 신고 및 결과 통보"];

function GreenEllipse({ stage, title }: { stage: string; title: string }) {
  return (
    <div
      className="flex h-36 w-36 shrink-0 flex-col items-center justify-center rounded-full text-center"
      style={{ backgroundColor: "rgba(0,179,134,0.12)" }}
    >
      <span
        className="mb-2 rounded-full px-3 py-1 text-xs font-bold text-white"
        style={{ backgroundColor: GREEN }}
      >
        {stage}
      </span>
      <p className="whitespace-pre-line text-sm font-bold text-gray-800 leading-snug px-2">{title}</p>
    </div>
  );
}

function HorizontalFlow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center lg:justify-center">
      {steps.map((s, i) => (
        <div key={s} className="flex flex-col items-center lg:flex-row">
          <div className="flex min-h-[88px] w-full lg:w-52 items-center justify-center rounded-2xl border border-[#cdeadd] bg-[#eaf7f1] px-5 py-5 text-center">
            <span className="text-sm md:text-base font-bold text-gray-800">{s}</span>
          </div>
          {i < steps.length - 1 && (
            <>
              <ArrowRight className="hidden lg:block mx-3 h-6 w-6 shrink-0" style={{ color: GREEN }} />
              <ChevronDown className="lg:hidden my-2 h-6 w-6" style={{ color: GREEN }} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default function OutsourcingServiceProcessSection() {
  const [active, setActive] = useState("launch");

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <h2 className="text-center text-2xl md:text-[32px] font-bold text-gray-900 mb-10 md:mb-14">
          서비스 절차
        </h2>

        {/* Tabs */}
        <div className="mb-10 grid grid-cols-2 gap-2 rounded-full bg-gray-200/60 p-1.5 md:flex md:gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              className={`flex-1 rounded-full px-4 py-3 text-sm md:text-base font-semibold transition-colors ${
                active === t.id ? "text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
              style={active === t.id ? { backgroundColor: GREEN } : undefined}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Launch steps */}
        {active === "launch" && (
          <div className="flex flex-col items-center">
            {launchSteps.map((step, idx) => (
              <div key={step.stage} className="w-full max-w-[1024px]">
                <div className="flex flex-col items-center gap-6 rounded-3xl border border-gray-200 bg-white p-6 md:flex-row md:gap-12 md:p-10">
                  <GreenEllipse stage={step.stage} title={step.title} />
                  <div className="flex-1 w-full space-y-4">
                    {step.rows.map((row) => (
                      <div key={row.subject} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
                        <span className="inline-flex w-full sm:w-40 shrink-0 items-center justify-center rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700">
                          {row.subject}
                        </span>
                        <ul className="flex-1 space-y-1.5 pt-1">
                          {row.features.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-sm md:text-base text-gray-600">
                              <span
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{ backgroundColor: GREEN }}
                              />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                {idx < launchSteps.length - 1 && (
                  <div className="flex justify-center py-5">
                    <ChevronDown className="h-7 w-7" style={{ color: GREEN }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Monthly */}
        {active === "monthly" && (
          <div>
            <p className="mb-10 text-center text-base md:text-lg font-semibold text-[#1f2d4d]">
              직원변동자료전달, 변동자료 검토/입력, 급여계산 및 확인, 급여명세서 발송
            </p>
            <HorizontalFlow steps={monthlySteps} />
          </div>
        )}

        {/* Retire */}
        {active === "retire" && (
          <div className="mx-auto max-w-[820px] rounded-3xl border border-gray-200 bg-white p-8 md:p-12 text-center">
            <p className="text-base md:text-lg font-semibold text-[#1f2d4d] leading-relaxed">
              퇴직일 기준 평균임금 적용, 퇴직연금 (DB형, DC형) 등<br className="hidden md:block" /> 모든 지급방식 적용 가능
            </p>
          </div>
        )}

        {/* Year-end */}
        {active === "yearend" && (
          <div>
            <p className="mb-10 text-center text-base md:text-lg font-semibold text-[#1f2d4d]">
              연말정산 안내 공지, 개인별 소득공제 등록 및 시뮬레이션, 연말정산 신고 및 결과 통보
            </p>
            <HorizontalFlow steps={yearendSteps} />
          </div>
        )}
      </div>
    </section>
  );
}
