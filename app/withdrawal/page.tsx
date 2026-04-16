"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Loader2, AlertTriangle, UserX, Lock, Eye, EyeOff } from "lucide-react"
import { Api } from "@/api"
import { checkApiResult } from "@/utils/apiUtil"
import { WithdrawalLogDto, WithdrawalReason } from "@/types/Users"

export default function WithdrawalPage() {
  const router = useRouter()
  const [reason, setReason] = useState<string>(WithdrawalReason.ServiceComplain.toString())
  const [description, setDescription] = useState("")
  const [agree, setAgree] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  const reasons = [
    { value: WithdrawalReason.ServiceComplain.toString(), label: "서비스 품질불만" },
    { value: WithdrawalReason.LowUse.toString(), label: "이용빈도 낮음" },
    { value: WithdrawalReason.Privacy.toString(), label: "개인정보 유출우려" },
    { value: WithdrawalReason.ASComplain.toString(), label: "A/S불만" },
    { value: WithdrawalReason.Etc.toString(), label: "기타사유" },
  ]

  const handleWithdrawalClick = () => {
    setShowPasswordModal(true)
    setPassword("")
    setPasswordError("")
  }

  const handleConfirmWithdrawal = async () => {
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.")
      return
    }

    // Verify password first
    try {
      const verifyResult = await Api.Users.verifyPassword({ password })
      if (!checkApiResult(verifyResult)) {
        setPasswordError("비밀번호가 일치하지 않습니다.")
        return
      }
    } catch {
      setPasswordError("비밀번호 확인 중 오류가 발생했습니다.")
      return
    }

    // Proceed with withdrawal
    const params: WithdrawalLogDto = {
      reason: parseInt(reason),
      description: parseInt(reason) === WithdrawalReason.Etc ? description : undefined,
      cancel: 0
    }

    setIsSubmitting(true)
    try {
      const result = await Api.Users.withdrawal(params)
      if (checkApiResult(result)) {
        // Clear user session and redirect
        localStorage.clear()
        sessionStorage.clear()
        alert("탈퇴 처리가 완료되었습니다.")
        router.push("/")
      }
    } finally {
      setIsSubmitting(false)
      setShowPasswordModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-destructive/5 via-background to-background">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
              <UserX className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">회원탈퇴</h1>
            <p className="text-muted-foreground">
              서비스 포털을 사용하시면서 불편한 점이 있으셨나요?
              <br />
              개선할 점을 말씀해 주시면 적극적으로 검토, 반영하겠습니다.
            </p>
          </div>

          {/* Main Card */}
          <Card className="shadow-lg border bg-card mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                탈퇴사유 확인
                <span className="text-destructive">*</span>
              </CardTitle>
              <CardDescription>
                탈퇴하시는 이유를 선택해주세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Reason Selection */}
              <RadioGroup value={reason} onValueChange={setReason} className="space-y-3">
                {reasons.map((item) => (
                  <div key={item.value} className="flex items-center space-x-3">
                    <RadioGroupItem value={item.value} id={`reason-${item.value}`} />
                    <Label htmlFor={`reason-${item.value}`} className="cursor-pointer">
                      {item.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* Description Textarea (for Etc reason) */}
              {parseInt(reason) === WithdrawalReason.Etc && (
                <div className="space-y-2">
                  <Label htmlFor="description">탈퇴 사유를 간략히 적어주세요</Label>
                  <Textarea
                    id="description"
                    placeholder="탈퇴 사유를 입력해주세요..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="resize-none"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Warning Alert */}
          <Alert variant="destructive" className="mb-6 bg-destructive/5 border-destructive/20">
            <AlertTriangle className="h-5 w-5" />
            <AlertDescription className="ml-2">
              <p className="font-semibold mb-2">유의사항</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>탈퇴 시 서비스에 있는 회원정보 데이터는 파기되어 복구할 수 없습니다.</li>
                <li>현재 고객님의 결제관련 처리사항이 완료되지 않은 경우, 처리 완료 후 탈퇴 가능합니다.</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Agreement Checkbox */}
          <Card className="shadow-sm border bg-card mb-6">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agree"
                  checked={agree}
                  onCheckedChange={(checked) => setAgree(checked as boolean)}
                  className="mt-0.5"
                />
                <Label htmlFor="agree" className="cursor-pointer text-sm leading-relaxed">
                  회원탈퇴에 관한 모든 내용을 숙지하였고, 회원 탈퇴를 신청합니다.
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button variant="outline" asChild className="sm:w-auto">
              <Link href="/mypage">취소</Link>
            </Button>
            <Button
              variant="destructive"
              onClick={handleWithdrawalClick}
              disabled={!agree || isSubmitting}
              className="sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  처리 중...
                </>
              ) : (
                "탈퇴 신청"
              )}
            </Button>
          </div>
        </div>
      </main>

      {/* Password Confirmation Modal */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="sm:max-w-md" aria-describedby="password-dialog-description">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              비밀번호 확인
            </DialogTitle>
            <DialogDescription id="password-dialog-description">
              회원 탈퇴를 진행하려면 현재 비밀번호를 입력해주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setPasswordError("")
                  }}
                  className={passwordError ? "border-destructive" : ""}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {passwordError && (
                <p className="text-sm text-destructive">{passwordError}</p>
              )}
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPasswordModal(false)}
              className="sm:w-auto"
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmWithdrawal}
              disabled={isSubmitting || !password}
              className="sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  처리 중...
                </>
              ) : (
                "탈퇴 확인"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
