"use client"

import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Calendar, User, Link2, Smartphone, Apple, PlayCircle, ExternalLink, Sparkles, Gift, ArrowRight, Download } from "lucide-react"

const EVER_TIME_URL = process.env.NEXT_PUBLIC_EVERTIME_APP_URL || "https://evertimebasic.web.flextudio.com"

function TrialStep2Content() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || ""
  const corporationName = searchParams.get("corporationName") || ""

  const [currentDate, setCurrentDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {
    const today = new Date()
    const end = new Date(today)
    end.setDate(end.getDate() + 30)

    setCurrentDate(today.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }))
    setEndDate(end.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }))
  }, [])

  const handleStartTrial = () => {
    window.open(EVER_TIME_URL, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
      <Header />
      {/* Removed local header - using main Header component instead */}

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-0">
              <Gift className="w-4 h-4 mr-1.5" />
              신청 완료
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
              무료체험 신청이 완료되었습니다!
            </h1>
            <p className="text-muted-foreground text-lg">
              에버타임의 모든 기능을 30일간 무료로 체험하실 수 있습니다.
            </p>
          </div>

          {/* Info Card */}
          <Card className="shadow-xl border-0 bg-card mb-8">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                체험 정보
              </CardTitle>
              <CardDescription>
                아래 정보로 무료체험이 시작되었습니다
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* User Info */}
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">이름 (회사명)</p>
                    <p className="font-medium">{name} ({corporationName})</p>
                  </div>
                </div>

                {/* Period Info */}
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">체험 기간</p>
                    <p className="font-medium">{currentDate} ~ {endDate}</p>
                  </div>
                </div>

                {/* URL Info */}
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <Link2 className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">접속 주소</p>
                    <a 
                      href={EVER_TIME_URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline break-all flex items-center gap-1"
                    >
                      {EVER_TIME_URL}
                      <ExternalLink className="w-4 h-4 shrink-0" />
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={handleStartTrial}
                className="w-full h-14 text-lg font-semibold mt-6"
                size="lg"
              >
                지금 바로 체험하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {/* Support Notice */}
              <p className="text-center text-sm text-muted-foreground mt-4 p-3 bg-muted/30 rounded-lg">
                추가 문의사항이 있으시면 언제든지 고객센터로 연락주시기 바랍니다.
              </p>
            </CardContent>
          </Card>

          {/* App Download Section */}
          <Card className="shadow-lg border bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                모바일 앱 다운로드
              </CardTitle>
              <CardDescription>
                언제 어디서나 편리하게 에버타임을 이용하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid md:grid-cols-2 gap-4">
                {/* iOS App */}
                <div className="p-5 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <Badge className="bg-primary text-primary-foreground mb-1">iOS</Badge>
                      <p className="text-sm font-medium">에버타임 App for iOS</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    에버타임을 이용하는 기업(조직)의 초대를 받은 사원들만 이 앱을 이용할 수 있습니다.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full gap-2 bg-foreground text-background hover:bg-foreground/90"
                    asChild
                  >
                    <a 
                      href="https://apps.apple.com/kr/app/%EC%97%90%EB%B2%84%ED%83%80%EC%9E%84basic/id6480490751" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Apple className="w-5 h-5" />
                      App Store
                    </a>
                  </Button>
                </div>

                {/* Android App */}
                <div className="p-5 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <Badge className="bg-primary text-primary-foreground mb-1">Android</Badge>
                      <p className="text-sm font-medium">에버타임 App for Android</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    에버타임을 이용하는 기업(조직)의 초대를 받은 사원들만 이 앱을 이용할 수 있습니다.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full gap-2 bg-foreground text-background hover:bg-foreground/90"
                    asChild
                  >
                    <a 
                      href="https://play.google.com/store/apps/details?id=com.ylw.evertimebasic&pcampaignid=web_share" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <PlayCircle className="w-5 h-5" />
                      Google Play
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/">
                메인으로 돌아가기
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">
                로그인하기
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function TrialStep2Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <TrialStep2Content />
    </Suspense>
  )
}
