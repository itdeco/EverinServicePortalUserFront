"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Download } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Api } from "@/api"
import { checkApiResult } from "@/utils/apiUtil"
import { ThumbnailPostDto } from "@/types/Posts"

export default function StoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [story, setStory] = useState<ThumbnailPostDto | null>(null)
  const [stories, setStories] = useState<ThumbnailPostDto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const storyId = Number(Array.isArray(params.id) ? params.id[0] : params.id)
  const relatedStories = useMemo(() => {
    if (!story?.id || stories.length === 0) {
      return []
    }

    const currentIndex = stories.findIndex((item) => item.id === story.id)
    if (currentIndex < 0) {
      return stories.filter((item) => item.id !== story.id).slice(0, 4)
    }

    const previousStories = stories.slice(Math.max(0, currentIndex - 2), currentIndex)
    const nextStories = stories.slice(currentIndex + 1, currentIndex + 3)
    const items = [...previousStories, ...nextStories]

    if (items.length >= 4) {
      return items
    }

    const fillItems = stories
      .filter((item) => item.id !== story.id && !items.some((related) => related.id === item.id))
      .slice(0, 4 - items.length)

    return [...items, ...fillItems]
  }, [stories, story?.id])

  const iframeContent = useMemo(() => {
    const content = story?.content || story?.searchText || ""

    return `
      <html lang="ko">
        <head>
          <style>
            html,
            body {
              margin: 0;
              width: 100%;
              color: #334155;
              font-family: Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              font-size: 16px;
              line-height: 1.8;
              overflow-x: hidden;
            }

            * {
              box-sizing: border-box;
              max-width: 100%;
            }

            img {
              max-width: 100%;
              height: auto;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            a {
              color: #2563eb;
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div>${content}</div>
        </body>
      </html>
    `
  }, [story])

  const resizeIframe = () => {
    const iframe = iframeRef.current
    const iframeDocument = iframe?.contentDocument

    if (!iframe || !iframeDocument) {
      return
    }

    iframe.style.height = `${iframeDocument.body.scrollHeight + 32}px`
  }

  useEffect(() => {
    const loadStoryFromList = async () => {
      const result = await Api.Posts.getEverStories()

      if (!checkApiResult(result)) {
        return null
      }

      const stories = (result!.payload || []) as ThumbnailPostDto[]
      setStories(stories)

      return stories.find((item) => item.id === storyId) || null
    }

    const loadStory = async () => {
      try {
        const result = await Api.Posts.getEverStory(storyId)
        let foundStory: ThumbnailPostDto | null = null

        if (checkApiResult(result)) {
          foundStory = (result!.payload || null) as ThumbnailPostDto | null
        }

        const storyFromList = await loadStoryFromList()

        if (!foundStory) {
          foundStory = storyFromList
        }

        setStory(foundStory)

        if (foundStory?.id) {
          Api.Posts.increaseThumbnailPostViewCount(foundStory.id).then()
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (!Number.isFinite(storyId) || storyId <= 0) {
      router.replace("/stories")
      return
    }

    loadStory()
  }, [router, storyId])

  useEffect(() => {
    window.addEventListener("resize", resizeIframe)
    return () => window.removeEventListener("resize", resizeIframe)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {isLoading ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#03b565] border-t-transparent" />
        </div>
      ) : story ? (
        <>
          <section className="border-b bg-slate-50">
            <div className="mx-auto w-full max-w-[960px] px-6 py-10 lg:px-8">
              <Button asChild variant="ghost" className="mb-8 -ml-3">
                <Link href="/stories">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  목록으로
                </Link>
              </Button>

              <p className="mb-3 text-sm font-bold text-[#03b565]">
                {story.commonCodeName || "HR Hub"}
              </p>
              <h1 className="text-3xl font-black leading-tight tracking-normal text-slate-950 md:text-5xl">
                {story.title}
              </h1>
              <p className="mt-5 text-lg font-semibold text-slate-600">
                {story.corporationName}
              </p>
            </div>
          </section>

          <section className="mx-auto w-full max-w-[960px] overflow-hidden px-6 py-10 lg:px-8">
            {story.id && story.thumbnailFileId ? (
              <div
                className="mb-10 aspect-[16/8] w-full rounded-2xl bg-slate-100 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${Api.Files.getThumbnailUrl(story.id, story.thumbnailFileId)})`,
                }}
              />
            ) : null}

            <iframe
              ref={iframeRef}
              srcDoc={iframeContent}
              title={story.title || "HR Hub content"}
              onLoad={resizeIframe}
              className="block w-full max-w-full border-0"
            />

            {story.attachments && story.attachments.length > 0 ? (
              <div className="mt-10 rounded-xl border bg-slate-50 p-5">
                <h2 className="mb-4 text-sm font-bold text-slate-700">첨부파일</h2>
                <div className="flex flex-col gap-2">
                  {story.attachments.map((file) => (
                    <Button
                      key={file.id}
                      type="button"
                      variant="outline"
                      className="justify-start bg-white"
                      onClick={() => {
                        if (story.id && file.id && file.originalName) {
                          Api.Files.downloadThumbnailPostAttachment(story.id, file.id, file.originalName)
                        }
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {file.originalName}
                    </Button>
                  ))}
                </div>
              </div>
            ) : null}

            {relatedStories.length > 0 ? (
              <section className="mt-10 border-t border-slate-200 pt-8">
                <div className="mb-6 flex w-full items-end justify-between gap-6">
                  <div className="min-w-0 flex-1">
                    <p className="mb-2 flex items-center gap-2 text-sm font-black text-[#03b565]">
                      <span className="h-0.5 w-6 rounded-full bg-[#03b565]" />
                      HR Hub
                    </p>
                    <h2 className="text-2xl font-black tracking-normal text-slate-950">
                      다른 콘텐츠 보기
                    </h2>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                      이전과 다음 콘텐츠를 이어서 확인해보세요.
                    </p>
                  </div>
                  <Link
                    href="/stories"
                    className="group ml-auto inline-flex h-10 w-fit shrink-0 items-center rounded-full text-sm font-black text-slate-950 transition-colors hover:text-[#03b565]"
                  >
                    전체 목록 보기
                    <span className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white transition-colors group-hover:bg-[#03b565]">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {relatedStories.map((item) => (
                    <Link
                      key={item.id}
                      href={item.id ? `/stories/${item.id}` : "/stories"}
                      className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-[#03b565] hover:shadow-xl"
                    >
                      <div
                        className="h-40 w-full bg-slate-100 bg-cover bg-center"
                        style={{
                          backgroundImage: item.id && item.thumbnailFileId
                            ? `url(${Api.Files.getThumbnailUrl(item.id, item.thumbnailFileId)})`
                            : undefined,
                        }}
                      />
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="mb-4 text-xl font-black leading-7 text-slate-950">
                          {item.corporationName}
                        </h3>
                        <p className="mb-3 line-clamp-1 text-base font-bold text-slate-600">
                          {item.title}
                        </p>
                        <p className="line-clamp-3 text-sm font-medium leading-6 text-slate-500">
                          {item.searchText}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </section>
        </>
      ) : (
        <section className="mx-auto max-w-[720px] px-6 py-24 text-center">
          <h1 className="mb-3 text-2xl font-black text-slate-950">콘텐츠를 찾을 수 없습니다.</h1>
          <p className="mb-8 text-slate-500">삭제되었거나 존재하지 않는 HR Hub 콘텐츠입니다.</p>
          <Button asChild>
            <Link href="/stories">목록으로 돌아가기</Link>
          </Button>
        </section>
      )}

      <Footer />
    </main>
  )
}
