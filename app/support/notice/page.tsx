"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Megaphone } from "lucide-react";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { PagedPostRequestDto, PagedPostsDto, PostDto, PostSearchKeywordType, PostType } from "@/types/Posts";
import { EmptyState, formatSupportDate, Pager, SearchPanel, SectionTitle, SupportFrame, SupportHero } from "../_components/support-ui";

const PAGE_SIZE = 10;

export default function SupportNoticePage() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [result, setResult] = useState<PagedPostsDto>({
    posts: [],
    pagination: { currentPage: 0, totalCount: 0, totalPage: 0 },
  });

  useEffect(() => {
    const loadNotices = async () => {
      const params: PagedPostRequestDto = {
        postType: PostType.Notice,
        searchOption: PostSearchKeywordType.TitleOrSearchText,
        keyword,
        pageNumber: page,
        pageSize: PAGE_SIZE,
      };

      const apiResult = await Api.Posts.getPagedNoticePosts(params);
      if (checkApiResult(apiResult)) {
        const payload: any = apiResult?.payload;
        setResult({
          posts: payload?.list || [],
          pagination: {
            currentPage: payload?.currentPage || 0,
            totalCount: payload?.totalCount || 0,
            totalPage: payload?.totalPages || 0,
          },
        });
      }
    };

    loadNotices();
  }, [keyword, page]);

  const handleSearch = (value: string) => {
    setKeyword(value);
    setPage(0);
  };

  return (
    <>
      <SupportHero
        eyebrow="Notice"
        title="공지사항"
        description="서비스 업데이트, 점검, 운영 안내 등 중요한 소식을 확인하세요."
      />
      <SupportFrame activeHref="/support/notice">
        <SectionTitle
          label="Notice List"
          title="공지사항"
          description="최신 공지와 서비스 안내를 확인할 수 있습니다."
        />

        <SearchPanel value={keyword} onChange={handleSearch} placeholder="공지사항을 검색하세요." />

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-[88px_1fr_132px] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 text-sm font-black text-slate-500 max-md:hidden">
            <span>번호</span>
            <span>제목</span>
            <span className="text-right">등록일</span>
          </div>

          {result.posts.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {result.posts.map((post) => (
                <Link
                  key={post.id}
                  href={post.id ? `/support/notice/${post.id}` : "/support/notice"}
                  className="grid w-full gap-3 px-5 py-5 text-left transition-colors hover:bg-emerald-50/40 md:grid-cols-[88px_1fr_132px] md:items-center md:gap-4"
                >
                  <span className="text-sm font-black text-slate-400">#{post.postNo || post.id}</span>
                  <span className="min-w-0 text-base font-black text-slate-950">
                    {post.options ? <span className="mr-2 rounded-full bg-[#03b565] px-2 py-1 text-xs text-white">NEW</span> : null}
                    {post.title}
                  </span>
                  <span className="text-sm font-semibold text-slate-500 md:text-right">{formatSupportDate(post.registerDate)}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6">
              <EmptyState title="등록된 공지사항이 없습니다." description="새로운 공지가 등록되면 이곳에 표시됩니다." />
            </div>
          )}
        </div>

        {keyword ? (
          <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
            <Megaphone className="h-4 w-4 text-[#03b565]" />
            검색 결과 {result.pagination.totalCount.toLocaleString()}건
          </p>
        ) : null}

        <Pager currentPage={page} totalPage={result.pagination.totalPage} onChange={setPage} />
      </SupportFrame>
    </>
  );
}
