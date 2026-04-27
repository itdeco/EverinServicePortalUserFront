'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserProfile } from '@/redux/selectors/Users'
import { Api } from '@/api'
import { checkApiResult } from '@/utils/apiUtil'
import { PagedPostRequestDto, PagedPostsDto, PostDto, PostSearchKeywordType, PostType } from '@/types/Posts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Search, Share2 } from 'lucide-react'
import { PAGINATION_PAGE_SIZE } from '@/utils/constant'
import DateUtil from '@/utils/dateUtil'

const NOTICE_PAGE_SIZE = 10

export default function NoticePage() {
  const router = useRouter()
  const profile = useUserProfile()
  
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
  const [selectedNotice, setSelectedNotice] = useState<PostDto | null>(null)

  const searchNotice = async () => {
    setIsLoading(true)
    try {
      const params: PagedPostRequestDto = {
        postType: PostType.Notice,
        searchOption: PostSearchKeywordType.TitleOrSearchText,
        keyword: searchKeyword,
        pageNumber: pageNumber,
        pageSize: NOTICE_PAGE_SIZE,
      }

      const result = await Api.Posts.getPagedNoticePosts(params)
      
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

  useEffect(() => {
    searchNotice()
  }, [searchKeyword, pageNumber])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50 py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-2">공지사항</h1>
          <p className="text-muted-foreground text-lg">업데이트 정보 등 다양한 소식을 알려드립니다.</p>
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
                onChange={(e) => {
                  setSearchKeyword(e.target.value)
                  setPageNumber(0)
                }}
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

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

        {/* Notices List */}
        <div className="space-y-3">
          {searchResult.posts.length > 0 ? (
            searchResult.posts.map((post, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setSelectedNotice(post)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-muted-foreground">#{post.postNo}</span>
                        {post.options === 1 && (
                          <Badge variant="destructive" className="text-xs">
                            새로움
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                    </div>
                    <div className="text-sm text-muted-foreground whitespace-nowrap">
                      {DateUtil.formattedDate(post.registerDate)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">공지사항이 없습니다.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pagination */}
        {searchResult.pagination.totalCount > NOTICE_PAGE_SIZE && (
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

      {/* Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedNotice(null)}>
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <CardTitle>{selectedNotice.title}</CardTitle>
                  <CardDescription>#{selectedNotice.postNo} • {DateUtil.formattedDate(selectedNotice.registerDate)}</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedNotice(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none whitespace-pre-line text-sm text-muted-foreground">
                {selectedNotice.content}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
