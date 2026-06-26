"use client";

import { useEffect, useState } from "react";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { ThumbnailPostDto } from "@/types/Posts";
import { EmptyState, SearchPanel, SectionTitle, SupportFrame, SupportHero, VideoCard } from "../_components/support-ui";

export default function SupportVideoPage() {
  const [keyword, setKeyword] = useState("");
  const [videos, setVideos] = useState<ThumbnailPostDto[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      const result = await Api.Posts.searchVideoGuides(keyword.trim());
      if (checkApiResult(result)) {
        setVideos((result?.payload || []) as ThumbnailPostDto[]);
      }
    };

    const timer = setTimeout(loadVideos, 180);
    return () => clearTimeout(timer);
  }, [keyword]);

  return (
    <>
      <SupportHero
        eyebrow="Video Guide"
        title="동영상 가이드"
        description="에버타임 주요 기능과 설정 방법을 영상으로 확인하세요."
      />
      <SupportFrame activeHref="/support/video">
        <SectionTitle
          label="Video Library"
          title="가이드 영상"
          description="필요한 영상을 검색하고 바로 재생할 수 있습니다."
        />

        <SearchPanel value={keyword} onChange={setKeyword} placeholder="영상 제목이나 설명을 검색하세요." />

        {videos.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} href={video.id ? `/support/video/${video.id}` : "/support/video"} />
            ))}
          </div>
        ) : (
          <EmptyState title="등록된 동영상이 없습니다." description="검색어를 바꾸거나 잠시 후 다시 확인해주세요." />
        )}
      </SupportFrame>
    </>
  );
}
