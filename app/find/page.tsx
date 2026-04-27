'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertCircle, Mail, Phone, CheckCircle, Lock } from 'lucide-react'
import { Api } from '@/api'
import { checkApiResult } from '@/utils/apiUtil'
import { alertMessage } from '@/utils/messageBox'

export default function FindPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('id')
  
  // Find ID State
  const [idEmail, setIdEmail] = useState('')
  const [idPhone, setIdPhone] = useState('')
  const [foundIds, setFoundIds] = useState<string[]>([])
  const [isSearchingId, setIsSearchingId] = useState(false)
  
  // Find Password State
  const [pwLoginId, setPwLoginId] = useState('')
  const [pwEmail, setPwEmail] = useState('')
  const [pwPhone, setPwPhone] = useState('')
  const [isSearchingPw, setIsSearchingPw] = useState(false)
  const [pwResetSent, setPwResetSent] = useState(false)

  const handleFindId = async () => {
    if (!idEmail && !idPhone) {
      alertMessage('이메일 또는 휴대폰 번호를 입력해주세요.', '입력 오류')
      return
    }

    setIsSearchingId(true)
    try {
      const result = await Api.Users.findLoginIds({
        email: idEmail,
        phone: idPhone,
      })

      if (!checkApiResult(result)) {
        setIsSearchingId(false)
        return
      }

      const ids = result!.payload || []
      if (ids.length === 0) {
        alertMessage('가입 정보가 없습니다. 회원가입을 진행해주세요.', '검색 결과')
        return
      }

      setFoundIds(ids)
    } finally {
      setIsSearchingId(false)
    }
  }

  const handleFindPassword = async () => {
    if (!pwLoginId || !pwEmail) {
      alertMessage('아이디와 이메일을 입력해주세요.', '입력 오류')
      return
    }

    setIsSearchingPw(true)
    try {
      const result = await Api.Users.sendPasswordReset({
        loginId: pwLoginId,
        email: pwEmail,
        phone: pwPhone,
      })

      if (!checkApiResult(result)) {
        setIsSearchingPw(false)
        return
      }

      setPwResetSent(true)
      alertMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다.', '성공')
    } finally {
      setIsSearchingPw(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50 py-12">
        <div className="container max-w-2xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            아이디·비밀번호 찾기
          </h1>
          <p className="text-muted-foreground">
            등록된 이메일 또는 휴대폰 번호로 아이디와 비밀번호를 찾을 수 있습니다.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-2xl mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="id">아이디 찾기</TabsTrigger>
            <TabsTrigger value="password">비밀번호 찾기</TabsTrigger>
          </TabsList>

          {/* Find ID Tab */}
          <TabsContent value="id" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  등록된 아이디 찾기
                </CardTitle>
                <CardDescription>
                  등록된 이메일 또는 휴대폰 번호로 아이디를 찾을 수 있습니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="id-email">이메일</Label>
                  <Input
                    id="id-email"
                    type="email"
                    placeholder="example@email.com"
                    value={idEmail}
                    onChange={(e) => setIdEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="id-phone">휴대폰 번호 (선택)</Label>
                  <Input
                    id="id-phone"
                    type="tel"
                    placeholder="010-0000-0000"
                    value={idPhone}
                    onChange={(e) => setIdPhone(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleFindId} 
                  disabled={isSearchingId}
                  className="w-full"
                >
                  {isSearchingId ? '검색 중...' : '아이디 찾기'}
                </Button>
              </CardContent>
            </Card>

            {/* Found IDs Display */}
            {foundIds.length > 0 && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    찾은 아이디
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {foundIds.map((id, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-background rounded-lg border border-border/50"
                    >
                      <span className="font-semibold text-foreground">{id}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(id)
                          alertMessage('아이디가 복사되었습니다.', '복사 완료')
                        }}
                      >
                        복사
                      </Button>
                    </div>
                  ))}
                  <Link href="/login" className="block">
                    <Button variant="outline" className="w-full">
                      로그인 페이지로 이동
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Find Password Tab */}
          <TabsContent value="password" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  비밀번호 재설정
                </CardTitle>
                <CardDescription>
                  가입하신 아이디와 이메일로 비밀번호 재설정 링크를 받을 수 있습니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pw-id">아이디</Label>
                  <Input
                    id="pw-id"
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={pwLoginId}
                    onChange={(e) => setPwLoginId(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pw-email">이메일</Label>
                  <Input
                    id="pw-email"
                    type="email"
                    placeholder="example@email.com"
                    value={pwEmail}
                    onChange={(e) => setPwEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pw-phone">휴대폰 번호 (선택)</Label>
                  <Input
                    id="pw-phone"
                    type="tel"
                    placeholder="010-0000-0000"
                    value={pwPhone}
                    onChange={(e) => setPwPhone(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleFindPassword} 
                  disabled={isSearchingPw}
                  className="w-full"
                >
                  {isSearchingPw ? '전송 중...' : '비밀번호 재설정 링크 받기'}
                </Button>
              </CardContent>
            </Card>

            {pwResetSent && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900">재설정 링크가 전송되었습니다</p>
                      <p className="text-sm text-green-800 mt-1">
                        입력하신 이메일을 확인하여 비밀번호를 재설정해주세요.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Help Section */}
        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              도움이 필요하신가요?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              위 방법으로 계정을 찾을 수 없다면 고객 지원팀에 문의해주세요.
            </p>
            <div className="flex gap-3">
              <Link href="/support/inquiry">
                <Button variant="outline">문의하기</Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost">로그인으로 돌아가기</Button>
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

