"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDispatch } from "react-redux"
import { Loader2, User, Phone, Lock, Mail, Building2, CheckCircle2, ArrowRight } from "lucide-react"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Api } from "@/api"
import { checkApiResult } from "@/utils/apiUtil"
import { alertMessage } from "@/utils/messageBox"
import CommonUtil from "@/utils/commonUtil"
import { UserActions } from "@/redux/actions/Users"
import {
  CompanyAdminInvitationDto,
  CompanyAdminInviteSignUpDto,
  CompanyAdminInviteJoinDto,
  SmsAuthenticationRequestBaseDto,
  SmsAuthenticationVerifyDto,
  UserDto,
} from "@/types/Users"

const MY_PAGE = "/mypage/account?tab=1"

function InviteContent() {
  const router = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") ?? ""

  const [loading, setLoading] = useState(true)
  const [invitation, setInvitation] = useState<CompanyAdminInvitationDto | null>(null)

  // 공통: 비밀번호
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  // 신규 가입: 성함 + 휴대폰 인증
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [authCode, setAuthCode] = useState("")
  const [authCodeVerified, setAuthCodeVerified] = useState(false)
  const [timerStarted, setTimerStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(180)
  const [isRequestingCode, setIsRequestingCode] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  // 초대 정보 조회
  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }

    Api.Users.getAdminInvitation(token).then((result) => {
      if (checkApiResult(result) && result?.payload) {
        const data = result.payload as CompanyAdminInvitationDto
        setInvitation(data)
        setName(data.inviteeName ?? "")
      }
      setLoading(false)
    })
  }, [token])

  // 타이머
  useEffect(() => {
    if (!timerStarted) return
    if (timeLeft <= 0) {
      setTimerStarted(false)
      return
    }
    const t = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
    return () => clearInterval(t)
  }, [timerStarted, timeLeft])

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec.toString().padStart(2, "0")}`
  }

  const handleRequestAuthCode = async () => {
    if (!CommonUtil.isValidMobilePhone(phone)) {
      await alertMessage("올바른 휴대폰 번호를 입력해주세요.")
      return
    }

    setIsRequestingCode(true)
    const params: SmsAuthenticationRequestBaseDto = {
      needToCheckUserName: false,
      phone: phone,
    }

    try {
      const result = await Api.Sms.requestAuthenticationCode(params)
      if (checkApiResult(result)) {
        setTimerStarted(true)
        setTimeLeft(180)
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
      authenticationCode: authCode,
    }

    try {
      const result = await Api.Sms.verifyAuthenticationCode(params)
      if (checkApiResult(result)) {
        setTimerStarted(false)
        setAuthCodeVerified(true)
      } else {
        await alertMessage("인증번호가 일치하지 않습니다.")
      }
    } finally {
      setIsVerifying(false)
    }
  }

  // 신규 가입으로 초대 수락
  const handleSignUp = async () => {
    if (!name) {
      await alertMessage("성함을 입력해주세요.")
      return
    }
    if (!authCodeVerified) {
      await alertMessage("휴대폰 인증을 완료해주세요.")
      return
    }
    if (password.length < 8) {
      await alertMessage("비밀번호는 8자 이상 입력해주세요.")
      return
    }
    if (password !== passwordConfirm) {
      await alertMessage("비밀번호가 일치하지 않습니다.")
      return
    }

    setIsSubmitting(true)
    try {
      const params: CompanyAdminInviteSignUpDto = {
        token,
        email: invitation!.email!,
        name,
        password,
        phone,
      }
      const result = await Api.Users.acceptInvitationSignUp(params)
      if (checkApiResult(result)) {
        await alertMessage(`${invitation!.corporationName} 관리자로 등록되었습니다.`)
        if (result?.payload) {
          dispatch(UserActions.setUserProfile(result.payload as UserDto))
        }
        router.replace(MY_PAGE)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // 기존 회원 로그인으로 초대 수락(회사 합류)
  const handleJoin = async () => {
    if (password.length < 1) {
      await alertMessage("비밀번호를 입력해주세요.")
      return
    }

    setIsSubmitting(true)
    try {
      const params: CompanyAdminInviteJoinDto = {
        token,
        loginId: invitation!.email!,
        password,
      }
      const result = await Api.Users.acceptInvitationJoin(params)
      if (checkApiResult(result)) {
        await alertMessage(`${invitation!.corporationName} 관리자로 합류되었습니다.`)
        if (result?.payload) {
          dispatch(UserActions.setUserProfile(result.payload as UserDto))
        }
        router.replace(MY_PAGE)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!token || !invitation) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-2 text-xl font-bold text-foreground">유효하지 않은 초대입니다</h1>
        <p className="text-sm text-muted-foreground">
          초대 링크가 올바르지 않거나 만료되었습니다. 회사 관리자에게 다시 초대를 요청해주세요.
        </p>
        <Button className="mt-6" onClick={() => router.push("/")}>
          홈으로
        </Button>
      </div>
    )
  }

  if (invitation.expired) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-2 text-xl font-bold text-foreground">만료된 초대입니다</h1>
        <p className="text-sm text-muted-foreground">
          이 초대는 만료되었습니다(발송 후 7일). 회사 관리자에게 다시 초대를 요청해주세요.
        </p>
        <Button className="mt-6" onClick={() => router.push("/")}>
          홈으로
        </Button>
      </div>
    )
  }

  const isExisting = invitation.isExistingUser

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-10">
      {/* 초대 안내 */}
      <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Building2 className="h-4 w-4 text-primary" />
          {invitation.corporationName}
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{invitation.inviterName}</span>님이 회원님을{" "}
          <span className="font-medium text-foreground">{invitation.corporationName}</span> 사내 관리자로 초대했습니다.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {isExisting ? "로그인하고 관리자 합류하기" : "관리자 가입하기"}
          </CardTitle>
          <CardDescription>
            {isExisting
              ? "이미 가입된 계정입니다. 로그인하면 초대된 회사의 관리자로 합류됩니다."
              : "초대받은 이메일로 관리자 계정을 만듭니다."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* 이메일 (고정) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">이메일</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" value={invitation.email ?? ""} readOnly disabled className="h-12 pl-10" />
            </div>
            <p className="text-xs text-muted-foreground">초대된 이메일은 변경할 수 없습니다.</p>
          </div>

          {isExisting ? (
            /* 기존 회원: 비밀번호 입력 후 로그인 → 회사 합류 */
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">비밀번호</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-10"
                />
              </div>
            </div>
          ) : (
            /* 신규 회원: 성함 + 휴대폰 인증 + 비밀번호 */
            <>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">성함</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="성함을 입력하세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">휴대전화</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="휴대폰 번호를 입력하세요"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value)
                        setAuthCodeVerified(false)
                      }}
                      disabled={authCodeVerified}
                      className="h-12 pl-10"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 shrink-0"
                    onClick={handleRequestAuthCode}
                    disabled={isRequestingCode || authCodeVerified}
                  >
                    {isRequestingCode ? <Loader2 className="h-4 w-4 animate-spin" /> : "인증번호 받기"}
                  </Button>
                </div>
              </div>

              {timerStarted && !authCodeVerified && (
                <div className="space-y-2">
                  <Label htmlFor="authCode" className="text-sm font-medium">인증번호</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="authCode"
                        placeholder="인증번호 6자리"
                        value={authCode}
                        onChange={(e) => setAuthCode(e.target.value)}
                        className="h-12 pr-16"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-destructive">
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                    <Button
                      type="button"
                      className="h-12 shrink-0"
                      onClick={handleVerifyAuthCode}
                      disabled={isVerifying}
                    >
                      {isVerifying ? <Loader2 className="h-4 w-4 animate-spin" /> : "확인"}
                    </Button>
                  </div>
                </div>
              )}

              {authCodeVerified && (
                <p className="flex items-center gap-1.5 text-sm font-medium text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  휴대폰 인증이 완료되었습니다.
                </p>
              )}

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">비밀번호</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="8자 이상 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passwordConfirm" className="text-sm font-medium">비밀번호 확인</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="passwordConfirm"
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="h-12 pl-10"
                  />
                </div>
              </div>
            </>
          )}

          <Button
            size="lg"
            className="mt-2 h-12 w-full"
            onClick={isExisting ? handleJoin : handleSignUp}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                {isExisting ? "로그인하고 합류하기" : "관리자 가입 완료"}
                <ArrowRight className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function InvitePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex min-h-[60vh] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
        >
          <InviteContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
