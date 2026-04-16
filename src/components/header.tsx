"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Users, Building2, Briefcase, ChevronDown, X } from "lucide-react"

// People 메뉴 데이터 (2depth -> 3depth)
const peopleMenu = {
  인사: [
    { title: "인사·조직·발령", href: "#" },
    { title: "온보딩", subtitle: "에버웰커밍", href: "#", badge: "무료" },
  ],
  근태: [
    { title: "근태·출퇴근", subtitle: "에버타임", href: "#", badge: "7개월 무료" },
    { title: "PC-OFF", href: "#" },
  ],
  "급여·아웃소싱": [
    { title: "급여·연말정산", href: "#" },
    { title: "신고·회계처리", href: "#" },
    { title: "급여아웃소싱", subtitle: "에버페이롤", href: "#" },
  ],
  "평가와\n복리후생": [
    { title: "평가관리", href: "#" },
    { title: "복리후생", href: "#" },
  ],
  성과: [
    { title: "교육·경력", href: "#" },
    { title: "목표", href: "#" },
    { title: "평가", subtitle: "에버평가", href: "#" },
  ],
  부가서비스: [
    { title: "ERP 연동서비스", href: "#" },
    { title: "출입관리시스템", href: "#" },
    { title: "추가개발", href: "#" },
  ],
}

// Culture 메뉴 데이터
const cultureMenu = {
  솔루션: [
    { title: "소통", subtitle: "에버레스크", href: "#" },
    { title: "인성", subtitle: "에버온사람", href: "#" },
    { title: "OKR", subtitle: "에버그로잉", href: "#" },
  ],
  컨설팅: [
    { title: "진단", href: "#" },
    { title: "직무분석 및 역량 모델링", href: "#" },
    { title: "제도수립", href: "#" },
  ],
}

