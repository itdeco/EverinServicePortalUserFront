"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, User, Phone, Shield, Clock, CheckCircle2, Sparkles, Gift, ArrowRight, ExternalLink, UserPlus, X } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Api } from "@/api"
import { checkApiResult } from "@/utils/apiUtil"
import { PlanDto } from "@/types/subscribe"
import { SmsAuthenticationRequestBaseDto, SmsAuthenticationVerifyDto } from "@/types/Users"
import { TrialRequestDto } from "@/types/Trials"
import { TermsDto, TermsType } from "@/types/Terms"
import CommonUtil from "@/utils/commonUtil"
import { COLORS } from "@/constants/brand-colors"
import { useLoginStatus, useUserProfile } from "@/redux/selectors/Users"

enum ValidationStatus {
  Valid,
  EmptyName,
  EmptyPhone,
  InvalidPhone,
  AuthCodeNotMatch,
  TimerExpired
}

// 동시에 체험되는 서비스 목록 (선택 불가, 2개 동시 체험)
const TRIAL_SERVICES = [
  {
    name: "에버타임 스탠다드",
    category: "근태관리",
    description: "출퇴근, 근무시간, 휴가까지 한 번에 관리",
    icon: Clock,
    color: COLORS.people
  },
  {
    name: "에버웰커밍",
    category: "온보딩",
    description: "신규 입사자 온보딩 프로세스를 간편하게",
    icon: UserPlus,
    color: COLORS.onboarding
  }
]

