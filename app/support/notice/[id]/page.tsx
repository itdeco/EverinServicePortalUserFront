"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { PostDto } from "@/types/Posts";
import { formatSupportDate, SectionTitle, SupportFrame, SupportHero } from "../../_components/support-ui";

export default function SupportNoticeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [notice, setNotice] = useState<PostDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const noticeId = Number(Array.isArray(params.id) ? params.id[0] : params.id);
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
          <article className="rounded-2xl border border-slate-200 bg-white shadow-sm">
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
