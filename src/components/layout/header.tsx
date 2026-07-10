"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import SmartLink from "@/components/common/SmartLink"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, Users, Building2, Briefcase, ChevronDown, X, LogOut, UserCircle, CreditCard, Settings, Receipt, Phone, BookOpen, Handshake, Headphones } from "lucide-react"
import { useLoginStatus, useUserProfile } from "@/redux/selectors/Users"
import { UserActions } from "@/redux/actions/Users"
import TokenUtil from "@/utils/tokenUtil"
import { COLORS } from "@/constants/brand-colors"

type MenuItem = {
  title: string;
  subtitle?: string;
  href: string;
  badge?: string;
  planned?: boolean;
  disabled?: boolean;
  external?: boolean;
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
      { title: "채용", href: "#", planned: true, disabled: true },
      { title: "인사·조직·발령", href: "/people/smartWorkCare/hr" },
      { title: "온보딩", href: "/people/smartWorkCare/welcoming", badge: "무료" },
      { title: "교육·경력", href: "#", planned: true },
      { title: "복리후생", href: "#", planned: true, disabled: true },
    ],
    col2: [
      { title: "근태관리", href: "/people/smartWorkCare/evertime", badge: "7개월 무료" },
      { title: "PC-OFF", href: "/people/smartWorkCare/pcoff" },
    ],
  },
  {
    label: "급여",
    items: [
      { title: "급여/상여", href: "/people/payroll/salary-bonus" },
      { title: "아웃소싱", href: "/people/payroll/outsourcing" },
      { title: "신고", href: "/people/payroll/outsourcing#provided-services" },
      { title: "연말정산", href: "/people/payroll/year-end-tax" },
    ],
  },
  {
    label: "평가관리",
    items: [{ title: "업적·역량·다면", href: "/people/evaluation" }],
  },
  {
    label: "부가서비스",
    items: [
      { title: "전자계약", href: "/people/addOnServices#electronic-contract" },
      { title: "연동서비스", href: "/people/addOnServices#integration" },
      { title: "출입관리시스템", href: "/people/addOnServices#access-control" },
      { title: "SetUp/추가개발", href: "/people/addOnServices#setup" },
    ],
  },
];

const peopleCategoryHrefs: Record<string, string> = {
  급여: "/people/payroll/salary-bonus",
  평가관리: "/people/evaluation",
  부가서비스: "/people/addOnServices",
};

// Culture 메뉴는 기존 유지 (모바일에서 사용)
const peopleMenu: Record<string, MenuItem[]> = {
  "스마트 워크케어": [
    { title: "채용", href: "#", planned: true, disabled: true },
    { title: "인사·조직·발령", href: "/people/smartWorkCare/hr" },
    { title: "근태관리", href: "/people/smartWorkCare/evertime", badge: "7개월 무료" },
    { title: "PC-OFF", href: "/people/smartWorkCare/pcoff" },
    { title: "온보딩", href: "/people/smartWorkCare/welcoming", badge: "무료" },
    { title: "교육·경력", href: "#", planned: true },
    { title: "복리후생", href: "#", planned: true, disabled: true },
  ],
  급여: [
    { title: "급여/상여", href: "/people/payroll/salary-bonus" },
    { title: "아웃소싱", href: "/people/payroll/outsourcing" },
    { title: "신고", href: "/people/payroll/outsourcing#provided-services" },
    { title: "연말정산", href: "/people/payroll/year-end-tax" },
  ],
  평가관리: [{ title: "업적·역량·다면", href: "/people/evaluation" }],
  부가서비스: [
    { title: "전자계약", href: "/people/addOnServices#electronic-contract" },
    { title: "연동서비스", href: "/people/addOnServices#integration" },
    { title: "출입관리시스템", href: "/people/addOnServices#access-control" },
    { title: "SetUp/추가개발", href: "/people/addOnServices#setup" },
  ],
};

// Everworks 메뉴 데이터 (그룹웨어)
const everworksMenu: Record<string, MenuItem[]> = {
  그룹웨어: [
    { title: "메일", href: "/people/everworks" },
    { title: "전자결재", href: "/people/everworks" },
    { title: "게시판", href: "/people/everworks" },
    { title: "메신저", href: "/people/everworks" },
  ],
};

