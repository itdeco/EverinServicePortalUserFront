"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import SmartLink from "@/components/common/SmartLink"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, Users, Building2, Briefcase, ChevronDown, X, LogOut, UserCircle, CreditCard, Settings, Receipt, Phone } from "lucide-react"
import { useLoginStatus, useUserProfile } from "@/redux/selectors/Users"
import { UserActions } from "@/redux/actions/Users"
import TokenUtil from "@/utils/tokenUtil"

type MenuItem = {
  title: string;
  subtitle?: string;
  href: string;
  badge?: string;
  external?: boolean;
  highlight?: boolean;
};

type PeopleMenuTwoColumn = {
  label: string;
  col1: MenuItem[];
  col2: MenuItem[];
  items?: never;
};

type PeopleMenuSingleColumn = {
  label: string;
  items: MenuItem[];
  col1?: never;
  col2?: never;
};

type PeopleMenuColumn = PeopleMenuTwoColumn | PeopleMenuSingleColumn;

// People 메뉴 데이터 (이미지 기준)
// col: 스마트 워크케어는 2열로 나눔
const peopleMenuColumns: PeopleMenuColumn[] = [
  {
    label: "스마트 워크케어",
    col1: [
      { title: "채용", href: "#", badge: "*예정" },
      { title: "인사·조직·발령", href: "/people/smartWorkCare/hr" },
      { title: "온보딩", subtitle: "에버웰커밍", href: "#", badge: "무료" },
      { title: "교육·경력", href: "#", badge: "*준비중" },
      { title: "복리후생", href: "#", badge: "*준비중" },
    ],
    col2: [
      { title: "근태관리", subtitle: "에버타임", href: "/people/smartWorkCare/evertime", badge: "7개월 무료" },
      { title: "PC-OFF", href: "/people/smartWorkCare/pcoff" },
    ],
  },
  {
    label: "급여",
    items: [
      { title: "급여/상여", href: "#" },
      { title: "아웃소싱", subtitle: "에버페이롤", href: "#" },
      { title: "신고", href: "#" },
      { title: "연말정산", href: "#" },
    ],
  },
  {
    label: "평가관리",
    items: [{ title: "업적·역량·다면", subtitle: "에버평가", href: "#" }],
  },
  {
    label: "부가서비스",
    items: [
      { title: "전자계약", href: "#" },
      { title: "연동서비스", href: "#" },
      { title: "출입관리시스템", href: "#" },
      { title: "SetUp/추가개발", href: "#" },
    ],
  },
];

// Culture 메뉴는 기존 유지 (모바일에서 사용)
const peopleMenu: Record<string, MenuItem[]> = {
  "스마트 워크케어": [
    { title: "채용", href: "#", badge: "*예정" },
    { title: "인사·조직·발령", href: "/people/smartWorkCare/hr" },
    { title: "근태관리", subtitle: "에버타임", href: "/people/smartWorkCare/evertime", badge: "7개월 무료" },
    { title: "PC-OFF", href: "/people/smartWorkCare/pcoff" },
    { title: "온보딩", subtitle: "에버웰커밍", href: "#", badge: "무료" },
    { title: "교육·경력", href: "#", badge: "*준비중" },
    { title: "복리후생", href: "#", badge: "*준비중" },
  ],
  급여: [
    { title: "급여/상여", href: "#" },
    { title: "아웃소싱", subtitle: "에버페이롤", href: "#" },
    { title: "신고", href: "#" },
    { title: "연말정산", href: "#" },
  ],
  평가관리: [{ title: "업적·역량·다면", subtitle: "에버평가", href: "#" }],
  부가서비스: [
    { title: "전자계약", href: "#" },
    { title: "연동서비스", href: "#" },
    { title: "출입관리시스템", href: "#" },
    { title: "SetUp/추가개발", href: "#" },
  ],
};

// Everworks 메뉴 데이터 (그룹웨어)
const everworksMenu: Record<string, MenuItem[]> = {
  그룹웨어: [
    { title: "에버웍스", href: "/people/everworks", highlight: true },
  ],
};

