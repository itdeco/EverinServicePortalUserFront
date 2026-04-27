'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserProfile } from '@/redux/selectors/Users'
import { Api } from '@/api'
import { checkApiResult } from '@/utils/apiUtil'
import { FaqCommonCodeDto, PostDto } from '@/types/Posts'
import { CommonCode } from '@/types/CommonCode'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, Search, HelpCircle, MessageCircle } from 'lucide-react'

const PAGE_SIZE = 10

export default function FaqPage() {
  const router = useRouter()
  const profile = useUserProfile()
  
  const [searchKeyword, setSearchKeyword] = useState('')
  const [allFaqs, setAllFaqs] = useState<FaqCommonCodeDto[]>([])
  const [searchedFaqs, setSearchedFaqs] = useState<FaqCommonCodeDto[]>([])
  const [allPosts, setAllPosts] = useState<PostDto[]>([])
  const [pagePosts, setPagePosts] = useState<PostDto[]>([])
  const [selectedTabIndex, setSelectedTabIndex] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const haveSignedIn = profile && profile.loginId && profile.loginId.length > 0
  const faqs = searchKeyword && searchedFaqs.length > 0 ? searchedFaqs : allFaqs

  const loadFaq = async () => {
    setIsLoading(true)
    try {
      const result = await Api.Posts.getFaqPosts(CommonCode.Faq.type)
      if (!checkApiResult(result)) {
        return
      }

      const payload: FaqCommonCodeDto[] = result!.payload
      setAllFaqs(payload)
      setSelectedTabIndex(payload.length > 0 ? '0' : null)
    } finally {
      setIsLoading(false)
    }
  }

  const loadAllPosts = (tabIndex: number | string) => {
    let posts: PostDto[] = []
    const index = typeof tabIndex === 'string' ? parseInt(tabIndex) : tabIndex

    if (index < 0) {
      faqs.forEach((faq: FaqCommonCodeDto) => {
        if (faq.posts) {
          posts.push(...faq.posts)
        }
      })
    } else {
      const faq = faqs[index]
      if (faq && faq.posts) {
        posts.push(...faq.posts)
      }
    }

    setAllPosts(posts)
    loadPagePosts(0, posts)
  }

  const loadPagePosts = (page: number, posts?: PostDto[]) => {
    const targetPosts = posts || allPosts
    if (targetPosts.length === 0) {
      setPagePosts([])
      return
    }

    const startIndex = page * PAGE_SIZE
    const endIndex = Math.min(startIndex + PAGE_SIZE, targetPosts.length)
    setPagePosts(targetPosts.slice(startIndex, endIndex))
    setCurrentPage(page)
  }

  const onSearch = (keyword: string) => {
    setSearchKeyword(keyword)
    setCurrentPage(0)

    if (keyword.length === 0) {
      setSearchedFaqs([])
      return
    }

    const searched = allFaqs.map((faq) => ({
      ...faq,
      posts: faq.posts?.filter((post) => 
        post.title?.includes(keyword) || post.searchText?.includes(keyword)
      ) || [],
    }))

    setSearchedFaqs(searched)
    setSelectedTabIndex('-1')
  }

  const onInquiryClick = () => {
    router.push('/support/inquiry')
  }

  const onFaqClick = async (postId: number) => {
    try {
      const result = await Api.Posts.increasePostViewCount(postId)
      checkApiResult(result)
    } catch (error) {
      console.error('Failed to increase post view count:', error)
    }
  }

  useEffect(() => {
    loadFaq()
  }, [])

  useEffect(() => {
    const tabIndex = selectedTabIndex !== null ? parseInt(selectedTabIndex) : -1
    loadAllPosts(tabIndex)
  }, [allFaqs, searchedFaqs, selectedTabIndex])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50 py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-3">
            <HelpCircle className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">자주 묻는 질문</h1>
          </div>
          <p className="text-muted-foreground text-lg">서비스 이용 중 자주 문의하시는 질문에 대한 답변입니다.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Input
                placeholder="검색어를 입력하세요"
                value={searchKeyword}
                onChange={(e) => onSearch(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        {allFaqs.length > 0 && (
          <Tabs value={selectedTabIndex || '0'} onValueChange={setSelectedTabIndex} className="mb-8">
            <TabsList className="grid grid-cols-auto gap-2 w-full justify-start flex-wrap h-auto p-2">
              {allFaqs.map((faq, index) => (
                <TabsTrigger key={index} value={index.toString()}>
                  {faq.commonCodeName}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        {/* FAQs List */}
        <div className="space-y-3 mb-8">
          {pagePosts.length > 0 ? (
            pagePosts.map((post, index) => (
              <Collapsible key={index} onOpenChange={() => onFaqClick(post.id!)}>
                <Card className="hover:border-primary/50 transition-colors">
                  <CollapsibleTrigger asChild>
                    <button className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-accent/30 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary">
                          {post.title}
                        </h3>
                      </div>
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-6 pb-6 pt-2 border-t border-border/50 text-sm text-muted-foreground whitespace-pre-line">
                      {post.content}
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">등록된 FAQ가 없습니다.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pagination */}
        {allPosts.length > PAGE_SIZE && (
          <div className="flex justify-center gap-2 mb-8">
            {Array.from({ length: Math.ceil(allPosts.length / PAGE_SIZE) }).map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i ? 'default' : 'outline'}
                size="sm"
                onClick={() => loadPagePosts(i)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        )}

        {/* Contact Section */}
        {haveSignedIn && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">찾는 답변이 없으신가요?</p>
                    <p className="text-sm text-muted-foreground">1:1로 문의해주세요</p>
                  </div>
                </div>
                <Button onClick={onInquiryClick}>문의하기</Button>
              </div>
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
