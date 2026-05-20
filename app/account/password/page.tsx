'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUserProfile } from '@/redux/selectors/Users'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Lock, CheckCircle, Eye, EyeOff } from 'lucide-react'
import { Api } from '@/api'
import { checkApiResult } from '@/utils/apiUtil'
import { alertMessage } from '@/utils/messageBox'

export default function PasswordPage() {
  const router = useRouter()
  const profile = useUserProfile()
  
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'fair' | 'strong'>('weak')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Redirect if not logged in
  useEffect(() => {
    if (!profile || !profile.loginId) {
      router.replace('/login')
    }
  }, [profile, router])

  const calculatePasswordStrength = (password: string) => {
    if (password.length < 6) return 'weak'
    if (!/[a-z]/.test(password) || !/[0-9]/.test(password)) return 'fair'
    if (!/[A-Z]/.test(password) || !/[!@#$%^&*]/.test(password)) return 'fair'
    return 'strong'
  }

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value)
    setPasswordStrength(calculatePasswordStrength(value))
  }

  const validateForm = (): boolean => {
    if (!currentPassword) {
      alertMessage('현재 비밀번호를 입력해주세요.', '입력 오류')
      return false
    }

    if (!newPassword || newPassword.length < 6) {
      alertMessage('새 비밀번호는 최소 6자 이상이어야 합니다.', '입력 오류')
      return false
    }

    if (newPassword !== confirmPassword) {
      alertMessage('새 비밀번호가 일치하지 않습니다.', '입력 오류')
      return false
    }

    if (currentPassword === newPassword) {
      alertMessage('새 비밀번호가 현재 비밀번호와 같습니다.', '입력 오류')
      return false
    }

    return true
  }

  const handleChangePassword = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const result = await Api.Users.changePassword({
        currentPassword,
        newPassword,
      })

      if (!checkApiResult(result)) {
        setIsLoading(false)
        return
      }

      alertMessage('비밀번호가 성공적으로 변경되었습니다.', '변경 완료', '확인')
      
      // Redirect to mypage after success
      setTimeout(() => {
        router.push('/mypage')
      }, 1500)
    } finally {
      setIsLoading(false)
    }
  }

  // Password requirement checkers
  const hasMinLength = newPassword?.length >= 6
  const hasLowerAndNumber = /[a-z]/.test(newPassword) && /[0-9]/.test(newPassword)
  const hasUpperOrSpecial = /[A-Z]/.test(newPassword) || /[!@#$%^&*]/.test(newPassword)
  const isPasswordValid = hasMinLength && hasLowerAndNumber && hasUpperOrSpecial

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b border-border/40 bg-gradient-to-br from-primary/8 via-background to-background">
        <div className="container max-w-3xl mx-auto px-4 py-16 md:py-20">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-primary/15">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                비밀번호 변경
              </h1>
              <p className="text-lg text-muted-foreground">
                계정 보안을 유지하기 위해 정기적으로 비밀번호를 변경해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Security Info */}
          <div className="md:col-span-1">
            <Card className="border-0 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base text-primary">보안 팁</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground mb-1">강력한 비밀번호</p>
                  <p>대문자, 소문자, 숫자, 특수문자를 혼합하세요.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">정기적 변경</p>
                  <p>3개월마다 비밀번호를 변경하는 것이 좋습니다.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">개인정보 미포함</p>
                  <p>이전 비밀번호나 개인정보는 포함하지 마세요.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Current Password */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">현재 비밀번호</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-sm font-medium">
                    비밀번호 <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? 'text' : 'password'}
                      placeholder="현재 비밀번호를 입력하세요"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* New Password */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">새 비밀번호</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-sm font-medium">
                    새 비밀번호 <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="새 비밀번호를 입력하세요"
                      value={newPassword}
                      onChange={(e) => handleNewPasswordChange(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Strength Indicator */}
                {newPassword && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-medium">강도</span>
                      <span
                        className={
                          passwordStrength === 'weak'
                            ? 'text-destructive font-semibold'
                            : passwordStrength === 'fair'
                            ? 'text-yellow-600 font-semibold'
                            : 'text-green-600 font-semibold'
                        }
                      >
                        {passwordStrength === 'weak'
                          ? '약함'
                          : passwordStrength === 'fair'
                          ? '보통'
                          : '강함'}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <div
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          passwordStrength === 'weak'
                            ? 'bg-destructive'
                            : passwordStrength === 'fair'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                      />
                      <div
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          passwordStrength !== 'weak'
                            ? passwordStrength === 'fair'
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                            : 'bg-border'
                        }`}
                      />
                      <div
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          passwordStrength === 'strong'
                            ? 'bg-green-500'
                            : 'bg-border'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {/* Password Requirements */}
                {newPassword && (
                  <div className="bg-muted/40 p-4 rounded-xl space-y-2.5 border border-border/50">
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
                      요구사항
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2.5 text-sm">
                        <div className="flex-shrink-0">
                          {hasMinLength ? (
                            <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                              <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                            </div>
                          ) : (
                            <div className="h-5 w-5 rounded-full border border-border bg-muted" />
                          )}
                        </div>
                        <span className={hasMinLength ? 'text-foreground' : 'text-muted-foreground'}>
                          최소 6자 이상
                        </span>
                      </li>
                      <li className="flex items-center gap-2.5 text-sm">
                        <div className="flex-shrink-0">
                          {hasLowerAndNumber ? (
                            <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                              <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                            </div>
                          ) : (
                            <div className="h-5 w-5 rounded-full border border-border bg-muted" />
                          )}
                        </div>
                        <span className={hasLowerAndNumber ? 'text-foreground' : 'text-muted-foreground'}>
                          영문 소문자와 숫자
                        </span>
                      </li>
                      <li className="flex items-center gap-2.5 text-sm">
                        <div className="flex-shrink-0">
                          {hasUpperOrSpecial ? (
                            <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                              <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                            </div>
                          ) : (
                            <div className="h-5 w-5 rounded-full border border-border bg-muted" />
                          )}
                        </div>
                        <span className={hasUpperOrSpecial ? 'text-foreground' : 'text-muted-foreground'}>
                          영문 대문자 또는 특수문자
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Confirm Password */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">비밀번호 확인</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-sm font-medium">
                    새 비밀번호 확인 <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="새 비밀번호를 다시 입력하세요"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                    <p className="text-sm text-destructive">
                      비밀번호가 일치하지 않습니다.
                    </p>
                  </div>
                )}
                {confirmPassword && newPassword === confirmPassword && (
                  <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <p className="text-sm text-green-600">
                      비밀번호가 일치합니다.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleChangePassword}
                disabled={isLoading || !currentPassword || !newPassword || !confirmPassword || !isPasswordValid}
                className="flex-1 h-11 text-base font-medium"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    변경 중...
                  </span>
                ) : (
                  '비밀번호 변경'
                )}
              </Button>
              <Link href="/mypage" className="flex-1">
                <Button variant="outline" className="w-full h-11 text-base font-medium">
                  취소
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <Card className="mt-12 border-0 bg-muted/40 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              도움이 필요하신가요?
            </CardTitle>
            <CardDescription>
              비밀번호 변경에 문제가 있거나 추가 지원이 필요하면 고객 지원팀에 문의해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/support/inquiry">
              <Button variant="outline" className="w-full md:w-auto">
                문의하기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
