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
import { AlertCircle, Lock, CheckCircle } from 'lucide-react'
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50 py-12">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              비밀번호 변경
            </h1>
          </div>
          <p className="text-muted-foreground">
            소중한 개인정보 보호를 위해 정기적인 비밀번호 변경을 권장합니다.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-2xl mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>비밀번호 변경</CardTitle>
            <CardDescription>
              보안을 위해 강력한 비밀번호를 설정해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Info Alert */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                비밀번호 변경 권장 주기: {profile?.preference?.passwordChangeMonth || 3}개월
              </AlertDescription>
            </Alert>

            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="current-password">
                현재 비밀번호 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="current-password"
                type="password"
                placeholder="현재 비밀번호를 입력하세요"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="new-password">
                새 비밀번호 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="new-password"
                type="password"
                placeholder="새 비밀번호를 입력하세요"
                value={newPassword}
                onChange={(e) => handleNewPasswordChange(e.target.value)}
              />
              {newPassword && (
                <div className="flex items-center gap-2 text-sm">
                  <div
                    className={`h-2 flex-1 rounded-full ${
                      passwordStrength === 'weak'
                        ? 'bg-destructive'
                        : passwordStrength === 'fair'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                  />
                  <span
                    className={
                      passwordStrength === 'weak'
                        ? 'text-destructive'
                        : passwordStrength === 'fair'
                        ? 'text-yellow-600'
                        : 'text-green-600'
                    }
                  >
                    {passwordStrength === 'weak'
                      ? '약함'
                      : passwordStrength === 'fair'
                      ? '보통'
                      : '강함'}
                  </span>
                </div>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-semibold text-foreground">비밀번호 요구사항:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center gap-2">
                  {newPassword?.length >= 6 ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                  )}
                  최소 6자 이상
                </li>
                <li className="flex items-center gap-2">
                  {/[a-z]/.test(newPassword) && /[0-9]/.test(newPassword) ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                  )}
                  영문 소문자와 숫자 포함
                </li>
                <li className="flex items-center gap-2">
                  {/[A-Z]/.test(newPassword) || /[!@#$%^&*]/.test(newPassword) ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                  )}
                  영문 대문자 또는 특수문자 포함
                </li>
              </ul>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password">
                새 비밀번호 확인 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="새 비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-sm text-destructive">비밀번호가 일치하지 않습니다.</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleChangePassword}
                disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
                className="flex-1"
              >
                {isLoading ? '변경 중...' : '비밀번호 변경'}
              </Button>
              <Link href="/mypage" className="flex-1">
                <Button variant="outline" className="w-full">
                  취소
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle className="text-base">도움이 필요하신가요?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              비밀번호 변경에 문제가 있으면 고객 지원팀에 문의해주세요.
            </p>
            <Link href="/support/inquiry">
              <Button variant="outline" className="w-full">
                문의하기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
