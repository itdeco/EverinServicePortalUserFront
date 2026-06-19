import { Fragment } from "react"
import { CheckCircle2, MinusCircle, Sparkles, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"

type Availability = "included" | "partial" | "excluded" | "planned"

type CompareRow = {
  category: string
  service: string
  standard: Availability
  enterprise: Availability
}

const compareRows: CompareRow[] = [
  { category: "PC(관리자)", service: "출근부", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "근태신청", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "근태기준관리", standard: "partial", enterprise: "included" },
  { category: "PC(관리자)", service: "근태운영설정", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "근무시간 템플릿관리", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "근무유형관리", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "연차기준등록", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "보상휴가기준", standard: "excluded", enterprise: "included" },
  { category: "PC(관리자)", service: "조직관리", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "근태신청조회", standard: "partial", enterprise: "included" },
  { category: "PC(관리자)", service: "연차", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "보상휴가", standard: "excluded", enterprise: "included" },
  { category: "PC(관리자)", service: "기타휴가", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "경조휴가", standard: "excluded", enterprise: "included" },
  { category: "PC(관리자)", service: "부재", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "연장근무", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "대체휴일", standard: "excluded", enterprise: "included" },
  { category: "PC(관리자)", service: "근무시간변경", standard: "excluded", enterprise: "included" },
  { category: "PC(관리자)", service: "근무조정", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "출퇴근시간변경", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "휴직", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "연차사용계획", standard: "excluded", enterprise: "included" },
  { category: "PC(관리자)", service: "휴가발생조회", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "근무내역관리", standard: "partial", enterprise: "included" },
  { category: "PC(관리자)", service: "출퇴근내역관리", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "비근무내역(휴가/부재)관리", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "연장근무내역관리", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "근무조정내역관리", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "개인별근무조정등록", standard: "excluded", enterprise: "included" },
  { category: "PC(관리자)", service: "휴직내역관리", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "근태일마감", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "사원별근무일정생성", standard: "excluded", enterprise: "included" },
  { category: "PC(관리자)", service: "연차관리", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "보상휴가발생처리", standard: "excluded", enterprise: "included" },
  { category: "PC(관리자)", service: "기타휴가관리", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "연차촉진 1,2차(담당자 강제지정)", standard: "planned", enterprise: "included" },
  { category: "PC(관리자)", service: "근태현황", standard: "included", enterprise: "included" },
  { category: "PC(관리자)", service: "급여근태", standard: "planned", enterprise: "included" },
  { category: "모바일(사용자)", service: "근태체크", standard: "included", enterprise: "included" },
  { category: "모바일(사용자)", service: "근태신청", standard: "included", enterprise: "included" },
  { category: "모바일(사용자)", service: "간편결재", standard: "included", enterprise: "included" },
  { category: "모바일(사용자)", service: "알림", standard: "included", enterprise: "included" },
  { category: "모바일(사용자)", service: "연차촉진확인, 계획신청(노무수령거부)", standard: "planned", enterprise: "included" },
  { category: "추가기능", service: "에버웰커밍 연동(무료사용 이벤트)", standard: "included", enterprise: "included" },
  { category: "추가기능", service: "PC-OFF 연동(사용료 추가)", standard: "planned", enterprise: "included" },
  { category: "추가기능", service: "출입시스템 연동(세콤/캡스)", standard: "excluded", enterprise: "included" },
  { category: "추가기능", service: "인사, 에버평가, 전자계약 연동(사용료 추가)", standard: "excluded", enterprise: "included" },
  { category: "추가기능", service: "영림원ERP 연동", standard: "included", enterprise: "included" },
  { category: "추가기능", service: "타사 ERP 연동(추가비용 발생)", standard: "excluded", enterprise: "included" },
  { category: "추가기능", service: "커스터마이징(추가비용 발생)", standard: "excluded", enterprise: "included" },
]

const categories = Array.from(new Set(compareRows.map((row) => row.category)))
const groupedRows = categories.map((category) => ({
  category,
  rows: compareRows.filter((row) => row.category === category),
}))

const statusMeta = {
  included: {
    label: "제공",
    Icon: CheckCircle2,
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  partial: {
    label: "일부 제공",
    Icon: MinusCircle,
    className: "border-sky-200 bg-sky-50 text-sky-700",
  },
  excluded: {
    label: "미제공",
    Icon: XCircle,
    className: "border-slate-200 bg-slate-50 text-slate-400",
  },
  planned: {
    label: "추가 예정",
    Icon: Sparkles,
    className: "border-amber-100 bg-amber-50 text-amber-700",
  },
} satisfies Record<Availability, { label: string; Icon: typeof CheckCircle2; className: string }>

const highlightItems = [
  {
    title: "Standard",
    badge: "기본형",
    tone: "standard",
    description: "출퇴근, 연차, 근태신청, 모바일 사용까지 기본 근태관리에 필요한 핵심 기능을 제공합니다.",
    points: ["빠른 도입", "기본 정책 관리", "모바일 근태"],
  },
  {
    title: "Enterprise",
    badge: "확장형",
    tone: "enterprise",
    description: "보상휴가, 경조휴가, 연차촉진, 출입시스템/ERP 연동, 커스터마이징까지 확장합니다.",
    points: ["복잡한 휴가 정책", "외부 시스템 연동", "커스터마이징"],
  },
]

function AvailabilityBadge({ value }: { value: Availability }) {
  const { label, Icon, className } = statusMeta[value]

  return (
    <span
      className={cn(
        "inline-flex min-w-[92px] items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-black",
        className,
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </span>
  )
}

export default function EvertimeCompareSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_52%,#f5fbf8_100%)] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
      <div className="mx-auto max-w-[1280px] px-4 md:px-8 lg:px-12">
        <div className="relative text-center">
          <h2 className="break-keep text-[30px] font-black leading-tight text-slate-950 md:text-[44px]">
            우리 회사에 맞는 에버타임을 비교해보세요.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl break-keep text-base font-semibold leading-relaxed text-slate-600 md:text-lg">
            기본 근태관리는 에버타임 Standard로 충분하게, 복잡한 휴가 정책과 외부 시스템 연동은 에버타임 Enterprise로 더 넓게 운영할 수 있습니다.
          </p>
        </div>

        <div className="relative mt-10 grid gap-4 md:grid-cols-2">
          {highlightItems.map((item) => (
            <div
              key={item.title}
              className={cn(
                "group relative overflow-hidden rounded-lg border bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_46px_rgba(15,23,42,0.09)]",
                item.tone === "enterprise"
                  ? "border-[#03b565]/30"
                  : "border-slate-200",
              )}
            >
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-1",
                  item.tone === "enterprise"
                    ? "bg-[#03b565]"
                    : "bg-[#3344e6]",
                )}
              />
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-[26px] font-black leading-tight text-slate-950 md:text-[30px]">에버타임 {item.title}</h3>
                <span
                  className={cn(
                    "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-black",
                    item.tone === "enterprise"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-indigo-200 bg-indigo-50 text-indigo-700",
                  )}
                >
                  {item.badge}
                </span>
              </div>
              <p className="mt-5 break-keep text-lg font-medium leading-relaxed text-slate-600">{item.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.points.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2.5 text-base font-black text-slate-700"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-8 hidden overflow-hidden rounded-lg border border-slate-500 bg-gray-700 shadow-[0_18px_55px_rgba(15,23,42,0.08)] md:block">
          <div className="flex items-center justify-between border-b border-slate-500 bg-gray-700 px-6 py-5">
            <div>
              <h3 className="text-xl font-black text-slate-950">기능 비교표</h3>
              <p className="mt-1 text-base font-semibold text-slate-500">카테고리별 제공 범위를 한눈에 확인하세요.</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-black text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              에버타임 Enterprise 확장 기능 포함
            </div>
          </div>
          <div className="max-h-[760px] overflow-auto">
          <table className="w-full table-fixed border-collapse">
            <colgroup>
              <col className="w-[140px] lg:w-[170px]" />
              <col />
              <col className="w-[180px] lg:w-[220px]" />
              <col className="w-[180px] lg:w-[220px]" />
            </colgroup>
            <thead>
              <tr className="sticky top-0 z-10 bg-slate-950 text-left text-base font-black text-white shadow-sm">
                <th className="px-6 py-5">구분</th>
                <th className="px-6 py-5">제공 서비스</th>
                <th className="px-6 py-5 text-center">에버타임<br/>Standard</th>
                <th className="px-6 py-5 text-center">에버타임<br/>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {groupedRows.map((group) => (
                <Fragment key={group.category}>
                  <tr key={`${group.category}-header`} className="border-y border-slate-200 bg-slate-50">
                    <td colSpan={4} className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="h-5 w-1.5 rounded-full bg-[#03b565]" />
                        <span className="text-lg font-black text-slate-900">{group.category}</span>
                      </div>
                    </td>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={`${row.category}-${row.service}`} className="border-b border-slate-100 bg-white transition-colors hover:bg-[#f6fffb]">
                      <td className="px-6 py-4 align-middle text-sm font-bold text-slate-300" />
                      <td className="break-keep px-6 py-4 align-middle text-base font-bold text-slate-900">{row.service}</td>
                      <td className="px-6 py-4 text-center align-middle">
                        <AvailabilityBadge value={row.standard} />
                      </td>
                      <td className="px-6 py-4 text-center align-middle">
                        <AvailabilityBadge value={row.enterprise} />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] md:hidden">
          <div className="divide-y divide-slate-100">
            {groupedRows.map((group) => (
              <div key={group.category}>
                <div className="flex items-center gap-3 bg-slate-50 px-5 py-4">
                  <span className="h-5 w-1.5 rounded-full bg-[#03b565]" />
                  <span className="text-lg font-black text-slate-900">{group.category}</span>
                </div>
                {group.rows.map((row) => (
                  <div key={`${row.category}-${row.service}`} className="grid gap-4 px-5 py-4">
                    <div className="break-keep text-lg font-bold text-slate-900">{row.service}</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <span className="mb-2 block text-sm font-black text-slate-500">에버타임 Standard</span>
                        <AvailabilityBadge value={row.standard} />
                      </div>
                      <div className="rounded-lg border border-emerald-100 bg-emerald-50/40 p-3">
                        <span className="mb-2 block text-sm font-black text-emerald-700">에버타임 Enterprise</span>
                        <AvailabilityBadge value={row.enterprise} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 break-keep text-center text-sm font-medium text-slate-500">
          일부 기능은 연동 범위, 운영 정책, 추가 개발 여부에 따라 제공 방식이 달라질 수 있습니다.
        </p>
      </div>
    </section>
  )
}
