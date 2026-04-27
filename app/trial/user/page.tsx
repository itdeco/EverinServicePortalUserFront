"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Building2, Shield, Clock, CheckCircle2, Sparkles, Gift, ArrowRight, ExternalLink, Link2 } from "lucide-react"
import { Api } from "@/api"
import { checkApiResult } from "@/utils/apiUtil"
import { PlanDto } from "@/types/Plans"
import { TrialRequestDto } from "@/types/Trials"

const EVER_TIME_URL = process.env.NEXT_PUBLIC_EVERTIME_APP_URL || "https://evertimebasic.web.flextudio.com"

enum ValidationStatus {
  Valid,
  EmptyCompanyName
}

export default function UserTrialPage() {
  const router = useRouter()
  const [freePlans, setFreePlans] = useState<PlanDto[]>([])
  const [planId, setPlanId] = useState<string>("")
  const [corporationName, setCorporationName] = useState("")
  
  const [agreeAll, setAgreeAll] = useState(false)
  const [confirmAge, setConfirmAge] = useState(false)
  const [serviceTerms, setServiceTerms] = useState(false)
  const [privacyTerms, setPrivacyTerms] = useState(false)
  
  const [status, setStatus] = useState<ValidationStatus>(ValidationStatus.Valid)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock user profile - in real app, this would come from Redux/context
  const userProfile = {
    name: "홍길동",
    phone: "01012345678"
  }

  // Load free plans
  useEffect(() => {
    Api.Plans.getAllFreePlans().then(result => {
      if (checkApiResult(result) && result?.payload) {
        setFreePlans(result.payload)
        if (result.payload.length > 0) {
          setPlanId(result.payload[0].id?.toString() || "")
        }
      }
    })
  }, [])

  const canSubmit = corporationName.length > 0 && confirmAge && serviceTerms && privacyTerms

  const handleAgreeAll = (checked: boolean) => {
    setAgreeAll(checked)
    setConfirmAge(checked)
    setServiceTerms(checked)
    setPrivacyTerms(checked)
  }

  const handleSubmit = async () => {
    if (!corporationName) {
      setStatus(ValidationStatus.EmptyCompanyName)
      return
    }

    const params: TrialRequestDto = {
      trialUserName: userProfile.name,
      corporationName: corporationName,
      phone: userProfile.phone,
      termsConsent: 1,
      planId: parseInt(planId)
    }

    setIsSubmitting(true)
    try {
      const result = await Api.Trials.requestTrialForPortalUser(params)
      if (checkApiResult(result)) {
        router.push(`/trial/step2?name=${encodeURIComponent(userProfile.name)}&corporationName=${encodeURIComponent(corporationName)}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
      <Header />
      {/* Removed local header - using main Header component instead */}

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-0">
              <Gift className="w-4 h-4 mr-1.5" />
              30일 무료 체험
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
              HR 혁신, 단 10초면 충분합니다
            </h1>
            <p className="text-muted-foreground text-lg">
              무료체험을 위해 최소한의 정보를 입력해 주세요.
              <br className="hidden sm:block" />
              정보는 안전하게 보호되며, 체험 후 삭제됩니다.
            </p>
          </div>

          {/* Main Card */}
          <Card className="shadow-xl border-0 bg-card">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                무료 체험 신청
              </CardTitle>
              <CardDescription>
                에버타임의 모든 기능을 30일간 무료로 체험해보세요
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-5">
              {/* Plan Selection */}
              <div className="space-y-2">
                <Label htmlFor="plan" className="text-sm font-medium">플랜 선택</Label>
                <Select value={planId} onValueChange={setPlanId}>
                  <SelectTrigger id="plan" className="h-12">
                    <SelectValue placeholder="플랜을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {freePlans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id?.toString() || ""}>
                        {plan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Company Name Input */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium">회사명</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="company"
                    type="text"
                    placeholder="회사명을 입력하세요"
                    value={corporationName}
                    onChange={(e) => {
                      setCorporationName(e.target.value)
                      if (status === ValidationStatus.EmptyCompanyName) setStatus(ValidationStatus.Valid)
                    }}
                    className={`pl-10 h-12 ${status === ValidationStatus.EmptyCompanyName ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                </div>
                <p className="text-xs text-destructive">
                  * 체험판(구독) 후에는 회사명을 변경할 수 없습니다.
                </p>
                {status === ValidationStatus.EmptyCompanyName && (
                  <p className="text-sm text-destructive">회사명을 입력해주세요.</p>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeAll"
                    checked={agreeAll}
                    onCheckedChange={(checked) => handleAgreeAll(checked as boolean)}
                  />
                  <Label htmlFor="agreeAll" className="text-sm font-medium cursor-pointer">
                    개인정보처리방침 및 서비스 이용약관에 모두 동의합니다
                  </Label>
                </div>

                <div className="pl-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="confirmAge"
                        checked={confirmAge}
                        onCheckedChange={(checked) => setConfirmAge(checked as boolean)}
                      />
                      <Label htmlFor="confirmAge" className="text-sm text-muted-foreground cursor-pointer">
                        <span className="text-destructive">[필수]</span> 만 14세 이상입니다
                      </Label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="serviceTerms"
                        checked={serviceTerms}
                        onCheckedChange={(checked) => setServiceTerms(checked as boolean)}
                      />
                      <Label htmlFor="serviceTerms" className="text-sm text-muted-foreground cursor-pointer">
                        <span className="text-destructive">[필수]</span> 서비스 이용약관 동의
                      </Label>
                    </div>
                    <Button variant="link" size="sm" className="text-xs h-auto p-0 text-muted-foreground" asChild>
                      <Link href="/terms/service" target="_blank">
                        내용보기 <ExternalLink className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="privacyTerms"
                        checked={privacyTerms}
                        onCheckedChange={(checked) => setPrivacyTerms(checked as boolean)}
                      />
                      <Label htmlFor="privacyTerms" className="text-sm text-muted-foreground cursor-pointer">
                        <span className="text-destructive">[필수]</span> 개인정보처리방침 동의
                      </Label>
                    </div>
                    <Button variant="link" size="sm" className="text-xs h-auto p-0 text-muted-foreground" asChild>
                      <Link href="/terms/privacy" target="_blank">
                        내용보기 <ExternalLink className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
                className="w-full h-14 text-lg font-semibold mt-6"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    신청 중...
                  </>
                ) : (
                  <>
                    무료체험 신청하기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Access URL Info */}
          <div className="mt-6 p-4 bg-muted/50 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <Link2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">체험판 접속 주소</p>
                <a 
                  href={EVER_TIME_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline text-sm"
                >
                  {EVER_TIME_URL}
                </a>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>안전한 데이터 보호</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>30일 무료 체험</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>신용카드 불필요</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
