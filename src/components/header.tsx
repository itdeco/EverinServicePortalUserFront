"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
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

type TabType = "people" | "culture" | "groupware"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("people")
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

  const tabs = [
    { id: "people" as TabType, label: "People", sublabel: "인사관리", icon: Users, color: "primary", bgColor: "bg-primary", textColor: "text-primary", lightBg: "bg-primary/10" },
    { id: "culture" as TabType, label: "Culture", sublabel: "기업문화", icon: Building2, color: "orange", bgColor: "bg-orange-500", textColor: "text-orange-500", lightBg: "bg-orange-100" },
    { id: "groupware" as TabType, label: "그룹웨어", sublabel: "에버웍스", icon: Briefcase, color: "blue", bgColor: "bg-blue-500", textColor: "text-blue-500", lightBg: "bg-blue-100" },
  ]

  const getCurrentMenu = () => {
    switch (activeTab) {
      case "people": return peopleMenu
      case "culture": return cultureMenu
      case "groupware": return groupwareMenu
    }
  }

  const getCurrentColors = () => {
    switch (activeTab) {
      case "people": return { text: "text-primary", hover: "hover:text-primary", border: "border-primary" }
      case "culture": return { text: "text-orange-500", hover: "hover:text-orange-500", border: "border-orange-500" }
      case "groupware": return { text: "text-blue-500", hover: "hover:text-blue-500", border: "border-blue-500" }
    }
  }

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
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <span className="text-lg font-bold text-primary-foreground">E</span>
            </div>
            <span className="text-xl font-bold text-foreground">에버인</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* 서비스 메가메뉴 */}
            <div className="relative">
              <button
                ref={triggerRef}
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className={`inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${megaMenuOpen ? "bg-accent" : ""}`}
              >
                서비스
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${megaMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* 메가메뉴 드롭다운 */}
              {megaMenuOpen && (
                <div 
                  ref={megaMenuRef}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden z-50 min-w-[800px]"
                >
                  {/* 1 depth: 탭 버튼들 */}
                  <div className="flex items-center gap-2 p-4 border-b border-border/50 bg-muted/30">
                    {tabs.map((tab, index) => (
                      <div key={tab.id} className="flex items-center">
                        <button
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                            activeTab === tab.id 
                              ? `${tab.bgColor} text-white shadow-md` 
                              : "bg-background border border-border hover:bg-muted text-foreground"
                          }`}
                        >
                          <tab.icon className="h-4 w-4" />
                          <span>{tab.label}</span>
                          <span className={`text-xs ${activeTab === tab.id ? "text-white/80" : "text-muted-foreground"}`}>
                            ({tab.sublabel})
                          </span>
                        </button>
                        {index < tabs.length - 1 && (
                          <span className="mx-2 text-muted-foreground font-medium">&</span>
                        )}
                      </div>
                    ))}
                    
                    {/* 닫기 버튼 */}
                    <button 
                      onClick={() => setMegaMenuOpen(false)}
                      className="ml-auto p-2 rounded-full hover:bg-muted transition-colors"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>

                  {/* 2 depth + 3 depth: 컬럼 헤더 + 링크 */}
                  <div className="p-5">
                    <div className="flex gap-6">
                      {Object.entries(getCurrentMenu()).map(([category, items]) => (
                        <div key={category} className="min-w-[120px]">
                          {/* 2 depth: 카테고리 헤더 */}
                          <div className={`font-bold text-sm mb-3 pb-2 border-b-2 ${getCurrentColors().border} ${getCurrentColors().text} whitespace-pre-line`}>
                            {category}
                          </div>
                          
                          {/* 3 depth: 실제 링크들 */}
                          <div className="flex flex-col gap-1.5">
                            {items.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setMegaMenuOpen(false)}
                                className={`text-sm text-muted-foreground ${getCurrentColors().hover} hover:underline transition-colors flex items-start gap-1 group`}
                              >
                                <span className="text-muted-foreground/60 shrink-0">ㄴ</span>
                                <span className="flex flex-wrap items-center gap-1">
                                  {item.title}
                                  {item.subtitle && (
                                    <span className={`${getCurrentColors().text} text-xs`}>({item.subtitle})</span>
                                  )}
                                  {item.badge && (
                                    <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full font-medium">
                                      {item.badge}
                                    </span>
                                  )}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
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
            <Link href="#" className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
              기업문화포털
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="ghost" size="sm">
              로그인
            </Button>
            <Button variant="outline" size="sm">
              회원가입
            </Button>
            <Button size="sm" className="rounded-full px-5 bg-primary hover:bg-primary/90">
              체험하기
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
                  <Button variant="outline" className="w-full">
                    로그인
                  </Button>
                  <Button className="w-full">무료체험</Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
