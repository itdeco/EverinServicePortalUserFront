"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Download, Megaphone } from "lucide-react";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { PagedPostRequestDto, PostDto, PostSearchKeywordType, PostType } from "@/types/Posts";
import { formatSupportDate, SectionTitle, SupportFrame, SupportHero } from "../../_components/support-ui";

const RELATED_NOTICE_SIZE = 80;

export default function SupportNoticeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [notice, setNotice] = useState<PostDto | null>(null);
  const [notices, setNotices] = useState<PostDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const noticeId = Number(Array.isArray(params.id) ? params.id[0] : params.id);

  const relatedNotices = useMemo(() => {
    if (!notice?.id || notices.length === 0) {
      return [];
    }

    const currentIndex = notices.findIndex((item) => item.id === notice.id);
    if (currentIndex < 0) {
      return notices.filter((item) => item.id !== notice.id).slice(0, 6);
    }

    const previousNotices = notices.slice(Math.max(0, currentIndex - 3), currentIndex);
    const nextNotices = notices.slice(currentIndex + 1, currentIndex + 4);
    const items = [...previousNotices, ...nextNotices];

    if (items.length >= 6) {
      return items;
    }

    const fillItems = notices
      .filter((item) => item.id !== notice.id && !items.some((related) => related.id === item.id))
      .slice(0, 6 - items.length);

    return [...items, ...fillItems];
  }, [notice?.id, notices]);

  const iframeContent = useMemo(() => {
    const content = notice?.content || notice?.searchText || "";

    return `
      <html lang="ko">
        <head>
          <style>
            html, body {
              margin: 0;
              width: 100%;
              color: #334155;
              font-family: Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              font-size: 16px;
              line-height: 1.85;
              overflow-x: hidden;
            }
            * { box-sizing: border-box; max-width: 100%; }
            img { max-width: 100%; height: auto; }
            table { width: 100%; border-collapse: collapse; }
            a { color: #2563eb; text-decoration: underline; }
          </style>
        </head>
        <body><div>${content}</div></body>
      </html>
    `;
  }, [notice]);

  const resizeIframe = () => {
    const iframe = iframeRef.current;
    const iframeDocument = iframe?.contentDocument;
    if (!iframe || !iframeDocument) return;

    iframe.style.height = `${iframeDocument.body.scrollHeight + 32}px`;
  };

  useEffect(() => {
    const loadNoticeList = async () => {
      const params: PagedPostRequestDto = {
        postType: PostType.Notice,
        searchOption: PostSearchKeywordType.TitleOrSearchText,
        pageNumber: 0,
        pageSize: RELATED_NOTICE_SIZE,
      };

      const result = await Api.Posts.getPagedNoticePosts(params);
      if (!checkApiResult(result)) {
        return;
      }

      const payload: any = result?.payload;
      setNotices((payload?.list || []) as PostDto[]);
    };

    const loadNotice = async () => {
      try {
        const result = await Api.Posts.getNoticePost(noticeId);
        if (checkApiResult(result)) {
          const payload = (result?.payload || null) as PostDto | null;
          setNotice(payload);

          if (payload?.id) {
            Api.Posts.increasePostViewCount(payload.id).then();
          }
        }

        await loadNoticeList();
      } finally {
        setIsLoading(false);
      }
    };

    if (!Number.isFinite(noticeId) || noticeId <= 0) {
      router.replace("/support/notice");
      return;
    }

    loadNotice();
  }, [noticeId, router]);

  useEffect(() => {
    window.addEventListener("resize", resizeIframe);
    return () => window.removeEventListener("resize", resizeIframe);
  }, []);

  return (
    <>
      <SupportHero
        eyebrow="Notice"
        title="공지사항"
        description="서비스 운영과 업데이트 관련 상세 안내를 확인하세요."
      />
      <SupportFrame activeHref="/support/notice">
        {isLoading ? (
          <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#03b565] border-t-transparent" />
          </div>
        ) : notice ? (
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <header className="border-b border-slate-200 p-6 md:p-8">
              <Link href="/support/notice" className="mb-6 inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-[#03b565]">
                <ArrowLeft className="h-4 w-4" />
                목록으로
              </Link>
              <p className="mb-3 text-sm font-black text-[#03b565]">공지사항</p>
              <h1 className="text-3xl font-black leading-tight tracking-normal text-slate-950 md:text-4xl">{notice.title}</h1>
              <p className="mt-4 text-sm font-semibold text-slate-500">{formatSupportDate(notice.registerDate)}</p>
            </header>

            <div className="p-6 md:p-8">
              <iframe
                ref={iframeRef}
                title={notice.title || "공지사항"}
                srcDoc={iframeContent}
                onLoad={resizeIframe}
                className="block w-full border-0"
              />

              {notice.attachments && notice.attachments.length > 0 ? (
                <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <SectionTitle label="Files" title="첨부파일" />
                  <div className="grid gap-2">
                    {notice.attachments.map((file) => (
                      <button
                        key={file.id}
                        type="button"
                        onClick={() => {
                          if (notice.id && file.id && file.originalName) {
                            Api.Files.downloadPostAttachment(notice.id, file.id, file.originalName);
                          }
                        }}
                        className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-left text-sm font-bold text-slate-700 hover:border-[#03b565] hover:text-[#03b565]"
                      >
                        <Download className="h-4 w-4" />
                        {file.originalName}
                      </button>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            {relatedNotices.length > 0 ? (
              <section className="border-t border-slate-200 bg-slate-50/70 p-6 md:p-8">
                <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="mb-2 flex items-center gap-2 text-sm font-black text-[#03b565]">
                      <Megaphone className="h-4 w-4" />
                      Notice
                    </p>
                    <h2 className="text-2xl font-black tracking-normal text-slate-950">다른 공지사항 보기</h2>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                      이전과 다음 공지를 이어서 확인해보세요.
                    </p>
                  </div>
                  <Link
                    href="/support/notice"
                    className="group inline-flex h-10 w-fit shrink-0 items-center rounded-full text-sm font-black text-slate-950 transition-colors hover:text-[#03b565]"
                  >
                    전체 목록 보기
                    <span className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white transition-colors group-hover:bg-[#03b565]">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="divide-y divide-slate-100">
                    {relatedNotices.map((item) => (
                      <Link
                        key={item.id}
                        href={item.id ? `/support/notice/${item.id}` : "/support/notice"}
                        className="grid gap-3 px-5 py-4 transition-colors hover:bg-emerald-50/50 md:grid-cols-[1fr_120px_24px] md:items-center"
                      >
                        <span className="min-w-0 text-base font-black text-slate-950">
                          <span className="mr-3 text-sm font-black text-slate-400">#{item.postNo || item.id}</span>
                          {item.title}
                        </span>
                        <span className="text-sm font-semibold text-slate-500 md:text-right">{formatSupportDate(item.registerDate)}</span>
                        <ArrowRight className="hidden h-4 w-4 text-slate-300 md:block" />
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}
          </article>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <h1 className="text-2xl font-black text-slate-950">공지사항을 찾을 수 없습니다.</h1>
            <p className="mt-2 text-sm font-semibold text-slate-500">삭제되었거나 존재하지 않는 공지사항입니다.</p>
            <Link href="/support/notice" className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white hover:bg-[#03b565]">
              목록으로 돌아가기
            </Link>
          </div>
        )}
      </SupportFrame>
    </>
  );
}