"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpenText, MessageSquareText } from "lucide-react";
import { HELP_LINKS, SectionTitle, SupportFrame, SupportHero } from "../_components/support-ui";

export default function SupportHelpPage() {
  return (
    <>
      <SupportHero
        eyebrow="Online Help"
        title="온라인 도움말"
        description="에버타임 설정과 운영에 필요한 주요 도움말을 주제별로 확인하세요. 자세한 문서는 새 창으로 열립니다."
      />
      <SupportFrame activeHref="/support/help">
        <SectionTitle
          label="Guide"
          title="운영 가이드"
          description="관리자가 자주 확인하는 설정 문서를 모았습니다."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {HELP_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#03b565]/40 hover:shadow-lg"
            >
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#03b565]">
                <BookOpenText className="h-5 w-5" />
              </span>
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-black leading-7 text-slate-950">{item.title}</h2>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-300 transition-colors group-hover:text-[#03b565]" />
              </div>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{item.description}</p>
            </a>
          ))}
        </div>

        <section className="mt-8 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black text-[#03b565]">Need More Help?</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">도움말로 해결되지 않았나요?</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">FAQ를 확인하거나 1:1 문의를 남겨주시면 담당자가 확인 후 안내드립니다.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/support/faq" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800 hover:border-[#03b565] hover:text-[#03b565]">
                FAQ 보기
              </Link>
              <Link href="/support/inquiry" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-[#03b565]">
                <MessageSquareText className="h-4 w-4" />
                문의하기
              </Link>
            </div>
          </div>
        </section>
      </SupportFrame>
    </>
  );
}

