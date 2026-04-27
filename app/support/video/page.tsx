'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Api } from '@/api'
import { checkApiResult } from '@/utils/apiUtil'
import { ThumbnailPostDto } from '@/types/Posts'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Video } from 'lucide-react'

export default function VideoPage() {
  const [videos, setVideos] = useState<ThumbnailPostDto[]>([])
  const [filteredVideos, setFilteredVideos] = useState<ThumbnailPostDto[]>([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const loadVideos = async () => {
    try {
      const result = await Api.Posts.searchVideoGuides('')
      if (checkApiResult(result)) {
        setVideos(result!.payload || [])
        setFilteredVideos(result!.payload || [])
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadVideos()
  }, [])

  useEffect(() => {
    if (searchKeyword) {
      const filtered = videos.filter(
        (video) =>
          video.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          video.searchText?.toLowerCase().includes(searchKeyword.toLowerCase())
      )
      setFilteredVideos(filtered)
    } else {
      setFilteredVideos(videos)
    }
  }, [searchKeyword, videos])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/50 py-12">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Video className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            비디오 가이드
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            근태관리의 모든 것! 영상으로 쉽게 해결하세요.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Search */}
        <div className="mb-8">
          <div className="flex gap-2">
            <Input
              placeholder="검색어를 입력하세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Videos Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card
                key={video.id}
                className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              >
                {video.thumbnailFileId && (
                  <div className="relative h-48 bg-cover bg-center bg-black/10 overflow-hidden">
                    <div
                      className="h-full bg-cover bg-center group-hover:scale-105 transition-transform"
                      style={{
                        backgroundImage: `url(${Api.Files.getThumbnailUrl(
                          video.id!,
                          video.thumbnailFileId
                        )})`,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <button className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                        <svg
                          className="w-6 h-6 text-primary ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {video.searchText}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Video className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">관련 비디오가 없습니다.</p>
            </CardContent>
          </Card>
        )}

        {/* Home Link */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline">홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
