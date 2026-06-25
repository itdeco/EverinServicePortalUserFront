"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageSquareText } from "lucide-react";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { CommonCode } from "@/types/CommonCode";
import { FaqCommonCodeDto, PostDto } from "@/types/Posts";
import { cn } from "@/lib/utils";
import { EmptyState, Pager, SearchPanel, SectionTitle, SupportFrame, SupportHero } from "../_components/support-ui";

const PAGE_SIZE = 10;

type FaqItem = PostDto & { categoryName?: string };

export default function SupportFaqPage() {
  const [categories, setCategories] = useState<FaqCommonCodeDto[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    const loadFaqs = async () => {
      const result = await Api.Posts.getFaqPosts(CommonCode.Faq.type);
      if (checkApiResult(result)) {
        setCategories((result?.payload || []) as FaqCommonCodeDto[]);
      }
    };

    loadFaqs();
  }, []);

  const items = useMemo(() => {
    const source = selectedIndex < 0 ? categories : categories.slice(selectedIndex, selectedIndex + 1);
    const normalizedKeyword = keyword.trim().toLowerCase();

    return source.flatMap((category) =>
      (category.posts || [])
        .filter((post) => {
          if (!normalizedKeyword) return true;
          return [post.title, post.searchText, post.content, category.commonCodeName]
            .filter(Boolean)
            .some((value) => String(value).toLowerCase().includes(normalizedKeyword));
        })
        .map((post) => ({ ...post, categoryName: category.commonCodeName })),
    ) as FaqItem[];
  }, [categories, keyword, selectedIndex]);

  const totalPage = Math.ceil(items.length / PAGE_SIZE);
  const pageItems = items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const handleSearch = (value: string) => {
    setKeyword(value);
    setPage(0);
  };

  const handleCategory = (index: number) => {
    setSelectedIndex(index);
    setPage(0);
  };

  const increaseView = async (post?: FaqItem) => {
    if (!post?.id) return;
    try {
      await Api.Posts.increasePostViewCount(post.id);
    } catch {
      // 조회수 증가는 실패해도 화면 이용을 막지 않습니다.
    }
  };

  return (
    <>
      <SupportHero
        eyebrow="FAQ"
        title="자주 묻는 질문"
        description="에버타임 이용 중 자주 접수되는 질문을 카테고리별로 확인하세요."
      />
      <SupportFrame activeHref="/support/faq">
        <SectionTitle
          label="Question List"
          title="FAQ"
          description="궁금한 내용을 검색하거나 카테고리를 선택해 확인할 수 있습니다."
          action={
            <Link href="/support/inquiry" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-[#03b565]">
              <MessageSquareText className="h-4 w-4" />
              1:1 문의
            </Link>
          }
        />

        <SearchPanel value={keyword} onChange={handleSearch} placeholder="궁금한 내용을 검색하세요." />

        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleCategory(-1)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-black transition-colors",
              selectedIndex < 0 ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-[#03b565] hover:text-[#03b565]",
            )}
          >
            전체
          </button>
          {categories.map((category, index) => (
            <button
              key={`${category.commonCodeId}-${index}`}
              type="button"
              onClick={() => handleCategory(index)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-black transition-colors",
                selectedIndex === index ? "border-[#03b565] bg-emerald-50 text-[#03b565]" : "border-slate-200 bg-white text-slate-600 hover:border-[#03b565] hover:text-[#03b565]",
              )}
            >
              {category.commonCodeName}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {pageItems.length > 0 ? (
            pageItems.map((post) => (
              <details
                key={post.id || `${post.categoryName}-${post.title}`}
                className="group rounded-2xl border border-slate-200 bg-white shadow-sm open:border-[#03b565]/40"
                onToggle={(event) => {
                  if ((event.currentTarget as HTMLDetailsElement).open) increaseView(post);
                }}
              >
                <summary className="flex cursor-pointer list-none items-center gap-5 px-5 py-5">
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 text-xs font-black text-[#03b565]">{post.categoryName || "FAQ"}</p>
                    <h2 className="text-base font-black leading-7 text-slate-950">{post.title}</h2>
                  </div>
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-slate-100 px-5 py-5 text-sm font-medium leading-7 text-slate-600">
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content || post.searchText || "" }} />
                </div>
              </details>
            ))
          ) : (
            <EmptyState title="검색 결과가 없습니다." description="다른 검색어를 입력하거나 1:1 문의를 이용해주세요." />
          )}
        </div>

        <Pager currentPage={page} totalPage={totalPage} onChange={setPage} />
      </SupportFrame>
    </>
  );
}
