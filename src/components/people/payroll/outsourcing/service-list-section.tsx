"use client";

const GREEN = "#00b386";

type ServiceGroup = {
  title: string;
  items: string[];
  span?: string;
};

const row1: ServiceGroup[] = [
  {
    title: "근로소득 신고대행(재직자)",
    items: [
      "원천징수 이행상황 신고서",
      "지방소득세 특별징수 신고",
      "주민세(종업원분) 신고",
      "근로소득 간이지급명세서 제출",
    ],
  },
  {
    title: "4대보험 통합 관리 대행",
    items: ["4대보험 자격변동 신고", "가입자 내용변경 신고", "사업장 내용변경 신고"],
  },
  {
    title: "국민연금 업무 대행",
    items: ["휴직자 납부예외 및 재개 신고", "보수월액 변경 신고", "개인별 고지내역 요청 및 관리"],
  },
  {
    title: "건강보험 업무 대행",
    items: [
      "휴직자 납부유예 및 재개 신고",
      "피부양자 등록·변경 신고",
      "보수월액 및 보수총액 신고",
      "개인별 고지내역 관리",
    ],
  },
];

const row2: ServiceGroup[] = [
  {
    title: "고용보험 업무 대행",
    items: [
      "근로내용 확인 신고",
      "육아휴직 확인서 및 이직확인서 제출",
      "고용보험 보수총액 신고",
      "보수월액 변경 신고",
    ],
    span: "lg:col-span-3",
  },
  {
    title: "홈택스(이택스) 신고 대행",
    items: [
      "사업소득 간이지급명세서",
      "일용근로 지급명세서",
      "사업소득(기타소득·배당소득) 지급명세서",
      "비거주자 배당소득 원천세 신고",
      "퇴직소득 지급명세서 신고",
    ],
    span: "lg:col-span-6",
  },
  {
    title: "기타 신고 업무 대행",
    items: [
      "국민연금 분리적용 사업장 신고",
      "건강보험 모·단위사업장 신고",
      "산재보험 사업개시 신고",
      "기타 수정 신고 등 추가 업무 대행",
    ],
    span: "lg:col-span-3",
  },
];

function ServiceCard({ group }: { group: ServiceGroup }) {
  return (
    <div className={group.span ?? "lg:col-span-3"}>
      <div className="rounded-xl bg-gray-100 px-5 py-4">
        <h3 className="text-base md:text-lg font-bold text-[#1f2d4d]">{group.title}</h3>
      </div>
      <ul className="mt-5 space-y-3 px-2">
        {group.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm md:text-base text-gray-600">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: GREEN }}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function OutsourcingServiceListSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <h2 className="text-center text-2xl md:text-[32px] font-bold text-gray-900 mb-12 md:mb-16">
          제공되는 서비스를 확인하세요.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 mb-10">
          {row1.map((g) => (
            <ServiceCard key={g.title} group={g} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10">
          {row2.map((g) => (
            <ServiceCard key={g.title} group={g} />
          ))}
        </div>
      </div>
    </section>
  );
}