// Culture 메뉴 데이터 (이미지2 기준 - 파란톤)
const cultureMenu: Record<string, MenuItem[]> = {
  솔루션: [
    {
      title: "소통",
      href: "https://www.everin.co.kr/?section=EverAsk",
      external: true,
    },
    {
      title: "인성",
      href: "https://www.everin.co.kr/?section=EverOnSaram",
      external: true,
    },
    { title: "OKR", href: "https://www.everin.co.kr/", external: true },
  ],
  컨설팅: [
    { title: "진단", href: "https://www.everin.co.kr/", external: true },
    { title: "제도수립", href: "https://www.everin.co.kr/", external: true },
  ],
};

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null)
  const megaMenuPinnedRef = useRef(false)

  const openMegaMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setMegaMenuOpen(true)
  }

  const closeMegaMenu = () => {
    if (megaMenuPinnedRef.current) return

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
    }

    closeTimerRef.current = setTimeout(() => {
      setMegaMenuOpen(false)
    }, 180)
  }

  const toggleMegaMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)

    const nextPinned = !megaMenuPinnedRef.current
    megaMenuPinnedRef.current = nextPinned
    setMegaMenuOpen(nextPinned)
  }

  const dismissMegaMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    megaMenuPinnedRef.current = false
    setMegaMenuOpen(false)
  }

  // 메가메뉴 top: 배너(~40px) + 네비 h-16(64px) = 104px
  const megaMenuTopFixed = 64
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
    const megaMenuRef = { current: document.querySelector('[data-mega-menu]') as HTMLDivElement | null }
    const triggerRef = { current: document.querySelector('[data-mega-trigger]') as HTMLButtonElement | null }
    function handleClickOutside(event: MouseEvent) {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        // setMegaMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${header.offsetHeight}px`,
      )
    }

    updateHeaderHeight()
    const observer = new ResizeObserver(updateHeaderHeight)
    observer.observe(header)
    window.addEventListener("resize", updateHeaderHeight)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", updateHeaderHeight)
      document.documentElement.style.removeProperty("--site-header-height")
    }
  }, [])

  // Remove megaMenuTop calculation useEffect

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full">
      {/* 상단 프로모션 배너 */}
      <div
        className="text-primary-foreground py-2.5"
        style={{
          background: `linear-gradient(90deg, ${COLORS.payroll} 0%, ${COLORS.culture} 28%, ${COLORS.onboarding} 58%, ${COLORS.people} 100%)`,
        }}
      >
        <div className="mx-auto max-w-[1280px] px-4 text-center text-sm">
          <span className="font-medium">AI 빌더를 활용한 강력한 온보딩 솔루션!</span>
          {" "}에버웰커밍 무료 사용 이벤트{" "}
          <SmartLink href="/people/smartWorkCare/welcoming" className="underline underline-offset-2 font-semibold hover:opacity">
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
                alt="에버人 로고"
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
                onMouseEnter={openMegaMenu}
                onMouseLeave={closeMegaMenu}
              >
                <button
                  data-mega-trigger
                  type="button"
                  aria-expanded={megaMenuOpen}
                  onClick={toggleMegaMenu}
                  className={`inline-flex h-10 items-center justify-center rounded-md px-3 xl:px-4 py-2 text-sm xl:text-base font-semibold transition-colors hover:bg-accent hover:text-accent-foreground ${megaMenuOpen ? "bg-accent" : ""}`}
                >
                  서비스
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${megaMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* 메가메뉴 드롭다운 - 전체 너비 플랫 스타일 */}
                {megaMenuOpen && (
                  <div
                      data-mega-menu
                      className="fixed left-0 right-0 z-50"
                      style={{ top: `${megaMenuTopFixed}px` }}
                      onMouseEnter={openMegaMenu}
                      onMouseLeave={closeMegaMenu}
                  >
                    <div className="absolute left-0 right-0 bg-white border-t border-b border-border/40 shadow-lg overflow-y-auto max-h-[80vh]">
                      {/* 컨테이너: text-center + inline-flex로 가운데 정렬 */}
                      <div className="px-6 pt-6 pb-11 text-center">
                          <div className="relative inline-flex max-w-full flex-wrap gap-x-8 gap-y-12 text-left">

                          {/* ════════ People 섹션 ════════ */}
                          <div className="shrink-0">
                            <div className="pr-8 border-r border-border/70">
                              <div className="flex items-center gap-2 mb-4 pb-3 border-b-2" style={{ borderColor: COLORS.people }}>
                                <Users className="h-5 w-5" style={{ color: COLORS.people }} />
                                <span className="text-lg font-bold" style={{ color: COLORS.people }}>People</span>
                                <span className="text-sm text-muted-foreground">(인사관리)</span>
                              </div>
                              <div className="flex gap-8">
                              {peopleMenuColumns.map((col) => (
                                <div key={col.label} className="flex flex-col gap-3 shrink-0">
                                  {peopleCategoryHrefs[col.label] ? (
                                    <SmartLink
                                      href={peopleCategoryHrefs[col.label]}
                                      onClick={dismissMegaMenu}
                                      className="text-base font-bold whitespace-nowrap transition-opacity hover:opacity-70"
                                      style={{ color: COLORS.people }}
                                    >
                                      {col.label}
                                    </SmartLink>
                                  ) : (
                                    <div
                                      className="text-base font-bold whitespace-nowrap"
                                      style={{ color: COLORS.people }}
                                    >
                                      {col.label}
                                    </div>
                                  )}
                                  {col.col1 ? (
                                    <div className="flex gap-8">
                                      <div className="flex flex-col gap-2">
                                        {col.col1.map((item) => {
                                          const itemContent = (
                                            <>
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
                                              {item.planned && (
                                                <span className="text-[11px] font-medium text-gray-400">*예정</span>
                                              )}
                                            </>
                                          )

                                          if (item.disabled) {
                                            return (
                                              <span
                                                key={item.title}
                                                className="text-base text-foreground whitespace-nowrap flex cursor-default items-center gap-1.5"
                                                aria-disabled="true"
                                              >
                                                {itemContent}
                                              </span>
                                            )
                                          }

                                          return (
                                            <SmartLink
                                              key={item.title}
                                              href={item.href}
                                              onClick={dismissMegaMenu}
                                              className="text-base text-foreground transition-colors whitespace-nowrap flex items-center gap-1.5 hover:opacity-80"
                                            >
                                              {itemContent}
                                            </SmartLink>
                                          )
                                        })}
                                      </div>
                                      <div className="flex flex-col gap-2">
                                        {col.col2.map((item) => (
                                          <SmartLink
                                            key={item.title}
                                            href={item.href}
                                            onClick={dismissMegaMenu}
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
                                            {item.planned && (
                                              <span className="text-[11px] font-medium text-gray-400">*예정</span>
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
                                          onClick={dismissMegaMenu}
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
                                          {item.planned && (
                                            <span className="text-[11px] font-medium text-gray-400">*예정</span>
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
                          <div className="pr-8 border-r border-border/70 shrink-0">
                            {/* Culture 배지 */}
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2" style={{ borderColor: COLORS.culture }}>
                              <Building2 className="h-5 w-5" style={{ color: COLORS.culture }} />
                              <span className="text-lg font-bold" style={{ color: COLORS.culture }}>Culture</span>
                              <span className="text-sm text-muted-foreground">(기업문화)</span>
                            </div>
                            {/* Culture 카테고리들 */}
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                              {Object.entries(cultureMenu).map(([category, items]) => (
                                <div key={category} className="flex flex-col gap-3">
                                  <div className="text-base font-bold whitespace-nowrap" style={{ color: COLORS.culture }}>{category}</div>
                                  <div className="flex flex-col gap-2">
                                    {items.map((item) => (
                                      <SmartLink
                                        key={item.title}
                                        href={item.href}
                                        onClick={dismissMegaMenu}
                                        className="text-base text-foreground transition-colors whitespace-nowrap inline-flex items-center gap-1.5 hover:opacity-80"
                                      >
                                        <span className="text-muted-foreground/50 text-sm">ㄴ</span>
                                        <span className="font-semibold">{item.title}</span>
                                        {item.subtitle && (
                                          <span className="text-sm font-normal" style={{ color: COLORS.culture }}>
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
                          <div className="shrink-0">
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2" style={{ borderColor: COLORS.everworks }}>
                              <Briefcase className="h-5 w-5" style={{ color: COLORS.everworks }} />
                              <span className="text-lg font-bold" style={{ color: COLORS.everworks }}>에버웍스</span>
                              <span className="text-sm text-muted-foreground">(그룹웨어)</span>
                            </div>
                            <div className="flex flex-col gap-4">
                              {Object.entries(everworksMenu).map(([category, items]) => (
                                <div key={category} className="flex flex-col gap-3">
                                  <SmartLink
                                    href="/people/everworks"
                                    onClick={dismissMegaMenu}
                                    className="flex items-center gap-1.5 text-base font-bold whitespace-nowrap transition-opacity hover:opacity-70"
                                    style={{ color: COLORS.everworks }}
                                  >
                                    <span>{category}</span>
                                    <span className="text-[11px] font-medium text-gray-400">*예정</span>
                                  </SmartLink>
                                  <div className="flex flex-col gap-2">
                                    {items.map((item) => (
                                      <SmartLink
                                        key={item.title}
                                        href={item.href}
                                        onClick={dismissMegaMenu}
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
                            onClick={dismissMegaMenu}
                            className="absolute right-0 top-0 p-1.5 rounded-full hover:bg-muted transition-colors xl:-right-10"
                          >
                            <X className="h-5 w-5 text-muted-foreground" />
                          </button>

                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <SmartLink href="/subscribe" className="inline-flex h-10 items-center justify-center rounded-md px-3 xl:px-4 py-2 text-sm xl:text-base font-semibold transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap">
                요금제
              </SmartLink>
              <SmartLink href="/stories" className="inline-flex h-10 items-center justify-center rounded-md px-3 xl:px-4 py-2 text-sm xl:text-base font-semibold transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap">
                리소스
              </SmartLink>
              <SmartLink href="/partners" className="inline-flex h-10 items-center justify-center rounded-md px-3 xl:px-4 py-2 text-sm xl:text-base font-semibold transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap">
                파트너
              </SmartLink>
              <SmartLink href="/support" className="inline-flex h-10 items-center justify-center rounded-md px-3 xl:px-4 py-2 text-sm xl:text-base font-semibold transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap">
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

                <Button className="h-10 rounded-full px-5 bg-primary hover:bg-primary/90 text-sm xl:text-base font-semibold" asChild>
                  <SmartLink href="/trial">체험하기</SmartLink>
                </Button>
                <Button variant="secondary" className="h-10 px-4 xl:px-6 bg-foreground text-background hover:bg-foreground/90 text-sm xl:text-base font-semibold" asChild>
                  <SmartLink href="/inquiry">도입문의</SmartLink>
                </Button>
              </>
            ) : (
              <>
                {/* 비로그인 상태 */}
                <Button variant="ghost" className="h-10 px-4 text-sm xl:text-base font-semibold" asChild>
                  <SmartLink href="/login">로그인</SmartLink>
                </Button>
                <Button variant="outline" className="h-10 px-4 text-sm xl:text-base font-semibold" asChild>
                  <SmartLink href="/signup">회원가입</SmartLink>
                </Button>
                <Button className="h-10 px-4 xl:px-6 bg-primary hover:bg-primary/90 text-sm xl:text-base font-semibold" asChild>
                  <SmartLink href="/trial">체험하기</SmartLink>
                </Button>
                <Button variant="secondary" className="h-10 px-4 xl:px-6 bg-foreground text-background hover:bg-foreground/90 text-sm xl:text-base font-semibold" asChild>
                  <SmartLink href="/inquiry">도입문의</SmartLink>
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
            <SheetContent side="top" className="!inset-0 h-dvh w-screen max-w-none !transform-none !animate-none overflow-y-auto border-0 bg-slate-50 p-0 sm:max-w-none [&>button:last-child]:hidden">
              <div className="sticky top-0 z-20 border-b bg-white/95 px-5 py-4 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between">
                  <SmartLink href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                    <Image
                      src="/images/header/ever-person-logo.png"
                      alt="에버人 로고"
                      width={128}
                      height={36}
                      className="h-9 w-auto object-contain"
                      priority
                    />
                  </SmartLink>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none shadow-none hover:bg-muted">
                      <X className="h-5 w-5" />
                      <span className="sr-only">닫기</span>
                    </Button>
                  </SheetClose>
                </div>
              </div>
              {/* 사용자/로그인 영역 - 상단 고정 */}
              <div className="border-b bg-white">
                {isLoggedIn ? (
                  <div className="p-5">
                    {/* 사용자 정보 카드 */}
                    <div className="mb-3 overflow-hidden rounded-[22px] border border-primary/15 bg-white shadow-sm">
                      <div className="h-1.5 bg-gradient-to-r from-primary to-[#4b6bf5]" />
                      <div className="flex items-center gap-3 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
                        <UserCircle className="h-7 w-7 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-primary">내 계정</p>
                        <p className="truncate text-base font-black text-slate-950">{userProfile?.name || userProfile?.loginId}</p>
                        <p className="truncate text-xs font-medium text-slate-500">{userProfile?.loginId}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 shrink-0 rounded-full px-3 text-xs font-bold text-slate-500 hover:bg-red-50 hover:text-destructive"
                        onClick={() => { handleLogout(); setIsOpen(false); }}
                      >
                        <LogOut className="mr-1 h-3.5 w-3.5" />
                        로그아웃
                      </Button>
                      </div>
                    </div>
                    {/* 마이페이지 퀵 메뉴 */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <SmartLink
                        href="/mypage/subscription"
                        onClick={() => setIsOpen(false)}
                        className="flex min-h-[76px] flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm transition-colors hover:bg-slate-100"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-primary">
                          <CreditCard className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-bold text-slate-800">구독정보</span>
                      </SmartLink>
                      <SmartLink
                        href="/mypage/payment"
                        onClick={() => setIsOpen(false)}
                        className="flex min-h-[76px] flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm transition-colors hover:bg-slate-100"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Receipt className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-bold text-slate-800">청구/납부</span>
                      </SmartLink>
                      <SmartLink
                        href="/mypage/account"
                        onClick={() => setIsOpen(false)}
                        className="flex min-h-[76px] flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm transition-colors hover:bg-slate-100"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                          <Settings className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-bold text-slate-800">계정정보</span>
                      </SmartLink>
                    </div>
                  </div>
                ) : (
                  <div className="p-5">
                    <div className="flex gap-2 mb-3">
                      <Button variant="outline" className="h-11 flex-1 rounded-full bg-white text-base shadow-sm" asChild>
                        <SmartLink href="/login" onClick={() => setIsOpen(false)}>로그인</SmartLink>
                      </Button>
                      <Button variant="outline" className="h-11 flex-1 rounded-full bg-white text-base shadow-sm" asChild>
                        <SmartLink href="/signup" onClick={() => setIsOpen(false)}>회원가입</SmartLink>
                      </Button>
                    </div>
                    <Button className="h-11 w-full rounded-full bg-primary text-base font-semibold shadow-sm hover:bg-primary/90" asChild>
                      <SmartLink href="/trial" onClick={() => setIsOpen(false)}>무료체험 시작하기</SmartLink>
                    </Button>
                  </div>
                )}
              </div>

              {/* 메뉴 영역 */}
              <nav className="flex flex-col gap-5 bg-slate-50 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                {/* 퀵 */}
                <div className="grid grid-cols-2 gap-2.5">
                  <SmartLink
                    href="/subscribe"
                    onClick={() => setIsOpen(false)}
                    className="group flex min-h-[58px] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition-colors hover:bg-slate-100"
                  >
                    <span className="flex items-center gap-2 text-[15px] font-black text-slate-950">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-primary">
                        <Receipt className="h-4 w-4" />
                      </span>
                      요금제
                    </span>
                  </SmartLink>
                  <SmartLink
                    href="/stories"
                    onClick={() => setIsOpen(false)}
                    className="group flex min-h-[58px] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition-colors hover:bg-slate-100"
                  >
                    <span className="flex items-center gap-2 text-[15px] font-black text-slate-950">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <BookOpen className="h-4 w-4" />
                      </span>
                      리소스
                    </span>
                  </SmartLink>
                  <SmartLink
                    href="/partners"
                    onClick={() => setIsOpen(false)}
                    className="group flex min-h-[58px] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition-colors hover:bg-slate-100"
                  >
                    <span className="flex items-center gap-2 text-[15px] font-black text-slate-950">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                        <Handshake className="h-4 w-4" />
                      </span>
                      파트너
                    </span>
                  </SmartLink>
                  <SmartLink
                    href="/support"
                    onClick={() => setIsOpen(false)}
                    className="group flex min-h-[58px] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition-colors hover:bg-slate-100"
                  >
                    <span className="flex items-center gap-2 text-[15px] font-black text-slate-950">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                        <Headphones className="h-4 w-4" />
                      </span>
                      고객센터
                    </span>
                  </SmartLink>
                </div>

                {/* People */}
                <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                  <div className="h-1" style={{ backgroundColor: COLORS.people }} />
                  <div className="space-y-4 p-4">
                  <h4 className="flex items-center gap-2 rounded-2xl px-2 py-1 text-lg font-black" style={{ color: COLORS.people, backgroundColor: `${COLORS.people}08` }}>
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl" style={{ background: `${COLORS.people}12` }}>
                      <Users className="h-5 w-5" />
                    </span>
                    People <span className="text-sm font-bold text-slate-500">(인사관리)</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(peopleMenu).map(([category, items]) => (
                      <div
                        key={category}
                        className="overflow-hidden rounded-2xl border bg-white shadow-sm"
                        style={{ borderColor: `${COLORS.people}18`, borderLeft: `4px solid ${COLORS.people}` }}
                      >
                        {peopleCategoryHrefs[category] ? (
                          <SmartLink
                            href={peopleCategoryHrefs[category]}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-3 py-2.5 text-[15px] font-black text-slate-950 transition-colors hover:bg-slate-100"
                          >
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS.people }} />
                            {category.replace('\n', ' ')}
                          </SmartLink>
                        ) : (
                          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-3 py-2.5 text-[15px] font-black text-slate-950">
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS.people }} />
                            {category.replace('\n', ' ')}
                          </div>
                        )}
                        <div className="grid gap-1">
                        {items.map((item) => {
                          const itemContent = (
                            <>
                              <span className="min-w-0">
                                <span className="break-keep">{item.title}</span>
                                {item.subtitle && (
                                  <span className="ml-1 text-xs font-bold" style={{
                                    color: item.subtitle === "에버웰커밍" ? COLORS.onboarding
                                      : item.subtitle === "에버페이롤" ? COLORS.payroll
                                      : item.subtitle === "에버평가" ? COLORS.evaluation
                                      : COLORS.people
                                  }}>({item.subtitle})</span>
                                )}
                                {item.badge && (item.badge === "7개월 무료" || item.badge === "무료" ? null : (
                                  <span className="ml-1 rounded px-1.5 py-0.5 text-[11px]" style={{ background: `${COLORS.people}18`, color: COLORS.people }}>{item.badge}</span>
                                ))}
                                {item.planned && (
                                  <span className="ml-1 text-[11px] font-medium text-gray-400">*예정</span>
                                )}
                              </span>
                              {item.badge && (
                                <span className="shrink-0 rounded-full px-2 py-1 text-[11px] font-bold" style={{ background: `${COLORS.people}18`, color: COLORS.people }}>
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )

                          if (item.disabled) {
                            return (
                              <span
                                key={item.title}
                                className="flex min-h-11 cursor-default items-center justify-between gap-3 border-t border-slate-100 px-3 py-2 text-[15px] font-semibold text-slate-800 first:border-t-0"
                                aria-disabled="true"
                              >
                                {itemContent}
                              </span>
                            )
                          }

                          return (
                            <SmartLink
                              key={item.title}
                              href={item.href}
                              className="flex min-h-11 items-center justify-between gap-3 border-t border-slate-100 px-3 py-2 text-[15px] font-semibold text-slate-800 first:border-t-0 hover:bg-slate-50"
                              onClick={() => setIsOpen(false)}
                            >
                              {itemContent}
                            </SmartLink>
                          )
                        })}
                        </div>
                      </div>
                    ))}
                  </div>
                  </div>
                </div>

                {/* Culture (파란톤) */}
                <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                  <div className="h-1" style={{ backgroundColor: COLORS.culture }} />
                  <div className="space-y-4 p-4">
                  <h4 className="flex items-center gap-2 rounded-2xl px-2 py-1 text-lg font-black" style={{ color: COLORS.culture, backgroundColor: `${COLORS.culture}08` }}>
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl" style={{ background: `${COLORS.culture}12` }}>
                      <Building2 className="h-5 w-5" />
                    </span>
                    Culture <span className="text-sm font-bold text-slate-500">(기업문화)</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(cultureMenu).map(([category, items]) => (
                      <div
                        key={category}
                        className="overflow-hidden rounded-2xl border bg-white shadow-sm"
                        style={{ borderColor: `${COLORS.culture}18`, borderLeft: `4px solid ${COLORS.culture}` }}
                      >
                        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-3 py-2.5 text-[15px] font-black text-slate-950">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS.culture }} />
                          {category}
                        </div>
                        <div className="grid gap-1">
                        {items.map((item) => (
                          <SmartLink
                            key={item.title}
                            href={item.href}
                            className="flex min-h-11 items-center border-t border-slate-100 px-3 py-2 text-[15px] font-semibold text-slate-800 first:border-t-0 hover:bg-slate-50"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.title}
                            {item.subtitle && <span className="ml-1 text-xs font-bold" style={{ color: COLORS.culture }}>({item.subtitle})</span>}
                          </SmartLink>
                        ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  </div>
                </div>

                {/* Everworks */}
                <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                  <div className="h-1" style={{ backgroundColor: COLORS.everworks }} />
                  <div className="space-y-4 p-4">
                  <h4 className="flex items-center gap-2 rounded-2xl px-2 py-1 text-lg font-black" style={{ color: COLORS.everworks, backgroundColor: `${COLORS.everworks}08` }}>
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl" style={{ background: `${COLORS.everworks}12` }}>
                      <Briefcase className="h-5 w-5" />
                    </span>
                    에버웍스 <span className="text-sm font-bold text-slate-500">(그룹웨어)</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(everworksMenu).map(([category, items]) => (
                      <div
                        key={category}
                        className="overflow-hidden rounded-2xl border bg-white shadow-sm"
                        style={{ borderColor: `${COLORS.everworks}18`, borderLeft: `4px solid ${COLORS.everworks}` }}
                      >
                        <SmartLink
                          href="/people/everworks"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-3 py-2.5 text-[15px] font-black text-slate-950 transition-colors hover:bg-slate-100"
                        >
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS.everworks }} />
                          <span>{category}</span>
                          <span className="text-[11px] font-medium text-gray-400">*예정</span>
                        </SmartLink>
                        <div className="grid gap-1">
                        {items.map((item) => (
                          <SmartLink
                            key={item.title}
                            href={item.href}
                            className="flex min-h-11 items-center border-t border-slate-100 px-3 py-2 text-[15px] font-semibold text-slate-800 first:border-t-0 hover:bg-slate-50"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.title}
                            {item.subtitle && <span className="ml-1 text-xs font-bold" style={{ color: COLORS.everworks }}>({item.subtitle})</span>}
                          </SmartLink>
                        ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  </div>
                </div>

                {/* 고객센터 */}
                <div className="rounded-2xl border bg-white p-4 shadow-sm">
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