export default function TrialPage() {
  const router = useRouter()
  const isLoggedIn = Boolean(useLoginStatus())
  const userProfile = useUserProfile()
  const [freePlans, setFreePlans] = useState<PlanDto[]>([])
  const [name, setName] = useState("")
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

  // 서비스 이용약관 모달 (푸터와 동일)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [isTermsLoading, setIsTermsLoading] = useState(false)
  const [serviceTermsContent, setServiceTermsContent] = useState<TermsDto | null>(null)

  // Load free plans
  useEffect(() => {
    Api.Plans.getAllFreePlans().then(result => {
      if (checkApiResult(result) && result?.payload) {
        setFreePlans(result.payload)
      }
    })
  }, [])

  // 로그인 상태면 프로필의 이름/전화번호를 사용 (별도 입력/인증 불필요)
  useEffect(() => {
    if (isLoggedIn && userProfile) {
      setName(userProfile.name || "")
      setPhone(userProfile.phone || "")
    }
  }, [isLoggedIn, userProfile])

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

  // 로그인 시 이름/전화 인증 생략, 비로그인 시 입력 + SMS 인증 필요
  const identityVerified = isLoggedIn
    ? name.length > 0 && phone.length > 0
    : name.length > 0 && phone.length > 0 && authCodeVerified
  const canSubmit = identityVerified && confirmAge && serviceTerms && privacyTerms

  const handleAgreeAll = (checked: boolean) => {
    setAgreeAll(checked)
    setConfirmAge(checked)
    setServiceTerms(checked)
    setPrivacyTerms(checked)
  }

  const openServiceTerms = async () => {
    setIsTermsModalOpen(true)

    if (serviceTermsContent?.content) return

    setIsTermsLoading(true)
    const result = await Api.Terms.getLatestTypeTerms(TermsType.Service)
    if (checkApiResult(result)) {
      setServiceTermsContent(result.payload as TermsDto)
    }
    setIsTermsLoading(false)
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
    if (!phone) {
      setStatus(ValidationStatus.EmptyPhone)
      return
    }

    setIsSubmitting(true)
    try {
      // 무료 플랜(에버타임 스탠다드 / 에버웰커밍)을 동시에 체험 신청
      let allOk = freePlans.length > 0
      for (const plan of freePlans) {
        const params: TrialRequestDto = {
          trialUserName: name,
          phone: phone,
          termsConsent: 1,
          planId: plan.id
        }
        const result = await Api.Trials.requestTrial(params)
        if (!checkApiResult(result)) {
          allOk = false
        }
      }

      if (allOk) {
        router.push(`/trial/step2?name=${encodeURIComponent(name)}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const getErrorMessage = () => {
    switch (status) {
      case ValidationStatus.EmptyName:
        return "이름을 입력해주세요"
      case ValidationStatus.EmptyPhone:
        return "휴대전화번호를 입력해주세요"
      case ValidationStatus.InvalidPhone:
        return "올바른 휴대전화번호 형식이 아닙니다"
      case ValidationStatus.AuthCodeNotMatch:
        return "인증번호가 일치하지 않습니다"
      case ValidationStatus.TimerExpired:
        return "인증시간이 만료되었습니다. 다시 요청해주세요"
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-0">
              <Gift className="w-4 h-4 mr-1.5" />
              15일 무료 체험
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
                에버타임 스탠다드와 에버웰커밍을 15일간 함께 무료로 체험해보세요
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-5">
              {/* Trial Services (선택 불가, 2개 동시 체험) */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">체험 서비스</Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {TRIAL_SERVICES.map((service) => {
                    const Icon = service.icon
                    return (
                      <div
                        key={service.name}
                        className="relative flex flex-col gap-2 rounded-xl border p-4"
                        style={{
                          borderColor: `${service.color}40`,
                          backgroundColor: `${service.color}0d`
                        }}
                      >
                        <CheckCircle2 className="absolute right-3 top-3 h-5 w-5" style={{ color: service.color }} />
                        <div className="flex items-center gap-2">
                          <div
                            className="flex h-9 w-9 items-center justify-center rounded-lg"
                            style={{ backgroundColor: `${service.color}1a` }}
                          >
                            <Icon className="h-5 w-5" style={{ color: service.color }} />
                          </div>
                          <Badge
                            variant="secondary"
                            className="border-0 text-xs"
                            style={{ backgroundColor: `${service.color}1a`, color: service.color }}
                          >
                            {service.category}
                          </Badge>
                        </div>
                        <p className="font-semibold text-foreground">{service.name}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {isLoggedIn ? (
                /* 로그인 시: 프로필 정보로 자동 신청 (입력/인증 생략) */
                <div className="rounded-xl border bg-muted/40 p-4 space-y-3">
                  <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    로그인된 정보로 신청합니다
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{name || "-"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{phone || "-"}</span>
                    </div>
                  </div>
                </div>
              ) : (
              <>
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
                      휴대폰으로 전송된 인증번호를 3분 안에 입력해주세요.
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
              </>
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
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      className="text-xs h-auto p-0 text-muted-foreground"
                      onClick={openServiceTerms}
                    >
                      내용보기 <ExternalLink className="w-3 h-3 ml-1" />
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
                      <a href="https://www.ksystem.co.kr/privacy-statement/" target="_blank" rel="noopener noreferrer">
                        내용보기 <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
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
              <span>15일 무료 체험</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>신용카드 불필요</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* 서비스 이용약관 모달 (푸터와 동일) */}
      {isTermsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8 backdrop-blur-sm">
          <button
            type="button"
            aria-label="서비스이용약관 닫기"
            className="absolute inset-0 cursor-default"
            onClick={() => setIsTermsModalOpen(false)}
          />
          <div
            className="relative flex w-full max-w-[min(760px,calc(100vw-32px))] flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
            style={{ height: "min(760px, calc(100vh - 64px))" }}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <p className="text-lg font-bold text-slate-950">서비스이용약관</p>
                <p className="text-sm text-slate-500">에버인 서비스 이용 약관</p>
              </div>
              <button
                type="button"
                aria-label="닫기"
                onClick={() => setIsTermsModalOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden bg-white p-5">
              {isTermsLoading ? (
                <div className="flex h-full items-center justify-center text-sm font-medium text-slate-500">
                  약관을 불러오는 중입니다.
                </div>
              ) : (
                <iframe
                  title="서비스이용약관"
                  srcDoc={serviceTermsContent?.content || `<p style="text-align:center;">적용기간에 맞는 약관이 없습니다.</p>`}
                  className="h-full w-full border-0"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
