"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, User, Building2, Phone, Shield, Clock, CheckCircle2, Sparkles, Gift, ArrowRight, ExternalLink } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Api } from "@/api"
import { checkApiResult } from "@/utils/apiUtil"
import { PlanDto } from "@/types/Plans"
import { SmsAuthenticationRequestBaseDto, SmsAuthenticationVerifyDto } from "@/types/Users"
import { TrialRequestDto } from "@/types/Trials"
import CommonUtil from "@/utils/commonUtil"

enum ValidationStatus {
  Valid,
  EmptyName,
  EmptyCompanyName,
  EmptyPhone,
  InvalidPhone,
  AuthCodeNotMatch,
  TimerExpired
}

export default function TrialPage() {
  const router = useRouter()
  const [freePlans, setFreePlans] = useState<PlanDto[]>([])
  const [planId, setPlanId] = useState<string>("")
  const [name, setName] = useState("")
  const [corporationName, setCorporationName] = useState("")
  const [phone, setPhone] = useState("")
  const [authCode, setAuthCode] = useState("")
  
  const [agreeAll, setAgreeAll] = useState(false)
  const [confirmAge, setConfirmAge] = useState(false)
  const [serviceTerms, setServiceTerms] = useState(false)
  const [privacyTerms, setPrivacyTerms] = useState(false)
  
  const [status, setStatus] = useState<ValidationStatus>(ValidationStatus.Valid)
  const [timerStarted, setTimerStarted] = useState(false)
  const [timerExpired, setTimerExpired] = useState(false)
  const [timeLeft, setTimeLeft] = useState(180)
  const [authCodeVerified, setAuthCodeVerified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRequestingCode, setIsRequestingCode] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

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

  // Timer countdown
  useEffect(() => {
    if (!timerStarted || timerExpired) return

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setTimerExpired(true)
          setTimerStarted(false)
          setStatus(ValidationStatus.TimerExpired)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timerStarted, timerExpired])

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  const canSubmit = name.length > 0 && corporationName.length > 0 && phone.length > 0 && 
                    authCodeVerified && confirmAge && serviceTerms && privacyTerms

  const handleAgreeAll = (checked: boolean) => {
    setAgreeAll(checked)
    setConfirmAge(checked)
    setServiceTerms(checked)
    setPrivacyTerms(checked)
  }

  const handleRequestAuthCode = async () => {
    if (!CommonUtil.isValidMobilePhone(phone)) {
      setStatus(ValidationStatus.InvalidPhone)
      return
    }

    setIsRequestingCode(true)
    const params: SmsAuthenticationRequestBaseDto = {
      needToCheckUserName: false,
      phone: phone
    }

    try {
      const result = await Api.Sms.requestAuthenticationCode(params)
      if (checkApiResult(result)) {
        setTimerStarted(true)
        setTimerExpired(false)
        setTimeLeft(180)
        setStatus(ValidationStatus.Valid)
        setAuthCodeVerified(false)
      }
    } finally {
      setIsRequestingCode(false)
    }
  }

  const handleVerifyAuthCode = async () => {
    setIsVerifying(true)
    const params: SmsAuthenticationVerifyDto = {
      userName: name,
      phone: phone,
      authenticationCode: authCode
    }

    try {
      const result = await Api.Sms.verifyAuthenticationCode(params)
      if (checkApiResult(result)) {
        setTimerStarted(false)
        setAuthCodeVerified(true)
        setStatus(ValidationStatus.Valid)
      } else {
        setStatus(ValidationStatus.AuthCodeNotMatch)
      }
    } finally {
      setIsVerifying(false)
    }
  }

  const handleSubmit = async () => {
    if (!name) {
      setStatus(ValidationStatus.EmptyName)
      return
    }
    if (!corporationName) {
      setStatus(ValidationStatus.EmptyCompanyName)
      return
    }
    if (!phone) {
      setStatus(ValidationStatus.EmptyPhone)
      return
    }

    const params: TrialRequestDto = {
      trialUserName: name,
      corporationName: corporationName,
      phone: phone,
      termsConsent: 1,
      planId: parseInt(planId)
    }

    setIsSubmitting(true)
    try {
      const result = await Api.Trials.requestTrial(params)
      if (checkApiResult(result)) {
        router.push(`/trial/step2?name=${encodeURIComponent(name)}&corporationName=${encodeURIComponent(corporationName)}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const getErrorMessage = () => {
    switch (status) {
      case ValidationStatus.EmptyName:
        return "이름을 입력해주세요."
      case ValidationStatus.EmptyCompanyName:
        return "회사명을 입력해주세요."
      case ValidationStatus.EmptyPhone:
        return "휴대전화번호를 입력해주세요."
      case ValidationStatus.InvalidPhone:
        return "올바른 휴대전화번호 형식이 아닙니다."
      case ValidationStatus.AuthCodeNotMatch:
        return "인증번호가 일치하지 않습니다."
      case ValidationStatus.TimerExpired:
        return "인증시간이 만료되었습니다. 다시 요청해주세요."
      default:
        return null
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

              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">이름</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="이름을 입력하세요"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (status === ValidationStatus.EmptyName) setStatus(ValidationStatus.Valid)
                    }}
                    className={`pl-10 h-12 ${status === ValidationStatus.EmptyName ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                </div>
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
              </div>

              {/* Phone Input with Verification */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">휴대전화</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="01012345678"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value)
                        if (status === ValidationStatus.EmptyPhone || status === ValidationStatus.InvalidPhone) {
                          setStatus(ValidationStatus.Valid)
                        }
                      }}
                      disabled={authCodeVerified}
                      className={`pl-10 h-12 ${(status === ValidationStatus.EmptyPhone || status === ValidationStatus.InvalidPhone) ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleRequestAuthCode}
                    disabled={!phone || isRequestingCode || authCodeVerified}
                    className="h-12 px-4"
                  >
                    {isRequestingCode ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : authCodeVerified ? (
                      "인증완료"
                    ) : timerStarted ? (
                      "재전송"
                    ) : (
                      "인증요청"
                    )}
                  </Button>
                </div>
              </div>

              {/* Auth Code Input */}
              {(timerStarted || authCodeVerified) && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="authCode" className="text-sm font-medium">인증번호</Label>
                    {timerStarted && !authCodeVerified && (
                      <span className="text-sm text-primary font-medium flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatTime(timeLeft)}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="authCode"
                      type="text"
                      placeholder="인증번호 6자리"
                      value={authCode}
                      onChange={(e) => {
                        setAuthCode(e.target.value)
                        if (status === ValidationStatus.AuthCodeNotMatch || status === ValidationStatus.TimerExpired) {
                          setStatus(ValidationStatus.Valid)
                        }
                      }}
                      disabled={authCodeVerified}
                      maxLength={6}
                      className={`h-12 ${authCodeVerified ? 'bg-primary/5 border-primary' : ''} ${(status === ValidationStatus.AuthCodeNotMatch || status === ValidationStatus.TimerExpired) ? 'border-destructive' : ''}`}
                    />
                    <Button
                      type="button"
                      onClick={handleVerifyAuthCode}
                      disabled={!authCode || authCodeVerified || timerExpired || isVerifying}
                      variant={authCodeVerified ? "secondary" : "default"}
                      className="h-12 px-4"
                    >
                      {isVerifying ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : authCodeVerified ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : (
                        "확인"
                      )}
                    </Button>
                  </div>
                  {timerStarted && !authCodeVerified && (
                    <p className="text-xs text-muted-foreground">
                      휴대��으로 전송된 인증번호를 3�� 안에 입력해주세요.
                    </p>
                  )}
                </div>
              )}

              {/* Error Message */}
              {getErrorMessage() && (
                <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
                  {getErrorMessage()}
                </p>
              )}

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

              {/* Login Link */}
              <p className="text-center text-sm text-muted-foreground pt-2">
                이미 회원이신가요?{" "}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  로그인
                </Link>
              </p>
            </CardContent>
          </Card>

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
