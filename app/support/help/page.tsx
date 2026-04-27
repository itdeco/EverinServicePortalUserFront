'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, MessageCircle, FileText, Video } from 'lucide-react'

export default function HelpPage() {
  const helpCategories = [
    {
      icon: BookOpen,
      title: '공지사항',
      description: '서비스 업데이트 및 최신 정보',
      href: '/support/notice',
      color: 'text-blue-500',
    },
    {
      icon: MessageCircle,
      title: '자주 묻는 질문',
      description: '서비스 이용 중 자주 묻는 질문들',
      href: '/support/faq',
      color: 'text-green-500',
    },
    {
      icon: FileText,
      title: '1:1 문의',
      description: '개인별 문의 및 피드백',
      href: '/support/inquiry',
      color: 'text-purple-500',
    },
    {
      icon: Video,
      title: '튜토리얼',
      description: '서비스 사용 방법 동영상',
      href: '/support/video',
      color: 'text-orange-500',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50 py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-2">도움말</h1>
          <p className="text-muted-foreground text-lg">
            서비스 이용 중 필요한 도움을 찾아보세요
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Help Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {helpCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <Link key={index} href={category.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer hover:border-primary/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`${category.color} p-3 bg-background rounded-lg`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground mb-1">
                          {category.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                      <span className="text-2xl text-muted-foreground">→</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Quick Links */}
        <Card className="mb-12 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>자주 찾는 도움말</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                '서비스 가입 방법',
                '플랜 변경 및 결제',
                '회원 정보 관리',
                '개인정보처리방침',
                '서비스 이용약관',
              ].map((item, index) => (
                <li key={index} className="flex items-center text-foreground hover:text-primary transition-colors cursor-pointer">
                  <span className="text-primary mr-3">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-1">
                  더 궁금한 점이 있으신가요?
                </h3>
                <p className="text-muted-foreground">
                  고객 지원팀에 직접 문의하실 수 있습니다
                </p>
              </div>
              <Link href="/support/inquiry">
                <Button>문의하기</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

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
