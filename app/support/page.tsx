"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpenText, FileQuestion, Megaphone, MessageSquareText, PlayCircle } from "lucide-react";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { PagedPostRequestDto, PostDto, PostSearchKeywordType, PostType, ThumbnailPostDto } from "@/types/Posts";
import {
  EmptyState,
  formatSupportDate,
  HELP_LINKS,
  SectionTitle,
  SupportFrame,
  SupportHero,
  VideoCard,
} from "./_components/support-ui";

const quickMenus = [
  {
    title: "동영상 가이드",
    description: "에버타임 사용법을 영상으로 빠르게 확인하세요.",
    href: "/support/video",
    icon: PlayCircle,
  },
  {
    title: "온라인 도움말",
    description: "설정과 운영 가이드를 단계별로 살펴보세요.",
    href: "/support/help",
    icon: BookOpenText,
  },
  {
    title: "FAQ",
    description: "자주 묻는 질문과 답변을 모아두었습니다.",
    href: "/support/faq",
    icon: FileQuestion,
  },
  {
    title: "공지사항",
    description: "서비스 업데이트와 주요 안내를 확인하세요.",
    href: "/support/notice",
    icon: Megaphone,
  },
  {
    title: "1:1 문의",
    description: "문제가 해결되지 않으면 문의를 남겨주세요.",
    href: "/support/inquiry",
    icon: MessageSquareText,
  },
];

export default function SupportPage() {
  const [videos, setVideos] = useState<ThumbnailPostDto[]>([]);
  const [notices, setNotices] = useState<PostDto[]>([]);
  const [faqs, setFaqs] = useState<PostDto[]>([]);

  useEffect(() => {
    const load = async () => {
      const videoResult = await Api.Posts.getVideoGuides();
      if (checkApiResult(videoResult)) {
        setVideos(((videoResult?.payload || []) as ThumbnailPostDto[]).slice(0, 3));
      }

      const noticeParams: PagedPostRequestDto = {
        postType: PostType.Notice,
        searchOption: PostSearchKeywordType.TitleOrSearchText,
        keyword: "",
        pageNumber: 0,
        pageSize: 5,
      };
      const noticeResult = await Api.Posts.getPagedNoticePosts(noticeParams);
      if (checkApiResult(noticeResult)) {
        const payload: any = noticeResult?.payload;
        setNotices((payload?.list || []).slice(0, 5));
      }

      const faqResult = await Api.Posts.getFaqBestPosts();
      if (checkApiResult(faqResult)) {
        setFaqs(((faqResult?.payload || []) as PostDto[]).slice(0, 5));
      }
    };

    load();
  }, []);

  const helpPreview = useMemo(() => HELP_LINKS.slice(0, 3), []);

  return (
    <>
      <SupportHero
        eyebrow="Online Customer Center"
        title="무엇을 도와드릴까요?"
        description="에버타임 사용 중 필요한 가이드, 공지, FAQ, 1:1 문의를 한곳에서 확인할 수 있습니다."
      />
      <SupportFrame activeHref="/support">
        <section className="mb-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {quickMenus.map((menu) => {
            const Icon = menu.icon;
            return (
              <Link
                key={menu.href}
                href={menu.href}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#03b565]/40 hover:shadow-lg"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[#03b565]">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-black text-slate-950">{menu.title}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{menu.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#03b565]">
                  바로가기 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </section>

        <section className="mb-10">
          <SectionTitle
            label="Video Guide"
            title="동영상으로 빠르게 배우기"
            description="주요 기능을 영상으로 확인하고 바로 따라 할 수 있습니다."
            action={
              <Link href="/support/video" className="text-sm font-black text-slate-700 hover:text-[#03b565]">
                전체 보기
              </Link>
            }
          />
          {videos.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-3">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} href={video.id ? `/support/video/${video.id}` : "/support/video"} />
              ))}
            </div>
          ) : (
            <EmptyState title="등록된 동영상이 없습니다." description="새로운 가이드가 준비되면 이곳에 표시됩니다." />
          )}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionTitle label="Notice" title="공지사항" description="서비스 운영과 업데이트 소식을 확인하세요." />
            <div className="divide-y divide-slate-100">
              {notices.length > 0 ? (
                notices.map((notice) => (
                  <Link
                    key={notice.id}
                    href={notice.id ? `/support/notice/${notice.id}` : "/support/notice"}
                    className="flex w-full items-center justify-between gap-5 py-4 text-left"
                  >
                    <span className="min-w-0 flex-1 truncate text-sm font-bold text-slate-800">{notice.title}</span>
                    <span className="shrink-0 text-xs font-semibold text-slate-400">{formatSupportDate(notice.registerDate)}</span>
                  </Link>
                ))
              ) : (
                <p className="py-10 text-center text-sm font-semibold text-slate-500">등록된 공지사항이 없습니다.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionTitle label="Help" title="자주 찾는 도움말" description="설정과 운영에 필요한 문서를 바로 열어보세요." />
            <div className="grid gap-3">
              {helpPreview.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-slate-200 p-4 transition-colors hover:border-[#03b565]/40 hover:bg-emerald-50/40"
                >
                  <p className="font-black text-slate-950">{item.title}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{item.description}</p>
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white">
              <p className="text-lg font-black">찾는 답변이 없나요?</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">FAQ를 확인하거나 1:1 문의를 남기면 담당자가 확인 후 안내드립니다.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/support/faq" className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950">
                  FAQ 보기
                </Link>
                <Link href="/support/inquiry" className="rounded-full bg-[#03b565] px-4 py-2 text-sm font-black text-white">
                  문의하기
                </Link>
              </div>
            </div>
          </div>
        </section>
      </SupportFrame>

    </>
  );
}
