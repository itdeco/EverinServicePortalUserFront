"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, PlayCircle } from "lucide-react";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { ThumbnailPostDto } from "@/types/Posts";
import { formatSupportDate, getYoutubeEmbedUrl, SupportFrame, SupportHero, VideoCard } from "../../_components/support-ui";

export default function SupportVideoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [video, setVideo] = useState<ThumbnailPostDto | null>(null);
  const [videos, setVideos] = useState<ThumbnailPostDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const videoId = Number(Array.isArray(params.id) ? params.id[0] : params.id);

  const relatedVideos = useMemo(() => {
    if (!video?.id || videos.length === 0) {
      return [];
    }

    const currentIndex = videos.findIndex((item) => item.id === video.id);
    if (currentIndex < 0) {
      return videos.filter((item) => item.id !== video.id).slice(0, 4);
    }

    const previousVideos = videos.slice(Math.max(0, currentIndex - 2), currentIndex);
    const nextVideos = videos.slice(currentIndex + 1, currentIndex + 3);
    const items = [...previousVideos, ...nextVideos];

    if (items.length >= 4) {
      return items;
    }

    const fillItems = videos
      .filter((item) => item.id !== video.id && !items.some((related) => related.id === item.id))
      .slice(0, 4 - items.length);

    return [...items, ...fillItems];
  }, [video?.id, videos]);

  useEffect(() => {
    const loadVideoList = async () => {
      const result = await Api.Posts.getVideoGuides();
      if (!checkApiResult(result)) {
        return;
      }

      setVideos((result?.payload || []) as ThumbnailPostDto[]);
    };

    const loadVideo = async () => {
      try {
        const result = await Api.Posts.getVideoGuide(videoId);
        if (checkApiResult(result)) {
          const payload = (result?.payload || null) as ThumbnailPostDto | null;
          setVideo(payload);

          if (payload?.id) {
            Api.Posts.increaseThumbnailPostViewCount(payload.id).then();
          }
        }

        await loadVideoList();
      } finally {
        setIsLoading(false);
      }
    };

    if (!Number.isFinite(videoId) || videoId <= 0) {
      router.replace("/support/video");
      return;
    }

    loadVideo();
  }, [router, videoId]);

  return (
    <>
      <SupportHero
        eyebrow="Video Guide"
        title="동영상 가이드"
        description="에버타임 주요 기능과 설정 방법을 영상으로 자세히 확인하세요."
      />
      <SupportFrame activeHref="/support/video">
        {isLoading ? (
          <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#03b565] border-t-transparent" />
          </div>
        ) : video ? (
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <header className="border-b border-slate-200 p-6 md:p-8">
              <Link href="/support/video" className="mb-6 inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-[#03b565]">
                <ArrowLeft className="h-4 w-4" />
                목록으로
              </Link>
              <p className="mb-3 text-sm font-black text-[#03b565]">동영상 가이드</p>
              <h1 className="text-3xl font-black leading-tight tracking-normal text-slate-950 md:text-4xl">{video.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500">
                {video.commonCodeName ? <span>{video.commonCodeName}</span> : null}
                {video.writeDate || video.registerDate ? <span>{formatSupportDate(video.writeDate || video.registerDate)}</span> : null}
              </div>
              {video.searchText ? <p className="mt-5 text-base font-semibold leading-7 text-slate-600">{video.searchText}</p> : null}
            </header>

            <div className="p-6 md:p-8">
              <div className="aspect-video overflow-hidden rounded-2xl bg-slate-950">
                <iframe
                  title={video.title || "동영상 가이드"}
                  src={getYoutubeEmbedUrl(video.url)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>

              {video.url ? (
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 hover:border-[#03b565] hover:text-[#03b565]"
                >
                  원본 영상 열기
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>

            {relatedVideos.length > 0 ? (
              <section className="border-t border-slate-200 bg-slate-50/70 p-6 md:p-8">
                <div className="mb-6 flex w-full flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div className="min-w-0">
                    <p className="mb-2 flex items-center gap-2 text-sm font-black text-[#03b565]">
                      <PlayCircle className="h-4 w-4" />
                      Video Guide
                    </p>
                    <h2 className="text-2xl font-black tracking-normal text-slate-950">다른 동영상 보기</h2>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                      이전과 다음 영상을 이어서 확인해보세요.
                    </p>
                  </div>
                  <Link
                    href="/support/video"
                    className="group inline-flex h-10 w-fit shrink-0 items-center rounded-full text-sm font-black text-slate-950 transition-colors hover:text-[#03b565]"
                  >
                    전체 목록 보기
                    <span className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white transition-colors group-hover:bg-[#03b565]">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {relatedVideos.map((item) => (
                    <VideoCard key={item.id} video={item} href={item.id ? `/support/video/${item.id}` : "/support/video"} />
                  ))}
                </div>
              </section>
            ) : null}
          </article>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <h1 className="text-2xl font-black text-slate-950">동영상을 찾을 수 없습니다.</h1>
            <p className="mt-2 text-sm font-semibold text-slate-500">삭제되었거나 존재하지 않는 동영상입니다.</p>
            <Link href="/support/video" className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white hover:bg-[#03b565]">
              목록으로 돌아가기
            </Link>
          </div>
        )}
      </SupportFrame>
    </>
  );
}