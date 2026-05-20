'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Mail, Phone, CheckCircle, Lock, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Api } from '@/api'
import { checkApiResult } from '@/utils/apiUtil'
import { alertMessage } from '@/utils/messageBox'

type ActiveTab = 'id' | 'password'

export default function FindPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<ActiveTab>('id')

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
    } finally {
      setIsSearchingPw(false)
    }
  }

  const resetIdSearch = () => {
    setFoundIds([])
    setIdEmail('')
    setIdPhone('')
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex flex-col lg:flex-row w-full lg:max-w-7xl lg:mx-auto">

        {/* 왼쪽: 브랜딩 영역 (데스크탑) */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
          {/* 배경 블러 */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-[#00cc99] rounded-full blur-[120px]" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#4b6bf5] rounded-full blur-[150px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00cc99]/50 rounded-full blur-[100px]" />
          </div>
          {/* 그리드 패턴 */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />

          <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full h-full">
            {/* 로고 */}
            <div className="absolute top-10 left-0 right-0 bg-white px-12 xl:px-16 py-5">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/header/ever-person-logo.png"
                  alt="에버人 로고"
                  width={140}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* 중앙 메시지 */}
            <div className="flex-1 flex flex-col justify-center max-w-lg">
              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
                계정 정보를<br />
                <span className="bg-gradient-to-r from-[#00cc99] to-[#4b6bf5] bg-clip-text text-transparent">
                  빠르게 찾아드려요
                </span>
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed">
                이메일이나 휴대폰 번호로<br />
                아이디와 비밀번호를 손쉽게 찾을 수 있습니다.
              </p>

              {/* 안내 카드 */}
              <div className="mt-12 space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#00cc99]/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#00cc99]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">아이디 찾기</p>
                    <p className="text-sm text-gray-400 mt-0.5">등록된 이메일로 아이디를 확인하세요</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#4b6bf5]/20 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-[#4b6bf5]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">비밀번호 재설정</p>
                    <p className="text-sm text-gray-400 mt-0.5">재설정 링크를 이메일로 받아보세요</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 하단 로고 */}
            <div>
              <Image
                src="/images/main/softlab-logo-light.svg"
                alt="영림원소프트랩"
                width={160}
                height={32}
                className="h-8 w-auto opacity-70"
              />
            </div>
          </div>
        </div>

        {/* 오른쪽: 폼 영역 */}
        <div className="flex-1 lg:w-1/2 xl:w-[45%] flex flex-col bg-background">
          {/* 모바일 헤더 */}
          <div className="lg:hidden">
            <Header />
          </div>

          {/* 데스크탑 상단 로그인 안내 */}
          <div className="hidden lg:flex justify-end items-center p-6 xl:p-8">
            <p className="text-sm text-muted-foreground">
              계정이 있으신가요?{' '}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                로그인하기
              </Link>
            </p>
          </div>

          <main className="flex-1 flex items-center justify-center px-6 py-8 lg:px-12 xl:px-16">
            <div className="w-full max-w-md">

              {/* 뒤로가기 */}
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                로그인으로 돌아가기
              </Link>

              {/* Title */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-3">아이디 · 비밀번호 찾기</h1>
                <p className="text-base text-muted-foreground">
                  등록된 정보로 계정을 찾을 수 있습니다.
                </p>
              </div>

              {/* 탭 */}
              <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
                <button
                  onClick={() => setActiveTab('id')}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                    activeTab === 'id'
                      ? 'bg-white text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  아이디 찾기
                </button>
                <button
                  onClick={() => setActiveTab('password')}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                    activeTab === 'password'
                      ? 'bg-white text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  비밀번호 찾기
                </button>
              </div>

              {/* 아이디 찾기 */}
              {activeTab === 'id' && (
                <>
                  {foundIds.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="id-email" className="text-sm font-semibold text-gray-700">
                          이메일
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="id-email"
                            type="email"
                            placeholder="example@email.com"
                            value={idEmail}
                            onChange={(e) => setIdEmail(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleFindId()}
                            className="h-11 pl-12 pr-4 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-primary focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="id-phone" className="text-sm font-semibold text-gray-700">
                          휴대폰 번호 <span className="text-muted-foreground font-normal">(선택)</span>
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="id-phone"
                            type="tel"
                            placeholder="010-0000-0000"
                            value={idPhone}
                            onChange={(e) => setIdPhone(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleFindId()}
                            className="h-11 pl-12 pr-4 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-primary focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <Button
                        onClick={handleFindId}
                        disabled={isSearchingId || (!idEmail && !idPhone)}
                        className="w-full h-11 rounded-lg text-base font-semibold mt-2"
                      >
                        {isSearchingId ? (
                          <div className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            검색 중...
                          </div>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            아이디 찾기
                            <ArrowRight className="h-5 w-5" />
                          </span>
                        )}
                      </Button>
                    </div>
                  ) : (
                    /* 찾은 아이디 결과 */
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">아이디를 찾았습니다</p>
                          <p className="text-sm text-muted-foreground">
                            {foundIds.length}개의 계정이 확인되었습니다.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {foundIds.map((id, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                          >
                            <div className="flex items-center gap-3">
                              <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="font-semibold text-foreground text-sm">{id}</span>
                            </div>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(id)
                                alertMessage('아이디가 복사되었습니다.', '복사 완료')
                              }}
                              className="text-xs text-primary font-semibold hover:underline"
                            >
                              복사
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col gap-2 pt-2">
                        <Link href="/login">
                          <Button className="w-full h-11 rounded-lg font-semibold">
                            <span className="flex items-center justify-center gap-2">
                              로그인하기
                              <ArrowRight className="h-5 w-5" />
                            </span>
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          className="w-full h-11 rounded-lg font-semibold text-muted-foreground"
                          onClick={resetIdSearch}
                        >
                          다시 찾기
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* 비밀번호 찾기 */}
              {activeTab === 'password' && (
                <>
                  {!pwResetSent ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="pw-id" className="text-sm font-semibold text-gray-700">
                          아이디 (이메일)
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="pw-id"
                            type="email"
                            placeholder="name@example.com"
                            value={pwLoginId}
                            onChange={(e) => setPwLoginId(e.target.value)}
                            className="h-11 pl-12 pr-4 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-primary focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pw-email" className="text-sm font-semibold text-gray-700">
                          등록된 이메일
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="pw-email"
                            type="email"
                            placeholder="example@email.com"
                            value={pwEmail}
                            onChange={(e) => setPwEmail(e.target.value)}
                            className="h-11 pl-12 pr-4 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-primary focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pw-phone" className="text-sm font-semibold text-gray-700">
                          휴대폰 번호 <span className="text-muted-foreground font-normal">(선택)</span>
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="pw-phone"
                            type="tel"
                            placeholder="010-0000-0000"
                            value={pwPhone}
                            onChange={(e) => setPwPhone(e.target.value)}
                            className="h-11 pl-12 pr-4 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-primary focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <Button
                        onClick={handleFindPassword}
                        disabled={isSearchingPw || !pwLoginId || !pwEmail}
                        className="w-full h-11 rounded-lg text-base font-semibold mt-2"
                      >
                        {isSearchingPw ? (
                          <div className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            전송 중...
                          </div>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            재설정 링크 받기
                            <ArrowRight className="h-5 w-5" />
                          </span>
                        )}
                      </Button>
                    </div>
                  ) : (
                    /* 전송 완료 상태 */
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center space-y-6">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-foreground mb-2">
                          재설정 링크가 전송되었습니다
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          <span className="font-semibold text-foreground">{pwEmail}</span>으로<br />
                          비밀번호 재설정 링크를 전송했습니다.<br />
                          이메일을 확인하여 비밀번호를 재설정해주세요.
                        </p>
                      </div>
                      <div className="pt-2 space-y-2">
                        <Link href="/login">
                          <Button className="w-full h-11 rounded-lg font-semibold">
                            <span className="flex items-center justify-center gap-2">
                              로그인하기
                              <ArrowRight className="h-5 w-5" />
                            </span>
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          className="w-full h-11 rounded-lg font-semibold text-muted-foreground"
                          onClick={() => { setPwResetSent(false); setPwLoginId(''); setPwEmail(''); setPwPhone('') }}
                        >
                          다시 시도하기
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* 하단 보안 배지 */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-6">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-xs font-medium">안전한 보안</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs font-medium">이메일 인증</span>
                </div>
              </div>
            </div>
          </main>

          {/* 모바일 푸터 */}
          <div className="lg:hidden">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
