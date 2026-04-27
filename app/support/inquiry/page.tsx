'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Api } from '@/api'
import { checkApiResult } from '@/utils/apiUtil'
import { PagedPostRequestDto, PagedPostsDto, PostDto, PostSearchKeywordType, PostType } from '@/types/Posts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Search, Plus, MessageCircle } from 'lucide-react'
import { PAGINATION_PAGE_SIZE } from '@/utils/constant'
import DateUtil from '@/utils/dateUtil'

const INQUIRY_PAGE_SIZE = 10

export default function InquiryPage() {
  const router = useRouter()
  
  const [searchResult, setSearchResult] = useState<PagedPostsDto>({
    posts: [],
    pagination: {
      currentPage: 0,
      totalCount: 0,
      totalPage: 0,
    },
  })
  const [searchKeyword, setSearchKeyword] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const searchInquiry = async () => {
    setIsLoading(true)
    try {
      const params: PagedPostRequestDto = {
        postType: PostType.Inquiry,
        searchOption: PostSearchKeywordType.TitleOrSearchText,
        keyword: searchKeyword,
        pageNumber: pageNumber,
        pageSize: INQUIRY_PAGE_SIZE,
      }

      const result = await Api.Posts.getPagedInquiryPosts(params)
      
      if (!checkApiResult(result)) {
        setIsLoading(false)
        return
      }

      const payload: any = result!.payload
      setSearchResult({
        posts: payload.list,
        pagination: {
          currentPage: payload.currentPage,
          totalCount: payload.totalCount,
          totalPage: payload.totalPages,
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRowClick = (post: PostDto) => {
    router.push(`/support/inquiry/${post.id}`)
  }

  useEffect(() => {
    searchInquiry()
  }, [searchKeyword, pageNumber])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50 py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">1:1 문의</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            여러분의 소중한 의견을 듣고 도와드릴 준비가 되어 있습니다.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Search Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-end">
          <div className="flex-1">
            <div className="flex gap-2">
              <Input
                placeholder="검색어를 입력하세요"
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value)
                  setPageNumber(0)
                }}
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Link href="/support/inquiry/write">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              작성하기
            </Button>
          </Link>
        </div>

        {/* Search Results Info */}
        {searchKeyword && (
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>
              &quot;<span className="font-semibold text-foreground">{searchKeyword}</span>&quot;에 대해 총{' '}
              <span className="font-semibold text-foreground">{searchResult.pagination.totalCount}</span>건의 내역이 검색되었습니다.
            </span>
          </div>
        )}

        {/* Inquiries Table */}
        <div className="overflow-x-auto">
          {searchResult.posts.length > 0 ? (
            <div className="space-y-3">
              {searchResult.posts.map((post, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md hover:bg-accent/50 transition-all"
                  onClick={() => handleRowClick(post)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-muted-foreground">#{post.postNo}</span>
                          {post.commonCodeName && (
                            <Badge variant="secondary" className="text-xs">
                              {post.commonCodeName}
                            </Badge>
                          )}
                          {post.children && post.children.length > 0 ? (
                            <Badge variant="default" className="text-xs">
                              답변완료
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              접수
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors truncate">
                          {post.title}
                        </h3>
                      </div>
                      <div className="text-sm text-muted-foreground whitespace-nowrap">
                        {DateUtil.formattedDate(post.registerDate)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <MessageCircle className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">문의 내역이 없습니다.</p>
                <Link href="/support/inquiry/write">
                  <Button variant="outline" className="mt-4">
                    새로운 문의 작성하기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pagination */}
        {searchResult.pagination.totalCount > INQUIRY_PAGE_SIZE && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: searchResult.pagination.totalPage }).map((_, i) => (
              <Button
                key={i}
                variant={pageNumber === i ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPageNumber(i)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
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