// Culture 메뉴 데이터 (이미지2 기준 - 파란톤)
const cultureMenu: Record<string, MenuItem[]> = {
  솔루션: [
    {
      title: "소통",
      subtitle: "에버레스크",
      href: "https://www.everin.co.kr/?section=EverAsk",
      external: true,
    },
    {
      title: "인성",
      subtitle: "에버온사람",
      href: "https://www.everin.co.kr/?section=EverOnSaram",
      external: true,
    },
    { title: "OKR", subtitle: "에버그로잉", href: "#" },
  ],
  컨설팅: [
    { title: "진단", href: "#" },
    { title: "제도수립", href: "#" },
  ],
};

// 브랜드 컬러 상수
const COLORS = {
  people: "#03b565",       // 스마트 워크케어, 에버타임
  payroll: "#3344e6",      // 급여, 에버페이롤
  everworks: "#0FA6EC",    // 에버웍스, 그룹웨어
  onboarding: "#00dcaa",   // 에버웰커밍, 온보딩
  evaluation: "#0074ff",   // 에버평가, 평가
} as const;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  const dispatch = useDispatch()
  const isLoggedIn = useLoginStatus()
  const userProfile = useUserProfile()

  const handleLogout = () => {
    TokenUtil.removeToken()
    dispatch(UserActions.setUserProfile({}))
    dispatch(UserActions.setCorporations(null))
    dispatch(UserActions.setCards(null))
    dispatch(UserActions.setSubscriptions(null))
    router.push("/login")
  }

  // Close mega menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setMegaMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* 상단 프로모션 배너 */}
      <div className="bg-slate-900 text-primary-foreground py-2.5">
        <div className="mx-auto max-w-[1280px] px-4 text-center text-sm">
          <span className="font-medium">AI 빌더를 활용한 강력한 온보딩 솔루션!</span>
          {" "}에버웰커밍 무료 사용 이벤트{" "}
          <SmartLink href="#" className="underline underline-offset-2 font-semibold hover:opacity">
            확인하기 &gt;
          </SmartLink>
        </div>
      </div>

      {/* 메인 네비게이션 */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-[1280px] w-full flex h-16 items-center justify-between px-4 md:px-6">
          {/* 왼쪽: 로고 + 네비게이션 */}
          <div className="flex items-center gap-16">
            <SmartLink href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/images/header/ever-person-logo.png"
                alt="에버人 로�������"
                width={140}
                height={40}
                className="object-contain"
                priority
              />
            </SmartLink>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {/* 서비스 메가메뉴 */}
              <div
                className="relative"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <button
                  ref={triggerRef}
                  className={`inline-flex h-10 items-center justify-center rounded-md px-2 xl:px-4 py-2 text-xs xl:text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${megaMenuOpen ? "bg-accent" : ""}`}
                >
                  서비스
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${megaMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* 메가메뉴 드롭다운 - 전체 너비 플랫 스타일 */}
                {megaMenuOpen && (
                  <div
                    ref={megaMenuRef}
                    className="fixed left-0 right-0 top-[calc(100%+0.75rem)] z-50"
                    style={{ top: 'auto' }}
                  >
                    <div className="absolute left-0 right-0 bg-white border-t border-b border-border/40 shadow-lg overflow-y-auto max-h-[80vh]">
                      {/* 컨테이너 - 반응형 가로/세로 배치 */}
                      <div className="mx-auto max-w-full px-6 py-6">
                        <div className="flex flex-wrap gap-8">

                          {/* ════════ People 섹션 ════════ */}
                          <div className="basis-full flex justify-center">
                            <div className="pr-8 xl:border-r border-border/30 shrink-0">
                              <div className="flex items-center gap-2 mb-4 pb-3 border-b-2" style={{ borderColor: COLORS.people }}>
                                <Users className="h-5 w-5" style={{ color: COLORS.people }} />
                                <span className="text-lg font-bold" style={{ color: COLORS.people }}>People</span>
                                <span className="text-sm text-muted-foreground">(인사관리)</span>
                              </div>
                              <div className="flex gap-8">
                              {peopleMenuColumns.map((col) => (
                                <div key={col.label} className="flex flex-col gap-3 shrink-0">
                                  <div className="text-base font-bold whitespace-nowrap" style={{ color: COLORS.people }}>{col.label}</div>
                                  {col.col1 ? (
                                    <div className="flex gap-8">
                                      <div className="flex flex-col gap-2">
                                        {col.col1.map((item) => (
                                          <SmartLink
                                            key={item.title}
                                            href={item.href}
                                            onClick={() => setMegaMenuOpen(false)}
                                            className="text-base text-foreground transition-colors whitespace-nowrap flex items-center gap-1.5 hover:opacity-80"
                                          >
                                            <span className="text-muted-foreground/50 text-sm">ㄴ</span>
                                            <span className="font-semibold">{item.title}</span>
                                            {item.subtitle && (
                                              <span className="text-sm font-normal" style={{
                                                color: item.subtitle === "에버웰커밍" ? COLORS.onboarding : COLORS.people
                                              }}>{item.subtitle}</span>
                                            )}
                                            {item.badge && (
                                              <span className="text-[11px] px-1.5 py-0.5 rounded font-medium" style={{ background: `${COLORS.people}18`, color: COLORS.people }}>{item.badge}</span>
                                            )}
                                          </SmartLink>
                                        ))}
                                      </div>
                                      <div className="flex flex-col gap-2">
                                        {col.col2.map((item) => (
                                          <SmartLink
                                            key={item.title}
                                            href={item.href}
                                            onClick={() => setMegaMenuOpen(false)}
                                            className="text-base text-foreground transition-colors whitespace-nowrap flex items-center gap-1.5 hover:opacity-80"
                                          >
                                            <span className="text-muted-foreground/50 text-sm">ㄴ</span>
                                            <span className="font-semibold">{item.title}</span>
                                            {item.subtitle && (
                                              <span className="text-sm font-normal" style={{ color: COLORS.people }}>{item.subtitle}</span>
                                            )}
                                            {item.badge && (
                                              <span className="text-[11px] px-1.5 py-0.5 rounded font-medium" style={{ background: `${COLORS.people}18`, color: COLORS.people }}>{item.badge}</span>
                                            )}
                                          </SmartLink>
                                        ))}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col gap-2">
                                      {col.items.map((item) => (
                                        <SmartLink
                                          key={item.title}
                                          href={item.href}
                                          onClick={() => setMegaMenuOpen(false)}
                                          className="text-base text-foreground transition-colors whitespace-nowrap flex items-center gap-1.5 hover:opacity-80"
                                        >
                                          <span className="text-muted-foreground/50 text-sm">ㄴ</span>
                                          <span className="font-semibold">{item.title}</span>
                                          {item.subtitle && (
                                            <span className="text-sm font-normal" style={{
                                              color: item.subtitle === "에버페이롤" ? COLORS.payroll
                                                : item.subtitle === "에버평가" ? COLORS.evaluation
                                                : COLORS.people
                                            }}>{item.subtitle}</span>
                                          )}
                                          {item.badge && (
                                            <span className="text-[11px] px-1.5 py-0.5 rounded font-medium" style={{
                                              background: col.label === "급여" ? `${COLORS.payroll}18` : col.label === "평가관리" ? `${COLORS.evaluation}18` : `${COLORS.people}18`,
                                              color: col.label === "급여" ? COLORS.payroll : col.label === "평가관리" ? COLORS.evaluation : COLORS.people
                                            }}>{item.badge}</span>
                                          )}
                                        </SmartLink>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            </div>
                          </div>

                          {/* ════════ Culture 섹션 (파란톤) ════════ */}
                          <div className="w-[280px] px-6 xl:border-r border-border/30 shrink-0">
                            {/* Culture 배지 */}
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-blue-500">
                              <Building2 className="h-5 w-5 text-blue-500" />
                              <span className="text-lg font-bold text-blue-500">Culture</span>
                              <span className="text-sm text-muted-foreground">(기업문화)</span>
                            </div>
                            {/* Culture 카테고리들 */}
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                              {Object.entries(cultureMenu).map(([category, items]) => (
                                <div key={category} className="flex flex-col gap-3">
                                  <div className="text-base font-bold text-blue-500 whitespace-nowrap">{category}</div>
                                  <div className="flex flex-col gap-2">
                                    {items.map((item) => (
                                      <SmartLink
                                        key={item.title}
                                        href={item.href}
                                        onClick={() => setMegaMenuOpen(false)}
                                        className="text-base text-foreground hover:text-blue-600 transition-colors whitespace-nowrap inline-flex items-center gap-1.5"
                                      >
                                        <span className="text-muted-foreground/50 text-sm">ㄴ</span>
                                        <span className="font-semibold">{item.title}</span>
                                        {item.subtitle && (
                                          <span className="text-sm text-blue-500/70 font-normal">
                                            {item.subtitle}
                                          </span>
                                        )}
                                      </SmartLink>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* ════════ Everworks 섹션 ════════ */}
                          <div className="w-[200px] pl-6 shrink-0">
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2" style={{ borderColor: COLORS.everworks }}>
                              <Briefcase className="h-5 w-5" style={{ color: COLORS.everworks }} />
                              <span className="text-lg font-bold" style={{ color: COLORS.everworks }}>에버웍스</span>
                              <span className="text-sm text-muted-foreground">(그룹웨어)</span>
                            </div>
                            <div className="flex flex-col gap-4">
                              {Object.entries(everworksMenu).map(([category, items]) => (
                                <div key={category} className="flex flex-col gap-3">
                                  <div className="text-base font-bold whitespace-nowrap" style={{ color: COLORS.everworks }}>{category}</div>
                                  <div className="flex flex-col gap-2">
                                    {items.map((item) => (
                                      <SmartLink
                                        key={item.title}
                                        href={item.href}
                                        onClick={() => setMegaMenuOpen(false)}
                                        className="text-base text-foreground transition-colors whitespace-nowrap inline-flex items-center gap-1.5 hover:opacity-80"
                                      >
                                        <span className="text-muted-foreground/50 text-sm">ㄴ</span>
                                        <span className="font-semibold">{item.title}</span>
                                        {item.subtitle && (
                                          <span className="text-sm font-normal" style={{ color: COLORS.everworks }}>{item.subtitle}</span>
                                        )}
                                      </SmartLink>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 닫기 버튼 */}
                          <button
                            onClick={() => setMegaMenuOpen(false)}
                            className="ml-6 self-start p-1.5 rounded-full hover:bg-muted transition-colors shrink-0"
                          >
                            <X className="h-5 w-5 text-muted-foreground" />
                          </button>

                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <SmartLink href="/subscribe" className="inline-flex h-10 items-center justify-center rounded-md px-2 xl:px-4 py-2 text-xs xl:text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap">
                요금제
              </SmartLink>
              <SmartLink href="/support" className="inline-flex h-10 items-center justify-center rounded-md px-2 xl:px-4 py-2 text-xs xl:text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap">
                리소스
              </SmartLink>
              <SmartLink href="/partners" className="inline-flex h-10 items-center justify-center rounded-md px-2 xl:px-4 py-2 text-xs xl:text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap">
                파트너
              </SmartLink>
              <SmartLink href="/support/faq" className="inline-flex h-10 items-center justify-center rounded-md px-2 xl:px-4 py-2 text-xs xl:text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap">
                고객센터
              </SmartLink>

              {/* 구분선 */}
              <div className="h-6 w-px bg-border mx-2" />
            </nav>
          </div>

          {/* Desktop CTA - 오른쪽 끝 정렬 */}
          <div className="hidden items-center gap-2 lg:flex shrink-0">
            {isLoggedIn ? (
              <>
                {/* 로그인된 상태: 사용자명 드롭다운 + 로그아웃 */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1.5 text-sm font-medium hover:bg-accent rounded-full px-3"
                    >
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span className="max-w-[80px] truncate">
                        {userProfile?.name || userProfile?.loginId || "사용자"}
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <div className="px-3 py-2">
                      <p className="text-sm font-semibold truncate">{userProfile?.name || userProfile?.loginId}</p>
                      <p className="text-xs text-muted-foreground truncate">{userProfile?.loginId}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <SmartLink href="/mypage/subscription" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-4 w-4" />
                        구독정보
                      </SmartLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <SmartLink href="/mypage/payment" className="flex items-center gap-2 cursor-pointer">
                        <Receipt className="h-4 w-4" />
                        청구/납부내역
                      </SmartLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <SmartLink href="/mypage/account" className="flex items-center gap-2 cursor-pointer">
                        <Settings className="h-4 w-4" />
                        계정정보
                      </SmartLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                    >
                      <LogOut className="h-4 w-4" />
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button size="sm" className="rounded-full px-4 bg-primary hover:bg-primary/90 text-xs" asChild>
                  <SmartLink href="/trial">체험하기</SmartLink>
                </Button>
              </>
            ) : (
              <>
                {/* 비로그인 상태 */}
                <Button variant="ghost" size="sm" className="text-xs xl:text-sm" asChild>
                  <SmartLink href="/login">로그인</SmartLink>
                </Button>
                <Button variant="outline" size="sm" className="text-xs xl:text-sm" asChild>
                  <SmartLink href="/signup">회원가입</SmartLink>
                </Button>
                <Button size="sm" className="rounded-full px-4 xl:px-5 bg-primary hover:bg-primary/90 text-xs xl:text-sm" asChild>
                  <SmartLink href="/trial">체험하기</SmartLink>
                </Button>
                <Button size="sm" variant="secondary" className="rounded-full px-4 xl:px-5 bg-foreground text-background hover:bg-foreground/90 text-xs xl:text-sm">
                  도입문의
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] overflow-y-auto p-0">
              {/* 사용자/로그인 영역 - 상단 고정 */}
              <div className="sticky top-0 bg-background z-10 border-b">
                {isLoggedIn ? (
                  <div className="p-4">
                    {/* 사용자 정보 카드 */}
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl mb-3">
                      <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <UserCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold truncate">{userProfile?.name || userProfile?.loginId}</p>
                        <p className="text-xs text-muted-foreground truncate">{userProfile?.loginId}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="shrink-0 h-8 px-2 text-xs text-muted-foreground hover:text-destructive"
                        onClick={() => { handleLogout(); setIsOpen(false); }}
                      >
                        <LogOut className="h-3.5 w-3.5 mr-1" />
                        로그아웃
                      </Button>
                    </div>
                    {/* 마이페이지 퀵 메뉴 */}
                    <div className="grid grid-cols-3 gap-2">
                      <SmartLink
                        href="/mypage/subscription"
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span className="text-xs font-medium">구독정보</span>
                      </SmartLink>
                      <SmartLink
                        href="/mypage/payment"
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <Receipt className="h-5 w-5 text-primary" />
                        <span className="text-xs font-medium">청구/납부</span>
                      </SmartLink>
                      <SmartLink
                        href="/mypage/account"
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <Settings className="h-5 w-5 text-primary" />
                        <span className="text-xs font-medium">계정정보</span>
                      </SmartLink>
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="flex gap-2 mb-3">
                      <Button variant="outline" className="flex-1" size="sm" asChild>
                        <SmartLink href="/login" onClick={() => setIsOpen(false)}>로그인</SmartLink>
                      </Button>
                      <Button variant="outline" className="flex-1" size="sm" asChild>
                        <SmartLink href="/signup" onClick={() => setIsOpen(false)}>회원가입</SmartLink>
                      </Button>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90" size="sm" asChild>
                      <SmartLink href="/trial" onClick={() => setIsOpen(false)}>무료체험 시작하기</SmartLink>
                    </Button>
                  </div>
                )}
              </div>

              {/* 메뉴 영역 */}
              <nav className="flex flex-col gap-4 p-4">
                {/* 퀵 링크 */}
                <div className="flex gap-2 pb-4 border-b">
                  <SmartLink
                    href="/subscribe"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center py-2 px-3 text-sm font-medium rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    요금제
                  </SmartLink>
                  <SmartLink
                    href="/partners"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center py-2 px-3 text-sm font-medium rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    파트너
                  </SmartLink>
                  <SmartLink
                    href="/support/faq"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center py-2 px-3 text-sm font-medium rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    고객센터
                  </SmartLink>
                </div>

                {/* People */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold flex items-center gap-2 uppercase tracking-wide" style={{ color: COLORS.people }}>
                    <Users className="h-3.5 w-3.5" />
                    People (인사관리)
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 pl-1">
                    {Object.entries(peopleMenu).map(([category, items]) => (
                      <div key={category} className="space-y-0.5">
                        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider pt-1">{category.replace('\n', ' ')}</div>
                        {items.map((item) => (
                          <SmartLink
                            key={item.title}
                            href={item.href}
                            className="block py-0.5 text-xs text-foreground/80 transition-colors hover:opacity-70"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="text-muted-foreground/50 text-xs">ㄴ</span>
                            {item.title}
                            {item.subtitle && (
                              <span className="text-xs ml-1" style={{
                                color: item.subtitle === "에버웰커밍" ? COLORS.onboarding
                                  : item.subtitle === "에버페이롤" ? COLORS.payroll
                                  : item.subtitle === "에버평가" ? COLORS.evaluation
                                  : COLORS.people
                              }}>({item.subtitle})</span>
                            )}
                            {item.badge && (
                              <span className="text-[9px] px-1 py-0.5 rounded ml-1" style={{ background: `${COLORS.people}18`, color: COLORS.people }}>{item.badge}</span>
                            )}
                          </SmartLink>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Culture (파란톤) */}
                <div className="space-y-2 pt-3 border-t">
                  <h4 className="text-xs font-bold text-blue-500 flex items-center gap-2 uppercase tracking-wide">
                    <Building2 className="h-3.5 w-3.5" />
                    Culture (기업문화)
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 pl-1">
                    {Object.entries(cultureMenu).map(([category, items]) => (
                      <div key={category} className="space-y-0.5">
                        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider pt-1">{category}</div>
                        {items.map((item) => (
                          <SmartLink
                            key={item.title}
                            href={item.href}
                            className="block py-0.5 text-xs text-foreground hover:text-blue-500 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.title}
                            {item.subtitle && <span className="text-xs text-blue-500 ml-1">({item.subtitle})</span>}
                          </SmartLink>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Everworks */}
                <div className="space-y-2 pt-3 border-t">
                  <h4 className="text-xs font-bold flex items-center gap-2 uppercase tracking-wide" style={{ color: COLORS.everworks }}>
                    <Briefcase className="h-3.5 w-3.5" />
                    에버웍스 (그룹웨어)
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 pl-1">
                    {Object.entries(everworksMenu).map(([category, items]) => (
                      <div key={category} className="space-y-0.5">
                        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider pt-1">{category}</div>
                        {items.map((item) => (
                          <SmartLink
                            key={item.title}
                            href={item.href}
                            className="block py-0.5 text-xs text-foreground transition-colors hover:opacity-70"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.title}
                            {item.subtitle && <span className="text-xs ml-1" style={{ color: COLORS.everworks }}>({item.subtitle})</span>}
                          </SmartLink>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 고객센터 */}
                <div className="mt-4 p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Phone className="h-4 w-4 text-primary" />
                    고객센터
                  </div>
                  <p className="text-lg font-bold text-primary">02-2093-3226</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    평일 오전 9시 ~ 오후 6시<br />
                    토요일 및 공휴일 제외
                  </p>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