// Groupware 메뉴 데이터
const groupwareMenu = {
  솔루션: [
    { title: "전자결재", href: "#" },
    { title: "메일", href: "#" },
    { title: "메신저", href: "#" },
    { title: "AI Assistant", href: "#" },
  ],
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

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
      <div className="bg-primary text-primary-foreground py-2.5 px-4 text-center text-sm">
        <span className="font-medium">AI 빌더를 활용한 강력한 온보딩 솔루션!</span>
        {" "}에버웰커밍 무료 사용 이벤트{" "}
        <Link href="#" className="underline underline-offset-2 font-semibold hover:opacity-80">
          확인하기 &gt;
        </Link>
      </div>

      {/* 메인 네비게이션 */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
          {/* 왼쪽: 로고 + 네비게이션 */}
          <div className="flex items-center gap-16">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/ever-person-logo.png"
                alt="에버人 로고"
                width={140}
                height={40}
                className="object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
            {/* 서비스 메가메뉴 */}
            <div 
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button
                ref={triggerRef}
                className={`inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${megaMenuOpen ? "bg-accent" : ""}`}
              >
                서비스
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${megaMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* 메가메뉴 드롭다운 - 모던 팝업 레이어 */}
              {megaMenuOpen && (
                <div
                  ref={megaMenuRef}
                  className="absolute top-full -left-12 pt-3 z-50"
                >
                  <div className="bg-white border border-border/40 rounded-xl shadow-xl overflow-hidden">
                    {/* 3개 섹션 - 가로 배치 */}
                    <div className="flex p-5">

                      {/* ════════ People 섹션 ════════ */}
                      <div className="w-[500px] pr-6 border-r border-border/30">
                        {/* People 배지 */}
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-primary">
                          <Users className="h-5 w-5 text-primary" />
                          <span className="text-base font-bold text-primary">People</span>
                          <span className="text-sm text-muted-foreground">(인사관리)</span>
                        </div>
                        {/* People 카테고리들 - 3컬럼 */}
                        <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                          {Object.entries(peopleMenu).map(([category, items]) => (
                            <div key={category} className="flex flex-col gap-2">
                              <div className="text-sm font-semibold text-primary whitespace-nowrap">{category}</div>
                              <div className="flex flex-col gap-1.5">
                                {items.map((item) => (
                                  <Link
                                    key={item.title}
                                    href={item.href}
                                    onClick={() => setMegaMenuOpen(false)}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
                                  >
                                    {item.title}
                                    {item.badge && (
                                      <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-1">
                                        {item.badge}
                                      </span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ════════ Culture 섹션 ════════ */}
                      <div className="w-[320px] px-6 border-r border-border/30">
                        {/* Culture 배지 */}
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-orange-500">
                          <Building2 className="h-5 w-5 text-orange-500" />
                          <span className="text-base font-bold text-orange-500">Culture</span>
                          <span className="text-sm text-muted-foreground">(기업문화)</span>
                        </div>
                        {/* Culture 카테고리들 - 2컬럼 */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                          {Object.entries(cultureMenu).map(([category, items]) => (
                            <div key={category} className="flex flex-col gap-2">
                              <div className="text-sm font-semibold text-orange-500 whitespace-nowrap">{category}</div>
                              <div className="flex flex-col gap-1.5">
                                {items.map((item) => (
                                  <Link
                                    key={item.title}
                                    href={item.href}
                                    onClick={() => setMegaMenuOpen(false)}
                                    className="text-sm text-muted-foreground hover:text-orange-600 transition-colors whitespace-nowrap"
                                  >
                                    {item.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ════════ 그룹웨어 섹션 ════════ */}
                      <div className="w-[200px] pl-6">
                        {/* 그룹웨어 배지 */}
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-blue-500">
                          <Briefcase className="h-5 w-5 text-blue-500" />
                          <span className="text-base font-bold text-blue-500">그룹웨어</span>
                          <span className="text-sm text-muted-foreground">(에버웍스)</span>
                        </div>
                        {/* 그룹웨어 카테고리들 */}
                        <div className="flex flex-col gap-3">
                          {Object.entries(groupwareMenu).map(([category, items]) => (
                            <div key={category} className="flex flex-col gap-2">
                              <div className="text-sm font-semibold text-blue-500 whitespace-nowrap">{category}</div>
                              <div className="flex flex-col gap-1.5">
                                {items.map((item) => (
                                  <Link
                                    key={item.title}
                                    href={item.href}
                                    onClick={() => setMegaMenuOpen(false)}
                                    className="text-sm text-muted-foreground hover:text-blue-600 transition-colors whitespace-nowrap"
                                  >
                                    {item.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 닫기 버튼 */}
                      <button 
                        onClick={() => setMegaMenuOpen(false)} 
                        className="ml-4 self-start p-1 rounded-full hover:bg-muted transition-colors"
                      >
                        <X className="h-5 w-5 text-muted-foreground" />
                      </button>

                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="#" className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
              요금제
            </Link>
            <Link href="#" className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
              리소스
            </Link>
            <Link href="#" className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
              파트너
            </Link>
            <Link href="#" className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
              고객센터
            </Link>

            {/* 구분선 */}
            <div className="h-6 w-px bg-border mx-2" />

            {/* 외부 사이트 링크 */}
            <a 
              href="https://www.ksystem.co.kr/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md px-3 py-2 transition-colors hover:bg-accent"
            >
              <Image
                src="/younglimwon-logo.png"
                alt="영림원소프트랩"
                width={100}
                height={24}
                className="object-contain h-auto"
              />
            </a>
            <a 
              href="https://everin.co.kr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md px-3 py-2 transition-colors hover:bg-accent"
            >
              <Image
                src="/everein-culture-logo.png"
                alt="Ever人 기업문화"
                width={90}
                height={24}
                className="object-contain h-auto"
              />
            </a>
            </nav>
          </div>

          {/* Desktop CTA - 오른쪽 끝 정렬 */}
          <div className="hidden items-center gap-3 lg:flex shrink-0">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">로그인</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/signup">회원가입</Link>
            </Button>
            <Button size="sm" className="rounded-full px-5 bg-primary hover:bg-primary/90" asChild>
              <Link href="/trial">체험하기</Link>
            </Button>
            <Button size="sm" variant="secondary" className="rounded-full px-5 bg-foreground text-background hover:bg-foreground/90">
              도입문의
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] overflow-y-auto">
              <nav className="flex flex-col gap-6 pt-8">
                {/* People */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-primary flex items-center gap-2 pb-2 border-b border-primary">
                    <Users className="h-4 w-4" />
                    People (인사관리)
                  </h4>
                  {Object.entries(peopleMenu).map(([category, items]) => (
                    <div key={category} className="pl-2">
                      <div className="text-xs font-semibold text-muted-foreground mb-1">{category.replace('\n', ' ')}</div>
                      {items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center gap-2 py-1 text-sm hover:text-primary"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="text-muted-foreground/60">ㄴ</span>
                          <span>{item.title}</span>
                          {item.subtitle && <span className="text-primary text-xs">({item.subtitle})</span>}
                          {item.badge && (
                            <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                
                {/* Culture */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-orange-500 flex items-center gap-2 pb-2 border-b border-orange-500">
                    <Building2 className="h-4 w-4" />
                    Culture (기업문화)
                  </h4>
                  {Object.entries(cultureMenu).map(([category, items]) => (
                    <div key={category} className="pl-2">
                      <div className="text-xs font-semibold text-muted-foreground mb-1">{category}</div>
                      {items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center gap-2 py-1 text-sm hover:text-orange-500"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="text-muted-foreground/60">ㄴ</span>
                          <span>{item.title}</span>
                          {item.subtitle && <span className="text-orange-500 text-xs">({item.subtitle})</span>}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                
                {/* Groupware */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-blue-500 flex items-center gap-2 pb-2 border-b border-blue-500">
                    <Briefcase className="h-4 w-4" />
                    그룹웨어 (에버웍스)
                  </h4>
                  {Object.entries(groupwareMenu).map(([category, items]) => (
                    <div key={category} className="pl-2">
                      <div className="text-xs font-semibold text-muted-foreground mb-1">{category}</div>
                      {items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center gap-2 py-1 text-sm hover:text-blue-500"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="text-muted-foreground/60">ㄴ</span>
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 space-y-2 pt-4 border-t">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login">로그인</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/signup">회원가입</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/trial">무료체험</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
