"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit3, LockKeyhole, MessageSquareText, X } from "lucide-react";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { PagedPostRequestDto, PagedPostsDto, PostDto, PostSearchKeywordType, PostType } from "@/types/Posts";
import { useLoginStatus } from "@/redux/selectors/Users";
import { EmptyState, formatSupportDate, Pager, SearchPanel, SectionTitle, SupportFrame, SupportHero } from "../_components/support-ui";

const PAGE_SIZE = 10;

function InquiryDetailModal({ post, onClose }: { post: PostDto | null; onClose: () => void }) {
  if (!post) return null;
  const reply = post.children?.[0];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur-sm">
      <button type="button" aria-label="닫기" className="absolute inset-0 cursor-default" onClick={onClose} />
      <article className="relative flex max-h-[86vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-5 border-b border-slate-200 px-6 py-5">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-[#03b565]">Inquiry</p>
            <h3 className="text-xl font-black leading-7 text-slate-950">{post.title}</h3>
            <p className="mt-2 text-sm font-semibold text-slate-500">{post.commonCodeName || "문의"} · {formatSupportDate(post.registerDate)}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-950"
          >
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-auto p-6">
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="mb-3 text-sm font-black text-slate-950">문의 내용</p>
            <iframe title="문의 내용" srcDoc={post.content || post.searchText || ""} className="h-64 w-full border-0 bg-white" />
          </section>
          {reply ? (
            <section className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
              <p className="mb-3 text-sm font-black text-[#03b565]">답변 내용</p>
              <iframe title="답변 내용" srcDoc={reply.content || reply.searchText || ""} className="h-64 w-full border-0 bg-white" />
            </section>
          ) : (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm font-semibold text-slate-500">
              현재 답변 접수 대기 상태입니다.
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default function SupportInquiryPage() {
  const isLoggedIn = Boolean(useLoginStatus());
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState<PostDto | null>(null);
  const [result, setResult] = useState<PagedPostsDto>({
    posts: [],
    pagination: { currentPage: 0, totalCount: 0, totalPage: 0 },
  });

  useEffect(() => {
    if (!isLoggedIn) return;

    const loadInquiries = async () => {
      const params: PagedPostRequestDto = {
        postType: PostType.Inquiry,
        searchOption: PostSearchKeywordType.TitleOrSearchText,
        keyword,
        pageNumber: page,
        pageSize: PAGE_SIZE,
      };

      const apiResult = await Api.Posts.getPagedInquiryPosts(params);
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

    loadInquiries();
  }, [isLoggedIn, keyword, page]);

  const handleSearch = (value: string) => {
    setKeyword(value);
    setPage(0);
  };

  return (
    <>
      <SupportHero
        eyebrow="Inquiry"
        title="1:1 문의"
        description="문의 내역을 확인하고, 필요한 경우 새 문의를 등록할 수 있습니다."
      />
      <SupportFrame activeHref="/support/inquiry">
        <SectionTitle
          label="My Inquiry"
          title="문의 내역"
          description="접수한 문의와 답변 상태를 확인하세요."
          action={
            isLoggedIn ? (
              <Link href="/support/inquiry/write" className="inline-flex items-center gap-2 rounded-full bg-[#03b565] px-5 py-3 text-sm font-black text-white transition-colors hover:bg-[#029d58]">
                <Edit3 className="h-4 w-4" />
                문의 작성
              </Link>
            ) : null
          }
        />

        {!isLoggedIn ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-[#03b565]">
              <LockKeyhole className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-2xl font-black text-slate-950">로그인이 필요합니다.</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">1:1 문의 내역 확인과 문의 작성은 로그인 후 이용할 수 있습니다.</p>
            <Link href="/login?url=/support/inquiry" className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white hover:bg-[#03b565]">
              로그인하기
            </Link>
          </div>
        ) : (
          <>
            <SearchPanel value={keyword} onChange={handleSearch} placeholder="문의 제목이나 내용을 검색하세요." />

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {result.posts.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {result.posts.map((post) => {
                    const answered = Boolean(post.children?.length);
                    return (
                      <button
                        key={post.id}
                        type="button"
                        onClick={() => setSelectedPost(post)}
                        className="grid w-full gap-3 px-5 py-5 text-left transition-colors hover:bg-emerald-50/40 md:grid-cols-[1fr_120px_120px] md:items-center"
                      >
                        <span className="min-w-0">
                          <span className="mb-2 flex flex-wrap items-center gap-2">
                            {post.commonCodeName ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">{post.commonCodeName}</span> : null}
                            <span className={answered ? "rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-[#03b565]" : "rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500"}>
                              {answered ? "답변완료" : "접수"}
                            </span>
                          </span>
                          <span className="block truncate text-base font-black text-slate-950">{post.title}</span>
                        </span>
                        <span className="text-sm font-semibold text-slate-500">{formatSupportDate(post.registerDate)}</span>
                        <span className="text-sm font-black text-[#03b565] md:text-right">상세보기</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6">
                  <EmptyState title="문의 내역이 없습니다." description="궁금한 점이 있다면 새 문의를 작성해주세요." />
                </div>
              )}
            </div>

            <Pager currentPage={page} totalPage={result.pagination.totalPage} onChange={setPage} />
          </>
        )}
      </SupportFrame>

      <InquiryDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </>
  );
}
