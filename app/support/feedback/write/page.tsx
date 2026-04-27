'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserProfile } from '@/redux/selectors/Users'
import { Api } from '@/api'
import { checkApiResult } from '@/utils/apiUtil'
import { CreatePostDto, PostType } from '@/types/Posts'
import { CommonCode, CommonCodeDto } from '@/types/CommonCode'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, FileUp, Send } from 'lucide-react'

export default function FeedbackWritePage() {
  const router = useRouter()
  const profile = useUserProfile()

  const [categories, setCategories] = useState<CommonCodeDto[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const loadCategories = async () => {
    try {
      const result = await Api.CommonCodes.getCommonCodesByCategoryCode(CommonCode.Feedback.type)
      if (checkApiResult(result)) {
        const codes = result!.payload || []
        setCategories(codes)
        if (codes.length > 0) {
          setSelectedCategory(codes[0].id?.toString() || '')
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.')
      return
    }

    setIsSubmitting(true)
    try {
      const params: CreatePostDto = {
        userId: profile?.userId,
        userName: profile?.name,
        type: PostType.Feedback,
        title: title,
        content: content,
        searchText: content,
        commonCodeId: parseInt(selectedCategory),
        options: 0,
        viewCount: 0,
      }

      const result = await Api.Posts.createPost(params)
      if (checkApiResult(result)) {
        alert('피드백이 등록되었습니다.')
        router.push('/support/feedback')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <Loader2 className="h-8 w-8 text-primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/50 py-12">
        <div className="container max-w-2xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            피드백 작성
          </h1>
          <p className="text-muted-foreground">
            귀중한 의견을 들려주세요. 더 나은 서비스를 위해 노력하겠습니다.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-2xl mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>피드백 정보</CardTitle>
            <CardDescription>
              아래 내용을 입력하여 피드백을 제출해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">
                분류 <span className="text-destructive">*</span>
              </Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id?.toString() || ''}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                제목 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="피드백 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">
                내용 <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="content"
                placeholder="피드백 내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
              />
              <p className="text-xs text-muted-foreground">
                최대 5,000자까지 입력할 수 있습니다.
              </p>
            </div>

            {/* Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                ℹ️ 평일 업무 시간(오전 9시 ~ 오후 6시)에만 답변해 드립니다.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !title.trim() || !content.trim()}
                className="flex-1 gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    전송 중...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    피드백 제출
                  </>
                )}
              </Button>
              <Link href="/support/feedback" className="flex-1">
                <Button variant="outline" className="w-full">
                  취소
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Home Link */}
        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline">홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
