"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import EverStoryModal from "@/components/stories/ever-story-modal"
import { Api } from "@/api"
import { checkApiResult } from "@/utils/apiUtil"
import { CommonCode, CommonCodeDto } from "@/types/CommonCode"
import { ThumbnailPostDto } from "@/types/Posts"
import { useLoginStatus } from "@/redux/selectors/Users"

export default function StoriesPage() {
  const router = useRouter()
  const isLoggedIn = useLoginStatus()
  const [categories, setCategories] = useState<CommonCodeDto[]>([])
  const [stories, setStories] = useState<ThumbnailPostDto[]>([])
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedStory, setSelectedStory] = useState<ThumbnailPostDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showTrialCta, setShowTrialCta] = useState(false)

  const filteredStories = useMemo(() => {
    if (selectedCategory === 0) {
      return stories
    }

    return stories.filter((story) => story.commonCodeId === selectedCategory)
  }, [selectedCategory, stories])

  const loadCategories = async () => {
    const result = await Api.CommonCodes.getCommonCodesByCategoryCode(CommonCode.EverStory.type)
    if (checkApiResult(result)) {
      setCategories(result!.payload || [])
    }
  }

  const loadStories = async () => {
    try {
      const result = await Api.Posts.getEverStories()
      if (checkApiResult(result)) {
        setStories(result!.payload || [])
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleStoryClick = (story: ThumbnailPostDto) => {
    if (story.id) {
      Api.Posts.increaseThumbnailPostViewCount(story.id).then()
    }

    setSelectedStory(story)
  }

  useEffect(() => {
    loadCategories()
    loadStories()
  }, [])

  useEffect(() => {
    const handleScroll = () => setShowTrialCta(window.scrollY > 500)

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/stories/bg-everstory-keyvisual.png')" }}
        />
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="relative mx-auto max-w-[1280px] px-6 py-24 text-center md:py-32 lg:px-12">
          <p className="mb-4 text-base font-bold tracking-normal text-white/70 md:text-lg">
            Customer Stories
          </p>
          <h1 className="mb-6 text-5xl font-black tracking-normal text-white md:text-7xl">
            HR Hub
          </h1>
          <p className="mx-auto max-w-3xl text-lg font-semibold leading-8 text-white/90 md:text-2xl">
            HR 컨텐츠, 도입사례, 보도자료 등 다양한 컨텐츠를 확인하세요.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="mb-12 flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-4">
            <button
              type="button"
              onClick={() => setSelectedCategory(0)}
              className={`min-w-20 border-b-2 px-5 py-3 text-base font-bold transition-colors ${
                selectedCategory === 0
                  ? "border-[#03b565] text-[#03b565]"
                  : "border-transparent text-slate-500 hover:text-slate-950"
              }`}
            >
              전체
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id || 0)}
                className={`min-w-20 border-b-2 px-5 py-3 text-base font-bold transition-colors ${
                  category.id === selectedCategory
                    ? "border-[#03b565] text-[#03b565]"
                    : "border-transparent text-slate-500 hover:text-slate-950"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#03b565] border-t-transparent" />
            </div>
          ) : filteredStories.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredStories.map((story) => (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => handleStoryClick(story)}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-[#03b565] hover:shadow-xl"
                >
                  <div
                    className="h-40 w-full bg-slate-100 bg-cover bg-center"
                    style={{
                      backgroundImage: story.id && story.thumbnailFileId
                        ? `url(${Api.Files.getThumbnailUrl(story.id, story.thumbnailFileId)})`
                        : undefined,
                    }}
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="mb-4 text-xl font-black leading-7 text-slate-950">
                      {story.corporationName}
                    </h2>
                    <h3 className="mb-3 line-clamp-1 text-base font-bold text-slate-600">
                      {story.title}
                    </h3>
                    <p className="line-clamp-3 text-sm font-medium leading-6 text-slate-500">
                      {story.searchText}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-slate-200 bg-slate-50 py-16 text-center text-base font-semibold text-slate-500">
              등록된 HR Hub 콘텐츠가 없습니다.
            </div>
          )}
        </div>
      </section>

      {!isLoggedIn ? (
        <button
          type="button"
          onClick={() => router.push("/trial")}
          className={`fixed bottom-7 right-7 z-40 inline-flex items-center gap-2 rounded-full bg-[#03b565] px-6 py-4 text-base font-black text-white shadow-2xl transition-all ${
            showTrialCta ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <ArrowRight className="h-5 w-5" />
          지금 체험하기
        </button>
      ) : null}

      <Footer />
      <EverStoryModal
        story={selectedStory}
        open={!!selectedStory}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedStory(null)
          }
        }}
      />
    </main>
  )
}
